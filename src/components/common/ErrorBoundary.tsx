import React from "react";

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    message: string;
}

export class ErrorBoundary extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {hasError: false, message: ''};
    }

    static getDerivedStateFromError(error: Error) {
        return {hasError: true, message: error.message};
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
                    <p className="text-red-500">{this.state.message}</p>
                </div>
            );
        }
        return this.props.children;
    }
}