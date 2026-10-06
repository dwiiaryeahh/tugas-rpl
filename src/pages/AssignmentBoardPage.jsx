import { useMemo, useState } from 'react'
import { Activity, Gauge, Ticket, UsersRound } from 'lucide-react'
import { useWorkspace } from '../contexts/WorkspaceContext'
import { MetricCard, PageHeading } from '../components/common/Badges'
import { Modal } from '../components/common/Modal'
import { TicketTable } from '../components/tickets/TicketTable'

export default function AssignmentBoardPage() {
  const { tickets, updateTicket, users, user } = useWorkspace()
  const [target, setTarget] = useState(null)
  const [error, setError] = useState('')
  const unassigned = useMemo(
    () =>
      tickets
        .filter(
          (ticket) =>
            ticket.assignee === 'Belum ditugaskan' &&
            !['Selesai', 'Ditutup', 'Dibatalkan'].includes(ticket.status),
        )
        .sort((a, b) => (b.score || 0) - (a.score || 0)),
    [tickets],
  )
  const assigned = tickets.filter(
    (ticket) =>
      ticket.assignee !== 'Belum ditugaskan' &&
      !['Selesai', 'Ditutup', 'Dibatalkan'].includes(ticket.status),
  )
  const technicians = users.filter(
    (member) => ['Teknisi', 'Helpdesk'].includes(member.role) && member.status === 'Aktif',
  )
  function submit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const reason = String(data.get('reason') || '').trim()
    if (reason.length < 5) {
      setError('Alasan assignment minimal 5 karakter.')
      return
    }
    const technician = data.get('technician')
    const member = users.find((user) => user.name === technician)
    updateTicket(
      target.id,
      {
        assignee: technician,
        team: member?.team || 'IT Support',
        status: target.status === 'Baru' ? 'Dalam Penanganan' : target.status,
        assignmentReason: reason,
      },
      target.assignee === 'Belum ditugaskan' ? 'ASSIGN_TICKET' : 'REASSIGN_TICKET',
      `Tiket ${target.assignee === 'Belum ditugaskan' ? 'ditugaskan' : 'dialihkan'} kepada ${technician} · ${reason}`,
    )
    setTarget(null)
    setError('')
  }
  const canAssign = ['Helpdesk', 'Supervisor', 'Administrator'].includes(user?.role)
  return (
    <div className="page-content">
      <PageHeading
        title="Penugasan"
        description="Distribusikan antrean berdasarkan prioritas, keahlian, dan beban teknisi."
      />
      <section className="metric-grid assignment-summary">
        <MetricCard
          icon={Ticket}
          label="Belum ditugaskan"
          value={String(unassigned.length)}
          change="Diurutkan menurut skor prioritas"
          tone="warning"
        />
        <MetricCard
          icon={UsersRound}
          label="Teknisi aktif"
          value={String(technicians.length)}
          change="Akun aktif pada data contoh"
        />
        <MetricCard
          icon={Gauge}
          label="Tiket ditugaskan"
          value={String(assigned.length)}
          change="Beban aktif pada data contoh"
        />
      </section>
      <section className="panel list-panel">
        <div className="panel-heading">
          <div>
            <h2>Antrean belum ditugaskan</h2>
            <p>Prioritas efektif dan SLA menentukan urutan penanganan.</p>
          </div>
        </div>
        <TicketTable tickets={unassigned} onAction={canAssign ? setTarget : undefined} />
      </section>
      <section className="panel team-panel">
        <div className="panel-heading">
          <div>
            <h2>Beban tim hari ini</h2>
            <p>Jumlah tiket aktif pada setiap anggota support.</p>
          </div>
          <span className="team-count">{technicians.length} anggota</span>
        </div>
        <div className="team-grid">
          {technicians.map((member, index) => {
            const load = assigned.filter((ticket) => ticket.assignee === member.name).length
            return (
              <div className="team-member" key={member.id}>
                <i className={`avatar avatar-${['blue', 'peach', 'green', 'purple'][index % 4]}`}>
                  {member.name
                    .split(' ')
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join('')}
                </i>
                <span>
                  <strong>{member.name}</strong>
                  <small>{member.team}</small>
                </span>
                <div className="load-track">
                  <i style={{ width: `${Math.min(load * 18, 100)}%` }} />
                </div>
                <b className="load-count">{load} tiket</b>
              </div>
            )
          })}
        </div>
      </section>
      <section className="assignment-rule">
        <Activity size={14} />
        <span>
          Penugasan di halaman ini hanya mengubah data lokal pratinjau. Beban operasional aktual
          akan dihitung dari assignment aktif melalui backend.
        </span>
      </section>
      {target && (
        <Modal
          title={target.assignee === 'Belum ditugaskan' ? 'Tugaskan tiket' : 'Alihkan penugasan'}
          description={`${target.id} · ${target.title}`}
          onClose={() => setTarget(null)}
        >
          <form className="dialog-form" onSubmit={submit}>
            <label className="form-field">
              <span>
                Teknisi / tim tujuan <b>*</b>
              </span>
              <select name="technician" defaultValue="" required>
                <option value="" disabled>
                  Pilih teknisi
                </option>
                {technicians.map((member) => (
                  <option key={member.id}>{member.name}</option>
                ))}
              </select>
            </label>
            <div className="assignment-load-note">
              <Gauge size={14} />
              Beban tiket saat ini akan ditampilkan setelah layanan data aktif.
            </div>
            <label className="form-field">
              <span>
                Alasan <b>*</b>
              </span>
              <textarea
                name="reason"
                rows="3"
                placeholder="Keahlian, distribusi beban, atau konteks lain..."
              />
            </label>
            {error && <p className="form-error">{error}</p>}
            <div className="confirm-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setTarget(null)}
              >
                Batal
              </button>
              <button className="button button-primary">Simpan assignment</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
