# Product Requirements Document (PRD)
## SPK Prioritas Tiket

**Versi:** 1.0  
**Tanggal:** 29 September 2026  
**Status:** Draft Implementasi  
**Basis:** SRS "Sistem Pendukung Keputusan Prioritas Tiket" v1.0  
**Frontend:** React JSX + Vite  
**Backend:** Python + FastAPI  
**Database:** MySQL 8+  
**Metode SPK:** Simple Additive Weighting (SAW)

---

# 1. Ringkasan Produk

SPK Prioritas Tiket adalah aplikasi ticketing berbasis web untuk mencatat, mengelola, menentukan prioritas, menugaskan, memonitor SLA, menyelesaikan, dan melaporkan tiket kendala operasional atau IT.

Perbedaan utama dibanding sistem ticketing biasa adalah sistem tidak hanya mengurutkan tiket berdasarkan waktu masuk, tetapi menghitung **nilai prioritas secara otomatis menggunakan metode Simple Additive Weighting (SAW)**. Hasil perhitungan menghasilkan:

- skor prioritas numerik;
- ranking tiket aktif;
- recommended priority;
- label prioritas `Kritis`, `Tinggi`, `Sedang`, atau `Rendah`;
- informasi kontribusi masing-masing kriteria;
- dasar pengambilan keputusan yang dapat dilacak melalui audit trail.

Sistem tetap mempertahankan kemungkinan intervensi manusia. Supervisor dapat melakukan perubahan manual terhadap **effective priority**, tetapi skor SAW asli dan **recommended priority** tidak boleh ditimpa.

---

# 2. Tujuan Produk

## 2.1 Tujuan Utama

Produk harus membantu organisasi:

1. mencatat laporan kendala dalam bentuk tiket;
2. mengklasifikasikan tiket secara konsisten;
3. menghitung prioritas tiket berdasarkan data dan bobot kriteria;
4. menampilkan tiket yang perlu ditangani lebih dahulu;
5. mendistribusikan pekerjaan kepada teknisi atau tim support;
6. memonitor response SLA dan resolution SLA;
7. melakukan eskalasi jika tiket kritis atau mendekati/melewati SLA;
8. menyimpan seluruh perubahan penting ke audit trail;
9. menyediakan dashboard dan laporan operasional;
10. mempertahankan histori hasil perhitungan SPK yang dapat diaudit.

## 2.2 Success Criteria

Produk dianggap berhasil apabila:

- tiket dapat dibuat dan memperoleh nomor tiket unik;
- kriteria dapat diisi dan menghasilkan skor SAW;
- ranking tiket aktif dapat ditampilkan dari skor tertinggi ke terendah;
- perubahan data kriteria memicu recalculation;
- tiket Kritis/Tinggi terlihat jelas pada UI;
- SLA timer dapat menunjukkan status aman, at risk, atau breached;
- assignment dan reassignment tercatat;
- manual priority override wajib memiliki alasan;
- histori nilai SAW tidak hilang ketika konfigurasi berubah;
- laporan dapat difilter dan diekspor;
- setiap role hanya dapat mengakses fitur yang sesuai.

---

# 3. Scope Produk

## 3.1 In Scope

### Authentication dan Authorization

- Login.
- Logout.
- Session/token management.
- Role-Based Access Control.
- Session timeout.
- Failed login control.

### Ticket Management

- Create ticket.
- Generate ticket number otomatis.
- Klasifikasi tiket.
- Edit ticket sesuai role dan status.
- Attachment.
- Search.
- Filter.
- Sorting.
- Ticket timeline/history.
- Duplicate warning.

### SPK Priority Calculation

- Kelola kriteria.
- Kelola tipe benefit/cost.
- Kelola bobot.
- Validasi total bobot.
- Input nilai kriteria.
- Normalisasi.
- Perhitungan nilai preferensi SAW.
- Ranking.
- Priority label.
- Automatic recalculation.
- Penjelasan hasil perhitungan.
- Manual priority override.
- Audit perubahan manual.
- Config versioning.

### Assignment dan Escalation

- Assignment ke teknisi atau tim.
- Reassignment.
- Workload display.
- Critical escalation.
- SLA escalation.

### SLA dan Monitoring

- SLA policy.
- Response SLA.
- Resolution SLA.
- SLA timer.
- Pause rule.
- At-risk indicator.
- Breached indicator.
- SLA monitoring sampai resolved/closed.

### Ticket Handling

- Accept ticket.
- Update status.
- Worklog.
- Comment.
- Internal comment.
- Attachment pada progress.
- Resolve.
- Close.
- Reopen.
- Cancel.

### Reporting dan Audit

- Dashboard.
- Laporan berdasarkan periode.
- Filter kategori.
- Filter prioritas.
- Filter teknisi.
- Filter SLA.
- Statistik.
- Export PDF.
- Export Excel.
- Export CSV.
- Audit trail.

### Master Data

- User.
- Role.
- Category.
- Subcategory.
- Service.
- Asset.
- Location.
- Support team.
- Technician.
- Criteria.
- Priority threshold.
- SLA policy.

---

# 4. Out of Scope Versi Awal

Fitur berikut tidak menjadi kewajiban pada versi pertama:

- chatbot multi-channel;
- CMDB penuh;
- predictive incident detection;
- automatic remediation;
- billing integration;
- WhatsApp-to-ticket;
- email-to-ticket;
- full SSO/LDAP;
- push notification;
- machine learning untuk prediksi priority.

Fitur tersebut dapat ditambahkan setelah scope awal stabil.

---

# 5. Target User dan Role

## 5.1 Pelapor / User

Tanggung jawab:

- membuat tiket;
- melihat tiket miliknya sendiri;
- menambahkan komentar;
- melihat progress;
- menambahkan attachment sesuai kebijakan;
- mengonfirmasi penyelesaian.

Tidak perlu memahami rumus SAW secara teknis.

## 5.2 Helpdesk

Tanggung jawab:

- validasi tiket;
- klasifikasi kategori/subkategori;
- menentukan service/asset/location;
- mengisi nilai kriteria jika diperlukan;
- melihat ranking;
- melakukan assignment awal;
- memonitor SLA.

## 5.3 Teknisi / Support Agent

Tanggung jawab:

- menerima tiket;
- menangani tiket;
- update status;
- menambahkan worklog;
- menambahkan solusi;
- attachment;
- resolve ticket.

## 5.4 Supervisor

Tanggung jawab:

- monitor queue;
- monitor SLA;
- assignment/reassignment;
- escalation;
- manual priority override;
- melihat laporan;
- melihat workload tim.

## 5.5 Administrator

Tanggung jawab:

- user dan role;
- master data;
- criteria;
- weight;
- threshold;
- SLA policy;
- konfigurasi;
- audit konfigurasi.

## 5.6 Manajemen

Tanggung jawab:

- melihat dashboard;
- melihat trend;
- melihat KPI;
- melihat laporan.

Akses mayoritas bersifat read-only.

---

# 6. Technology Stack

## 6.1 Frontend

### Required

- React.
- JSX.
- Vite.
- React Router DOM.
- Axios.
- CSS biasa atau CSS Modules.
- Lucide React untuk icon.
- native HTML form control bila memungkinkan.

### Optional

- TanStack Query untuk API caching.
- React Hook Form untuk form kompleks.
- Recharts untuk grafik laporan/dashboard.

### Prinsip

Frontend tidak boleh bergantung pada UI kit berat untuk tampilan utama. Tujuan desain adalah mempertahankan visual seperti mockup admin yang telah dibuat:

- clean;
- desktop-first;
- density menengah;
- tidak terlalu dekoratif;
- tidak menggunakan gradient berlebihan;
- tidak menggunakan glassmorphism berlebihan;
- tidak menggunakan card untuk setiap elemen kecil;
- icon tipis dan sederhana;
- data table menjadi elemen utama;
- status dan priority ditampilkan menggunakan badge;
- warna digunakan sebagai informasi, bukan dekorasi.

---

## 6.2 Backend

### Required

- Python 3.12+.
- FastAPI.
- SQLAlchemy 2.x.
- Alembic.
- Pydantic.
- MySQL 8+.
- PyJWT atau `python-jose`.
- `passlib`/Argon2 atau bcrypt untuk password hashing.

### Recommended

- Uvicorn.
- Gunicorn/Uvicorn Workers untuk production.
- APScheduler/Celery jika monitoring SLA membutuhkan scheduled job skala besar.
- Redis jika dibutuhkan untuk cache, rate limit, task queue, atau realtime state.

### API Style

REST API menggunakan JSON.

Prefix versi:

```text
/api/v1
```

---

# 7. High-Level Architecture

```text
Browser
   |
   v
React JSX + Vite
   |
   | HTTPS / JSON / Multipart
   v
FastAPI
   |
   +-- Authentication / RBAC
   +-- Ticket Service
   +-- SPK / SAW Engine
   +-- SLA Service
   +-- Assignment Service
   +-- Reporting Service
   +-- Audit Service
   +-- File Service
   |
   +------> MySQL 8+
   |
   +------> Private File Storage
   |
   +------> Email / Notification Gateway (optional)
```

Perhitungan SAW dilakukan pada backend agar:

- rumus tidak dapat dimodifikasi dari browser;
- hasil konsisten;
- histori dapat disimpan;
- config version dapat dilacak;
- proses dapat diaudit.

---

# 8. Frontend Design System

UI harus menyesuaikan mockup admin yang telah dibuat sebelumnya.

## 8.1 Layout

Desktop:

```text
+----------------------+-----------------------------------------+
| Sidebar              | Topbar                                  |
|                      +-----------------------------------------+
| Dashboard            |                                         |
| Daftar Tiket         | Page Content                            |
| Detail Tiket         |                                         |
| Create Ticket        |                                         |
| Penugasan Board      |                                         |
| Laporan              |                                         |
| SPK Configuration    |                                         |
|                      |                                         |
| User Profile         |                                         |
+----------------------+-----------------------------------------+
```

Sidebar:

- lebar sekitar `240–260px`;
- warna dark neutral;
- active menu diberi background sedikit lebih terang;
- tidak menggunakan warna neon;
- label menu dikelompokkan menjadi:
  - Workspace;
  - Operasional;
  - Konfigurasi.

Topbar:

- tinggi sekitar `60–64px`;
- breadcrumb;
- title halaman;
- tombol notifikasi;
- tombol `Tiket Baru`.

Content:

- background abu sangat muda;
- surface putih;
- border tipis;
- radius `8–12px`;
- shadow sangat lembut.

---

# 9. Screen Requirements

## 9.1 Login

Route:

```text
/login
```

Field:

- username/email;
- password.

Action:

- Login.
- Forgot Password opsional.

Validation:

- required field;
- invalid credential;
- account inactive;
- rate limit jika percobaan gagal berulang.

Success:

```text
redirect -> /dashboard
```

---

## 9.2 Dashboard

Route:

```text
/dashboard
```

Komponen:

### Summary Cards

- Tiket Aktif.
- Prioritas Kritis.
- SLA At Risk.
- Overdue.

### Trend Ticket

Grafik:

- tiket dibuat;
- tiket resolved;
- rentang waktu.

### Priority Distribution

- Kritis.
- Tinggi.
- Sedang.
- Rendah.

### Top Priority Ticket Table

Kolom:

- rank;
- ticket number;
- title;
- priority;
- SAW score;
- status;
- SLA remaining;
- assignee.

Default sorting menempatkan skor tertinggi di atas.

---

## 9.3 Create Ticket

Route:

```text
/tickets/create
```

atau modal dari dashboard/ticket list.

Field utama:

```text
title
description
category_id
subcategory_id
service_id
asset_id
location_id
impact
urgency
affected_users
attachment
```

Minimum field:

- judul;
- deskripsi;
- kategori;
- lokasi atau service sesuai konfigurasi;
- impact;
- urgency.

Attachment:

- PDF;
- JPG;
- JPEG;
- PNG;
- format lain jika diaktifkan admin.

Default maksimal:

```text
10 MB / file
```

Setelah submit:

1. validasi;
2. create ticket;
3. generate ticket number;
4. create timeline event;
5. evaluate criteria;
6. calculate priority jika data cukup;
7. redirect ke detail ticket.

---

## 9.4 Daftar Tiket

Route:

```text
/tickets
```

Table column:

- nomor tiket;
- title;
- category;
- priority;
- score;
- status;
- SLA;
- assignee;
- created at;
- action.

Filter:

- text search;
- category;
- priority;
- status;
- assignee;
- SLA;
- date.

Sorting:

- score;
- created_at;
- remaining SLA;
- ticket number.

Catatan penting:

Sorting dan filtering tidak boleh mengubah nomor tiket atau data aktual.

---

## 9.5 Detail Tiket

Route:

```text
/tickets/:id
```

Section:

### Header

- ticket no;
- title;
- recommended priority;
- effective priority;
- status;
- created time;
- requester.

### Deskripsi

- description;
- category;
- subcategory;
- service;
- asset;
- location.

### Priority Calculation

Tampilkan:

- raw value;
- criteria type;
- weight;
- normalized value;
- weighted contribution;
- total SAW score;
- ranking;
- recommended priority;
- effective priority;
- configuration version.

### Assignment

- team;
- technician;
- assignment time;
- assigned by.

### SLA

- response deadline;
- resolution deadline;
- elapsed time;
- remaining time;
- status.

### Timeline

Menampilkan:

- ticket created;
- classification changed;
- criteria changed;
- SAW recalculated;
- assigned;
- status changed;
- comment;
- worklog;
- priority override;
- SLA escalation;
- resolved;
- closed;
- reopened.

### Comments

Visibility:

```text
PUBLIC
INTERNAL
```

Pelapor hanya dapat melihat comment yang diizinkan.

### Worklog

Teknisi dapat mengisi:

- description;
- duration opsional;
- attachment.

---

## 9.6 SPK Configuration

Route:

```text
/admin/spk
```

Table:

| Code | Criteria | Type | Weight | Scale | Active |
|---|---|---|---:|---|---|
| C1 | Dampak bisnis / operasional | Benefit | 30% | 1-5 | Yes |
| C2 | Urgensi waktu | Benefit | 25% | 1-5 | Yes |
| C3 | Jumlah pengguna terdampak | Benefit | 15% | 1-5 | Yes |
| C4 | Kritikalitas layanan / aset | Benefit | 15% | 1-5 | Yes |
| C5 | Status SLA / kedekatan deadline | Benefit | 10% | 1-5 | Yes |
| C6 | Ketersediaan workaround | Cost | 5% | 1-5 | Yes |

Validasi:

```text
SUM(weight active) = 100%
```

Jika bukan 100%:

- Save/Activate ditolak.
- UI menampilkan error.
- konfigurasi lama tetap digunakan.

---

## 9.7 Assignment Board

Route:

```text
/assignments
```

Tujuan:

- mengetahui tiket belum ditugaskan;
- mengetahui beban tim;
- melakukan assignment;
- melakukan reassignment.

Setiap ticket card minimal:

- ticket no;
- title;
- effective priority;
- score;
- SLA status.

Reassignment memerlukan:

- target team/technician;
- reason.

---

## 9.8 Reports

Route:

```text
/reports
```

Filter:

- start date;
- end date;
- category;
- priority;
- technician;
- SLA status.

Metric:

- total tickets;
- resolved tickets;
- active tickets;
- SLA compliance;
- average response time;
- average resolution time;
- ticket by category;
- ticket by priority;
- technician performance.

Export:

```text
PDF
XLSX
CSV
```

---

# 10. Ticket Lifecycle

Status baseline:

```text
NEW
OPEN
ASSIGNED
IN_PROGRESS
PENDING
RESOLVED
CLOSED
REOPENED
CANCELLED
```

Contoh flow normal:

```text
NEW
  |
  v
OPEN
  |
  v
ASSIGNED
  |
  v
IN_PROGRESS
  |
  +------> PENDING
  |          |
  |          v
  +----- IN_PROGRESS
  |
  v
RESOLVED
  |
  v
CLOSED
```

Reopen:

```text
RESOLVED/CLOSED
      |
      v
  REOPENED
      |
      v
IN_PROGRESS
```

Rule:

- ticket tidak boleh `CLOSED` sebelum `RESOLVED`;
- exception: `CANCELLED` dengan alasan valid;
- reopen membuat timeline baru;
- reopen dapat memulai atau menyesuaikan SLA sesuai policy.

---

# 11. Metode SPK SAW

## 11.1 Tujuan

SAW digunakan untuk menentukan urutan penanganan tiket berdasarkan beberapa kriteria yang memiliki tingkat kepentingan berbeda.

## 11.2 Kriteria Baseline

### C1 — Dampak Bisnis / Operasional

Type: `Benefit`  
Weight: `0.30`  
Scale: `1-5`

| Value | Description |
|---:|---|
| 1 | Sangat rendah |
| 2 | Rendah |
| 3 | Sedang |
| 4 | Tinggi |
| 5 | Sangat tinggi |

### C2 — Urgensi Waktu

Type: `Benefit`  
Weight: `0.25`

| Value | Description |
|---:|---|
| 1 | Dapat ditunda |
| 2 | Tidak mendesak |
| 3 | Perlu segera |
| 4 | Mendesak |
| 5 | Segera / kritis |

### C3 — Pengguna Terdampak

Type: `Benefit`  
Weight: `0.15`

| Value | Description |
|---:|---|
| 1 | 1 user |
| 2 | 2–5 user |
| 3 | 6–20 user |
| 4 | 21–50 user |
| 5 | >50 / seluruh unit |

### C4 — Kritikalitas Layanan / Aset

Type: `Benefit`  
Weight: `0.15`

| Value | Description |
|---:|---|
| 1 | Non-kritis |
| 2 | Rendah |
| 3 | Sedang |
| 4 | Tinggi |
| 5 | Sangat kritis |

### C5 — Status SLA / Kedekatan Deadline

Type: `Benefit`  
Weight: `0.10`  
Scale: `1-5`

Nilai semakin besar menunjukkan tiket semakin dekat atau sudah melewati deadline SLA.

Contoh implementasi configurable:

| Kondisi | Nilai |
|---|---:|
| Remaining > 75% SLA | 1 |
| Remaining 50–75% | 2 |
| Remaining 25–50% | 3 |
| Remaining 0–25% | 4 |
| SLA breached | 5 |

Mapping contoh di atas adalah keputusan implementasi dan harus dibuat configurable.

### C6 — Ketersediaan Workaround

Type: `Cost`  
Weight: `0.05`

| Value | Description |
|---:|---|
| 1 | Workaround penuh |
| 2 | Workaround mudah |
| 3 | Workaround terbatas |
| 4 | Workaround sulit |
| 5 | Tidak ada workaround |

Karena merupakan **Cost**, perlakuan normalisasi berbeda dari C1-C5.

---

# 12. Rumus Normalisasi SAW

Misalkan:

```text
x_ij = nilai tiket i pada kriteria j
r_ij = nilai hasil normalisasi
w_j  = bobot kriteria j
V_i  = total skor tiket i
```

## Benefit

```text
r_ij = x_ij / max(x_j)
```

## Cost

```text
r_ij = min(x_j) / x_ij
```

---

# 13. Perhitungan Nilai Akhir

```text
V_i = Σ (w_j × r_ij)
```

Contoh implementasi:

```python
score = 0

for criterion in criteria:
    normalized = normalize(ticket_value, criterion)
    contribution = criterion.weight * normalized
    score += contribution
```

Contoh hasil:

```json
{
  "ticket_id": 189,
  "score": 0.93,
  "recommended_priority": "CRITICAL",
  "criteria": [
    {
      "code": "C1",
      "raw_value": 5,
      "normalized_value": 1.0,
      "weight": 0.30,
      "weighted_value": 0.30
    }
  ]
}
```

---

# 14. Mekanisme Matriks Keputusan

SAW tidak menghitung satu tiket secara terisolasi karena normalisasi membutuhkan nilai maksimum/minimum pada kumpulan alternatif.

Untuk ranking operasional:

```text
eligible tickets = seluruh tiket aktif yang memiliki nilai criteria lengkap
```

Contoh status yang masuk ranking:

```text
NEW
OPEN
ASSIGNED
IN_PROGRESS
PENDING
REOPENED
```

Status yang tidak masuk:

```text
RESOLVED
CLOSED
CANCELLED
```

Contoh decision matrix:

```text
          C1 C2 C3 C4 C5 C6
TCK-001    5  5  5  5  4  5
TCK-002    4  4  3  4  5  2
TCK-003    3  5  2  3  3  1
```

Proses:

1. mencari max untuk benefit;
2. mencari min untuk cost;
3. normalisasi;
4. kalikan weight;
5. jumlahkan nilai;
6. ranking descending.

---

# 15. Ranking dan Tie-Breaker

Sorting utama:

```text
score DESC
```

Jika skor sama:

1. tiket paling dekat atau sudah melewati resolution SLA;
2. dampak bisnis lebih tinggi;
3. waktu pembuatan lebih dahulu;
4. ticket number lebih kecil.

Pseudocode konseptual:

```python
sorted(
    tickets,
    key=lambda t: (
        -t.score,
        t.resolution_sla_remaining,
        -t.business_impact,
        t.created_at,
        t.ticket_no,
    ),
)
```

Implementasi production perlu menangani nilai SLA negatif untuk tiket breached secara eksplisit.

---

# 16. Mapping Score ke Priority

Default threshold:

```text
CRITICAL >= 0.85
HIGH     >= 0.70 and < 0.85
MEDIUM   >= 0.50 and < 0.70
LOW      < 0.50
```

UI label:

```text
CRITICAL -> Kritis
HIGH     -> Tinggi
MEDIUM   -> Sedang
LOW      -> Rendah
```

Threshold harus configurable oleh Admin.

---

# 17. Recommended Priority vs Effective Priority

## recommended_priority

Dihasilkan dari SAW.

## effective_priority

Priority yang digunakan secara operasional.

Default:

```text
effective_priority = recommended_priority
```

Jika Supervisor override:

```text
recommended_priority = HIGH
effective_priority   = CRITICAL
manual_reason        = "Gangguan berdampak pada proses payroll hari ini"
```

Skor SAW asli tidak berubah.

---

# 18. Manual Priority Override

Role berwenang:

```text
SUPERVISOR
ADMIN (opsional sesuai policy)
```

Form:

- current recommended priority;
- current effective priority;
- new priority;
- reason.

Reason wajib.

Audit menyimpan:

```text
ticket_id
old_priority
new_priority
actor_id
reason
timestamp
```

---

# 19. Recalculation

Recalculation wajib terjadi ketika:

- raw criteria value berubah;
- affected users berubah;
- impact berubah;
- urgency berubah;
- service criticality berubah;
- workaround berubah;
- SLA criteria berubah;
- criteria configuration berubah;
- criteria active state berubah;
- weight berubah;
- ticket baru masuk matrix;
- ticket keluar dari active ranking.

Karena perubahan satu alternatif dapat mengubah nilai max/min, backend harus dapat menghitung ulang kumpulan tiket eligible.

---

# 20. Config Versioning

Setiap konfigurasi SPK aktif memiliki version.

Contoh:

```text
SPK-2026-001
SPK-2026-002
```

Setiap hasil perhitungan harus terkait `config_version` agar histori dapat direkonstruksi.

---

# 21. SAW Service Backend

Recommended service:

```text
app/services/saw_service.py
```

Interface:

```python
class SAWService:
    def get_active_configuration(self): ...
    def get_eligible_tickets(self): ...
    def build_decision_matrix(self, tickets, criteria): ...
    def normalize_matrix(self, matrix, criteria): ...
    def calculate_scores(self, normalized_matrix, criteria): ...
    def apply_priority_threshold(self, score): ...
    def rank_tickets(self, results): ...
    def persist_results(self, results, config_version): ...
    def recalculate(self): ...
```

SAW logic tidak diletakkan di React.

---

# 22. SLA

## 22.1 SLA Policy

Admin dapat membuat SLA berdasarkan service dan priority.

Contoh konfigurasi implementasi:

| Priority | Response SLA | Resolution SLA |
|---|---:|---:|
| Kritis | 15 min | 2 jam |
| Tinggi | 30 min | 4 jam |
| Sedang | 2 jam | 12 jam |
| Rendah | 4 jam | 24 jam |

Nilai final mengikuti kebijakan organisasi.

## 22.2 SLA Timer

Backend menentukan:

```text
response_deadline
resolution_deadline
```

State:

```text
SAFE
AT_RISK
BREACHED
PAUSED
COMPLETED
```

Contoh rule configurable:

```text
remaining > 25% -> SAFE
remaining <= 25% -> AT_RISK
remaining <= 0 -> BREACHED
```

## 22.3 SLA Pause

Jika status `PENDING`, SLA dapat pause jika kebijakan mengizinkan.

Data yang disarankan:

```text
sla_paused_at
sla_total_paused_seconds
sla_resume_at
```

## 22.4 SLA Escalation

Trigger:

- Critical ticket created;
- response SLA at risk;
- response SLA breached;
- resolution SLA at risk;
- resolution SLA breached.

Action:

- timeline event;
- notification;
- supervisor alert;
- dashboard indicator.

---

# 23. Assignment Logic

Assignment dapat dilakukan oleh Helpdesk/Supervisor ke team atau technician.

Data:

```text
ticket_id
assignee_id
assigned_by
assigned_at
ended_at
reason
```

Ketika reassignment:

1. assignment lama diakhiri;
2. assignment baru dibuat;
3. ticket log dibuat.

---

# 24. Workload

Versi awal:

```text
jumlah ticket aktif yang sedang assigned ke technician
```

Optional weighted workload dapat ditambahkan kemudian.

---

# 25. Duplicate Detection

Versi awal menggunakan rule sederhana berdasarkan kombinasi:

- title similarity;
- service;
- location;
- category;
- created interval.

Jika terdeteksi:

```json
{
  "duplicate_warning": true,
  "similar_tickets": []
}
```

User masih dapat melanjutkan submit.

---

# 26. Audit Trail

Event penting:

```text
LOGIN
FAILED_LOGIN
CREATE_TICKET
UPDATE_TICKET
CLASSIFY_TICKET
UPDATE_CRITERIA
CALCULATE_SAW
RECALCULATE_SAW
ASSIGN_TICKET
REASSIGN_TICKET
CHANGE_STATUS
ADD_COMMENT
ADD_WORKLOG
MANUAL_PRIORITY_OVERRIDE
UPDATE_WEIGHT
UPDATE_THRESHOLD
UPDATE_SLA_POLICY
RESOLVE_TICKET
CLOSE_TICKET
REOPEN_TICKET
CANCEL_TICKET
```

Audit data:

```text
id
ticket_id nullable
actor_id
action
old_value
new_value
metadata
created_at
```

Audit tidak dapat diedit user operasional.

---

# 27. Data Model

## roles

```text
id
name
created_at
updated_at
```

## users

```text
id
name
email
password_hash
role_id
status
created_at
updated_at
```

## tickets

```text
id
ticket_no
requester_id
category_id
subcategory_id
service_id
asset_id
location_id
title
description
status
source
created_at
updated_at
resolved_at
closed_at
```

## criteria

```text
id
code
name
type
weight
scale_min
scale_max
active
created_at
updated_at
```

## priority_configs

```text
id
version
effective_from
created_by
created_at
```

## ticket_criteria_scores

```text
id
ticket_id
criteria_id
raw_value
normalized_value
weight
weighted_value
config_version
calculated_at
```

## priority_results

```text
id
ticket_id
score
ranking
recommended_priority
effective_priority
manual_reason
config_version
calculated_at
```

## sla_policies

```text
id
service_id
priority
response_minutes
resolution_minutes
pause_on_pending
active
created_at
updated_at
```

## assignments

```text
id
ticket_id
assignee_id
team_id
assigned_by
assigned_at
ended_at
reason
```

## ticket_logs

```text
id
ticket_id
actor_id
action
old_value
new_value
metadata_json
created_at
```

## comments

```text
id
ticket_id
user_id
visibility
message
created_at
updated_at
```

## attachments

```text
id
ticket_id
uploader_id
file_name
mime_type
size
storage_path
created_at
```

Tambahan master data:

```text
categories
subcategories
services
assets
locations
support_teams
team_members
```

Master data mendukung `active = true/false` untuk mempertahankan histori.

---

# 28. Authentication

Endpoint:

```http
POST /api/v1/auth/login
```

Request:

```json
{
  "email": "admin@company.local",
  "password": "secret"
}
```

Response:

```json
{
  "access_token": "...",
  "refresh_token": "...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "name": "Administrator",
    "role": "ADMIN"
  }
}
```

---

# 29. Authorization dan RBAC

Backend adalah sumber kebenaran authorization.

Permission contoh:

```text
ticket.create
ticket.read
ticket.update
ticket.classify
ticket.assign
ticket.resolve
ticket.close
ticket.override_priority
spk.read
spk.configure
sla.configure
report.read
report.export
user.manage
master.manage
audit.read
```

| Feature | Pelapor | Helpdesk | Teknisi | Supervisor | Admin | Manajemen |
|---|---|---|---|---|---|---|
| Create Ticket | Yes | Yes | Optional | Yes | Yes | No |
| View Own Ticket | Yes | Yes | Yes | Yes | Yes | No |
| View All Tickets | No | Yes | Assigned/Allowed | Yes | Yes | Read |
| Classify | No | Yes | No | Yes | Yes | No |
| Input Criteria | No | Yes | Limited | Yes | Yes | No |
| View SAW Detail | Limited | Yes | Yes | Yes | Yes | Read |
| Assignment | No | Yes | No | Yes | Yes | No |
| Reassignment | No | Limited | No | Yes | Yes | No |
| Update Status | No | Limited | Yes | Yes | Yes | No |
| Worklog | No | No | Yes | Yes | Yes | No |
| Override Priority | No | No | No | Yes | Optional | No |
| Configure SPK | No | No | No | Limited | Yes | No |
| Configure SLA | No | No | No | Limited | Yes | No |
| Reports | Own | Limited | Limited | Yes | Yes | Yes |
| Audit | No | No | No | Limited | Yes | No |

---

# 30. API Specification

## Authentication

```text
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
GET    /api/v1/auth/me
POST   /api/v1/auth/forgot-password       optional
```

## Tickets

```text
GET    /api/v1/tickets
POST   /api/v1/tickets
GET    /api/v1/tickets/{id}
PATCH  /api/v1/tickets/{id}
POST   /api/v1/tickets/{id}/classify
POST   /api/v1/tickets/{id}/status
POST   /api/v1/tickets/{id}/resolve
POST   /api/v1/tickets/{id}/close
POST   /api/v1/tickets/{id}/reopen
POST   /api/v1/tickets/{id}/cancel
```

Query:

```text
?q=
&priority=
&status=
&category_id=
&assignee_id=
&sla_status=
&date_from=
&date_to=
&sort=
&page=
&page_size=
```

## SPK

```text
GET    /api/v1/spk/criteria
POST   /api/v1/spk/criteria
PATCH  /api/v1/spk/criteria/{id}
GET    /api/v1/spk/config
POST   /api/v1/spk/config
POST   /api/v1/spk/config/{id}/activate
GET    /api/v1/tickets/{id}/priority
POST   /api/v1/tickets/{id}/criteria
POST   /api/v1/spk/recalculate
GET    /api/v1/spk/ranking
POST   /api/v1/tickets/{id}/priority-override
```

## Assignment

```text
GET    /api/v1/assignments/board
POST   /api/v1/tickets/{id}/assign
POST   /api/v1/tickets/{id}/reassign
GET    /api/v1/technicians/workload
```

## Comments / Worklogs

```text
GET    /api/v1/tickets/{id}/comments
POST   /api/v1/tickets/{id}/comments
GET    /api/v1/tickets/{id}/worklogs
POST   /api/v1/tickets/{id}/worklogs
```

## Attachments

```text
POST   /api/v1/tickets/{id}/attachments
GET    /api/v1/attachments/{id}
DELETE /api/v1/attachments/{id}
```

## SLA

```text
GET    /api/v1/sla/policies
POST   /api/v1/sla/policies
PATCH  /api/v1/sla/policies/{id}
GET    /api/v1/tickets/{id}/sla
GET    /api/v1/sla/at-risk
GET    /api/v1/sla/breached
```

## Dashboard

```text
GET /api/v1/dashboard/summary
GET /api/v1/dashboard/trend
GET /api/v1/dashboard/priority-distribution
GET /api/v1/dashboard/top-priority
```

## Reports

```text
GET /api/v1/reports/tickets
GET /api/v1/reports/sla
GET /api/v1/reports/technicians
GET /api/v1/reports/export
```

---

# 31. Frontend Routing

```text
/login
/dashboard
/tickets
/tickets/create
/tickets/:id
/assignments
/reports
/admin/spk
/admin/sla
/admin/users
/admin/master-data
/admin/audit
```

---

# 32. Frontend Folder Structure

```text
frontend/
├── public/
├── src/
│   ├── api/
│   │   ├── axios.js
│   │   ├── auth.api.js
│   │   ├── tickets.api.js
│   │   ├── spk.api.js
│   │   ├── sla.api.js
│   │   ├── assignment.api.js
│   │   └── report.api.js
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Topbar.jsx
│   │   │   └── AdminLayout.jsx
│   │   ├── common/
│   │   ├── tickets/
│   │   ├── spk/
│   │   ├── sla/
│   │   └── reports/
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── TicketListPage.jsx
│   │   ├── TicketCreatePage.jsx
│   │   ├── TicketDetailPage.jsx
│   │   ├── AssignmentBoardPage.jsx
│   │   ├── ReportPage.jsx
│   │   └── admin/
│   │       ├── SPKConfigurationPage.jsx
│   │       ├── SLAPolicyPage.jsx
│   │       ├── UserManagementPage.jsx
│   │       └── MasterDataPage.jsx
│   ├── router/
│   │   ├── router.jsx
│   │   └── ProtectedRoute.jsx
│   ├── styles/
│   │   ├── variables.css
│   │   ├── reset.css
│   │   ├── layout.css
│   │   └── components.css
│   ├── utils/
│   │   ├── formatDate.js
│   │   ├── formatPriority.js
│   │   └── permissions.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

# 33. Backend Folder Structure

```text
backend/
├── app/
│   ├── main.py
│   ├── api/
│   │   ├── deps.py
│   │   └── v1/
│   │       ├── auth.py
│   │       ├── tickets.py
│   │       ├── spk.py
│   │       ├── sla.py
│   │       ├── assignments.py
│   │       ├── comments.py
│   │       ├── attachments.py
│   │       ├── dashboard.py
│   │       └── reports.py
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── permissions.py
│   ├── db/
│   │   ├── base.py
│   │   ├── session.py
│   │   └── seed.py
│   ├── models/
│   ├── schemas/
│   ├── repositories/
│   ├── services/
│   │   ├── auth_service.py
│   │   ├── ticket_service.py
│   │   ├── saw_service.py
│   │   ├── sla_service.py
│   │   ├── assignment_service.py
│   │   ├── audit_service.py
│   │   └── report_service.py
│   ├── tasks/
│   │   └── sla_monitor.py
│   └── utils/
├── alembic/
├── tests/
├── .env
├── requirements.txt
└── alembic.ini
```

---

# 34. UI Priority dan SLA Style

Priority:

```text
Kritis  -> red
Tinggi  -> amber
Sedang  -> blue
Rendah  -> green
```

SLA:

```text
SAFE     -> neutral / green
AT_RISK  -> amber
BREACHED -> red
PAUSED   -> gray
```

Warna tidak boleh menjadi satu-satunya indikator; badge tetap memakai text.

---

# 35. Search dan Pagination

Server-side pagination:

```text
GET /tickets?page=1&page_size=25
```

Response:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "page_size": 25,
    "total": 128,
    "total_pages": 6
  }
}
```

Default page size: `25`.

---

# 36. Ticket Number

Backend menghasilkan ticket number immutable.

Contoh:

```text
TKT-2026-000001
TKT-2026-000002
```

Nomor tidak berubah karena filter, sorting, edit, reassignment, atau recalculation.

---

# 37. File Storage

Development:

```text
./storage/private
```

Production:

- private object storage;
- S3-compatible storage;
- private disk.

File tidak boleh langsung diakses melalui public URL tanpa authorization.

---

# 38. Validation Rules

## Ticket

```text
title: required, 3-200 chars
description: required, 10-5000 chars
impact: 1-5
urgency: 1-5
attachment: max 10 MB default
```

## SPK

```text
scale_min <= value <= scale_max
0 <= weight <= 1
SUM(active weight) = 1.0
```

---

# 39. Error Response

```json
{
  "success": false,
  "error": {
    "code": "SPK_WEIGHT_INVALID",
    "message": "Total bobot aktif harus sama dengan 100%.",
    "details": null
  }
}
```

Common code:

```text
AUTH_INVALID_CREDENTIAL
AUTH_UNAUTHORIZED
AUTH_FORBIDDEN
TICKET_NOT_FOUND
TICKET_INVALID_STATUS
TICKET_REQUIRED_FIELD
SPK_CONFIGURATION_NOT_FOUND
SPK_WEIGHT_INVALID
SPK_CRITERIA_INCOMPLETE
SLA_POLICY_NOT_FOUND
FILE_TOO_LARGE
FILE_TYPE_NOT_ALLOWED
```

---

# 40. Realtime Update

MVP dapat menggunakan polling sekitar `30-60 detik` untuk dashboard.

WebSocket/SSE dapat ditambahkan jika dibutuhkan realtime lebih kuat.

---

# 41. Security

Production wajib:

- HTTPS;
- password hashing kuat;
- RBAC backend;
- access token expiration;
- refresh token rotation bila dipakai;
- failed-login rate limit;
- authorization untuk file;
- ORM untuk mitigasi SQL injection;
- input validation;
- CORS whitelist;
- audit logging;
- secure headers;
- secret via environment variable;
- tidak menyimpan password plaintext.

---

# 42. Soft Delete dan History

Ticket tidak boleh dihapus permanen oleh user operasional.

Gunakan `archived_at` / `deleted_at` atau status archive.

Master data yang sudah pernah dipakai dinonaktifkan menggunakan `active = false`.

---

# 43. Timestamp

Recommended database storage:

```text
UTC
```

Frontend menampilkan timezone organisasi, misalnya `Asia/Jakarta`.

---

# 44. Performance Requirements

Target awal:

- dashboard normal < 3 detik;
- API ticket list < 2 detik pada dataset development;
- create ticket < 2 detik di luar upload besar;
- server-side pagination wajib;
- recalculation harus efisien;
- report besar boleh asynchronous.

Initial development server dapat dimulai sekitar:

```text
2 vCPU
4 GB RAM
20 GB storage
```

---

# 45. Logging, Backup, Monitoring

Log minimal:

```text
timestamp
level
request_id
user_id
endpoint
method
status_code
duration_ms
```

Production harus memiliki:

- database backup;
- attachment backup;
- error monitoring;
- server monitoring;
- disk monitoring;
- log rotation.

---

# 46. Seed Data

## Roles

```text
USER
HELPDESK
TECHNICIAN
SUPERVISOR
ADMIN
MANAGEMENT
```

## Ticket Status

```text
NEW
OPEN
ASSIGNED
IN_PROGRESS
PENDING
RESOLVED
CLOSED
REOPENED
CANCELLED
```

## Criteria

```text
C1 0.30 Benefit
C2 0.25 Benefit
C3 0.15 Benefit
C4 0.15 Benefit
C5 0.10 Benefit
C6 0.05 Cost
```

## Priority Threshold

```text
Critical 0.85
High     0.70
Medium   0.50
Low      < 0.50
```

---

# 47. Dashboard API Example

```json
{
  "active_tickets": 128,
  "critical": 9,
  "sla_at_risk": 17,
  "overdue": 6,
  "priority_distribution": {
    "critical": 9,
    "high": 24,
    "medium": 57,
    "low": 38
  }
}
```

---

# 48. SPK Ranking Response Example

```json
{
  "config_version": "SPK-2026-001",
  "calculated_at": "2026-09-29T03:00:00Z",
  "items": [
    {
      "rank": 1,
      "ticket_id": 189,
      "ticket_no": "TKT-2026-000189",
      "score": 0.93,
      "recommended_priority": "CRITICAL",
      "effective_priority": "CRITICAL",
      "sla_status": "AT_RISK"
    }
  ]
}
```

---

# 49. SPK Calculation Detail Response

```json
{
  "ticket_id": 189,
  "score": 0.93,
  "ranking": 1,
  "recommended_priority": "CRITICAL",
  "effective_priority": "CRITICAL",
  "config_version": "SPK-2026-001",
  "criteria": [
    {
      "code": "C1",
      "name": "Dampak bisnis / operasional",
      "type": "BENEFIT",
      "raw_value": 5,
      "normalized_value": 1,
      "weight": 0.30,
      "weighted_value": 0.30
    },
    {
      "code": "C6",
      "name": "Ketersediaan workaround",
      "type": "COST",
      "raw_value": 5,
      "normalized_value": 0.2,
      "weight": 0.05,
      "weighted_value": 0.01
    }
  ]
}
```

---

# 50. Testing Strategy

## Unit Test Backend

- benefit formula;
- cost formula;
- weight validation;
- threshold mapping;
- ranking;
- tie-breaker;
- recalculation;
- priority override;
- SLA calculation;
- status transition.

## Integration Test

- login;
- create ticket;
- create ticket -> SPK calculation;
- update criteria -> recalculation;
- assignment;
- override;
- resolve;
- close;
- report.

## Frontend Test

- protected route;
- role menu;
- form validation;
- filter;
- table;
- confirmation dialog;
- SPK configuration validation.

---

# 51. Acceptance Criteria

## Create Ticket

Given user authorized, when required field valid dan submit, then:

1. tiket tersimpan;
2. nomor unik dibuat;
3. status awal dibuat;
4. audit entry dibuat;
5. attachment private;
6. criteria diisi/diturunkan bila data tersedia;
7. SPK calculation dijalankan jika eligible;
8. user diarahkan ke detail tiket.

## SAW

Given tiket aktif dengan criteria lengkap, when calculation dijalankan, then:

- matrix terbentuk;
- benefit dinormalisasi `x/max`;
- cost dinormalisasi `min/x`;
- weighted value dihitung;
- total score disimpan;
- ranking dihasilkan;
- label ditentukan;
- config version disimpan;
- detail hasil dapat dilihat authorized user.

## Weight Configuration

Jika total bobot bukan 100%, activation ditolak.

Jika total bobot 100%, config baru dapat diaktifkan dengan version baru.

## Manual Override

- reason wajib;
- recommended priority tidak berubah;
- effective priority berubah;
- before/after tersimpan;
- actor tersimpan;
- timestamp tersimpan;
- audit/timeline ter-update.

## SLA

Jika masuk at-risk threshold, UI dan dashboard menampilkan At Risk.

Jika deadline lewat, SLA menjadi Breached dan histori breach tidak dihapus setelah resolved.

---

# 52. UX Confirmation

Confirmation wajib untuk:

- close ticket;
- cancel ticket;
- override priority;
- reassignment;
- deactivate criteria;
- activate SPK configuration;
- delete attachment jika diizinkan.

---

# 53. Responsive Behavior

Desktop menggunakan full sidebar.

Tablet menggunakan collapsible sidebar.

Mobile menggunakan sidebar drawer dan table dapat horizontal scroll.

Prioritas penggunaan tetap desktop karena sistem bersifat operasional/admin.

---

# 54. Accessibility

Minimum:

- semantic HTML;
- label untuk input;
- keyboard navigation;
- focus state jelas;
- status tidak hanya melalui warna;
- contrast cukup;
- button memiliki text atau aria-label.

---

# 55. Development Environment

## Frontend

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install react-router-dom axios lucide-react
npm run dev
```

Optional:

```bash
npm install @tanstack/react-query react-hook-form recharts
```

## Backend

```bash
python -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn sqlalchemy alembic pymysql pydantic-settings python-jose passlib python-multipart
```

---

# 56. Environment Variables

Backend:

```env
APP_ENV=development
APP_NAME=SPK Prioritas Tiket
DATABASE_URL=mysql+pymysql://user:password@localhost:3306/spk_ticket
JWT_SECRET=
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
STORAGE_PATH=./storage/private
MAX_UPLOAD_SIZE_MB=10
APP_TIMEZONE=Asia/Jakarta
```

Frontend:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

---

# 57. Deployment

Recommended:

```text
Nginx
  |
  +--- /      -> React Vite build
  |
  +--- /api   -> FastAPI
```

Production stack:

```text
React build
FastAPI
MySQL
Private storage
Nginx
HTTPS
```

---

# 58. Implementation Phase

## Phase 1 — Foundation

- FastAPI setup.
- MySQL.
- Migration.
- Auth.
- RBAC.
- Admin layout React.
- Login.
- User/role seed.

## Phase 2 — Ticketing

- Create ticket.
- Ticket list.
- Detail.
- Attachment.
- Timeline.
- Status.

## Phase 3 — SPK

- Criteria.
- Weight.
- Config version.
- SAW engine.
- Ranking.
- Priority badge.
- Calculation detail.

## Phase 4 — Assignment + SLA

- Assignment.
- Reassignment.
- Workload.
- SLA policy.
- SLA timer.
- escalation.

## Phase 5 — Resolution

- Worklog.
- Comment.
- Resolve.
- Close.
- Reopen.

## Phase 6 — Reporting

- Dashboard.
- Reports.
- Export.
- Audit viewer.

## Phase 7 — Hardening

- Security.
- Testing.
- Performance.
- Backup.
- Production deploy.

---

# 59. Open Questions / TBD

1. Apakah email-to-ticket masuk fase pertama?
2. Apakah WhatsApp-to-ticket masuk fase pertama?
3. Apakah threshold priority final sama dengan baseline?
4. Apakah bobot criteria final tetap 30/25/15/15/10/5?
5. Bagaimana pause SLA ketika menunggu user atau vendor?
6. Apakah SSO/LDAP dibutuhkan?
7. Berapa retention period ticket dan attachment?
8. Apakah affected users dihitung otomatis dari asset/service?
9. Apakah push/email notification harus aktif dari MVP?
10. Apakah tiket Critical membutuhkan approval Supervisor sebelum Closed?
11. Berapa target concurrency production?
12. Berapa availability target production?

---

# 60. Product Decisions untuk Implementasi Ini

Keputusan implementasi berikut ditambahkan agar SRS dapat langsung dikembangkan:

- React menggunakan JSX, bukan TypeScript.
- Bundler menggunakan Vite.
- Backend menggunakan Python FastAPI.
- ORM menggunakan SQLAlchemy 2.x.
- Migration menggunakan Alembic.
- API menggunakan REST JSON.
- Database menggunakan MySQL 8+.
- JWT digunakan untuk authentication awal.
- UI mengikuti mockup admin clean yang sudah dibuat.
- Perhitungan SAW hanya dilakukan backend.
- Config SPK menggunakan versioning.
- Ticket list menggunakan server-side pagination.
- File menggunakan authenticated private storage.
- Polling dapat digunakan pada MVP; WebSocket tidak wajib.
- SLA mapping C5 dibuat configurable.
- Pause rule dibuat configurable karena policy final belum ditentukan.

---

# 61. Definition of Done

Satu fitur dianggap selesai apabila:

- backend endpoint tersedia;
- RBAC diterapkan;
- validation tersedia;
- audit event tersedia jika relevan;
- frontend terintegrasi;
- loading state tersedia;
- empty state tersedia;
- error state tersedia;
- responsive basic tersedia;
- unit/integration test penting tersedia;
- tidak menghasilkan console error;
- tidak mem-bypass business rule;
- acceptance criteria terpenuhi.

---

# 62. Ringkasan Modul Final

```text
AUTH
├── Login
├── Logout
├── Session
└── RBAC

TICKETING
├── Create Ticket
├── Ticket List
├── Detail
├── Classification
├── Attachment
├── Comments
├── Worklogs
└── Status

SPK
├── Criteria
├── Weight
├── Normalization
├── SAW Score
├── Ranking
├── Priority Label
├── Config Version
├── Recalculation
└── Manual Override

ASSIGNMENT
├── Assign
├── Reassign
└── Workload

SLA
├── Policy
├── Response Timer
├── Resolution Timer
├── At Risk
├── Breach
├── Pause
└── Escalation

REPORTING
├── Dashboard
├── Report Filter
├── Statistics
├── Export PDF
├── Export Excel
└── Export CSV

ADMIN
├── User
├── Role
├── Master Data
├── SPK Configuration
├── SLA Configuration
└── Audit
```

---

# 63. Final Product Direction

Implementasi akhir harus mempertahankan tiga prinsip utama:

**1. Prioritas dapat dijelaskan**  
User berwenang harus dapat mengetahui mengapa sebuah tiket memiliki skor tertentu.

**2. Histori tidak boleh rusak**  
Perubahan weight, threshold, assignment, status, maupun manual override tidak boleh menghilangkan histori sebelumnya.

**3. UI harus operasional**  
Desain bukan landing page. UI harus terasa seperti aplikasi admin/service desk yang digunakan setiap hari: sederhana, padat informasi, cepat dipahami, dan konsisten dengan mockup HTML yang telah dibuat.
