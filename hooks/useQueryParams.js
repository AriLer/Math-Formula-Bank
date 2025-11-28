"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export default function useQueryParams() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    // Page is stored locally (not reflected in the URL)
    const initialPage = Number(searchParams.get("p") || 1);
    const [page, setPage] = useState(
        Number.isInteger(initialPage) && initialPage > 0 ? initialPage : 1
    );

    const params = useMemo(
        () => ({
            query: searchParams.get("q") || "",
            page,
            filter: searchParams.get("f") || "",
        }),
        [searchParams.toString(), page]
    );

    const setParams = useCallback(
        (newParams) => {
            const current = new URLSearchParams(
                Array.from(searchParams.entries())
            );

            if ("query" in newParams) {
                newParams?.query
                    ? current.set("q", newParams.query)
                    : current.delete("q");
            }
            if ("page" in newParams) {
                const pageNum = Number(newParams.page);
                if (Number.isInteger(pageNum) && pageNum > 0) {
                    setPage(pageNum);
                }
                // Ensure page parameter is NOT left in the URL
                current.delete("p");
            }
            if ("filter" in newParams) {
                newParams?.filter
                    ? current.set("f", newParams.filter)
                    : current.delete("f");
            }

            const newQueryString = current.toString();
            if (newQueryString !== searchParams.toString()) {
                replace(`?${newQueryString}`);
            }
        },
        [replace, searchParams]
    );

    return [params, setParams];
}
