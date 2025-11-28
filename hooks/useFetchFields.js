import useFetchJson from "./useFetchJson";

/**
 * Custom hook to fetch fields from the API
 * @returns {Object} The fields data, loading state, error state, and refetch function
 */
export default function useFetchFields() {
    const { data: fields, error, isLoading, refetch } = useFetchJson(
        "/fields", 
        {}, 
        (data) => {
            return data.data.map(field => ({
                uuid: field.uuid,
                name: field.name,
                type: field.type,
                label: field.label,
                validations: field.validations,
                options: field.options,
                description: field.description,
            }));
        }
    );

    return {
        fields: fields || [],
        error,
        isLoading,
        refetch,
    };
} 