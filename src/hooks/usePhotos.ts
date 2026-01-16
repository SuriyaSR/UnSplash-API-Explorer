//custom hook to fetch photos from unsplash
import { useState, useEffect, useCallback } from "react"
import type { UnsplashPhoto } from "../types/unsplash"
import { getNewPhotos, searchPhotos } from "../api/api"
import { PHOTOS_PER_PAGE } from "../config/constants";

const perPage = PHOTOS_PER_PAGE; //photos per page

export const usePhotos = () => {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true)
 
  const fetchPhotos = useCallback(async (pageNumber = 1, searchTerm="", isLoadMore=false) => {
    setLoading(true)
    try{
      if(searchTerm){
        const response = await searchPhotos(searchTerm, pageNumber, perPage) 
        const searchData = response.data;
        
        setHasMore(pageNumber < searchData.total_pages)

        if(isLoadMore){
          setPhotos(prev => {
            const combined = [...prev, ...searchData.results];
            const unique = Array.from(new Map(combined.map(p => [p.id, p])).values());
            return unique;
          });
        } else {
          setPhotos(searchData.results);
        }
      } else {
        const response = await getNewPhotos(pageNumber, perPage);
        const photos = response.data;
       setHasMore(photos.length === perPage)

        if(isLoadMore){
          setPhotos(prev => {
            const combined = [...prev, ...photos];
            const unique = Array.from(new Map(combined.map(p => [p.id, p])).values());
            return unique;
          });
        } else {
          setPhotos(photos);
        }

      }      
    } catch (err){
      if(!isLoadMore) setPhotos([]);
      setHasMore(false)
      console.log("error : ", err)
    } finally {
      setLoading(false);
    }    
  }, [])

  const loadMorePhotos = useCallback(() => {
    if(loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage)
    fetchPhotos(nextPage, searchQuery,true);
  }, [loading, hasMore, page, searchQuery, fetchPhotos])

  //useEffect to fetch photos when search query changes
  useEffect(() => {
    // Reset pagination on new search
    setPage(1);
    setHasMore(true);
    // setPhotos([]);

    if (searchQuery.trim()) {
      fetchPhotos(1, searchQuery);
    } else {
      fetchPhotos(1);
    }
  }, [searchQuery, fetchPhotos])

  return { photos, loading, fetchPhotos, searchQuery, setSearchQuery, loadMorePhotos, hasMore };
}