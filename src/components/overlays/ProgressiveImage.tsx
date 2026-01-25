import { useEffect, useState } from "react";

type imageProps = {
    smallSrc:string;
    largeSrc: string;
    altDesc: string
}

const ProgressiveImage = ({smallSrc, largeSrc, altDesc} : imageProps) => {
    const[isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(false);
    }, [largeSrc]);
    
  return (
        <div className="relative w-full h-[80vh] bg-gray-100">
        {/* Skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}

        {/* Fast preview image (blurred) */}
        <img
          src={smallSrc}
          alt={altDesc}
          className={`absolute inset-0 w-full h-full object-contain blur-md scale-105 transition-opacity duration-300 ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* High quality image (fade in) */}
        <img
          src={largeSrc}
          alt={altDesc}
          onLoad={() => setIsLoaded(true)}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
  )
}

export default ProgressiveImage
