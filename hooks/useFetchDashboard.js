"use client";
import { useEffect, useState } from "react";
import { getDashboardData } from "@/lib/data/dashboard";
import { toast } from "sonner";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";
import errorHandler from "@/lib/errorHandler";

export default function useFetchDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getDashboardData()
            .then((res) => setData(res))
            .catch((err) => {
                const error = errorHandler(err);
                setError(error);
            })
            .finally(() => setLoading(false));
    }, []);

    return { data, loading, error };
}
