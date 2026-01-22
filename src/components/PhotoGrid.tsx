import type { UnsplashPhoto } from "../types/unsplash"
import { VirtuosoGrid, type VirtuosoGridHandle } from "react-virtuoso"
import PhotoCard from "./PhotoCard"
import { memo, useImperativeHandle, useMemo, useRef, useState } from "react";
import ImageModal from "./ImageModal";

export interface PhotoGridHandle {
  scrollToTop: () => void;
}

interface PhotoGridProps {
  photos: UnsplashPhoto[];
  loading: boolean;
  hasMore: boolean;
  loadMorePhotos: () => void;
  onAtTopChange?: (atTop: boolean) => void;
  ref?: React.RefObject<PhotoGridHandle | null>;
}

const PhotoGrid = ({ photos, loading, hasMore, loadMorePhotos, ref, onAtTopChange }: PhotoGridProps) => {
  const virtuosoRef = useRef<VirtuosoGridHandle>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<UnsplashPhoto | null>(null);

  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      virtuosoRef.current?.scrollToIndex({ index: 0, behavior: 'smooth', align: "start", });
    }
  }));

  const virtuosoComponents = useMemo(() => ({
    Footer: () => (
      <div className="py-6 text-center w-full">
        {loading && <p className="text-gray-500">Loading More Photos...</p>}
        {!hasMore && photos.length > 0 && <p className="text-gray-400 italic">No more photos to load</p>}
      </div>
    )
  }), [loading, hasMore, photos.length]);

  if (photos.length === 0 && !loading) {
    return <p className="text-center text-gray-500 mt-10">No images found.</p>;
  }

  return (
    <div className="w-full h-full">
      <VirtuosoGrid
        data={photos} ref={virtuosoRef}
         overscan={2000} // Pre-renders 2000px of content to prevent white flashes
         computeItemKey={(_, photo) => photo.id}
        // 1. Automatically trigger loadMore when reaching the end
        endReached={() => {
          if (hasMore && !loading) loadMorePhotos();
        }}
        atTopStateChange={onAtTopChange}
        listClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4"
        itemContent={(_index, photo) => (
          <div className="h-full">
            <PhotoCard photo={photo} onOpen={() => setSelectedPhoto(photo)}/>
          </div>
        )}
        // 2. Add the loader as a footer component inside the scrollable area
        components={virtuosoComponents}
      />

      {selectedPhoto && (
        <ImageModal 
          photo={selectedPhoto} 
          onClose={() => setSelectedPhoto(null)} 
        />
      )}

    </div>
  )
}

export default memo(PhotoGrid);