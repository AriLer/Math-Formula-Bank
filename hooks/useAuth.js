"use client";
import useSWR from "swr";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

export default function useAuth() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const {
        data: user,
        error,
        mutate,
    } = useSWR("/user", () =>
        axios.get("/user").then((res) => {
            sessionStorage.setItem("user", JSON.stringify(res?.data));
            return res?.data;
        })
    );

    useEffect(() => {
        if (user || error) {
            setIsLoading(false);
        }
    }, [user, error]);

    const login = async (setErrors, credentials) => {
        try {
            await axios.post("/login", credentials);
            mutate();
        } catch (error) {
            console.log(error);
            if (error?.code === "ERR_NETWORK") {
                setErrors("שגיאת רשת: לא ניתן להתחבר לשרת.");
            } else {
                setErrors(error?.response?.data || "שגיאה לא ידועה.");
            }
        }
    };
    return {
        user,
        login,
        isLoading,
    };
}
