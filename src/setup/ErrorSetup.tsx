import { useEffect } from "react";
import { useErrorContext } from "../context/ErrorContext";
import { setupInterceptors } from "../api/interceptors";

export const ErrorSetup = () => {
  const { setError } = useErrorContext();

  useEffect(() => {
    setupInterceptors(setError);
  }, [setError]);

  return null;
};
