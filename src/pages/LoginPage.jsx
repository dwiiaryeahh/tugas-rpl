import { useState } from 'react'
import { Activity, AlertCircle, ArrowRight, Command, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { roles } from '../data/seed'
import { useWorkspace } from '../contexts/WorkspaceContext'

export default function LoginPage() {
  const { login } = useWorkspace()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [role, setRole] = useState('Supervisor')
  const [attempts, setAttempts] = useState(0)
  const [locked, setLocked] = useState(false)
  function submit(event) {
    event.preventDefault(); const data = new FormData(event.currentTarget); const email = String(data.get('email') || '').trim(); const password = String(data.get('password') || '')
    if (!email || !password) { setError('Email dan kata sandi wajib diisi.'); return }
    if (locked) { setError('Terlalu banyak percobaan. Silakan coba lagi dalam 30 detik.'); return }
    if (password.toLowerCase() === 'wrong' || email.toLowerCase().includes('inactive')) { const next = attempts + 1; setAttempts(next); setError(email.toLowerCase().includes('inactive') ? 'Akun ini sedang nonaktif. Hubungi administrator.' : 'Email atau kata sandi tidak sesuai.'); if (next >= 5) { setLocked(true); window.setTimeout(() => { setLocked(false); setAttempts(0) }, 30000) } return }
    login({ name: email.split('@')[0].split(/[._-]/).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' '), email, role }); navigate('/dashboard')
  }
  return <main className="login-shell"><div className="login-brand"><div className="brand-mark"><Command size={20} /></div><div><strong>prioritas</strong><span>Service Desk</span></div></div><div className="login-layout"><section className="login-intro"><div className="login-icon"><Activity size={20} /></div><h1>Semua laporan,<br /><span>satu prioritas.</span></h1><p>Kelola tiket, pantau SLA, dan lihat rekomendasi penanganan dalam satu ruang kerja.</p><div className="login-benefits"><span><ShieldCheck size={15} />Histori tindakan tercatat</span><span><Activity size={15} />Prioritas dapat dijelaskan</span></div></section><section className="login-panel"><div className="login-panel-heading"><h2>Masuk ke workspace</h2><p>Gunakan akun demo untuk menjelajahi antarmuka.</p></div><form onSubmit={submit}><label className="form-field"><span>Email / username <b>*</b></span><input name="email" type="email" autoComplete="username" defaultValue="raka.aditya@nusantara.co.id" required /></label><label className="form-field"><span>Kata sandi <b>*</b></span><input name="password" type="password" autoComplete="current-password" defaultValue="prioritas-demo" required /><small>Mode pratinjau frontend menerima kredensial non-kosong.</small></label><label className="form-field"><span>Jelajahi sebagai</span><select value={role} onChange={(event) => setRole(event.target.value)}>{roles.map((item) => <option key={item}>{item}</option>)}</select></label>{error && <div className="form-error"><AlertCircle size={15} />{error}</div>}<button className="button button-primary login-submit" disabled={locked}>Masuk <ArrowRight size={15} /></button></form><button className="forgot-link" onClick={() => setError('Atur ulang kata sandi akan tersedia setelah layanan autentikasi aktif.')}>Lupa kata sandi?</button><div className="demo-note">Antarmuka pratinjau · Perubahan tersimpan sementara di browser</div></section></div><footer className="login-footer">Prioritas Service Desk <span>·</span> Nusantara Digital <span>·</span> 2026</footer></main>
}
