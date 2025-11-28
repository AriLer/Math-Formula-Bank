import { useEffect, useRef, useState, useCallback } from "react";

export function useInfiniteScroll({ fetchMethod }) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(null);
    const [loadingAdditionalData, setLoadingAdditionalData] = useState(false);
    const [loadingInitialData, setLoadingInitialData] = useState(false);
    const observerRef = useRef(null);

    const loadMore = useCallback(async () => {
        if (loadingAdditionalData || (lastPage && currentPage > lastPage))
            return;
        data?.length === 0
            ? setLoadingInitialData(true)
            : setLoadingAdditionalData(true);
        const result = await fetchMethod(currentPage);

        setData((prev) => [...prev, ...result.data]);
        setCurrentPage((prev) => prev + 1);
        setLastPage(result.last_page);

        data?.length === 0
            ? setLoadingInitialData(false)
            : setLoadingAdditionalData(false);
    }, [loadingAdditionalData, lastPage, currentPage, data, fetchMethod]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) loadMore();
            },
            { threshold: 1 }
        );

        const current = observerRef.current;
        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, [loadMore]);

    return {
        data,
        loadingInitialData,
        loadingAdditionalData,
        hasMore: !lastPage || currentPage <= lastPage,
        loaderRef: observerRef,
    };
}
