import { useMemo, useState } from 'react'
import { Activity, AlertCircle, Check, CircleHelp, History, Plus, RotateCcw } from 'lucide-react'
import { useWorkspace } from '../../contexts/WorkspaceContext'
import { ConfirmDialog } from '../../components/common/Modal'
import { PageHeading, PriorityBadge } from '../../components/common/Badges'

export default function SPKConfigurationPage() {
  const {
    criteria,
    saveCriteria,
    configVersion,
    thresholds: savedThresholds,
    saveThresholds: persistThresholds,
    user,
  } = useWorkspace()
  const [draft, setDraft] = useState(criteria)
  const [thresholds, setThresholds] = useState(savedThresholds)
  const [dialog, setDialog] = useState(null)
  const [notice, setNotice] = useState('')
  const total = useMemo(
    () => draft.reduce((sum, item) => sum + (item.active ? Number(item.weight || 0) : 0), 0),
    [draft],
  )
  const change = (index, patch) =>
    setDraft((old) =>
      old.map((item, position) => (position === index ? { ...item, ...patch } : item)),
    )
  function persist() {
    if (total !== 100) return
    saveCriteria(draft)
    setNotice(
      `Konfigurasi SPK-2026-${String(configVersion + 1).padStart(3, '0')} disimpan sebagai versi baru.`,
    )
    setDialog(null)
  }
  function saveThresholds() {
    if (!(
      thresholds.kritis > thresholds.tinggi &&
      thresholds.tinggi > thresholds.sedang &&
      thresholds.sedang >= 0
    )) {
      setNotice('Ambang harus berurutan: Kritis > Tinggi > Sedang.')
      return
    }
    persistThresholds(thresholds)
    setNotice('Ambang prioritas diperbarui. Perubahan dicatat ke audit trail.')
  }
  const readOnly = user?.role !== 'Administrator'
  return (
    <div className="page-content">
      <PageHeading
        title="Konfigurasi SPK"
        description="Kelola kriteria, bobot, ambang prioritas, dan versi perhitungan SAW."
        actions={
          !readOnly && (
            <button
              className="button button-primary"
              disabled={total !== 100}
              onClick={() => setDialog('activate')}
            >
              <Check size={15} />
              Aktifkan konfigurasi
            </button>
          )
        }
      />
      <div className="config-info">
        <div className="config-icon">
          <Activity size={19} />
        </div>
        <div>
          <strong>Simple Additive Weighting (SAW)</strong>
          <p>
            Hasil perhitungan produksi berasal dari backend. Aktivasi konfigurasi membuat versi baru
            dan tidak menimpa histori penilaian sebelumnya.
          </p>
        </div>
        <span className="version-badge">
          Aktif · SPK-2026-{String(configVersion).padStart(3, '0')}
        </span>
      </div>
      {readOnly && (
        <div className="audit-info">
          <CircleHelp size={15} />
          Anda memiliki akses baca. Perubahan konfigurasi hanya dapat dilakukan oleh Administrator.
        </div>
      )}
      <section className="panel config-panel">
        <div className="panel-heading">
          <div>
            <h2>Kriteria penilaian aktif</h2>
            <p>
              Jumlah bobot kriteria aktif wajib tepat 100% sebelum konfigurasi dapat diaktifkan.
            </p>
          </div>
          <div className={`weight-total ${total === 100 ? 'total-valid' : 'total-invalid'}`}>
            <strong>{total}%</strong>
            <span>dari 100%</span>
          </div>
        </div>
        <div className="table-scroll">
          <table className="config-table">
            <thead>
              <tr>
                <th>Kode</th>
                <th>Kriteria</th>
                <th>Tipe</th>
                <th>Bobot</th>
                <th>Skala</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {draft.map((item, index) => (
                <tr key={item.code}>
                  <td className="code-cell">{item.code}</td>
                  <td>
                    <strong>{item.name}</strong>
                  </td>
                  <td>
                    <select
                      disabled={readOnly}
                      className="type-select"
                      aria-label={`Tipe ${item.code}`}
                      value={item.type}
                      onChange={(event) => change(index, { type: event.target.value })}
                    >
                      <option>Benefit</option>
                      <option>Cost</option>
                    </select>
                  </td>
                  <td>
                    <label className="weight-input">
                      <input
                        disabled={readOnly}
                        type="number"
                        min="0"
                        max="100"
                        value={item.weight}
                        onChange={(event) =>
                          change(index, {
                            weight: event.target.value === '' ? '' : Number(event.target.value),
                          })
                        }
                        aria-label={`Bobot ${item.code}`}
                      />
                      <span>%</span>
                    </label>
                  </td>
                  <td>
                    <input
                      disabled={readOnly}
                      className="scale-input"
                      value={item.scale}
                      onChange={(event) => change(index, { scale: event.target.value })}
                      aria-label={`Skala ${item.code}`}
                    />
                  </td>
                  <td>
                    <label className="switch-label">
                      <input
                        disabled={readOnly}
                        type="checkbox"
                        checked={item.active}
                        onChange={() => setDialog({ type: 'toggle', index })}
                      />
                      <span>{item.active ? 'Aktif' : 'Nonaktif'}</span>
                    </label>
                  </td>
                  <td>
                    {!readOnly && (
                      <button
                        className="icon-button"
                        aria-label={`Reset ${item.code}`}
                        onClick={() => change(index, { weight: criteria[index]?.weight ?? 0 })}
                      >
                        <RotateCcw size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {total !== 100 && (
          <div className="inline-error">
            <AlertCircle size={14} />
            Total bobot saat ini {total}%. Konfigurasi lama tetap aktif sampai total menjadi 100%.
          </div>
        )}
        <div className="config-footnote">
          <CircleHelp size={15} />
          <span>
            <strong>Benefit</strong>: nilai lebih tinggi meningkatkan kontribusi.{' '}
            <strong>Cost</strong>: normalisasi terbalik agar nilai lebih rendah meningkatkan
            kontribusi.
          </span>
        </div>
        {!readOnly && (
          <div className="config-actions">
            <button className="button button-secondary" onClick={() => setDraft(criteria)}>
              Batalkan perubahan
            </button>
            <button
              className="button button-primary"
              disabled={total !== 100}
              onClick={() => setDialog('activate')}
            >
              Validasi dan aktifkan
            </button>
          </div>
        )}
      </section>
      <section className="panel threshold-card">
        <div className="panel-heading">
          <div>
            <h2>Ambang rekomendasi prioritas</h2>
            <p>Skor preferensi SAW dipetakan menjadi rekomendasi operasional.</p>
          </div>
        </div>
        <div className="threshold-editor">
          <label>
            <PriorityBadge value="Kritis" />
            <span>Skor minimum</span>
            <input
              disabled={readOnly}
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={thresholds.kritis}
              onChange={(event) =>
                setThresholds((value) => ({ ...value, kritis: Number(event.target.value) }))
              }
            />
          </label>
          <label>
            <PriorityBadge value="Tinggi" />
            <span>Skor minimum</span>
            <input
              disabled={readOnly}
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={thresholds.tinggi}
              onChange={(event) =>
                setThresholds((value) => ({ ...value, tinggi: Number(event.target.value) }))
              }
            />
          </label>
          <label>
            <PriorityBadge value="Sedang" />
            <span>Skor minimum</span>
            <input
              disabled={readOnly}
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={thresholds.sedang}
              onChange={(event) =>
                setThresholds((value) => ({ ...value, sedang: Number(event.target.value) }))
              }
            />
          </label>
          <label>
            <PriorityBadge value="Rendah" />
            <span>Di bawah ambang Sedang</span>
            <strong>&lt; {thresholds.sedang.toFixed(2)}</strong>
          </label>
          {!readOnly && (
            <button className="button button-secondary" onClick={saveThresholds}>
              Simpan ambang
            </button>
          )}
        </div>
      </section>
      <section className="panel version-panel">
        <div className="panel-heading">
          <div>
            <h2>
              <History size={15} />
              Riwayat konfigurasi
            </h2>
            <p>Versi yang digunakan untuk menghasilkan histori skor.</p>
          </div>
        </div>
        <div className="version-list">
          {[
            `SPK-2026-${String(configVersion).padStart(3, '0')}`,
            `SPK-2026-${String(Math.max(1, configVersion - 1)).padStart(3, '0')}`,
            'SPK-2026-002',
          ].map((version, index) => (
            <div key={`${version}-${index}`}>
              <span>
                <strong>{version}</strong>
                {index === 0 && <em>Aktif</em>}
              </span>
              <small>
                {index === 0 ? '5 Okt 2026 · Raka Aditya' : `${index + 2} Okt 2026 · Raka Aditya`}
              </small>
              <span>{index === 0 ? `${total}% bobot` : '100% bobot'}</span>
              <button
                className="text-link"
                onClick={() => setNotice(`Pratinjau konfigurasi ${version} (mode demo).`)}
              >
                Lihat detail
              </button>
            </div>
          ))}
        </div>
      </section>
      {notice && (
        <p role="status" className="inline-success">
          {notice}
        </p>
      )}
      {dialog === 'activate' && (
        <ConfirmDialog
          title="Aktifkan versi konfigurasi baru?"
          description={
            `Versi SPK-2026-${String(configVersion + 1).padStart(3, '0')} akan digunakan ` +
            'untuk perhitungan berikutnya. Hasil tiket terdahulu tetap terkait versi lama.'
          }
          confirmLabel="Aktifkan versi"
          onCancel={() => setDialog(null)}
          onConfirm={persist}
        />
      )}
      {dialog?.type === 'toggle' && (
        <ConfirmDialog
          title={draft[dialog.index].active ? 'Nonaktifkan kriteria?' : 'Aktifkan kriteria?'}
          description={
            'Perubahan status kriteria akan mengubah bobot aktif. ' +
            'Pastikan total bobot menjadi 100% sebelum aktivasi.'
          }
          confirmLabel={draft[dialog.index].active ? 'Nonaktifkan kriteria' : 'Aktifkan kriteria'}
          danger={draft[dialog.index].active}
          onCancel={() => setDialog(null)}
          onConfirm={() => {
            change(dialog.index, { active: !draft[dialog.index].active })
            setDialog(null)
          }}
        />
      )}
    </div>
  )
}
