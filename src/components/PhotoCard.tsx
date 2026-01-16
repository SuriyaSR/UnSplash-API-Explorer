import { memo } from "react"
import type { UnsplashPhoto } from "../types/unsplash"

const PhotoCard = memo(({photo} : {photo : UnsplashPhoto}) => {
  return (
    <div className="flex flex-col h-full rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white hover:shadow-xl transition-shadow duration-300">
        <img 
          src={photo.urls.thumb}  
          // loading="lazy"
          alt={photo.alt_description || "Unsplash Photo"} 
          className="w-full h-48 object-cover shrink-0" 
        />
        <div className="p-4 flex flex-col grow">
            <a href={photo.user.links.html}
               target="_blank"
               rel="noopener noreferrer"
               className="font-bold text-lg mb-1 text-blue-600 hover:underline truncate block">
               {photo.user.name}
            </a>
            <p className="text-gray-600 text-sm line-clamp-2 italic mb-2">
                {photo.alt_description || "No description provided"}
            </p>
        </div>
    </div>
  )
})

	
export default PhotoCard