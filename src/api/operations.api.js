import { apiClient } from './client'

export const assignmentApi = {
  workload: () => apiClient.get('/assignments/workload'),
  assign: (ticketId, payload) => apiClient.post(`/tickets/${ticketId}/assignments`, payload),
  reassign: (ticketId, payload) => apiClient.post(`/tickets/${ticketId}/reassignments`, payload),
}

export const slaApi = {
  policies: () => apiClient.get('/sla/policies'),
  savePolicy: (payload) => apiClient.post('/sla/policies', payload),
  ticketStatus: (ticketId) => apiClient.get(`/sla/tickets/${ticketId}`),
}

export const reportsApi = {
  summary: (params) => apiClient.get('/reports/summary', { params }),
  export: (format, params) =>
    apiClient.get(`/reports/export/${format}`, { params, responseType: 'blob' }),
}

export const adminApi = {
  users: (params) => apiClient.get('/admin/users', { params }),
  audit: (params) => apiClient.get('/admin/audit', { params }),
  masterData: (type) => apiClient.get(`/admin/master-data/${type}`),
}
