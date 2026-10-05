import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  headers: { Accept: 'application/json' },
  timeout: 15000,
})

apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('prioritas-access-token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject({
    code: error.response?.data?.error?.code || 'NETWORK_ERROR',
    message: error.response?.data?.error?.message || 'Layanan belum dapat dihubungi.',
    status: error.response?.status,
    details: error.response?.data?.error?.details,
  }),
)
