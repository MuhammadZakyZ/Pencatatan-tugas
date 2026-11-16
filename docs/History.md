# History.md — Ingatan Antar Sesi

> Agent membaca file ini di awal setiap sesi dan MENAMBAH entri di akhir
> sesi. Entri terbaru ditaruh di paling atas bagian "Log Sesi". Jangan
> menghapus entri lama. Tulis ringkas dan faktual.

## Status Saat Ini
- **Fase aktif:** Fase 2 — Autentikasi
- **Tugas berikutnya:** 2.5
- **Terakhir di-push:** `30837a2`
- **URL produksi (Vercel):** belum ada
- **Hambatan terbuka:** uji end-to-end masuk, refresh sesi, dan keluar dengan akun nyata belum dilakukan

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
