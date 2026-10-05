import { ChevronLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useWorkspace } from '../contexts/WorkspaceContext'
import { PageHeading } from '../components/common/Badges'
import { TicketForm } from '../components/tickets/TicketForm'

export default function TicketCreatePage() {
  const { tickets, createTicket } = useWorkspace()
  const navigate = useNavigate()
  return <div className="page-content"><div className="detail-back"><Link to="/tickets"><ChevronLeft size={15} />Kembali ke daftar tiket</Link></div><PageHeading title="Buat tiket baru" description="Laporkan kendala atau permintaan layanan kepada tim support." /><TicketForm tickets={tickets} onSubmit={(input) => { const ticket = createTicket(input); navigate(`/tickets/${ticket.id}`) }} /></div>
}
