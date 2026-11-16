# Pencatatan Tugas

Aplikasi web untuk mencatat dan mengelola tugas kuliah. Pengguna dapat masuk,
menambah, mengubah, mencari, menyaring, mengurutkan, menyelesaikan, dan
menghapus tugas dengan tenggat.

## Teknologi

- React + Vite
- React Router
- Supabase Auth dan PostgreSQL dengan Row Level Security (RLS)

## Menjalankan secara lokal

1. Pasang Node.js versi 20.19+ atau 22.12+.
2. Pasang dependency:

   ```sh
   npm install
   ```

3. Salin `.env.example` menjadi `.env` di root proyek, lalu isi:

   ```env
   VITE_SUPABASE_URL=
   VITE_SUPABASE_ANON_KEY=
   ```

   Gunakan URL proyek dan **anon public key** dari Supabase. Jangan pernah
   menaruh `service_role` key di aplikasi frontend.

4. Jalankan `supabase/schema.sql` melalui Supabase SQL Editor.
5. Jalankan server pengembangan:

   ```sh
   npm run dev
   ```

   Jika PowerShell Windows memblokir `npm.ps1`, gunakan `npm.cmd` sebagai
   pengganti `npm`.

## Perintah

```sh
npm run lint
npm run build
node --test src/lib/taskUtils.test.js
```

Hasil build tersedia di folder `dist/`.

## Deploy ke Vercel

Impor repositori GitHub ke Vercel, gunakan `npm run build` sebagai build
command dan `dist` sebagai output directory. Tambahkan
`VITE_SUPABASE_URL` serta `VITE_SUPABASE_ANON_KEY` di Environment Variables
Vercel. Berkas `vercel.json` mengarahkan rute React Router ke aplikasi.

Setelah deploy, atur Supabase Authentication → URL Configuration agar
`Site URL` dan `Redirect URLs` mencakup domain produksi Vercel.

**Demo:** belum tersedia; aplikasi belum dideploy ke Vercel.
