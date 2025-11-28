import { toast } from "sonner";
import { DEFAULT_ERROR_MESSAGE } from "./constants";
import { flattenErrors } from "./utils";

export default function errorHandler(err, shouldToast = true, setFormErrors) {
    const error = err?.response?.data;
    const formErrors = error?.errors;

    console.log("Error Handler: ", err);
    console.log("Error response data: ", error);
    console.log("Form errors: ", formErrors);

    // Case 1: Form-specific backend errors (err?.response?.data?.errors)
    if (formErrors && typeof formErrors === 'object') {
        if (!shouldToast && setFormErrors && typeof setFormErrors === 'function') {
            // Create an errors object with validation
            const errorsObject = {};
            let hasValidErrors = false;
            
            Object.entries(formErrors).forEach(([fieldName, message]) => {
                // Ensure fieldName is a valid string
                if (typeof fieldName === 'string' && fieldName.trim() !== '') {
                    const errorMessage = Array.isArray(message) ? message[0] : message;
                    if (errorMessage) {
                        errorsObject[fieldName] = errorMessage;
                        hasValidErrors = true;
                    }
                }
            });
            
            if (!hasValidErrors) {
                console.log("No valid errors found, falling back to toast");
                const messages = flattenErrors(formErrors);
                if (messages && messages.length > 0) {
                    messages.forEach((msg) => toast.error(msg));
                } else {
                    toast.error(error?.message || DEFAULT_ERROR_MESSAGE);
                }
                return;
            }
            
            // Try React Hook Form's setError approach first
            try {
                // Test with the first field to see if it's React Hook Form's setError
                const firstField = Object.keys(errorsObject)[0];
                const firstMessage = errorsObject[firstField];
                
                if (firstField && firstMessage) {
                    console.log("Trying React Hook Form setError with:", firstField, firstMessage);
                    
                    // Try calling setFormErrors with React Hook Form signature
                    setFormErrors(firstField, {
                        type: 'server',
                        message: firstMessage
                    });
                    
                    // If we get here, it worked, so set all errors this way
                    Object.entries(errorsObject).forEach(([fieldName, message]) => {
                        if (typeof fieldName === 'string' && fieldName.trim() !== '' && message) {
                            setFormErrors(fieldName, {
                                type: 'server',
                                message: message
                            });
                        }
                    });
                } else {
                    // No valid fields, try regular state setter approach
                    console.log("No valid fields, trying regular state setter");
                    setFormErrors(errorsObject);
                }
                
            } catch (error) {
                console.log("React Hook Form setError failed, trying regular state setter:", error);
                // If React Hook Form approach failed, try regular state setter approach
                try {
                    setFormErrors(errorsObject);
                } catch (secondError) {
                    console.error("Error setting form errors:", secondError);
                    // Fallback to toast if both approaches fail
                    const messages = flattenErrors(formErrors);
                    if (messages && messages.length > 0) {
                        messages.forEach((msg) => toast.error(msg));
                    } else {
                        toast.error(error?.message || DEFAULT_ERROR_MESSAGE);
                    }
                }
            }
        } else {
            const messages = flattenErrors(formErrors);
            if (messages && messages.length > 0) {
                messages.forEach((msg) => toast.error(msg));
            } else {
                toast.error(error?.message || DEFAULT_ERROR_MESSAGE);
            }
        }
    } else if (typeof error === "string") {
        const errorMessage = error || error?.message || DEFAULT_ERROR_MESSAGE;
        toast.error(errorMessage);
    } else {
        const errorMessage = err?.message || DEFAULT_ERROR_MESSAGE;
        toast.error(errorMessage);
    }
}

