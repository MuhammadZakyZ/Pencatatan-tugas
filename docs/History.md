# History.md — Ingatan Antar Sesi

> Agent membaca file ini di awal setiap sesi dan MENAMBAH entri di akhir
> sesi. Entri terbaru ditaruh di paling atas bagian "Log Sesi". Jangan
> menghapus entri lama. Tulis ringkas dan faktual.

## Status Saat Ini
- **Fase aktif:** Fase 5 — Poles & Kualitas
- **Tugas berikutnya:** 5.1
- **Terakhir di-push:** `dd46c1c`
- **URL produksi (Vercel):** belum ada
- **Hambatan terbuka:** tidak ada

## Keputusan Penting (permanen)
| Tanggal | Keputusan | Alasan |
|---|---|---|
| (awal) | Vite + React (JavaScript), bukan Next.js | Sederhana, cocok untuk SPA + Supabase |
| (awal) | Autentikasi email + password Supabase | Cukup untuk MVP |
| (awal) | Deploy otomatis via integrasi GitHub–Vercel | Tidak perlu skrip deploy manual |

## Asumsi yang Dipakai
- (kosong — agent menambahkan di sini bila membuat asumsi)

## Masalah Diketahui / Utang Teknis
- (kosong)

## Ide / Backlog (belum disetujui)
- (kosong)

## Dependency yang Ditambahkan
| Paket | Versi | Alasan |
|---|---|---|
| `@supabase/supabase-js` | `^2.119.0` | Klien resmi untuk koneksi Supabase |
| `react-router-dom` | `^7.18.5` | Routing aplikasi React |

---

## Templat Entri Sesi (salin, isi, taruh di atas Log Sesi)

```
### Sesi N — YYYY-MM-DD
**Fase/Tugas:** (mis. Fase 2, tugas 2.1–2.3)
**Dikerjakan:**
- ...
**File diubah/dibuat:**
- ...
**Commit:** `abc1234` feat: ...  (push: berhasil/gagal)
**Cara menguji:** ...
**Keputusan/Asumsi baru:** ...
**Masalah tersisa:** ...
**Langkah berikutnya:** (tugas persis di Plan.md)
```

---

## Log Sesi

### Sesi 7 — 2026-11-16
**Fase/Tugas:** Fase 3 tugas 3.8 dan Fase 4 tugas 4.1–4.5
**Dikerjakan:**
- Menandai tugas 3.8 berhasil berdasarkan konfirmasi pengguna.
- Menambahkan penanda tenggat "Terlambat" dan "Hari ini", pencarian judul, filter gabungan, dan pilihan pengurutan.
- Menambahkan kartu ringkasan total, belum selesai, selesai, dan terlambat.
- Menambahkan empat tes helper untuk penanda tenggat, kombinasi filter, pengurutan, dan ringkasan.
- Lint, build, dan tes Node berhasil.
**File diubah/dibuat:**
- `src/pages/DashboardPage.jsx`, `src/components/TaskCard.jsx`, `src/App.css`
- `src/lib/taskUtils.js`, `src/lib/taskUtils.test.js`, `docs/Plan.md`
**Commit:** `dd46c1c` feat: add task search and dashboard insights (push: berhasil)
**Cara menguji:** `npm run lint`; `npm run build`; `node --test src/lib/taskUtils.test.js`.
**Keputusan/Asumsi baru:** Urutan prioritas adalah tinggi, sedang, rendah; ringkasan selalu menghitung seluruh tugas meski daftar sedang difilter.
**Masalah tersisa:** Tidak ada yang diketahui.
**Langkah berikutnya:** Fase 5, tugas 5.1 — uji responsif pada lebar 360px, 768px, dan 1280px.

### Sesi 6 — 2026-11-16
**Fase/Tugas:** Fase 3, tugas 3.8 (menunggu uji manual pengguna)
**Dikerjakan:**
- Memulai kembali server Vite lokal setelah menemukan server sebelumnya tidak aktif.
- Memastikan rute `/login` merespons HTTP 200 dan menyiapkan halaman masuk di browser.
- Tidak memasukkan kredensial atau melakukan perubahan data Supabase.
**File diubah/dibuat:** `docs/History.md`
**Commit:** belum dibuat
**Cara menguji:** Masuk sendiri di `http://127.0.0.1:5173/login`, lalu uji CRUD dengan akun Supabase.
**Keputusan/Asumsi baru:** Tidak ada.
**Masalah tersisa:** Uji tambah, lihat, ubah, tandai selesai, refresh, dan hapus menunggu pengguna masuk dan mengonfirmasi hasilnya.
**Langkah berikutnya:** Selesaikan uji manual tugas 3.8.

### Sesi 5 — 2026-11-16
**Fase/Tugas:** Fase 3, tugas 3.1–3.7
**Dikerjakan:**
- Membuat layanan dan hook tugas dengan loading/error serta pesan aman.
- Menambahkan daftar tugas, form tambah/ubah, konfirmasi hapus, dan checkbox selesai dengan `completed_at`.
- Melengkapi dashboard terlindungi dan route form tugas.
- Menjalankan lint/build dan smoke test route terlindungi; tidak membuat atau mengubah data akun nyata saat pengujian.
**File diubah/dibuat:**
- `src/services/tasksService.js`, `src/hooks/useTasks.js`
- `src/components/TaskCard.jsx`, `src/components/TaskForm.jsx`
- `src/pages/DashboardPage.jsx`, `src/pages/TaskFormPage.jsx`
- `src/App.jsx`, `src/App.css`, `docs/Plan.md`
**Commit:** `8b385c0` feat: add task CRUD flow (push: berhasil)
**Cara menguji:** `npm run lint`; `npm run build`; masuk ke aplikasi lalu uji CRUD dengan akun sendiri.
**Keputusan/Asumsi baru:** Tidak ada.
**Masalah tersisa:** Perlu menguji simpan, ubah, tandai selesai, refresh, dan hapus pada akun Supabase.
**Langkah berikutnya:** Fase 3, tugas 3.8 — uji CRUD end-to-end dengan akun Supabase.

### Sesi 4 — 2026-11-16
**Fase/Tugas:** Fase 2, tugas 2.1–2.5 (implementasi; verifikasi E2E tertunda)
**Dikerjakan:**
- Membuat layanan autentikasi dan hook `useAuth` untuk sesi, daftar, masuk, dan keluar.
- Membuat halaman masuk/daftar, validasi pendaftaran, route terlindungi, dan pengalihan untuk pengguna yang sudah masuk.
- Membuat halaman awal terlindungi dan header dengan tombol keluar.
- Menjalankan lint/build dan smoke test browser untuk redirect tamu, formulir daftar, ketidakcocokan kata sandi, dan lebar 360px.
**File diubah/dibuat:**
- `src/App.jsx`, `src/App.css`, `src/index.css`
- `src/services/authService.js`, `src/hooks/`, `src/components/`, `src/pages/`
- `docs/Plan.md`
**Commit:** `30837a2` feat: add Supabase authentication flow (push: berhasil)
**Cara menguji:** `npm run lint`; `npm run build`; buka `/` sebagai tamu untuk memastikan diarahkan ke `/login`.
**Keputusan/Asumsi baru:** Tidak ada.
**Masalah tersisa:** Perlu menguji daftar, masuk, refresh sesi, dan keluar menggunakan akun nyata sebelum F1 dinyatakan terverifikasi.
**Langkah berikutnya:** Fase 2, tugas 2.5 — verifikasi header keluar dan sesi setelah refresh.

### Sesi 3 — 2026-11-16
**Fase/Tugas:** Fase 1, tugas 1.2–1.5
**Dikerjakan:**
- Memastikan tabel `public.tasks` dapat diakses melalui Supabase REST API.
- Membuat klien Supabase yang membaca `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`.
- Memindahkan `.env` lokal ke root agar dibaca Vite; file tetap diabaikan Git.
- Menguji query tanpa mengambil baris data melalui klien yang dimuat Vite; berhasil.
- Menjalankan lint dan build; keduanya berhasil.
**File diubah/dibuat:**
- `src/lib/supabaseClient.js`
- `docs/Plan.md`
- `.env` lokal dipindahkan dari `supabase/.env` ke root (tidak di-commit).
**Commit:** `6cf30c4` feat: connect Supabase client (push: berhasil)
**Cara menguji:** Query `select('id').limit(0)` berhasil melalui klien Supabase.
**Keputusan/Asumsi baru:** Tidak ada.
**Masalah tersisa:** Tidak ada.
**Langkah berikutnya:** Fase 2, tugas 2.1 — buat hook `useAuth`.

### Sesi 2 — 2026-11-16
**Fase/Tugas:** Fase 1, tugas 1.1
**Dikerjakan:**
- Menambahkan skema tabel `tasks`, constraint, indeks, trigger `updated_at`, dan kebijakan RLS per pengguna sesuai Spec.
- Menjalankan lint dan build; keduanya berhasil.
**File diubah/dibuat:**
- `supabase/schema.sql`
- `docs/Plan.md`
**Commit:** `1b0c3bd` feat: add tasks database schema (push: berhasil)
**Cara menguji:** `npm run lint`; `npm run build`.
**Keputusan/Asumsi baru:** Tidak ada.
**Masalah tersisa:** Skema belum dijalankan di Supabase.
**Langkah berikutnya:** Fase 1, tugas 1.2 — jalankan `supabase/schema.sql` di Supabase SQL Editor.

### Sesi 1 — 2026-11-16
**Fase/Tugas:** Fase 0, tugas 0.1–0.11
**Dikerjakan:**
- Menyiapkan proyek Vite + React, memasang dependency Supabase dan React Router, serta membuat struktur folder.
- Menambahkan aturan pengabaian `.env`, `.env.example`, dan rewrite Vercel.
- Menjalankan lint dan build; keduanya berhasil.
**File diubah/dibuat:**
- Kerangka Vite, `package.json`, `package-lock.json`, `.gitignore`, `.env.example`, `vercel.json`, dan folder `src/` serta `supabase/`.
- Memperbarui `docs/Plan.md`.
**Commit:** `886c803` chore: initialize Vite and Supabase project (push: berhasil)
**Cara menguji:** `npm run lint`; `npm run build`.
**Keputusan/Asumsi baru:** URL dan anon key Supabase disiapkan pengguna secara lokal; tidak dimasukkan ke repo atau chat.
**Masalah tersisa:** Tidak ada.
**Langkah berikutnya:** Fase 1, tugas 1.1 — simpan skema dari `Spec.md` ke `supabase/schema.sql`.

### Sesi 0 — (isi tanggal)
**Fase/Tugas:** Penyusunan dokumen
**Dikerjakan:**
- Membuat Agent.md, Spec.md, Plan.md, History.md
**File diubah/dibuat:**
- docs/Agent.md, docs/Spec.md, docs/Plan.md, docs/History.md
**Commit:** belum ada
**Langkah berikutnya:** Fase 0, tugas 0.1
