import { createPortal } from 'react-dom';
import { type UnsplashPhoto } from '../types/unsplash';
import { useEffect } from "react";

interface ModalProps {
  photo: UnsplashPhoto;
  onClose: () => void;
}

const ImageModal = ({ photo, onClose }: ModalProps) => {

    //lock scroll + ESC close
    useEffect(() => {
        const handleEsc = ((e:KeyboardEvent) => {
            if(e.key === "Escape") onClose();
        })
        document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.documentElement.style.overflow = "";
        }
    },[onClose])
  return createPortal(
    // This div sits at the end of <body>
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

        {/* Clicking the backdrop closes the modal */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

         {/* Modal box */}
      <div 
        className="relative z-[101] max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the card itself
      >
        <button 
          onClick={onClose}
          className="absolute right-0 bg-black/50 text-white w-9 h-9 flex items-center justify-center hover:bg-black/70 transition"
        >
          ✕
        </button>
        
        <img 
          src={photo.urls.regular} 
          alt={photo.alt_description} 
          className="w-full max-h-[80vh] object-contain bg-gray-100"
        />
        
        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-900">{photo.user.name}</h2>
          <p className="text-gray-600 italic mt-1 line-clamp-2">{photo.alt_description || "No description"}</p>
          <div className="mt-4 flex items-center justify-between">
            <a 
              href={photo.links.html} 
              target="_blank" 
              className="text-blue-600 font-semibold hover:underline"
              onClick={(e) => e.stopPropagation()} >
              View on Unsplash
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body // Target container
  );
};

export default ImageModal
