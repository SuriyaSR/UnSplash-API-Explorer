//custom hook to fetch photos from unsplash
import { useState, useEffect, useCallback } from "react"
import type { UnsplashPhoto } from "../types/unsplash"
import { getNewPhotos, searchPhotos } from "../api/api"
import { useDebounce } from "./useDebounce"

export const usePhotos = () => {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const perPage = 20; //photos per page

  const debouncedSearchQuery =  useDebounce<string>(searchQuery, 1000);

  const fetchPhotos = useCallback(async (pageNumber = 1, searchTerm="") => {
    setLoading(true)
    const response = searchTerm ? await searchPhotos(searchTerm, pageNumber, perPage) : await getNewPhotos(pageNumber, perPage);
    const data = searchTerm ? response.data.results : response.data;
    setPhotos(data);
    setLoading(false);
  }, [])
  
  useEffect(() => {
    fetchPhotos(1);
  }, [])

  //useeffect to fetch photos when search query changes
  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      fetchPhotos(1, debouncedSearchQuery);
    } else {
      // If query cleared, reload default
      fetchPhotos(1);
    }
  }, [debouncedSearchQuery])

  return { photos, loading, fetchPhotos, searchQuery, setSearchQuery };
}