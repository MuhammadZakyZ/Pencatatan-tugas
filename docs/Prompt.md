# Prompt.md — Prompt untuk Copilot Chat (VSCode)

Gunakan Copilot Chat dengan mode **Agent**. Tempel prompt di bawah ke kolom chat.
Ganti bagian dalam `[...]` sesuai kebutuhan.

---

## 1. Prompt Awal (dipakai SEKALI di sesi pertama)

```
Kamu adalah asisten pengembang untuk proyek "Pencatatan Tugas"
(React.js + Supabase, push otomatis ke GitHub, deploy via Vercel).

LANGKAH WAJIB SEBELUM MENULIS KODE:
1. Baca berurutan: docs/Agent.md, docs/Spec.md, docs/Plan.md, docs/History.md.
2. Ringkas dalam maksimal 5 baris: fase aktif, tugas berikutnya, hambatan.
3. Tunggu konfirmasi saya jika ada tugas yang butuh tindakan manual dari saya
   (membuat repo GitHub, proyek Supabase, mengisi .env, dsb.), lalu beri saya
   langkah-langkahnya secara singkat dan jelas.

CARA KERJA:
- Kerjakan Plan.md berurutan mulai dari Fase 0. Jangan melompat fase.
- Patuhi Agent.md sepenuhnya (aturan keamanan, struktur folder, alur Git).
- Jangan menambah fitur di luar Spec.md.
- Setelah SETIAP tugas selesai: jalankan lint/build -> commit (Conventional
  Commits) -> push ke origin main -> centang Plan.md -> catat di History.md.
- Jika build gagal atau push gagal, BERHENTI dan jelaskan masalahnya.
- Jangan pernah meng-commit .env atau kunci rahasia.

Mulai sekarang: baca keempat dokumen, beri ringkasan, lalu kerjakan Fase 0
sampai batas yang tidak membutuhkan tindakan manual dari saya.
```

---

## 2. Prompt Lanjut Sesi (dipakai di setiap sesi berikutnya)

```
Lanjutkan proyek "Pencatatan Tugas".
Baca docs/Agent.md, docs/Spec.md, docs/Plan.md, dan docs/History.md.
Ringkas status (fase aktif, tugas berikutnya, hambatan) dalam maksimal 5 baris,
lalu kerjakan: [FASE/TUGAS, mis. "Fase 2, tugas 2.1 sampai 2.3"].
Ikuti alur commit & push di Agent.md, dan di akhir sesi tambahkan entri baru di
docs/History.md serta perbarui centang di docs/Plan.md.
```

---

## 3. Prompt Penutup Sesi (bila ingin menutup rapi)

```
Akhiri sesi ini: pastikan semua perubahan sudah di-commit dan di-push, perbarui
docs/Plan.md dan docs/History.md (status saat ini, log sesi, masalah tersisa,
langkah berikutnya yang persis). Lalu beri saya ringkasan 5 baris.
```

---

## 4. Prompt Pendukung (pakai sesuai kebutuhan)

**Perbaiki bug**
```
Ada bug: [jelaskan gejala + langkah memicunya + pesan error].
Cari akar masalahnya dulu, jelaskan singkat, baru perbaiki dengan perubahan
sekecil mungkin. Ikuti alur commit di Agent.md dan catat di History.md.
```

**Tinjau kode (tanpa mengubah)**
```
Tinjau [file/folder] terhadap Agent.md dan Spec.md. Beri daftar temuan
berdasarkan tingkat keparahan (keamanan, bug, kualitas, gaya). Jangan ubah
kode dulu.
```

**Uji keamanan RLS**
```
Periksa supabase/schema.sql dan seluruh pemanggilan Supabase di src/services.
Pastikan RLS aktif dan tidak ada akses yang menembus batas user_id. Beri
langkah uji manual memakai dua akun berbeda.
```

**Bantu dokumentasi tugas kuliah**
```
Berdasarkan Spec.md, Plan.md, dan kode saat ini, buatkan draf bab:
(a) deskripsi sistem, (b) alur pengguna, (c) ERD dalam format Mermaid,
(d) tabel skenario pengujian beserta hasilnya.
```
