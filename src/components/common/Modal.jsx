import { X } from 'lucide-react'

export function Modal({ title, description, onClose, children, wide = false }) {
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className={`modal ${wide ? 'modal-wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="modal-header">
          <div>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Tutup dialog">
            <X size={19} />
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}

export function ConfirmDialog({
  title,
  description,
  confirmLabel = 'Konfirmasi',
  danger = false,
  onCancel,
  onConfirm,
}) {
  return (
    <Modal title={title} description={description} onClose={onCancel}>
      <div className="confirm-actions">
        <button className="button button-secondary" onClick={onCancel}>
          Batal
        </button>
        <button
          className={`button ${danger ? 'button-danger' : 'button-primary'}`}
          onClick={onConfirm}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
