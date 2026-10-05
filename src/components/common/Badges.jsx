export function PriorityBadge({ value }) {
  const safe = value || 'Rendah'
  const slug = safe.toLowerCase().replaceAll(' ', '-')
  return <span className={`badge priority-${slug}`}><i />{safe}</span>
}

export function StatusBadge({ value }) {
  const labels = { Baru: 'status-new', 'Dalam Penanganan': 'status-progress', 'Menunggu Teknisi': 'status-waiting', 'Menunggu User': 'status-waiting', 'Selesai': 'status-neutral', 'Ditutup': 'status-neutral', 'At Risk': 'sla-risk', 'Aman': 'sla-safe', 'Breached': 'sla-breached', 'Paused': 'sla-paused' }
  return <span className={`badge status-badge ${labels[value] || 'status-neutral'}`}><i />{value}</span>
}

export function PageHeading({ title, description, actions }) {
  return <div className="page-heading"><div><h1>{title}</h1><p>{description}</p></div>{actions && <div className="heading-actions">{actions}</div>}</div>
}

export function MetricCard({ icon: Icon, label, value, change, tone = 'plain' }) {
  return <article className={`metric metric-${tone}`}><div className="metric-top"><span>{label}</span><span className="metric-icon"><Icon size={16} /></span></div><div className="metric-value">{value}</div><div className="metric-foot"><span className="metric-change">{change}</span></div></article>
}

export function EmptyState({ title, description, action }) {
  return <div className="empty-state"><strong>{title}</strong><p>{description}</p>{action}</div>
}
