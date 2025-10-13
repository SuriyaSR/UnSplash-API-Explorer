//custom hook to fetch photos from unsplash
import { useState, useEffect, useCallback } from "react"
import type { UnsplashPhoto } from "../types/unsplash"
import { getNewPhotos, searchPhotos } from "../api/api"
import { useDebounce } from "./useDebounce"

const perPage = 20; //photos per page

export const usePhotos = () => {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
 

  const debouncedSearchQuery =  useDebounce(searchQuery, 1000);

  const fetchPhotos = useCallback(async (pageNumber = 1, searchTerm="") => {
    setLoading(true)
    try{
      const response = searchTerm 
        ? await searchPhotos(searchTerm, pageNumber, perPage) 
        : await getNewPhotos(pageNumber, perPage);
      const data = searchTerm ? response.data.results : response.data;
      setPhotos(data);
    } catch (err){
      setPhotos([]);
      console.warn("error : ", err)
    } finally {
      setLoading(false);
    }    
  }, [])

  //useEffect to fetch photos when search query changes
  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      fetchPhotos(1, debouncedSearchQuery);
    } else {
      fetchPhotos(1);
    }
  }, [debouncedSearchQuery, fetchPhotos])

  return { photos, loading, fetchPhotos, searchQuery, setSearchQuery };
}