//custom hook to fetch photos from unsplash
import { useState, useEffect, useCallback } from "react"
import type { UnsplashPhoto } from "../types/unsplash"
import { getNewPhotos } from "../api/api"

export const usePhotos = () => {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const perPage = 10; //photos per page

  const fetchPhotos = useCallback(async () => {
    setLoading(true)
    const response = await getNewPhotos(page, perPage);
    setPhotos(response.data);
    setLoading(false);
  }, [page])
  
  useEffect(() => {
    fetchPhotos();
  }, [])

  return { photos, loading, fetchPhotos}
}