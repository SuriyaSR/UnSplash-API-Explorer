import type React from "react"
import { useEffect, useState } from "react"

interface ScrollToTopButtonProps {
    scrollContainerRef :  React.RefObject<HTMLDivElement | null>;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({scrollContainerRef}) => {
    
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if(!container) return;

    const handleScroll = () => {
        // Show button when scrolled down 300px
      setIsVisible(container.scrollTop > 300);
    }

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  },[scrollContainerRef])

  const scrollToTop = () => {
    scrollContainerRef?.current?.scrollTo({
        top:0,
        behavior:"smooth"
    })
  }

  if(!isVisible) return null;

  return (
    <button onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50"
        aria-label="Scroll to top">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>       
    </button>
  )
}

export default ScrollToTopButton
