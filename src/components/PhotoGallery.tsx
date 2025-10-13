import type { UnsplashPhoto } from "../types/unsplash"

interface PhotoGalleryProps {
  photos: UnsplashPhoto[];
}
const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  return photos.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {photos.map((photo) => (
                <div key={photo.id} className="rounded overflow-hidden shadow-lg border border-gray-300 ">
                  <img src={photo.urls.small}  loading="lazy"
                  alt={photo.alt_description || photo.description || `Photo by ${photo.user.name}`} 
                  className="w-full h-48 object-cover" />
                  <div className="px-6 py-4">
                      <a href={photo.user.links.html}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-xl mb-2 text-blue-600 hover:underline block">
                      {photo.user.name}
                      </a>
                      <p className="text-gray-700 text-base">
                          {photo.alt_description || "No description"}
                      </p>
                  </div>
                </div>
            ))}
    </div>
  ) : (
    <p className="text-center text-gray-500 text-lg">No images found. Try another one..!!</p>
  );
}

export default PhotoGallery
