import { useEffect } from "react"

export function useLockBodyScroll (isOpen:boolean){
    useEffect(() => {
        if(!isOpen) return;

        const prev = document.documentElement.style.overflow;
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.documentElement.style.overflow = prev;
        };
    }, [isOpen])
}
