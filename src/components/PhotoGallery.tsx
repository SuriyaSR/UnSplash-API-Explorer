import type { UnsplashPhoto } from "../types/unsplash"

const PhotoGallery = (photos : {photos :UnsplashPhoto[]}) => {
  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    {photos.photos.length > 0 ? (photos.photos.map((photo) => (
        <div key={photo.id} className="rounded overflow-hidden shadow-lg border border-gray-300 ">
        <img src={photo.urls.small} alt={photo.alt_description} className="w-full h-48 object-cover" />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{photo.user.name}</div>
            <p className="text-gray-700 text-base">
                {photo.alt_description || "No description"}
            </p>
        </div>
        </div>
    ))) : (
        <p>No photos found.</p>
    )}
    </div>
  )
}

export default PhotoGallery
