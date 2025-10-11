import { useEffect, useState } from "react";

export function useDebounce <T> (queryValue:T, delay:number) : T {

   const [debouncedValue, setDebouncedValue] = useState<T>(queryValue);
    useEffect(() => {      
        const handler = setTimeout(() => {
           setDebouncedValue(queryValue);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [queryValue, delay]);
    
  return debouncedValue;
}
