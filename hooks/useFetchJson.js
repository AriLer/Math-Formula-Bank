import axios from "@/lib/axios";
import { useEffect, useState } from "react";

export default function useFetchJson(
    url = "",
    queryParameters = {},
    formatFunction = undefined
) {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetch = async () => {
        try {
            const res = await axios.get(url, {
                params: queryParameters,
            });

            setData(formatFunction ? formatFunction(res.data) : res.data);
            setError(null);
        } catch (err) {
            console.log(err)
            setData([]);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return {
        data,
        error,
        isLoading,
        refetch: fetch,
    };
}
