import type { AxiosError } from "axios";
import type { ErrorState } from "../types/error";

export const handleApiError = (error: AxiosError) : ErrorState => {

     if (!error.response) {
        return { 
            message: "Network error. Please check your internet connection and try again.", 
            status: null 
        };
    }
    
    const status = error.response?.status || 500;

    switch (status) {
        case 400:
            return { message: "Bad Request. Please check your input.", status };
        case 401:
            return { message: "Unauthorized. Please check your API key or Access Token.", status };
        case 403:
            return { message: "Forbidden. You don't have permission to access this resource.", status };
        case 404:
            return { message: "Not Found. The requested resource could not be found.", status };
        case 429:
            return { message: "Rate limit exceeded — Please try again later.", status };
        case 500:
            return { message: "Internal Server Error. Please try again later.", status };
        case 503:
            return { message: "Service Unavailable. The server is currently unavailable.", status };
        default:
            return { message: "An unexpected error occurred. Please try again.", status };
    }
}