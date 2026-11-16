# Plan.md — Peta Rencana

> Urutan KERJA proyek. Kerjakan fase secara berurutan. Centang `[x]` hanya
> bila tugas benar-benar selesai (lolos Definition of Done di `Agent.md`).
> Satu tugas = satu commit (atau lebih), lalu push.

**Fase aktif:** Fase 3
**Tugas berikutnya:** 3.8

---

## Fase 0 — Persiapan (dikerjakan pengguna + agent)

### Dikerjakan manual oleh pengguna (satu kali)
- [x] 0.1 Buat repositori GitHub kosong bernama `pencatatan-tugas`
- [x] 0.2 Buat proyek di [supabase.com](https://supabase.com); catat
      **Project URL** dan **anon public key** (Settings → API)
- [x] 0.3 Di Supabase: Authentication → Providers → pastikan Email aktif
      (untuk uji coba, boleh matikan "Confirm email" agar tidak perlu verifikasi)
- [x] 0.4 Pastikan Git terpasang dan sudah login ke GitHub di VSCode
      (`git config user.name` / `user.email` terisi)
- [x] 0.5 Buka folder proyek di VSCode, aktifkan Copilot Chat → mode **Agent**

### Dikerjakan agent
- [x] 0.6 Inisialisasi proyek: `npm create vite@latest . -- --template react`
- [x] 0.7 Pasang dependency: `@supabase/supabase-js`, `react-router-dom`
- [x] 0.8 Buat struktur folder sesuai `Agent.md` bagian 4
- [x] 0.9 Buat `.gitignore` (pastikan `.env*` kecuali `.env.example` diabaikan)
- [x] 0.10 Buat `.env.example` dan `vercel.json` (lihat `Agent.md` bagian 8)
- [x] 0.11 `git init`, hubungkan `origin` ke repo GitHub, commit awal, push ke `main`

**Selesai bila:** repo berisi kerangka proyek, `npm run dev` berjalan,
`npm run build` sukses.

---

## Fase 1 — Database & Koneksi Supabase
- [x] 1.1 Simpan skema dari `Spec.md` bagian 4 ke `supabase/schema.sql`
- [x] 1.2 (Pengguna) Jalankan isi `schema.sql` di Supabase → SQL Editor
- [x] 1.3 Buat `src/lib/supabaseClient.js` membaca env `VITE_*`
- [x] 1.4 Buat `.env` lokal (pengguna mengisi nilainya; JANGAN di-commit)
- [x] 1.5 Uji koneksi sederhana (mis. query kosong) dan tangani error

**Selesai bila:** aplikasi dapat terhubung ke Supabase tanpa error di konsol.

---

## Fase 2 — Autentikasi
- [x] 2.1 Hook `useAuth` (sesi, pengguna, `signUp`, `signIn`, `signOut`)
- [x] 2.2 Halaman Daftar `/daftar` + validasi (F1)
- [x] 2.3 Halaman Masuk `/login` + pesan error umum
- [x] 2.4 Komponen `ProtectedRoute` dan pengalihan sesuai aturan alur
- [x] 2.5 Header dengan tombol Logout; sesi bertahan saat refresh

**Selesai bila:** kriteria penerimaan F1 terpenuhi.

---

## Fase 3 — CRUD Tugas
- [x] 3.1 `services/tasksService.js` (getTasks, createTask, updateTask, deleteTask)
- [x] 3.2 Hook `useTasks` (state, loading, error)
- [x] 3.3 Halaman daftar tugas + keadaan loading/error/kosong (F3)
- [x] 3.4 Form tambah tugas + validasi (F2)
- [x] 3.5 Form ubah tugas memakai form yang sama (F4)
- [x] 3.6 Hapus dengan dialog konfirmasi (F4)
- [x] 3.7 Checkbox selesai/belum + `completed_at` (F5)
- [ ] 3.8 (Pengguna) Uji tambah, lihat, ubah, hapus, dan tandai selesai dengan akun Supabase

**Selesai bila:** F2, F3, F4, F5 terpenuhi dan data tersimpan di Supabase; tugas 3.8 lolos.

---

## Fase 4 — Fitur Pelengkap
- [ ] 4.1 Penanda "Terlambat" dan "Hari ini"
- [ ] 4.2 Pencarian judul (F6)
- [ ] 4.3 Filter status, prioritas, kategori (F6)
- [ ] 4.4 Pengurutan (F6)
- [ ] 4.5 Dashboard ringkasan (F7)

**Selesai bila:** F6 dan F7 terpenuhi.

---

## Fase 5 — Poles & Kualitas
- [ ] 5.1 Responsif di 360px, 768px, 1280px
- [ ] 5.2 Aksesibilitas dasar (label, fokus, aria-label)
- [ ] 5.3 Halaman 404
- [ ] 5.4 Rapikan teks, pesan error, dan gaya visual
- [ ] 5.5 Bersihkan kode: hapus `console.log`, kode mati, impor tak terpakai
- [ ] 5.6 Tulis `README.md` (deskripsi, cara menjalankan, daftar env, tautan demo)

---

## Fase 6 — Deploy ke Vercel
- [ ] 6.1 (Pengguna) Vercel → Add New Project → Import repo GitHub
- [ ] 6.2 (Pengguna) Isi Environment Variables `VITE_SUPABASE_URL` dan
      `VITE_SUPABASE_ANON_KEY` di Vercel, lalu Deploy
- [ ] 6.3 (Pengguna) Supabase → Authentication → URL Configuration:
      isi **Site URL** dengan domain Vercel dan tambahkan ke **Redirect URLs**
- [ ] 6.4 Uji di URL produksi: daftar, login, CRUD, refresh di rute dalam
- [ ] 6.5 Pastikan push berikutnya ke `main` ter-deploy otomatis

**Selesai bila:** semua fitur MVP berjalan di URL Vercel.

---

## Fase 7 — Serah Terima / Dokumentasi Tugas Kuliah (opsional)
- [ ] 7.1 Tangkapan layar tiap halaman
- [ ] 7.2 Diagram alur & ERD sederhana (boleh Mermaid di README)
- [ ] 7.3 Ringkasan pengujian (tabel skenario uji vs hasil)

---

## Catatan Risiko
| Risiko | Pencegahan |
|---|---|
| Kunci rahasia ikut ter-commit | `.gitignore` + cek `git status` sebelum commit |
| Halaman 404 saat refresh di Vercel | `vercel.json` rewrite |
| Data pengguna bocor antar akun | RLS aktif + diuji dengan 2 akun berbeda |
| Build gagal ter-deploy | Wajib `npm run build` sebelum push |
