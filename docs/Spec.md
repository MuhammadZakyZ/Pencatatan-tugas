# Spec.md — Spesifikasi Produk

> Sumber kebenaran untuk APA yang dibangun. Perubahan hanya dengan
> persetujuan pengguna. Cara membangunnya ada di `Plan.md`.

## 1. Ringkasan
**Pencatatan Tugas** adalah aplikasi web untuk mencatat, mengelola, dan
memantau tugas (misalnya tugas kuliah). Pengguna masuk dengan akun, lalu
dapat menambah, melihat, mengubah, menyelesaikan, dan menghapus tugas
miliknya sendiri.

**Target pengguna:** mahasiswa/pelajar yang ingin daftar tugas rapi dengan
tenggat yang jelas.

**Tujuan utama:** pengguna selalu tahu tugas apa yang harus dikerjakan,
mana yang mendekati tenggat, dan mana yang sudah selesai.

## 2. Ruang Lingkup

### Termasuk (MVP)
1. Registrasi, login, logout (email + password via Supabase Auth)
2. CRUD tugas (tambah, lihat, ubah, hapus)
3. Tandai tugas selesai / belum selesai
4. Prioritas (rendah, sedang, tinggi) dan kategori/mata kuliah
5. Tenggat (tanggal) dengan penanda "terlambat" dan "hari ini"
6. Pencarian, filter (status, prioritas, kategori), dan pengurutan
7. Dashboard ringkasan (jumlah total, selesai, belum, terlambat)
8. Tampilan responsif (ponsel & desktop)

### Tidak termasuk (di luar MVP — taruh di Backlog)
- Notifikasi/pengingat email atau push
- Berbagi tugas antar pengguna / kolaborasi
- Lampiran file
- Mode gelap, multi-bahasa
- Aplikasi mobile native

## 3. Halaman & Alur

| Rute | Halaman | Akses |
|---|---|---|
| `/login` | Masuk | Publik |
| `/daftar` | Daftar akun | Publik |
| `/` | Dashboard + daftar tugas | Wajib login |
| `/tugas/baru` | Form tambah tugas | Wajib login |
| `/tugas/:id/ubah` | Form ubah tugas | Wajib login |
| `*` | Halaman 404 | Publik |

Aturan alur:
- Pengguna belum login yang membuka halaman terlindungi diarahkan ke `/login`.
- Pengguna sudah login yang membuka `/login` atau `/daftar` diarahkan ke `/`.
- Setelah login/daftar berhasil → `/`.

## 4. Model Data (Supabase / PostgreSQL)

### Tabel `tasks`
| Kolom | Tipe | Aturan |
|---|---|---|
| `id` | uuid | PK, default `gen_random_uuid()` |
| `user_id` | uuid | FK → `auth.users(id)`, default `auth.uid()`, NOT NULL, `ON DELETE CASCADE` |
| `title` | text | NOT NULL, 1–120 karakter |
| `description` | text | opsional, maks 1000 karakter |
| `category` | text | opsional, maks 50 karakter (mis. nama mata kuliah) |
| `priority` | text | `low` / `medium` / `high`, default `medium` |
| `status` | text | `todo` / `done`, default `todo` |
| `due_date` | date | opsional |
| `completed_at` | timestamptz | diisi saat status menjadi `done` |
| `created_at` | timestamptz | default `now()` |
| `updated_at` | timestamptz | default `now()`, diperbarui lewat trigger |

### Skema SQL awal (simpan di `supabase/schema.sql`)
```sql
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  description text check (char_length(description) <= 1000),
  category text check (char_length(category) <= 50),
  priority text not null default 'medium'
    check (priority in ('low','medium','high')),
  status text not null default 'todo'
    check (status in ('todo','done')),
  due_date date,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tasks_user_due_idx
  on public.tasks (user_id, due_date);

-- trigger updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists tasks_set_updated_at on public.tasks;
create trigger tasks_set_updated_at
  before update on public.tasks
  for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.tasks enable row level security;

create policy "Pengguna melihat tugas sendiri"
  on public.tasks for select
  using (auth.uid() = user_id);

create policy "Pengguna menambah tugas sendiri"
  on public.tasks for insert
  with check (auth.uid() = user_id);

create policy "Pengguna mengubah tugas sendiri"
  on public.tasks for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Pengguna menghapus tugas sendiri"
  on public.tasks for delete
  using (auth.uid() = user_id);
```

## 5. Kebutuhan Fungsional & Kriteria Penerimaan

### F1 — Autentikasi
- Daftar: email valid + password minimal 8 karakter + konfirmasi password.
- Login: pesan error umum ("Email atau password salah") tanpa membocorkan
  mana yang salah.
- Logout tersedia di header; sesi tetap tersimpan saat halaman di-refresh.
- **Diterima bila:** pengguna dapat daftar, login, refresh tanpa keluar,
  dan logout; halaman terlindungi tidak bisa dibuka tanpa login.

### F2 — Tambah tugas
- Field: judul (wajib), deskripsi, kategori, prioritas, tenggat.
- Validasi: judul tidak kosong dan ≤ 120 karakter; tenggat boleh hari ini
  atau setelahnya (boleh kosong).
- **Diterima bila:** tugas baru langsung muncul di daftar setelah disimpan
  dan tersimpan permanen di Supabase.

### F3 — Lihat daftar tugas
- Kartu/baris menampilkan: judul, kategori, prioritas (label berwarna),
  tenggat, status.
- Penanda: **Terlambat** (tenggat < hari ini & belum selesai),
  **Hari ini** (tenggat = hari ini).
- Keadaan kosong: pesan ramah + tombol "Tambah tugas pertama".
- **Diterima bila:** pengguna hanya melihat tugas miliknya sendiri.

### F4 — Ubah & hapus tugas
- Ubah memakai form yang sama dengan tambah (terisi data lama).
- Hapus meminta konfirmasi sebelum dieksekusi.
- **Diterima bila:** perubahan/penghapusan tercermin di UI dan database.

### F5 — Tandai selesai
- Satu klik pada checkbox mengubah status `todo` ⇄ `done`;
  `completed_at` terisi/null sesuai status.
- Tugas selesai tampil dengan gaya dicoret/redup.
- **Diterima bila:** status bertahan setelah refresh.

### F6 — Cari, filter, urutkan
- Cari berdasarkan judul (tidak peka huruf besar/kecil).
- Filter: status (semua/belum/selesai), prioritas, kategori.
- Urutkan: tenggat terdekat (default), prioritas, terbaru dibuat.
- **Diterima bila:** kombinasi pencarian + filter + urutan bekerja bersamaan.

### F7 — Dashboard ringkasan
- Kartu angka: Total, Belum selesai, Selesai, Terlambat.
- **Diterima bila:** angka akurat dan ikut berubah saat data berubah.

## 6. Kebutuhan Non-Fungsional
- **Responsif:** nyaman dipakai di lebar 360px hingga desktop.
- **Performa:** halaman utama terbuka < 3 detik pada koneksi normal.
- **Aksesibilitas dasar:** label pada input, fokus keyboard terlihat,
  kontras warna cukup, tombol ikon punya `aria-label`.
- **Keamanan:** sesuai bagian 6 pada `Agent.md` dan RLS di atas.
- **Kualitas:** `npm run build` bersih tanpa error.

## 7. Arah Desain
- Bersih, sederhana, fokus pada keterbacaan.
- Palet: satu warna aksen (biru/teal), latar putih/abu muda.
- Prioritas: rendah = hijau, sedang = kuning, tinggi = merah.
- Satu kolom di ponsel; di desktop dashboard di atas, daftar di bawah.

## 8. Variabel Lingkungan
| Nama | Keterangan |
|---|---|
| `VITE_SUPABASE_URL` | URL proyek Supabase |
| `VITE_SUPABASE_ANON_KEY` | Anon public key Supabase |

`.env.example` hanya berisi nama variabel, tanpa nilai.

## 9. Backlog Ide (belum dikerjakan)
- Pengingat tenggat via email
- Tampilan kalender
- Subtugas / checklist
- Mode gelap
- Ekspor ke CSV
