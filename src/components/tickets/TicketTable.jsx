import { Clock3, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PriorityBadge, StatusBadge } from '../common/Badges'

function getSlaClassName(slaState) {
  const stateClass = {
    'At Risk': 'sla-warning',
    Breached: 'sla-breached-text',
  }[slaState]

  return ['sla-value', stateClass].filter(Boolean).join(' ')
}

export function TicketTable({ tickets, showRank = false, onAction }) {
  const navigate = useNavigate()
  return (
    <div className="table-scroll">
      <table className="ticket-table">
        <thead>
          <tr>
            {showRank && <th className="rank-col">#</th>}
            <th>Nomor tiket & judul</th>
            <th>Kategori</th>
            <th>Prioritas efektif</th>
            <th>Skor SAW</th>
            <th>Status</th>
            <th>Sisa SLA</th>
            <th>Penanggung jawab</th>
            <th>Dibuat</th>
            {onAction && <th aria-label="Aksi" />}
          </tr>
        </thead>
        <tbody>
          {tickets.length ? (
            tickets.map((ticket, index) => (
              <tr
                key={ticket.id}
                onClick={() => navigate(`/tickets/${ticket.id}`)}
                tabIndex="0"
                onKeyDown={(event) => event.key === 'Enter' && navigate(`/tickets/${ticket.id}`)}
              >
                {showRank && <td className="rank-cell">{String(index + 1).padStart(2, '0')}</td>}
                <td>
                  <button
                    className="ticket-title-cell"
                    onClick={(event) => {
                      event.stopPropagation()
                      navigate(`/tickets/${ticket.id}`)
                    }}
                  >
                    <strong>{ticket.id}</strong>
                    <span>{ticket.title}</span>
                  </button>
                </td>
                <td>{ticket.category}</td>
                <td>
                  <PriorityBadge value={ticket.priority} />
                </td>
                <td>
                  <strong className="score-value">
                    {ticket.score == null ? '—' : ticket.score.toFixed(3)}
                  </strong>
                </td>
                <td>
                  <StatusBadge value={ticket.status} />
                </td>
                <td>
                  <span className={getSlaClassName(ticket.slaState)}>
                    <Clock3 size={13} />
                    {ticket.sla}
                  </span>
                </td>
                <td>
                  <span className="assignee">
                    <i className="avatar avatar-blue">
                      {ticket.assignee === 'Belum ditugaskan'
                        ? '—'
                        : ticket.assignee
                            .split(' ')
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join('')}
                    </i>
                    {ticket.assignee}
                  </span>
                </td>
                <td>{ticket.created}</td>
                {onAction && (
                  <td>
                    <button
                      className="icon-button row-action"
                      aria-label={`Aksi ${ticket.id}`}
                      onClick={(event) => {
                        event.stopPropagation()
                        onAction(ticket)
                      }}
                    >
                      <MoreHorizontal size={17} />
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="empty-row">
                Tidak ada tiket yang sesuai filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
