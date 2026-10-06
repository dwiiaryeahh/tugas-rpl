import { createContext, useContext, useMemo, useState } from 'react'
import {
  seedAudit,
  seedCriteria,
  seedMaster,
  seedPolicies,
  seedTickets,
  seedUsers,
} from '../data/seed'

const WorkspaceContext = createContext(null)

export function WorkspaceProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('prioritas-demo-user'))
    } catch {
      return null
    }
  })
  const [tickets, setTickets] = useState(seedTickets)
  const [criteria, setCriteria] = useState(seedCriteria)
  const [users, setUsers] = useState(seedUsers)
  const [audit, setAudit] = useState(seedAudit)
  const [policies, setPolicies] = useState(seedPolicies)
  const [thresholds, setThresholds] = useState({ kritis: 0.85, tinggi: 0.7, sedang: 0.5 })
  const [slaSettings, setSlaSettings] = useState({
    riskPercent: 25,
    pauseWhenPending: true,
    escalations: {
      critical: true,
      responseRisk: true,
      responseBreach: true,
      resolutionRisk: true,
      resolutionBreach: true,
    },
  })
  const [master, setMaster] = useState(seedMaster)
  const [configVersion, setConfigVersion] = useState(4)

  const record = (action, description, ticket = '—') =>
    setAudit((old) => [
      {
        id: `AUD-${6025 + old.length}`,
        action,
        description,
        actor: user?.name || 'Raka Aditya',
        role: user?.role || 'Supervisor',
        time: new Date().toLocaleString('id-ID'),
        ticket,
      },
      ...old,
    ])
  const login = (nextUser) => {
    setUser(nextUser)
    localStorage.setItem('prioritas-demo-user', JSON.stringify(nextUser))
    setAudit((old) => [
      {
        id: `AUD-${6025 + old.length}`,
        action: 'LOGIN',
        description: `Login ke workspace sebagai ${nextUser.role}`,
        actor: nextUser.name,
        role: nextUser.role,
        time: new Date().toLocaleString('id-ID'),
        ticket: '—',
      },
      ...old,
    ])
  }
  const logout = () => {
    localStorage.removeItem('prioritas-demo-user')
    setUser(null)
  }
  const createTicket = (input) => {
    const id = `TKT-2026-${String(185 + tickets.length - seedTickets.length).padStart(4, '0')}`
    const ticket = {
      ...input,
      id,
      priority: 'Menunggu penilaian',
      recommendedPriority: 'Menunggu penilaian',
      score: null,
      status: 'Baru',
      sla: 'Menunggu',
      slaState: 'Aman',
      assignee: 'Belum ditugaskan',
      team: '—',
      created: 'Baru saja',
      requester: user?.name || 'Anda',
      timeline: [{ event: 'Tiket dibuat', actor: user?.name || 'Anda', at: 'Baru saja' }],
      comments: [],
      worklogs: [],
      configVersion: `SPK-2026-${String(configVersion).padStart(3, '0')}`,
    }
    setTickets((old) => [ticket, ...old])
    record('CREATE_TICKET', `Tiket baru dibuat · ${id}`, id)
    return ticket
  }
  const updateTicket = (id, patch, action = 'UPDATE_TICKET', description = '') => {
    setTickets((old) =>
      old.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              ...patch,
              timeline: description
                ? [
                    { event: description, actor: user?.name || 'Anda', at: 'Baru saja' },
                    ...ticket.timeline,
                  ]
                : ticket.timeline,
            }
          : ticket,
      ),
    )
    record(action, description || `Tiket ${id} diperbarui`, id)
  }
  const addComment = (id, comment) => {
    const ticket = tickets.find((item) => item.id === id)
    updateTicket(
      id,
      {
        comments: [
          ...(ticket?.comments || []),
          { ...comment, author: user?.name || 'Anda', at: 'Baru saja' },
        ],
        timeline: [
          { event: 'Komentar ditambahkan', actor: user?.name || 'Anda', at: 'Baru saja' },
          ...(ticket?.timeline || []),
        ],
      },
      'ADD_COMMENT',
      `Komentar ${comment.visibility.toLowerCase()} ditambahkan · ${id}`,
    )
  }
  const addWorklog = (id, worklog) => {
    const ticket = tickets.find((item) => item.id === id)
    updateTicket(
      id,
      {
        worklogs: [
          ...(ticket?.worklogs || []),
          { ...worklog, author: user?.name || 'Anda', at: 'Baru saja' },
        ],
        timeline: [
          {
            event: `Worklog ditambahkan · ${worklog.duration || 'durasi tidak dicatat'}`,
            actor: user?.name || 'Anda',
            at: 'Baru saja',
          },
          ...(ticket?.timeline || []),
        ],
      },
      'ADD_WORKLOG',
      `Worklog ditambahkan · ${id}`,
    )
  }
  const saveCriteria = (next) => {
    setCriteria(next)
    setConfigVersion((v) => v + 1)
    record('UPDATE_WEIGHT', 'Konfigurasi kriteria SPK diubah')
  }
  const saveThresholds = (next) => {
    setThresholds(next)
    record('UPDATE_THRESHOLD', 'Ambang prioritas diperbarui')
  }
  const saveSlaConfiguration = ({ nextPolicies, nextSettings }) => {
    setPolicies(nextPolicies)
    setSlaSettings(nextSettings)
    record('UPDATE_SLA_POLICY', 'Kebijakan, pause rule, dan eskalasi SLA diperbarui')
  }
  const addUser = (next) => {
    setUsers((old) => [
      { ...next, id: Date.now(), status: 'Aktif', lastSeen: 'Belum pernah' },
      ...old,
    ])
    record('USER_CREATE', `Akun ${next.name} dibuat`)
  }
  const updateUser = (id, patch) => {
    const target = users.find((item) => item.id === id)
    setUsers((old) => old.map((item) => (item.id === id ? { ...item, ...patch } : item)))
    record('USER_UPDATE', `Akun ${target?.name || id} diperbarui`)
  }
  const updateMaster = (key, value) => {
    setMaster((old) => ({ ...old, [key]: value }))
    record('MASTER_DATA_UPDATE', `Data master ${key.toLowerCase()} diperbarui`)
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      tickets,
      createTicket,
      updateTicket,
      addComment,
      addWorklog,
      criteria,
      saveCriteria,
      configVersion,
      thresholds,
      saveThresholds,
      users,
      addUser,
      updateUser,
      audit,
      policies,
      slaSettings,
      saveSlaConfiguration,
      master,
      updateMaster,
      record,
    }),
    [
      user,
      tickets,
      criteria,
      configVersion,
      thresholds,
      users,
      audit,
      policies,
      slaSettings,
      master,
    ],
  )
  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext)
  if (!context) throw new Error('useWorkspace must be used inside WorkspaceProvider')
  return context
}
