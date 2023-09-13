import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL || 'http://localhost:8000/api/v1/',
})
