import { useEffect } from "react";
import { useErrorContext } from "../context/ErrorContext";
import { setupInterceptors } from "../api/interceptors";
import { api } from "../api/api";

export const ErrorSetup = () => {
  const { setError } = useErrorContext();

  useEffect(() => {
    const resInterceptor = setupInterceptors(setError);
    return () => {
      api.interceptors.response.eject(resInterceptor);
    };

  }, [setError]);

  return null;
};
