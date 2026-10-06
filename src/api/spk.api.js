import { apiClient } from './client'

export const spkApi = {
  configuration: () => apiClient.get('/spk/configuration'),
  saveConfiguration: (payload) => apiClient.post('/spk/configuration', payload),
  calculate: (ticketId) => apiClient.post(`/spk/tickets/${ticketId}/calculate`),
  ranking: (params) => apiClient.get('/spk/ranking', { params }),
  overridePriority: (ticketId, payload) =>
    apiClient.post(`/spk/tickets/${ticketId}/override`, payload),
}
