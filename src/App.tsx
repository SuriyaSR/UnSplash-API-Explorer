import { useErrorContext } from "./context/ErrorContext";
import { usePhotos } from "./hooks/usePhotos";
import SearchBar from "./components/SearchBar";
import { ErrorBoundary } from "./components/ErrorBoundary";
import ErrorBanner from "./components/ErrorBanner";
import PhotoGallery from "./components/PhotoGallery";

function App() {

  const {error, clearError} = useErrorContext();
  const {photos, loading, searchQuery, setSearchQuery , fetchPhotos} = usePhotos();

  return (
    <ErrorBoundary>
        <div className="h-screen flex flex-col bg-gray-50 text-center p-6">
          <h1 className="text-3xl font-semibold mb-4"> UnSplash Image Explorer </h1>   
          {error.message && (
            <ErrorBanner message = {error.message} clearError = {clearError}/>
          )}
          <SearchBar query={searchQuery} setQuery={setSearchQuery} searchPhotos={() => fetchPhotos(1)} />
          <div className="mt-6 flex-1 overflow-y-auto">
            {!error.message && loading ? (
              <p>Loading photos...</p> 
            ) : (
              <PhotoGallery photos = {photos}/>
            )}
          </div>
        </div>
    </ErrorBoundary>
  )
}

export default App
