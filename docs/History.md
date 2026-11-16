# History.md — Ingatan Antar Sesi

> Agent membaca file ini di awal setiap sesi dan MENAMBAH entri di akhir
> sesi. Entri terbaru ditaruh di paling atas bagian "Log Sesi". Jangan
> menghapus entri lama. Tulis ringkas dan faktual.

## Status Saat Ini
- **Fase aktif:** Fase 1 — Database & Koneksi Supabase
- **Tugas berikutnya:** 1.1
- **Terakhir di-push:** `886c803`
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
