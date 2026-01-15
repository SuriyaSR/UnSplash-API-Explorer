import axios from "axios"
import type { UnsplashPhoto, UnsplashSearchResponse } from "../types/unsplash";

const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

if (!API_KEY) {
  throw new Error(
    '❌ Missing VITE_UNSPLASH_ACCESS_KEY\n' +
    'Please create a .env file with:\n' +
    'VITE_UNSPLASH_ACCESS_KEY=your_access_key'
  );
}

export const api = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${API_KEY}`,
  },
})

export const getNewPhotos = (page: number, perPage: number) => {
  return api.get<UnsplashPhoto[]>('/photos', {
    params: {
      page,
      per_page: perPage,
    },
  })
}

export const searchPhotos = (query: string, page: number, perPage: number) => {
  return api.get<UnsplashSearchResponse>('/search/photos', {
    params: {
      query,
      page,
      per_page: perPage,
    },
  })
}