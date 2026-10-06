import { useMemo, useState } from 'react'
import { Bell, ChevronRight, Menu, Plus, Search, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useWorkspace } from '../../contexts/WorkspaceContext'

const titles = {
  '/dashboard': 'Dashboard',
  '/tickets': 'Daftar tiket',
  '/tickets/create': 'Buat tiket',
  '/assignments': 'Penugasan',
  '/reports': 'Laporan',
  '/admin/spk': 'Konfigurasi SPK',
  '/admin/sla': 'Kebijakan SLA',
  '/admin/users': 'Pengguna & role',
  '/admin/master-data': 'Data master',
  '/admin/audit': 'Audit trail',
}

export function Topbar({ onMenu }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { tickets, user } = useWorkspace()
  const [searchOpen, setSearchOpen] = useState(false)
  const pathTitle = useMemo(
    () =>
      location.pathname.startsWith('/tickets/')
        ? 'Detail tiket'
        : titles[location.pathname] || 'Dashboard',
    [location.pathname],
  )
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" onClick={onMenu} aria-label="Buka navigasi">
        <Menu size={19} />
      </button>
      <div className="breadcrumbs">
        <span>Workspace</span>
        <ChevronRight size={14} />
        <strong>{pathTitle}</strong>
      </div>
      <div className="topbar-actions">
        {searchOpen && (
          <div className="top-search">
            <Search size={15} />
            <input
              autoFocus
              placeholder="Cari nomor tiket..."
              aria-label="Cari tiket"
              onKeyDown={(event) => {
                if (event.key === 'Enter' && event.currentTarget.value) {
                  const target = tickets.find((ticket) =>
                    ticket.id.toLowerCase().includes(event.currentTarget.value.toLowerCase()),
                  )
                  if (target) navigate(`/tickets/${target.id}`)
                }
              }}
            />
            <button
              className="icon-button"
              onClick={() => setSearchOpen(false)}
              aria-label="Tutup pencarian"
            >
              <X size={14} />
            </button>
          </div>
        )}
        <span className="today-label">Senin, 5 Oktober 2026</span>
        <button
          className="icon-button"
          onClick={() => setSearchOpen((open) => !open)}
          aria-label="Cari"
        >
          <Search size={18} />
        </button>
        <button className="icon-button notification-button" aria-label="Notifikasi">
          <Bell size={18} />
          <i />
        </button>
        {user?.role !== 'Manajemen' && (
          <button
            className="button button-primary button-new"
            onClick={() => navigate('/tickets/create')}
          >
            <Plus size={16} />
            Tiket baru
          </button>
        )}
      </div>
    </header>
  )
}
