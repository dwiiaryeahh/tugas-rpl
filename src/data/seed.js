export const seedTickets = [
  { id: 'TKT-2026-0184', title: 'Sistem pembayaran tidak dapat memproses transaksi', description: 'Transaksi dari aplikasi kasir gagal diproses sejak pagi. Tim finance tidak dapat menutup transaksi harian.', category: 'Aplikasi Bisnis', subcategory: 'Transaksi', service: 'Payment Gateway', asset: 'PAY-CORE-01', location: 'Kantor Pusat · Jakarta', priority: 'Kritis', recommendedPriority: 'Kritis', score: 0.924, status: 'Dalam Penanganan', sla: '00:42', slaState: 'At Risk', assignee: 'Dimas Pratama', team: 'IT Support', created: '09:14', requester: 'Rani Kusuma', impact: 5, urgency: 5, affectedUsers: 48, workaround: 2, responseDeadline: '09:29', resolutionDeadline: '11:14', configVersion: 'SPK-2026-004', timeline: [{ event: 'Tiket dibuat', actor: 'Rani Kusuma', at: '09:14' }, { event: 'Perhitungan SAW · Kritis', actor: 'Sistem', at: '09:14' }, { event: 'Ditugaskan ke Dimas Pratama', actor: 'Raka Aditya', at: '09:22' }], comments: [{ author: 'Dimas Pratama', text: 'Sedang memeriksa log payment gateway.', at: '09:36', visibility: 'Internal' }], worklogs: [] },
  { id: 'TKT-2026-0181', title: 'VPN kantor cabang Bandung sering terputus', description: 'Koneksi VPN terputus berkala dan mengganggu akses ke aplikasi operasional.', category: 'Jaringan', subcategory: 'VPN', service: 'Akses Jaringan', asset: 'RTR-BDG-02', location: 'Cabang Bandung', priority: 'Tinggi', recommendedPriority: 'Tinggi', score: 0.817, status: 'Menunggu Teknisi', sla: '01:18', slaState: 'At Risk', assignee: 'Ayu Lestari', team: 'Network Support', created: '08:46', requester: 'Bima Saputra', impact: 4, urgency: 4, affectedUsers: 16, workaround: 3, responseDeadline: '09:16', resolutionDeadline: '12:46', configVersion: 'SPK-2026-004', timeline: [{ event: 'Tiket dibuat', actor: 'Bima Saputra', at: '08:46' }, { event: 'Ditugaskan ke Ayu Lestari', actor: 'Helpdesk', at: '09:02' }], comments: [], worklogs: [] },
  { id: 'TKT-2026-0179', title: 'Permintaan akses modul laporan keuangan', description: 'Mohon akses baca ke modul laporan keuangan untuk kebutuhan rekonsiliasi bulanan.', category: 'Akses & Akun', subcategory: 'Hak akses', service: 'Finance Portal', asset: '—', location: 'Kantor Pusat · Jakarta', priority: 'Sedang', recommendedPriority: 'Sedang', score: 0.643, status: 'Baru', sla: '03:26', slaState: 'Aman', assignee: 'Belum ditugaskan', team: '—', created: '08:21', requester: 'Nadia Putri', impact: 3, urgency: 3, affectedUsers: 1, workaround: 4, configVersion: 'SPK-2026-004', timeline: [{ event: 'Tiket dibuat', actor: 'Nadia Putri', at: '08:21' }], comments: [], worklogs: [] },
  { id: 'TKT-2026-0176', title: 'Printer lantai 3 tidak terdeteksi dari jaringan', description: 'Printer bersama tidak muncul pada daftar printer pengguna lantai 3.', category: 'Perangkat', subcategory: 'Printer', service: 'Print Service', asset: 'PRN-JKT-03', location: 'Kantor Pusat · Jakarta', priority: 'Sedang', recommendedPriority: 'Sedang', score: 0.584, status: 'Dalam Penanganan', sla: '04:05', slaState: 'Aman', assignee: 'Fajar Ramadhan', team: 'IT Support', created: 'Kemarin', requester: 'Intan Permata', impact: 3, urgency: 3, affectedUsers: 12, workaround: 4, configVersion: 'SPK-2026-004', timeline: [{ event: 'Tiket dibuat', actor: 'Intan Permata', at: 'Kemarin' }, { event: 'Status diperbarui · Dalam Penanganan', actor: 'Fajar Ramadhan', at: '08:02' }], comments: [], worklogs: [] },
  { id: 'TKT-2026-0172', title: 'Pembaruan data karyawan pada sistem HRIS', description: 'Data unit kerja dan atasan pada profil karyawan belum sesuai struktur terbaru.', category: 'Aplikasi Bisnis', subcategory: 'Data karyawan', service: 'HRIS', asset: '—', location: 'Cabang Surabaya', priority: 'Rendah', recommendedPriority: 'Rendah', score: 0.392, status: 'Menunggu User', sla: '12:40', slaState: 'Aman', assignee: 'Dimas Pratama', team: 'IT Support', created: 'Kemarin', requester: 'Rizky Maulana', impact: 2, urgency: 2, affectedUsers: 1, workaround: 5, configVersion: 'SPK-2026-004', timeline: [{ event: 'Tiket dibuat', actor: 'Rizky Maulana', at: 'Kemarin' }, { event: 'Menunggu informasi tambahan', actor: 'Dimas Pratama', at: '08:10' }], comments: [], worklogs: [] },
  { id: 'TKT-2026-0168', title: 'Laptop tidak terhubung ke proyektor ruang rapat', description: 'Laptop rapat tidak mendeteksi proyektor melalui kabel HDMI.', category: 'Perangkat', subcategory: 'Laptop', service: 'Meeting Room AV', asset: 'AV-JKT-07', location: 'Kantor Pusat · Jakarta', priority: 'Rendah', recommendedPriority: 'Rendah', score: 0.318, status: 'Baru', sla: '18:12', slaState: 'Aman', assignee: 'Belum ditugaskan', team: '—', created: 'Kemarin', requester: 'Siti Rahma', impact: 2, urgency: 2, affectedUsers: 5, workaround: 5, configVersion: 'SPK-2026-004', timeline: [{ event: 'Tiket dibuat', actor: 'Siti Rahma', at: 'Kemarin' }], comments: [], worklogs: [] },
  { id: 'TKT-2026-0164', title: 'Aplikasi inventaris lambat saat menyimpan barang', description: 'Penyimpanan data inventaris membutuhkan waktu lebih dari satu menit.', category: 'Aplikasi Bisnis', subcategory: 'Performa', service: 'Inventory', asset: 'INV-APP-01', location: 'Kantor Pusat · Jakarta', priority: 'Tinggi', recommendedPriority: 'Tinggi', score: 0.739, status: 'Menunggu User', sla: '00:00', slaState: 'Breached', assignee: 'Maya Wulandari', team: 'Application Support', created: '3 Okt', requester: 'Dewi Anggraini', impact: 4, urgency: 4, affectedUsers: 32, workaround: 2, configVersion: 'SPK-2026-003', timeline: [{ event: 'Tiket dibuat', actor: 'Dewi Anggraini', at: '3 Okt' }, { event: 'SLA resolusi terlewati', actor: 'Sistem', at: '4 Okt' }], comments: [], worklogs: [] },
  { id: 'TKT-2026-0159', title: 'Reset password akun portal pemasok', description: 'Akun portal pemasok terkunci setelah beberapa kali gagal login.', category: 'Akses & Akun', subcategory: 'Reset password', service: 'Vendor Portal', asset: '—', location: 'Kantor Pusat · Jakarta', priority: 'Rendah', recommendedPriority: 'Rendah', score: 0.281, status: 'Selesai', sla: 'Selesai', slaState: 'Completed', assignee: 'Ayu Lestari', team: 'IT Support', created: '2 Okt', requester: 'Agus Firmansyah', impact: 1, urgency: 2, affectedUsers: 1, workaround: 4, configVersion: 'SPK-2026-003', timeline: [{ event: 'Tiket dibuat', actor: 'Agus Firmansyah', at: '2 Okt' }, { event: 'Tiket diselesaikan', actor: 'Ayu Lestari', at: '2 Okt' }], comments: [], worklogs: [] },
]

export const seedCriteria = [
  { code: 'C1', name: 'Dampak bisnis / operasional', type: 'Benefit', weight: 30, scale: '1–5', active: true },
  { code: 'C2', name: 'Urgensi waktu', type: 'Benefit', weight: 25, scale: '1–5', active: true },
  { code: 'C3', name: 'Jumlah pengguna terdampak', type: 'Benefit', weight: 15, scale: '1–5', active: true },
  { code: 'C4', name: 'Kritikalitas layanan / aset', type: 'Benefit', weight: 15, scale: '1–5', active: true },
  { code: 'C5', name: 'Kedekatan deadline SLA', type: 'Benefit', weight: 10, scale: '1–5', active: true },
  { code: 'C6', name: 'Ketersediaan workaround', type: 'Cost', weight: 5, scale: '1–5', active: true },
]

export const seedUsers = [
  { id: 1, name: 'Raka Aditya', email: 'raka.aditya@nusantara.co.id', role: 'Supervisor', team: 'IT Support', status: 'Aktif', lastSeen: 'Sekarang' },
  { id: 2, name: 'Dimas Pratama', email: 'dimas.pratama@nusantara.co.id', role: 'Teknisi', team: 'IT Support', status: 'Aktif', lastSeen: '5 menit lalu' },
  { id: 3, name: 'Ayu Lestari', email: 'ayu.lestari@nusantara.co.id', role: 'Teknisi', team: 'Network Support', status: 'Aktif', lastSeen: '12 menit lalu' },
  { id: 4, name: 'Maya Wulandari', email: 'maya.wulandari@nusantara.co.id', role: 'Helpdesk', team: 'Helpdesk', status: 'Aktif', lastSeen: '1 jam lalu' },
  { id: 5, name: 'Bagus Santoso', email: 'bagus.santoso@nusantara.co.id', role: 'Manajemen', team: 'Direksi', status: 'Nonaktif', lastSeen: '29 Sep 2026' },
]

export const seedAudit = [
  { id: 'AUD-6024', action: 'ASSIGN_TICKET', description: 'Tiket TKT-2026-0184 ditugaskan kepada Dimas Pratama', actor: 'Raka Aditya', role: 'Supervisor', time: '5 Okt 2026, 09:22', ticket: 'TKT-2026-0184' },
  { id: 'AUD-6023', action: 'CALCULATE_SAW', description: 'Skor prioritas dihitung · TKT-2026-0184 · 0.924', actor: 'Sistem', role: 'Sistem', time: '5 Okt 2026, 09:14', ticket: 'TKT-2026-0184' },
  { id: 'AUD-6022', action: 'CREATE_TICKET', description: 'Tiket baru dibuat · TKT-2026-0184', actor: 'Rani Kusuma', role: 'Pelapor', time: '5 Okt 2026, 09:14', ticket: 'TKT-2026-0184' },
  { id: 'AUD-6021', action: 'UPDATE_WEIGHT', description: 'Bobot kriteria C2 diperbarui dari 20% menjadi 25%', actor: 'Raka Aditya', role: 'Supervisor', time: '5 Okt 2026, 08:55', ticket: '—' },
  { id: 'AUD-6020', action: 'REASSIGN_TICKET', description: 'Tiket TKT-2026-0181 dialihkan ke Ayu Lestari', actor: 'Maya Wulandari', role: 'Helpdesk', time: '5 Okt 2026, 08:46', ticket: 'TKT-2026-0181' },
  { id: 'AUD-6019', action: 'FAILED_LOGIN', description: 'Percobaan login gagal untuk akun eksternal', actor: 'Tidak diketahui', role: '—', time: '5 Okt 2026, 08:32', ticket: '—' },
]

export const seedPolicies = [
  { priority: 'Kritis', response: 15, resolution: 2, unit: 'jam', active: true },
  { priority: 'Tinggi', response: 30, resolution: 4, unit: 'jam', active: true },
  { priority: 'Sedang', response: 2, resolution: 12, unit: 'jam', active: true },
  { priority: 'Rendah', response: 4, resolution: 24, unit: 'jam', active: true },
]

export const seedMaster = {
  Kategori: ['Aplikasi Bisnis', 'Jaringan', 'Perangkat', 'Akses & Akun', 'Keamanan'],
  Subkategori: ['Gangguan layanan', 'Permintaan akses', 'Performa', 'Printer', 'VPN', 'Laptop'],
  Layanan: ['Payment Gateway', 'HRIS', 'Finance Portal', 'Akses Jaringan', 'Print Service'],
  Lokasi: ['Kantor Pusat · Jakarta', 'Cabang Bandung', 'Cabang Surabaya', 'Cabang Medan'],
  'Tim support': ['IT Support', 'Network Support', 'Application Support', 'Helpdesk'],
  Aset: ['PAY-CORE-01', 'RTR-BDG-02', 'PRN-JKT-03', 'AV-JKT-07'],
}

export const roles = ['Pelapor', 'Helpdesk', 'Teknisi', 'Supervisor', 'Administrator', 'Manajemen']
