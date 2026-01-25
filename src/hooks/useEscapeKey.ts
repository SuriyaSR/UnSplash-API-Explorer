import { useEffect } from "react";

export function useEscapeKey(onClose: ()=> void, isOpen:boolean){
    useEffect(() => {
        if(!isOpen) return;
        
        const handleEsc = (e:KeyboardEvent) => {
            if(e.key === "Escape") 
                onClose();
        }

        document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("keydown", handleEsc);
        }
    }, [onClose, isOpen])
}