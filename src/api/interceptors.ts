import type { AxiosError } from "axios";
import type { ErrorState } from "../types/error";
import { handleApiError } from "../utils/apiError";
import { api } from "./api";

export const setupInterceptors = (setError:(err:ErrorState) => void) => {
  const interceptorId = api.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
     const parsedError = handleApiError(error);
     setError(parsedError);
     return Promise.reject(error);
    }
  )
  return interceptorId;
}