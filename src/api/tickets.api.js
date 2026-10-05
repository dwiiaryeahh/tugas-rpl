import { apiClient } from './client'

export const ticketsApi = {
  list: (params) => apiClient.get('/tickets', { params }),
  get: (id) => apiClient.get(`/tickets/${id}`),
  create: (payload) => apiClient.post('/tickets', payload),
  update: (id, payload) => apiClient.patch(`/tickets/${id}`, payload),
  classify: (id, payload) => apiClient.patch(`/tickets/${id}/classification`, payload),
  changeStatus: (id, payload) => apiClient.post(`/tickets/${id}/status`, payload),
  addComment: (id, payload) => apiClient.post(`/tickets/${id}/comments`, payload),
  addWorklog: (id, payload) => apiClient.post(`/tickets/${id}/worklogs`, payload),
}
