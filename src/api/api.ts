import axios from "axios"

export const api = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
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