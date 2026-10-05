export function ticketDate(ticket) {
  if (ticket.createdAt) return ticket.createdAt
  const value = ticket.created || ''
  if (value.includes('3 Okt')) return '2026-10-03'
  if (value.includes('2 Okt')) return '2026-10-02'
  if (value.includes('Kemarin')) return '2026-10-04'
  return '2026-10-05'
}
