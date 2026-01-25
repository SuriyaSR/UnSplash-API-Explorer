import { createPortal } from 'react-dom';
import { type UnsplashPhoto } from '../../types/unsplash';
import { AnimatePresence, motion } from "framer-motion";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import ProgressiveImage from "./ProgressiveImage";

interface ModalProps {
  photo: UnsplashPhoto;
  onClose: () => void;
}

const ImageModal = ({ photo, onClose }: ModalProps) => {

  const isOpen = !!photo;

  useLockBodyScroll(isOpen);
  useEscapeKey(onClose, isOpen);

  return createPortal(

     <AnimatePresence>
      <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>

        {/* Clicking the backdrop closes the modal */}
        <motion.div
          className="absolute inset-0 bg-black/40"
          onClick={onClose}
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{ willChange: "opacity, backdrop-filter" }}
        />

         {/* Modal box */}
      <motion.div 
        className="relative z-[101] max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}>
        <button 
          onClick={onClose}
          className="absolute right-0 bg-black/50 text-white w-9 h-9 flex items-center justify-center hover:bg-black/70 transition"
        > ✕ </button>
        
        <ProgressiveImage 
          smallSrc={photo.urls.small}
          largeSrc={photo.urls.regular}
          altDesc={photo.alt_description || "Unsplash photo"}/>
        
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
      </motion.div>
    </motion.div>
    </AnimatePresence>,
    document.body // Target container
  );
};

export default ImageModal
