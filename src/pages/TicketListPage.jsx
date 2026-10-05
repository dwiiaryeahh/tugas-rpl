import { useMemo, useState } from 'react'
import { Download, Filter, RotateCcw, Search } from 'lucide-react'
import { useWorkspace } from '../contexts/WorkspaceContext'
import { PageHeading } from '../components/common/Badges'
import { TicketTable } from '../components/tickets/TicketTable'
import { ticketDate } from '../utils/dates'

const statuses = ['Baru', 'Dalam Penanganan', 'Menunggu Teknisi', 'Menunggu User', 'Selesai']
const priorities = ['Kritis', 'Tinggi', 'Sedang', 'Rendah']

function exportTickets(tickets) {
  const columns = ['Nomor tiket', 'Judul', 'Kategori', 'Prioritas', 'Skor SAW', 'Status', 'SLA', 'Penanggung jawab']
  const rows = tickets.map((ticket) => [ticket.id, ticket.title, ticket.category, ticket.priority, ticket.score ?? '', ticket.status, ticket.sla, ticket.assignee])
  const csv = [columns, ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a'); link.href = url; link.download = 'laporan-tiket.csv'; link.click(); URL.revokeObjectURL(url)
}

export default function TicketListPage() {
  const { tickets, user } = useWorkspace()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Semua kategori')
  const [priority, setPriority] = useState('Semua prioritas')
  const [status, setStatus] = useState('Semua status')
  const [assignee, setAssignee] = useState('Semua teknisi')
  const [sla, setSla] = useState('Semua SLA')
  const [fromDate, setFromDate] = useState('2026-10-01')
  const [toDate, setToDate] = useState('2026-10-05')
  const [sort, setSort] = useState('score')
  const visibleTickets = user?.role === 'Pelapor' ? tickets.filter((ticket) => ticket.requester === user.name) : user?.role === 'Teknisi' ? tickets.filter((ticket) => ticket.assignee === user.name) : tickets
  const categories = [...new Set(visibleTickets.map((ticket) => ticket.category))]
  const assignees = [...new Set(visibleTickets.map((ticket) => ticket.assignee))]
  const filtered = useMemo(() => {
    const result = visibleTickets.filter((ticket) => `${ticket.id} ${ticket.title} ${ticket.category} ${ticket.assignee}`.toLowerCase().includes(query.toLowerCase()) && (category === 'Semua kategori' || ticket.category === category) && (priority === 'Semua prioritas' || ticket.priority === priority) && (status === 'Semua status' || ticket.status === status) && (assignee === 'Semua teknisi' || ticket.assignee === assignee) && (sla === 'Semua SLA' || ticket.slaState === sla) && ticketDate(ticket) >= fromDate && ticketDate(ticket) <= toDate)
    return result.sort((a, b) => sort === 'score' ? (b.score || 0) - (a.score || 0) : sort === 'ticket' ? a.id.localeCompare(b.id) : sort === 'sla' ? Number.parseInt(a.sla) - Number.parseInt(b.sla) : a.created.localeCompare(b.created))
  }, [visibleTickets, query, category, priority, status, assignee, sla, sort, fromDate, toDate])
  function reset() { setQuery(''); setCategory('Semua kategori'); setPriority('Semua prioritas'); setStatus('Semua status'); setAssignee('Semua teknisi'); setSla('Semua SLA'); setFromDate('2026-10-01'); setToDate('2026-10-05') }
  const select = (label, value, set, options) => <label className="filter-select"><span>{label}</span><select value={value} onChange={(event) => set(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>
  return <div className="page-content"><PageHeading title="Daftar tiket" description="Cari dan pantau semua laporan layanan dari satu antrean." actions={<button className="button button-secondary" onClick={() => exportTickets(filtered)}><Download size={15} />Ekspor CSV</button>} /><section className="panel list-panel"><div className="list-toolbar"><div className="search-field"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nomor, judul, kategori, teknisi..." aria-label="Cari tiket" /></div><label className="sort-select"><span>Urutkan</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="score">Skor prioritas</option><option value="created">Waktu dibuat</option><option value="sla">Sisa SLA</option><option value="ticket">Nomor tiket</option></select></label></div><div className="filter-bar"><span className="filter-label"><Filter size={14} />Filter</span>{select('Kategori', category, setCategory, ['Semua kategori', ...categories])}{select('Prioritas', priority, setPriority, ['Semua prioritas', ...priorities])}{select('Status', status, setStatus, ['Semua status', ...statuses])}{select('Penanggung jawab', assignee, setAssignee, ['Semua teknisi', ...assignees])}{select('SLA', sla, setSla, ['Semua SLA', 'Aman', 'At Risk', 'Breached', 'Paused'])}<label className="filter-select"><span>Dari tanggal</span><input type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} /></label><label className="filter-select"><span>Sampai tanggal</span><input type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} /></label><button className="reset-filter" onClick={reset}><RotateCcw size={13} />Reset</button></div><TicketTable tickets={filtered} /><div className="table-pagination"><span>Menampilkan <strong>{filtered.length ? 1 : 0}–{filtered.length}</strong> dari <strong>{filtered.length}</strong> tiket · Halaman lokal, 25 per halaman</span><div><button disabled aria-label="Sebelumnya">‹</button><button className="current-page">1</button><button disabled aria-label="Berikutnya">›</button></div></div></section></div>
}
