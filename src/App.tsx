import { useErrorContext } from "./context/ErrorContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { useEffect } from "react";
import SearchBar from "./components/SearchBar";
import { usePhotos } from "./hooks/usePhotos";
import ErrorBanner from "./components/ErrorBanner";

function App() {

  const {error, clearError} = useErrorContext();
  const {photos, loading} = usePhotos();

  useEffect(() => {
    //api call on 1st load
  }, []);

  return (
    <ErrorBoundary>
        <div className="min-h-screen text-center p-6 bg-gray-50">
          <h1 className="text-3xl font-semibold mb-4"> UnSplash Image Explorer </h1>   
          {error.message && (
            <ErrorBanner message = {error.message} clearError = {clearError}/>
          )}
          <p className="text-gray-600">Explore and search for stunning images from Unsplash.</p>
          {/* Main content goes here */}
          <SearchBar />
          <div className="mt-6">
            {loading ? (
              <p>Loading photos...</p> 
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                Gallery component
                </div>)}
          </div>
        </div>
    </ErrorBoundary>
  )
}

export default App
