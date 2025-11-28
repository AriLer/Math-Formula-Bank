"use client";

import { PROTECTED_SESSION_STORAGE_KEYS } from "@/lib/data";
// ! cannot combine with useLocalStorage
// ! because sessionStorage is not available in SSR
import { useCallback, useState, useEffect } from "react";

export default function useSessionStorage(key, defaultValue = null) {
    const [storedValue, setStoredValue] = useState(defaultValue); //! Initial State prerenders on server
    const isReadOnly = PROTECTED_SESSION_STORAGE_KEYS.includes(key);
    useEffect(() => {
        try {
            const item = sessionStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item));
            }
        } catch (error) {
            console.error(`Error reading from session storage key: ${key}`);
        }
    }, [key]);

    const setValue = useCallback(
        (value) => {
            if (isReadOnly) {
                console.warn(
                    `Cannot modify read-only session storage key: ${key}`
                );
                return;
            }
            setStoredValue((prev) => {
                const newValue =
                    typeof value === "function" ? value(prev) : value;
                try {
                    sessionStorage.setItem(key, JSON.stringify(newValue));
                } catch (error) {
                    console.error("Error writing to storage:", error);
                }
                return newValue;
            });
        },
        [key, isReadOnly]
    );
    return [storedValue, isReadOnly ? undefined : setValue];
}
