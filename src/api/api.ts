import axios from "axios"

const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const api = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${API_KEY}`,
  },
})

export const getNewPhotos = (page: number, perPage: number) => {
  return api.get('/photos', {
    params: {
      page,
      per_page: perPage,
    },
  })
}

export const searchPhotos = (query: string, page: number, perPage: number) => {
  return api.get('/search/photos', {
    params: {
      query,
      page,
      per_page: perPage,
    },
  })
}