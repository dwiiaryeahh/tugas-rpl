import { Activity, CircleHelp } from 'lucide-react'
import { PriorityBadge } from '../common/Badges'

const baseline = [
  {
    code: 'C1',
    label: 'Dampak bisnis / operasional',
    raw: 5,
    type: 'Benefit',
    weight: 30,
    normalized: '1.00',
    contribution: '0.300',
  },
  {
    code: 'C2',
    label: 'Urgensi waktu',
    raw: 5,
    type: 'Benefit',
    weight: 25,
    normalized: '1.00',
    contribution: '0.250',
  },
  {
    code: 'C3',
    label: 'Pengguna terdampak',
    raw: 4,
    type: 'Benefit',
    weight: 15,
    normalized: '0.80',
    contribution: '0.120',
  },
  {
    code: 'C4',
    label: 'Kritikalitas layanan / aset',
    raw: 4,
    type: 'Benefit',
    weight: 15,
    normalized: '0.80',
    contribution: '0.120',
  },
  {
    code: 'C5',
    label: 'Kedekatan deadline SLA',
    raw: 4,
    type: 'Benefit',
    weight: 10,
    normalized: '0.80',
    contribution: '0.080',
  },
  {
    code: 'C6',
    label: 'Ketersediaan workaround',
    raw: 2,
    type: 'Cost',
    weight: 5,
    normalized: '1.00',
    contribution: '0.054',
  },
]

export function PriorityBreakdown({ ticket }) {
  return (
    <section className="panel detail-section">
      <div className="section-heading">
        <div>
          <h2>Perhitungan prioritas SAW</h2>
          <p>Konfigurasi {ticket.configVersion || 'belum ditetapkan'} · Nilai contoh</p>
        </div>
        <button className="icon-button" aria-label="Informasi perhitungan">
          <CircleHelp size={17} />
        </button>
      </div>
      {ticket.score == null ? (
        <div className="pending-score">
          <Activity size={18} />
          <span>
            <strong>Menunggu perhitungan prioritas</strong>
            <small>Skor dan rekomendasi akan diisi oleh layanan SAW.</small>
          </span>
        </div>
      ) : (
        <>
          <div className="saw-table">
            <div className="saw-row saw-head">
              <span>Kriteria · Tipe</span>
              <span>Raw</span>
              <span>Bobot</span>
              <span>Normalisasi</span>
              <span>Kontribusi</span>
            </div>
            {baseline.map((item) => (
              <div className="saw-row" key={item.code}>
                <span>
                  <strong>{item.code}</strong> {item.label} <small>{item.type}</small>
                </span>
                <span>{item.raw}/5</span>
                <span>{item.weight}%</span>
                <span>{item.normalized}</span>
                <span>{item.contribution}</span>
              </div>
            ))}
            <div className="saw-total">
              <span>Total skor SAW</span>
              <strong>{ticket.score.toFixed(3)}</strong>
            </div>
          </div>
          <div className="saw-explainer">
            <Activity size={15} />
            <span>
              Skor dan urutan ini merupakan <strong>contoh hasil backend</strong>. Sistem produksi
              menghitung ulang seluruh tiket aktif ketika data atau bobot berubah.
            </span>
          </div>
        </>
      )}
      <div className="priority-summary">
        <div>
          <span>Rekomendasi sistem</span>
          <PriorityBadge value={ticket.recommendedPriority || ticket.priority} />
        </div>
        <div>
          <span>Prioritas operasional</span>
          <PriorityBadge value={ticket.priority} />
        </div>
        <div>
          <span>Versi konfigurasi</span>
          <strong>{ticket.configVersion || 'Belum tersedia'}</strong>
        </div>
      </div>
    </section>
  )
}
