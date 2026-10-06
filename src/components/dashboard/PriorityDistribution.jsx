import { PriorityBadge } from '../common/Badges'

const priorities = ['Kritis', 'Tinggi', 'Sedang', 'Rendah']
export function PriorityDistribution({ tickets }) {
  const counts = priorities.map(
    (priority) => tickets.filter((ticket) => ticket.priority === priority).length,
  )
  const total = counts.reduce((sum, value) => sum + value, 0) || 1
  const angle1 = (counts[0] / total) * 100
  const angle2 = angle1 + (counts[1] / total) * 100
  const angle3 = angle2 + (counts[2] / total) * 100
  return (
    <section className="panel distribution-panel">
      <div className="panel-heading">
        <div>
          <h2>Distribusi prioritas</h2>
          <p>Tiket aktif berdasarkan prioritas efektif</p>
        </div>
      </div>
      <div className="donut-wrap">
        <div
          className="donut"
          style={{
            '--critical': `${angle1}%`,
            '--high': `${angle2 - angle1}%`,
            '--medium': `${angle3 - angle2}%`,
          }}
        >
          <div>
            <strong>{total}</strong>
            <span>tiket contoh</span>
          </div>
        </div>
      </div>
      <div className="distribution-legend">
        {priorities.map((priority, index) => (
          <div key={priority}>
            <span>
              <i className={`legend-dot priority-dot-${index}`} />
              <PriorityBadge value={priority} />
            </span>
            <strong>{counts[index]}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}
