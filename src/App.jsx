import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from './components/layout/AdminLayout'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import TicketListPage from './pages/TicketListPage'
import TicketCreatePage from './pages/TicketCreatePage'
import TicketDetailPage from './pages/TicketDetailPage'
import AssignmentBoardPage from './pages/AssignmentBoardPage'
import ReportsPage from './pages/ReportsPage'
import SPKConfigurationPage from './pages/admin/SPKConfigurationPage'
import SLAPolicyPage from './pages/admin/SLAPolicyPage'
import UserManagementPage from './pages/admin/UserManagementPage'
import MasterDataPage from './pages/admin/MasterDataPage'
import AuditPage from './pages/admin/AuditPage'
import { GuestOnlyRoute, ProtectedRoute, RoleGate } from './router/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route element={<GuestOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/tickets"
            element={
              <RoleGate roles={['Pelapor', 'Helpdesk', 'Teknisi', 'Supervisor', 'Administrator']}>
                <TicketListPage />
              </RoleGate>
            }
          />
          <Route
            path="/tickets/create"
            element={
              <RoleGate roles={['Pelapor', 'Helpdesk', 'Teknisi', 'Supervisor', 'Administrator']}>
                <TicketCreatePage />
              </RoleGate>
            }
          />
          <Route
            path="/tickets/:id"
            element={
              <RoleGate roles={['Pelapor', 'Helpdesk', 'Teknisi', 'Supervisor', 'Administrator']}>
                <TicketDetailPage />
              </RoleGate>
            }
          />
          <Route
            path="/assignments"
            element={
              <RoleGate roles={['Helpdesk', 'Teknisi', 'Supervisor', 'Administrator']}>
                <AssignmentBoardPage />
              </RoleGate>
            }
          />
          <Route
            path="/reports"
            element={
              <RoleGate roles={['Helpdesk', 'Teknisi', 'Supervisor', 'Administrator', 'Manajemen']}>
                <ReportsPage />
              </RoleGate>
            }
          />
          <Route
            path="/admin/spk"
            element={
              <RoleGate roles={['Helpdesk', 'Supervisor', 'Administrator']}>
                <SPKConfigurationPage />
              </RoleGate>
            }
          />
          <Route
            path="/admin/sla"
            element={
              <RoleGate roles={['Supervisor', 'Administrator']}>
                <SLAPolicyPage />
              </RoleGate>
            }
          />
          <Route
            path="/admin/users"
            element={
              <RoleGate roles={['Administrator']}>
                <UserManagementPage />
              </RoleGate>
            }
          />
          <Route
            path="/admin/master-data"
            element={
              <RoleGate roles={['Administrator']}>
                <MasterDataPage />
              </RoleGate>
            }
          />
          <Route
            path="/admin/audit"
            element={
              <RoleGate roles={['Supervisor', 'Administrator']}>
                <AuditPage />
              </RoleGate>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>
    </Routes>
  )
}
