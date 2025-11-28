import { useState, useEffect } from "react";
import {
    getTranslationFields,
    getScreenTranslations,
} from "@/lib/data/translations";

/**
 * Custom hook to fetch and manage languages data
 * @param {string} [initialScreenKey] - Optional initial screen key to fetch translations for
 * @returns {Object} The languages data state and loading/error states
 */
export default function useLanguagesData(initialScreenKey = null) {
    const [fields, setFields] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [screenTranslations, setScreenTranslations] = useState({
        data: [],
        error: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const promises = [getTranslationFields()];
                
                if (initialScreenKey) {
                    promises.push(getScreenTranslations(initialScreenKey));
                }

                const responses = await Promise.all(promises);
                const [fieldsResponse, translationsResponse] = responses;

                // Handle fields data
                const fieldsData = Array.isArray(fieldsResponse)
                    ? fieldsResponse
                    : fieldsResponse.data
                    ? fieldsResponse.data
                    : fieldsResponse.fields
                    ? fieldsResponse.fields
                    : [];

                const fieldsWithIds = fieldsData.map((field, index) => ({
                    ...field,
                    id: field.id || field.uuid || `field-${index}`,
                }));

                setFields(fieldsWithIds);
                
                if (translationsResponse) {
                    setScreenTranslations(translationsResponse);
                }
                
                setError(null);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [initialScreenKey]);

    return {
        fields,
        isLoading,
        error,
        screenTranslations,
    };
} 