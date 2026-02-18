import { useErrorContext } from "./context/ErrorContext";
import { usePhotos } from "./hooks/usePhotos";
import SearchBar from "./components/search/SearchBar";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import ErrorBanner from "./components/common/ErrorBanner";
import { useCallback, useRef, useState } from "react";
import ScrollToTopButton from "./components/common/ScrollToTopButton";
import { PhotoGrid } from "@/components/photos";
import RefineDrawer from "./components/overlays/RefineDrawer";

function App() {

  const { error, clearError } = useErrorContext();
  const { photos, loading, searchQuery, setSearchQuery, fetchPhotos, loadMorePhotos, hasMore } = usePhotos();
  const galleryRef = useRef<{ scrollToTop: () => void }>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isRefineOpen, setIsRefineOpen] = useState(false);

  const reloadPics = () => {
    clearError();
    fetchPhotos(1, searchQuery.trim() ? searchQuery : "");
  }

  const handleAtTopChange = useCallback((atTop: boolean) => {
    setShowScrollButton(!atTop);
  }, []);

  const onFiltersApply = () => {
    alert("Filters applied")
  }

  return (
    <ErrorBoundary>
      <div className="h-screen flex flex-col bg-gray-50 text-center p-6">
        <h1 className="text-3xl font-semibold mb-4"> UnSplash Image Explorer </h1>
        <SearchBar query={searchQuery} setQuery={setSearchQuery} onRefineClick={() => setIsRefineOpen(true)}/>
        <RefineDrawer
          open={isRefineOpen}
          onClose={() => setIsRefineOpen(false)} onApply={onFiltersApply}
        />
        <div className="mt-6 flex-1 overflow-hidden">
          {!loading && photos.length === 0 && (
            <p className="text-gray-500 text-lg">
              No photos found. Try another search.
            </p>
          )}
          {loading && photos.length === 0 ? (
            <p className="text-gray-500 text-lg">Loading photos...</p>
          ) : error.message ? (
            <ErrorBanner message={error.message} clearError={reloadPics} />
          ) : (
            <PhotoGrid
              ref={galleryRef}
              photos={photos}
              loading={loading}
              hasMore={hasMore}
              loadMorePhotos={loadMorePhotos}
              onAtTopChange={handleAtTopChange}
            />
          )}
        </div>
        {/* Add Scroll to Top Button */}
        <ScrollToTopButton isVisible={showScrollButton}
          onClick={() => galleryRef.current?.scrollToTop()} />
      </div>
    </ErrorBoundary>
  )
}

export default App
