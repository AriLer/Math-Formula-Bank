"use client";

import { useCallback, useState, useEffect } from "react";
// ! cannot combine with useSessionStorage
// ! because sessionStorage is not available in SSR
export default function useLocalStorage(key, defaultValue = null) {
    const [storedValue, setStoredValue] = useState(defaultValue); //! Initial State prerenders on server

    useEffect(() => {
        try {
            const item = localStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item));
            }
        } catch (error) {
            console.log("Error reading from storage:", error);
        }
    }, [key]);

    const setValue = useCallback(
        (value) => {
            setStoredValue((prev) => {
                const newValue =
                    typeof value === "function" ? value(prev) : value;
                try {
                    localStorage.setItem(key, JSON.stringify(newValue));
                } catch (error) {
                    console.log("Error writing to storage:", error);
                }
                return newValue;
            });
        },
        [key]
    );

    return [storedValue, setValue];
}
