import axios from "axios"
import type { UnsplashPhoto, UnsplashSearchResponse, Topic, Filters } from "../types/unsplash";

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

export const getTopics = (perPage: number = 20) => {
  return api.get<Topic[]>('/topics', {
     params: {
      per_page: perPage,
    },
  })
}

export const getNewPhotos = (page: number = 1, perPage: number = 30) => {
  return api.get<UnsplashPhoto[]>('/photos', {
    params: { page, per_page: perPage },
  })
}

export const getPhotosByTopic = (topic: string, page: number = 1, perPage: number = 30, filters?: Filters) => {
  return api.get<UnsplashPhoto[]>(`/topics/${topic}/photos`, {
    params: {
      page,
      per_page: perPage,
      ...(filters?.orientation && { orientation: filters.orientation }),
      order_by: filters?.topicOrderBy ?? "latest",
    },
  })
}

export const searchPhotos = (query: string, page: number = 1, perPage: number = 30, filters?:Filters) => {
  return api.get<UnsplashSearchResponse>('/search/photos', {
    params: {
      query,
      page,
      per_page: perPage,
      ...(filters?.orientation && {orientation: filters.orientation}),
      ...(filters?.color && { color: filters.color }),
     order_by: filters?.searchOrderBy ?? "relevant",
    },
  })
}