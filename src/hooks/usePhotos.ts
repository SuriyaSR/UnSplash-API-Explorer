//custom hook to fetch photos from unsplash
import { useState, useEffect, useCallback, useRef } from "react"
import type { UnsplashPhoto } from "../types/unsplash"
import { getNewPhotos, searchPhotos } from "../api/api"
import { PHOTOS_PER_PAGE } from "../config/constants";

const perPage = PHOTOS_PER_PAGE;

function dedupe(arr: UnsplashPhoto[]) {
  return Array.from(
    new Map(arr.map(p => [p.id, p])).values()
  );
}

export const usePhotos = () => {
  const requestIdRef = useRef(0);
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true)
 
  const fetchPhotos = useCallback(async (pageNumber = 1, searchTerm="", isLoadMore=false) => {
    const requestId = ++requestIdRef.current;

    if (!isLoadMore) setLoading(true);
    
    try{
      if(searchTerm.trim()){
        const response = await searchPhotos(searchTerm, pageNumber, perPage);
        if (requestId !== requestIdRef.current) return;
        const searchData = response.data;        
        setHasMore(pageNumber < searchData.total_pages)
        const newPhotos = searchData.results;

        setPhotos(prev => 
          isLoadMore ? dedupe([...prev, ...newPhotos]) : newPhotos
        );
        
      } else {
        const response = await getNewPhotos(pageNumber, perPage);

        if (requestId !== requestIdRef.current) return;

        const newPhotos = response.data;
        setHasMore(newPhotos.length === perPage)

        setPhotos(prev =>
            isLoadMore
              ? dedupe([...prev, ...newPhotos])
              : newPhotos
          );
      }      
    } catch (err){
      if(!isLoadMore) setPhotos([]);
      setHasMore(false)
      console.log("error :", err) 
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

    if (searchQuery.trim()) {
      fetchPhotos(1, searchQuery);
    } else {
      fetchPhotos(1);
    }
  }, [searchQuery, fetchPhotos])

  return { photos, loading, fetchPhotos, searchQuery, setSearchQuery, loadMorePhotos, hasMore };
}