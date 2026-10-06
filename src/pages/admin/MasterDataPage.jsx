import { useState } from 'react'
import { BriefcaseBusiness, Plus, Search, Trash2 } from 'lucide-react'
import { useWorkspace } from '../../contexts/WorkspaceContext'
import { ConfirmDialog, Modal } from '../../components/common/Modal'
import { EmptyState, PageHeading } from '../../components/common/Badges'

export default function MasterDataPage() {
  const { master, updateMaster } = useWorkspace()
  const [tab, setTab] = useState(Object.keys(master)[0])
  const [query, setQuery] = useState('')
  const [dialog, setDialog] = useState(null)
  const [error, setError] = useState('')
  const values = master[tab] || []
  const filtered = values.filter((value) => value.toLowerCase().includes(query.toLowerCase()))
  function addValue(event) {
    event.preventDefault()
    const value = String(new FormData(event.currentTarget).get('value') || '').trim()
    if (value.length < 2) {
      setError('Nilai minimal 2 karakter.')
      return
    }
    if (values.some((item) => item.toLowerCase() === value.toLowerCase())) {
      setError('Data ini sudah tersedia.')
      return
    }
    updateMaster(tab, [...values, value])
    setDialog(null)
    setError('')
  }
  function removeValue(value) {
    updateMaster(
      tab,
      values.filter((item) => item !== value),
    )
    setDialog(null)
  }
  return (
    <div className="page-content">
      <PageHeading
        title="Data master"
        description="Atur kategori, layanan, lokasi, aset, dan tim support."
        actions={
          <button
            className="button button-primary"
            onClick={() => {
              setError('')
              setDialog({ type: 'add' })
            }}
          >
            <Plus size={15} />
            Tambah {tab.toLowerCase()}
          </button>
        }
      />
      <section className="master-layout">
        <nav className="panel master-tabs" aria-label="Jenis data master">
          {Object.keys(master).map((item) => (
            <button
              key={item}
              className={tab === item ? 'selected' : ''}
              onClick={() => {
                setTab(item)
                setQuery('')
              }}
            >
              <BriefcaseBusiness size={15} />
              {item}
              <span>{master[item].length}</span>
            </button>
          ))}
        </nav>
        <section className="panel master-content">
          <div className="master-toolbar">
            <div>
              <h2>{tab}</h2>
              <p>Kelola nilai yang digunakan pada klasifikasi tiket.</p>
            </div>
            <div className="search-field">
              <Search size={15} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Cari ${tab.toLowerCase()}...`}
                aria-label={`Cari ${tab.toLowerCase()}`}
              />
            </div>
          </div>
          {filtered.length ? (
            <div className="master-list">
              {filtered.map((value, index) => (
                <div className="master-row" key={value}>
                  <span className="master-code">
                    {tab.slice(0, 2).toUpperCase()}-{String(index + 1).padStart(2, '0')}
                  </span>
                  <strong>{value}</strong>
                  <span className="active-state">
                    <i />
                    Aktif
                  </span>
                  <button
                    className="icon-button delete-button"
                    aria-label={`Hapus ${value}`}
                    onClick={() => setDialog({ type: 'delete', value })}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Data tidak ditemukan"
              description="Coba ubah kata pencarian atau tambahkan nilai master baru."
              action={
                <button
                  className="button button-secondary"
                  onClick={() => setDialog({ type: 'add' })}
                >
                  Tambah {tab.toLowerCase()}
                </button>
              }
            />
          )}
          <div className="master-foot">
            {values.length} nilai tersedia · perubahan dicatat pada audit trail
          </div>
        </section>
      </section>
      {dialog?.type === 'add' && (
        <Modal
          title={`Tambah ${tab.toLowerCase()}`}
          description={`Tambahkan nilai baru untuk ${tab.toLowerCase()}.`}
          onClose={() => setDialog(null)}
        >
          <form className="dialog-form" onSubmit={addValue}>
            <label className="form-field">
              <span>
                Nama <b>*</b>
              </span>
              <input name="value" autoFocus required />
            </label>
            {error && <p className="form-error">{error}</p>}
            <div className="confirm-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setDialog(null)}
              >
                Batal
              </button>
              <button className="button button-primary">Tambah data</button>
            </div>
          </form>
        </Modal>
      )}
      {dialog?.type === 'delete' && (
        <ConfirmDialog
          title="Hapus data master?"
          description={
            `“${dialog.value}” dapat digunakan oleh tiket terdahulu. ` +
            'Penghapusan akan disimpan sebagai perubahan data lokal.'
          }
          confirmLabel="Hapus nilai"
          danger
          onCancel={() => setDialog(null)}
          onConfirm={() => removeValue(dialog.value)}
        />
      )}
    </div>
  )
}
