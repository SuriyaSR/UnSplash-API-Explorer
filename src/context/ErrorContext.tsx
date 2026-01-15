import { createContext, useCallback, useContext, useState } from "react";
import type { ErrorState, ErrorContextType } from "../types/error";

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({children} : {children: React.ReactNode}) => {
    const [error, setErrorState] = useState<ErrorState>({message: null});

    const setError = useCallback((error: ErrorState) => {
        setErrorState(error);
    },[]);

    const clearError = useCallback(() => {
        setErrorState({message: null});
    },[]);

    return (
        <ErrorContext.Provider value={{error, setError, clearError}}>
            {children}
        </ErrorContext.Provider>
    )
}

export const useErrorContext = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error("useErrorContext must be used within an ErrorProvider");
    }
    return context;
}

