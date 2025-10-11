
export interface ErrorState {
   message: string | null;
   status?: number | null;
}

export interface ErrorContextType {
    error: ErrorState;
    setError: (error: ErrorState) => void;
    clearError: () => void;
}