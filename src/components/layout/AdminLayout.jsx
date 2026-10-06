import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function AdminLayout() {
  const [open, setOpen] = useState(false)
  return (
    <div className="app-shell">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <main className="main-area">
        <Topbar onMenu={() => setOpen(true)} />
        <Outlet />
        <footer className="page-footer">
          <span>Prioritas Service Desk · Mode demo frontend</span>
          <span>Data contoh untuk pratinjau</span>
        </footer>
      </main>
    </div>
  )
}
