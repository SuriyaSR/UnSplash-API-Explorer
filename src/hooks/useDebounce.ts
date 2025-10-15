import { useEffect, useRef, useState } from "react";

export function useDebounce (queryValue:string, delay:number) : string {

   const [debouncedValue, setDebouncedValue] = useState<string>("");
   const isFirstRender = useRef(true);
    useEffect(() => {      
      // On first render, set immediately without delay
      if (isFirstRender.current) {
        isFirstRender.current = false;
        setDebouncedValue(queryValue);
        return;
      }

      // On subsequent renders, use debounce
      const handler = setTimeout(() => {
          setDebouncedValue(queryValue);
      }, delay);

      return () => {
          clearTimeout(handler);
      };
    }, [queryValue, delay]);
    
  return debouncedValue;
}
