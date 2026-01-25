import { memo } from "react"
import type { UnsplashPhoto } from "@/types/unsplash"
interface PhotoCardProps {
  photo: UnsplashPhoto;
  onOpen: () => void; // New prop
}

const PhotoCard = memo(({ photo, onOpen }: PhotoCardProps) => {
  return (
    <>
      <div onClick={onOpen}
        className="border border-gray-200 duration-300
            group relative h-72 w-full overflow-hidden rounded-lg bg-gray-200 shadow-sm 
            transition-all hover:shadow-xl cursor-pointer">
        <img
          src={photo.urls.small}
          // loading="lazy"
          alt={photo.alt_description || "Unsplash Photo"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          title={photo.alt_description || "No description provided"}
        />
        {/* Hover Overlay: Darkens the image slightly to make text readable */}
        <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Top Overlay: Download Button */}
        <div className="absolute bottom-4 right-4 translate-y-[-10px] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <a
            href={`${photo.links.download}&force=true`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // Prevent opening the modal when clicking download
            className="flex h-6 w-6 items-center justify-center rounded-md bg-white/90 text-gray-700 shadow-lg hover:bg-white hover:text-black transition-colors"
            title="Download photo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12 a2 2 0 002-2v-1M7 10l5 5m0 0l5-5m-5 5V3" />
            </svg>
          </a>
        </div>

        {/* Bottom Overlay: User Info */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between translate-y-[10px] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex items-center gap-2 truncate">
            {/* User Icon/Avatar */}
            <img
              src={photo.user.profile_image.small}
              alt={photo.user.name}
              className="h-8 w-8 rounded-full border border-white/50"
            />
            <a
              href={photo.user.links.html}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} // Prevent opening modal
              className="truncate font-light text-white hover:text-gray-200 drop-shadow-md"
            >
              {photo.user.name}
            </a>
          </div>
        </div>

      </div>
    </>
  )
})


export default PhotoCard