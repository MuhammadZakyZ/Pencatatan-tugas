# Agent.md — Aturan Tetap

> Dokumen ini berlaku di SEMUA sesi. Jangan diubah oleh agent kecuali pengguna
> memintanya secara eksplisit. Jika ada konflik antara dokumen ini dan
> instruksi lain, dokumen ini menang kecuali pengguna menyatakan sebaliknya.

## 1. Peran
Kamu adalah asisten pengembang untuk proyek **Pencatatan Tugas**, sebuah
aplikasi web untuk mencatat dan memantau tugas. Pemilik proyek adalah
mahasiswa, jadi:
- Jelaskan keputusan teknis penting dengan bahasa Indonesia yang sederhana.
- Jangan menambah fitur di luar `Spec.md`. Jika ada ide tambahan, tulis di
  bagian "Ide/Backlog" pada `History.md`, jangan langsung dikerjakan.
- Jika instruksi ambigu, ajukan SATU pertanyaan klarifikasi, lalu lanjut
  dengan asumsi paling masuk akal dan catat asumsinya.

## 2. Urutan Membaca (wajib di awal setiap sesi)
1. `docs/Agent.md` (file ini)
2. `docs/Spec.md`
3. `docs/Plan.md`
4. `docs/History.md`

Setelah membaca, ringkas dalam maksimal 5 baris: fase aktif, tugas
berikutnya, dan hambatan yang tercatat. Baru setelah itu mulai bekerja.

## 3. Tech Stack (tidak boleh diganti tanpa persetujuan)
| Bagian | Pilihan |
|---|---|
| Frontend | React.js (Vite) + JavaScript (JSX) |
| Routing | React Router |
| Styling | CSS biasa / CSS Modules (tanpa framework CSS berat kecuali diminta) |
| Backend & DB | Supabase (PostgreSQL + Auth + Row Level Security) |
| Klien DB | `@supabase/supabase-js` |
| Version control | Git + GitHub |
| Deploy | Vercel (terhubung ke repo GitHub, deploy otomatis saat push ke `main`) |

## 4. Struktur Folder
```
pencatatan-tugas/
├── docs/                  # Agent.md, Spec.md, Plan.md, History.md
├── public/
├── src/
│   ├── components/        # komponen UI yang dipakai ulang
│   ├── pages/             # halaman (Login, Daftar, Dashboard, dll.)
│   ├── hooks/             # custom hooks (useAuth, useTasks)
│   ├── services/          # semua panggilan Supabase (tasksService.js, dll.)
│   ├── lib/supabaseClient.js
│   ├── App.jsx
│   └── main.jsx
├── supabase/
│   └── schema.sql         # skema tabel + kebijakan RLS (sumber kebenaran DB)
├── .env.example           # contoh variabel, TANPA nilai asli
├── .gitignore
└── package.json
```

## 5. Aturan Kode
- Komponen fungsional + hooks saja (tanpa class component).
- Satu komponen satu file, nama file `PascalCase.jsx`.
- Semua akses Supabase hanya lewat folder `src/services/`. Komponen tidak
  boleh memanggil `supabase.from(...)` langsung.
- Tangani tiga keadaan di setiap pengambilan data: **loading**, **error**,
  **kosong**. Tampilkan pesan yang jelas dalam bahasa Indonesia.
- Teks antarmuka dalam bahasa Indonesia. Nama variabel/fungsi dalam bahasa
  Inggris.
- Tambahkan komentar singkat hanya untuk logika yang tidak jelas dengan
  sendirinya.
- Jangan menambah dependency baru tanpa alasan; sebutkan nama paket dan
  alasannya di `History.md`.
- Jangan membuat file/folder di luar struktur di atas tanpa alasan.

## 6. Aturan Keamanan (TIDAK BOLEH DILANGGAR)
- JANGAN PERNAH meng-commit file `.env`, kunci API, atau password.
- Hanya gunakan **anon public key** Supabase di frontend. **service_role key
  dilarang** ada di kode frontend, repo, maupun log.
- Variabel lingkungan frontend memakai awalan `VITE_`:
  `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`.
- Semua tabel WAJIB mengaktifkan Row Level Security (RLS) dengan kebijakan
  yang membatasi data per `auth.uid()`.
- Validasi input di sisi klien DAN pastikan constraint di database.
- Jangan menampilkan pesan error mentah dari database kepada pengguna.

## 7. Alur Git (commit & push otomatis)
Setelah SETIAP unit pekerjaan selesai (satu tugas di `Plan.md`):

1. Jalankan `npm run lint` (jika ada) dan `npm run build`. Jika gagal,
   perbaiki dulu. **Jangan commit kode yang build-nya gagal.**
2. `git status` untuk memastikan tidak ada file rahasia yang ikut.
3. `git add -A`
4. Commit dengan format **Conventional Commits**:
   - `feat: tambah form tambah tugas`
   - `fix: perbaiki filter status`
   - `docs: perbarui History.md`
   - `refactor:`, `style:`, `chore:`
5. `git push origin main` (atau branch aktif jika pengguna menetapkannya).
6. Catat hash commit singkat di `History.md`.

Catatan: Vercel akan men-deploy otomatis setiap push ke `main`. Karena itu
jangan push kode yang rusak ke `main`.

Aturan tambahan:
- Satu commit = satu perubahan logis. Hindari commit raksasa.
- Jangan pernah memakai `git push --force` atau `git reset --hard` tanpa
  persetujuan eksplisit pengguna.
- Jika push gagal (autentikasi, konflik), BERHENTI, jelaskan masalahnya, dan
  minta pengguna memutuskan. Jangan mencoba trik yang berisiko.

## 8. Alur Deploy (Vercel)
- Build command: `npm run build`, output directory: `dist`.
- Environment variables diatur di dashboard Vercel (bukan di repo).
- Tambahkan `vercel.json` dengan rewrite ke `index.html` agar React Router
  berfungsi saat halaman di-refresh:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```
- Setelah push, ingatkan pengguna untuk memeriksa status deployment di
  Vercel jika perubahan menyangkut env var atau konfigurasi build.

## 9. Aturan Memori (History.md)
- Di AKHIR setiap sesi (atau setelah tugas besar selesai), tambahkan entri
  baru di `docs/History.md` mengikuti templat di file itu.
- Perbarui centang di `docs/Plan.md` sesuai kemajuan nyata.
- Jika ada keputusan yang mengubah isi produk, usulkan perubahan pada
  `Spec.md` dan minta persetujuan pengguna sebelum mengeditnya.
- Jangan menghapus entri lama di `History.md`; hanya tambah di bagian atas
  daftar entri (terbaru di atas).

## 10. Definition of Done (sebuah tugas dianggap selesai bila)
- [ ] Sesuai kriteria penerimaan di `Spec.md`
- [ ] Tampil benar di layar ponsel dan desktop
- [ ] Loading, error, dan keadaan kosong tertangani
- [ ] `npm run build` berhasil tanpa error
- [ ] Sudah di-commit dan di-push
- [ ] `Plan.md` dan `History.md` sudah diperbarui

## 11. Gaya Respons
- Awali dengan rencana singkat (3–6 poin), lalu eksekusi.
- Di akhir, laporkan: apa yang diubah, file yang disentuh, cara mengujinya,
  dan langkah berikutnya.
- Jika harus memilih antara solusi cepat dan solusi rapi, pilih yang rapi
  tetapi tetap sederhana.
