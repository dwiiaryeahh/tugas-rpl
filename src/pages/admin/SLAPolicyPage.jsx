import { useState } from 'react'
import { AlertTriangle, BellRing, Clock3, Pause, Plus, Save } from 'lucide-react'
import { useWorkspace } from '../../contexts/WorkspaceContext'
import { Modal, ConfirmDialog } from '../../components/common/Modal'
import { PageHeading, PriorityBadge } from '../../components/common/Badges'

export default function SLAPolicyPage() {
  const { policies, saveSlaConfiguration, slaSettings } = useWorkspace()
  const [draft, setDraft] = useState(policies)
  const [riskThreshold, setRiskThreshold] = useState(slaSettings.riskPercent)
  const [pausePending, setPausePending] = useState(slaSettings.pauseWhenPending)
  const [escalations, setEscalations] = useState(slaSettings.escalations)
  const [dialog, setDialog] = useState(null)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const update = (index, patch) =>
    setDraft((old) =>
      old.map((item, position) => (position === index ? { ...item, ...patch } : item)),
    )
  function save() {
    if (
      draft.some(
        (item) =>
          item.response <= 0 || item.resolution <= 0 || item.response >= item.resolution * 60,
      )
    ) {
      setNotice('Periksa kembali batas response dan resolution SLA setiap prioritas.')
      return
    }
    saveSlaConfiguration({
      nextPolicies: draft,
      nextSettings: { riskPercent: riskThreshold, pauseWhenPending: pausePending, escalations },
    })
    setNotice('Kebijakan SLA disimpan dan dicatat ke audit trail.')
  }
  function createPolicy(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('service') || '').trim()
    const priority = data.get('priority')
    const response = Number(data.get('response'))
    const resolution = Number(data.get('resolution'))
    if (!name || response <= 0 || resolution <= 0) {
      setError('Isi layanan dan durasi SLA yang valid.')
      return
    }
    setDraft((old) => [
      ...old,
      { priority, response, resolution, unit: 'jam', service: name, active: true },
    ])
    setDialog(null)
    setError('')
    setNotice('Kebijakan layanan baru ditambahkan ke draft.')
  }
  const toggles = [
    ['critical', 'Tiket prioritas Kritis dibuat'],
    ['responseRisk', 'Response SLA mendekati batas'],
    ['responseBreach', 'Response SLA terlewati'],
    ['resolutionRisk', 'Resolution SLA mendekati batas'],
    ['resolutionBreach', 'Resolution SLA terlewati'],
  ]
  return (
    <div className="page-content">
      <PageHeading
        title="Kebijakan SLA"
        description="Atur target response, resolution, pause, dan eskalasi tiket."
        actions={
          <button className="button button-primary" onClick={save}>
            <Save size={15} />
            Simpan kebijakan
          </button>
        }
      />
      <div className="sla-kpi-strip">
        <div>
          <Clock3 size={17} />
          <span>
            <strong>Response time</strong>
            <small>Waktu tanggapan pertama</small>
          </span>
        </div>
        <div>
          <AlertTriangle size={17} />
          <span>
            <strong>Resolution time</strong>
            <small>Waktu hingga tiket selesai</small>
          </span>
        </div>
        <div>
          <Pause size={17} />
          <span>
            <strong>Pause rule</strong>
            <small>Dapat berhenti saat menunggu user</small>
          </span>
        </div>
      </div>
      <section className="panel config-panel">
        <div className="panel-heading">
          <div>
            <h2>Target SLA berdasarkan prioritas</h2>
            <p>Durasi response menggunakan menit; resolution menggunakan jam.</p>
          </div>
          <button
            className="button button-secondary"
            onClick={() => {
              setError('')
              setDialog('add')
            }}
          >
            <Plus size={14} />
            Tambah layanan
          </button>
        </div>
        <div className="table-scroll">
          <table className="config-table sla-policy-table">
            <thead>
              <tr>
                <th>Prioritas</th>
                <th>Layanan</th>
                <th>Response SLA</th>
                <th>Resolution SLA</th>
                <th>Jadwal</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {draft.map((policy, index) => (
                <tr key={`${policy.priority}-${policy.service || 'all'}`}>
                  <td>
                    <PriorityBadge value={policy.priority} />
                  </td>
                  <td>{policy.service || 'Semua layanan'}</td>
                  <td>
                    <label className="duration-input">
                      <input
                        type="number"
                        min="1"
                        value={policy.response}
                        onChange={(event) =>
                          update(index, { response: Number(event.target.value) })
                        }
                        aria-label={`Response SLA ${policy.priority}`}
                      />
                      <span>menit</span>
                    </label>
                  </td>
                  <td>
                    <label className="duration-input">
                      <input
                        type="number"
                        min="1"
                        value={policy.resolution}
                        onChange={(event) =>
                          update(index, { resolution: Number(event.target.value) })
                        }
                        aria-label={`Resolution SLA ${policy.priority}`}
                      />
                      <span>jam</span>
                    </label>
                  </td>
                  <td>
                    <select className="schedule-select" defaultValue="24×7">
                      <option>24×7</option>
                      <option>Jam kerja</option>
                      <option>Hari kerja</option>
                    </select>
                  </td>
                  <td>
                    <label className="switch-label">
                      <input
                        type="checkbox"
                        checked={policy.active}
                        onChange={() => setDialog({ type: 'toggle', index })}
                      />
                      <span>{policy.active ? 'Aktif' : 'Nonaktif'}</span>
                    </label>
                  </td>
                  <td>
                    <button
                      className="text-link"
                      onClick={() => setNotice(`Kebijakan ${policy.priority} siap diedit.`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <div className="sla-settings-grid">
        <section className="panel setting-card">
          <div className="setting-heading">
            <div className="setting-icon">
              <Clock3 size={16} />
            </div>
            <div>
              <h2>Indikator at-risk</h2>
              <p>Tandai SLA mendekati batas sebelum deadline.</p>
            </div>
          </div>
          <label className="setting-input">
            <span>Jika waktu tersisa kurang dari</span>
            <span>
              <input
                type="number"
                min="1"
                max="90"
                value={riskThreshold}
                onChange={(event) => setRiskThreshold(Number(event.target.value))}
              />
              % dari target
            </span>
          </label>
          <p className="setting-help">
            Status berubah menjadi At Risk saat sisa waktu di bawah ambang ini.
          </p>
        </section>
        <section className="panel setting-card">
          <div className="setting-heading">
            <div className="setting-icon">
              <Pause size={16} />
            </div>
            <div>
              <h2>Pause SLA</h2>
              <p>Atur perilaku timer ketika tiket menunggu.</p>
            </div>
          </div>
          <label className="toggle-row">
            <span>
              <strong>Jeda saat status Menunggu User</strong>
              <small>Timer dilanjutkan saat tiket dibuka kembali.</small>
            </span>
            <input
              type="checkbox"
              checked={pausePending}
              onChange={(event) => setPausePending(event.target.checked)}
            />
          </label>
        </section>
      </div>
      <section className="panel setting-card escalation-card">
        <div className="setting-heading">
          <div className="setting-icon">
            <BellRing size={16} />
          </div>
          <div>
            <h2>Aturan eskalasi</h2>
            <p>Pilih kondisi yang membuat supervisor mendapat peringatan.</p>
          </div>
        </div>
        <div className="escalation-grid">
          {toggles.map(([key, label]) => (
            <label className="toggle-row" key={key}>
              <span>
                <strong>{label}</strong>
                <small>
                  {key.includes('Breach') || key.includes('breach')
                    ? 'Catat breach dan beri notifikasi supervisor.'
                    : 'Buat event timeline dan tampilkan indikator.'}
                </small>
              </span>
              <input
                type="checkbox"
                checked={escalations[key]}
                onChange={(event) =>
                  setEscalations((old) => ({ ...old, [key]: event.target.checked }))
                }
              />
            </label>
          ))}
        </div>
      </section>
      <section className="sla-policy-note">
        <AlertTriangle size={15} />
        <span>
          Policy yang ditampilkan adalah contoh. Nilai final, kalender kerja, dan notifikasi
          memerlukan layanan backend serta keputusan organisasi.
        </span>
      </section>
      {notice && (
        <p className="inline-success" role="status">
          {notice}
        </p>
      )}
      {dialog?.type === 'toggle' && (
        <ConfirmDialog
          title={
            draft[dialog.index].active ? 'Nonaktifkan kebijakan SLA?' : 'Aktifkan kebijakan SLA?'
          }
          description="Kebijakan yang sudah tercatat tetap tersedia pada histori tiket."
          confirmLabel={draft[dialog.index].active ? 'Nonaktifkan' : 'Aktifkan'}
          onCancel={() => setDialog(null)}
          onConfirm={() => {
            update(dialog.index, { active: !draft[dialog.index].active })
            setDialog(null)
          }}
        />
      )}
      {dialog === 'add' && (
        <Modal
          title="Tambah kebijakan layanan"
          description="Tambahkan target SLA khusus untuk sebuah layanan."
          onClose={() => setDialog(null)}
        >
          <form className="dialog-form" onSubmit={createPolicy}>
            <label className="form-field">
              <span>
                Layanan <b>*</b>
              </span>
              <select name="service" defaultValue="" required>
                <option value="" disabled>
                  Pilih layanan
                </option>
                {[
                  'Payment Gateway',
                  'HRIS',
                  'Finance Portal',
                  'Akses Jaringan',
                  'Print Service',
                ].map((service) => (
                  <option key={service}>{service}</option>
                ))}
              </select>
            </label>
            <label className="form-field">
              <span>
                Prioritas <b>*</b>
              </span>
              <select name="priority">
                {['Kritis', 'Tinggi', 'Sedang', 'Rendah'].map((priority) => (
                  <option key={priority}>{priority}</option>
                ))}
              </select>
            </label>
            <div className="form-row">
              <label className="form-field">
                <span>Response (menit)</span>
                <input type="number" name="response" min="1" defaultValue="30" />
              </label>
              <label className="form-field">
                <span>Resolution (jam)</span>
                <input type="number" name="resolution" min="1" defaultValue="4" />
              </label>
            </div>
            {error && <p className="form-error">{error}</p>}
            <div className="confirm-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setDialog(null)}
              >
                Batal
              </button>
              <button className="button button-primary">Tambah kebijakan</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
