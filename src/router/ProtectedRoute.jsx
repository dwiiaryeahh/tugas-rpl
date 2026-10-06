import { Link, Navigate, Outlet } from 'react-router-dom'
import { useWorkspace } from '../contexts/WorkspaceContext'

export function ProtectedRoute() {
  const { user } = useWorkspace()
  return user ? <Outlet /> : <Navigate to="/login" replace />
}

export function GuestOnlyRoute() {
  const { user } = useWorkspace()
  return user ? <Navigate to="/dashboard" replace /> : <Outlet />
}

export function RoleGate({ roles, children }) {
  const { user } = useWorkspace()
  if (roles.includes(user?.role)) return children
  return (
    <div className="page-content">
      <section className="panel permission-denied">
        <h1>Akses tidak tersedia</h1>
        <p>Role {user?.role} tidak memiliki izin untuk membuka fitur ini.</p>
        <Link className="button button-secondary" to="/dashboard">
          Kembali ke dashboard
        </Link>
      </section>
    </div>
  )
}
