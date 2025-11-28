import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import axios from "@/lib/axios";

const fetcher = url => axios.get(url).then(res => res.data);

export const useSelect = (model) => {
    if (!model || typeof model !== 'string') {
        console.error("useSelect error: model must be a non-empty string. Received:", model, "type:", typeof model);
        throw new Error(`useSelect: model must be a non-empty string. Received: ${model} (${typeof model})`);
    }

    const getKey = (pageIndex, previousPageData) => {
        if (
            previousPageData &&
            previousPageData.current_page >= previousPageData.last_page
        ) {
            return null;
        }

        const params = new URLSearchParams({
            page: pageIndex + 1,
        });

        return `selects/${model}?${params.toString()}`;
    };

    const search = async (searchKey) => {
        try {
            const res = await axios.get(`selects/${model}`, {
                params: {
                    search_key: searchKey
                }
            });

            return res.data.data.map(item => {
                return {
                    value: item.key,
                    label: item.value,
                }
            })
        } catch (err) {
            return [];
        }
    }

    const {
        data,
        error,
        size,
        setSize,
        isLoading,
        isValidating,
        mutate,
    } = useSWRInfinite(getKey, fetcher);

    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (!data) return;
        const newOptions = data.flatMap(page =>
            page.data.map(item => ({
                value: item.key,
                label: item.value,
            }))
        );
        setOptions(newOptions);
    }, [data]);

    const lastPageData = data?.[data.length - 1];
    const hasMore = lastPageData
        ? lastPageData.current_page < lastPageData.last_page
        : false;

    const refresh = () => {
        // Reset to first page and refetch
        setSize(1);
        mutate();
    };

    return {
        options,
        error,
        search,
        isLoading: isLoading && !data,
        isFetching: isValidating,
        loadMore: () => {
            if (hasMore) setSize(size + 1);
        },
        refresh,
    };
};
