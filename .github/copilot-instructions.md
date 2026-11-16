# Instruksi Copilot untuk proyek Pencatatan Tugas

File ini dibaca otomatis oleh GitHub Copilot di VSCode.

Sebelum menjawab atau menulis kode, baca berurutan:
1. docs/Agent.md  (aturan tetap: stack, keamanan, alur Git, alur deploy)
2. docs/Spec.md   (isi produk: fitur, data, kriteria penerimaan)
3. docs/Plan.md   (urutan kerja dan status tugas)
4. docs/History.md (ingatan antar sesi)

Aturan inti:
- Stack: React.js (Vite, JavaScript) + Supabase. Jangan ganti tanpa persetujuan.
- Jangan pernah meng-commit .env atau service_role key. Hanya pakai anon key.
- Semua akses Supabase lewat src/services/.
- Jangan tambah fitur di luar docs/Spec.md.
- Setelah tiap tugas: build -> commit (Conventional Commits) -> push -> update
  docs/Plan.md dan docs/History.md.
- Teks antarmuka bahasa Indonesia; kode/identifier bahasa Inggris.
