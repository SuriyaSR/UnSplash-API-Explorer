import { useErrorContext } from "./context/ErrorContext";
import { usePhotos } from "./hooks/usePhotos";
import SearchBar from "./components/SearchBar";
import { ErrorBoundary } from "./components/ErrorBoundary";
import ErrorBanner from "./components/ErrorBanner";
import PhotoGallery from "./components/PhotoGallery";

function App() {

  const {error, clearError} = useErrorContext();
  const {photos, loading, searchQuery, setSearchQuery, fetchPhotos } = usePhotos();

  const reloadPics = () => {
    clearError();
    fetchPhotos(1, searchQuery.trim() ? searchQuery : "");
  }

  return (
    <ErrorBoundary>
        <div className="h-screen flex flex-col bg-gray-50 text-center p-6">
          <h1 className="text-3xl font-semibold mb-4"> UnSplash Image Explorer </h1> 
          <SearchBar query={searchQuery} setQuery={setSearchQuery} />  

          <div className="mt-6 flex-1 overflow-y-auto">
            {loading ? (
              <p className="text-gray-500 text-lg">Loading photos...</p>
            ) : error.message ? (
              <ErrorBanner message={error.message} clearError={reloadPics} />
            ) : (
              <PhotoGallery photos={photos} />
            )}
          </div>
        </div>        
    </ErrorBoundary>
  )
}

export default App
