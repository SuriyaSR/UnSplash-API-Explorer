import { useEffect, useState } from "react";

export function useDebounce (queryValue:string, delay:number) : string {

   const [debouncedValue, setDebouncedValue] = useState<string>("");
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
