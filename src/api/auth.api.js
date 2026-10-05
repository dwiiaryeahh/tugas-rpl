import { apiClient } from './client'

export const authApi = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  refresh: (refreshToken) => apiClient.post('/auth/refresh', { refresh_token: refreshToken }),
  logout: () => apiClient.post('/auth/logout'),
}
