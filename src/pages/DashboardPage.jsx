import { Activity, AlertCircle, Clock3, Download, ShieldAlert, Ticket } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useWorkspace } from '../contexts/WorkspaceContext'
import { MetricCard, PageHeading } from '../components/common/Badges'
import { PriorityDistribution } from '../components/dashboard/PriorityDistribution'
import { TicketTrend } from '../components/dashboard/TicketTrend'
import { TicketTable } from '../components/tickets/TicketTable'

export default function DashboardPage() {
  const { tickets, user } = useWorkspace()
  const navigate = useNavigate()
  const visibleTickets = user?.role === 'Pelapor' ? tickets.filter((ticket) => ticket.requester === user.name) : user?.role === 'Teknisi' ? tickets.filter((ticket) => ticket.assignee === user.name) : tickets
  const active = visibleTickets.filter((ticket) => !['Selesai', 'Ditutup', 'Dibatalkan'].includes(ticket.status))
  const critical = active.filter((ticket) => ticket.priority === 'Kritis')
  const atRisk = active.filter((ticket) => ticket.slaState === 'At Risk')
  const breached = visibleTickets.filter((ticket) => ticket.slaState === 'Breached')
  return <div className="page-content"><PageHeading title="Dashboard" description="Pantau antrean layanan, prioritas, dan SLA tim hari ini." actions={<button className="button button-secondary" onClick={() => window.print()}><Download size={15} />Ekspor ringkasan</button>} /><section className="metric-grid" aria-label="Ringkasan tiket"><MetricCard icon={Ticket} label="Tiket aktif · sampel" value={String(active.length)} change="Data lokal pratinjau" /><MetricCard icon={ShieldAlert} label="Prioritas kritis" value={String(critical.length)} change="Efektif saat ini" tone="critical" /><MetricCard icon={Clock3} label="SLA at risk" value={String(atRisk.length)} change="Mendekati batas waktu" tone="warning" /><MetricCard icon={AlertCircle} label="Melewati SLA" value={String(breached.length)} change="Histori breach tersimpan" tone="danger" /></section><section className="dashboard-middle"><TicketTrend /><PriorityDistribution tickets={active} /></section><section className="panel priority-panel"><div className="panel-heading"><div><h2>Perlu ditangani lebih dahulu</h2><p>Tiket contoh diurutkan menggunakan skor prioritas yang tersedia.</p></div><button className="text-link" onClick={() => navigate('/tickets')}>Lihat seluruh tiket <span aria-hidden="true">→</span></button></div><TicketTable tickets={[...active].sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 5)} showRank /></section><section className="dashboard-notes"><Activity size={14} /><span>Skor SAW, ranking, dan nilai SLA pada halaman ini berasal dari data contoh. Perhitungan produksi akan dilakukan oleh backend.</span></section></div>
}
