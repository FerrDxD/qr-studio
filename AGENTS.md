# AGENTS.md — AI Coding Assistant Instructions & Project Rules

Dokumen ini adalah panduan operasional wajib bagi AI Agent yang menulis, memodifikasi, atau melakukan *debugging* kode di repositori **QRStudio**.

## 1. Konteks & Identitas Proyek
* **Nama Proyek:** QRStudio (Local-First QR Code Generator).
* **Sifat Aplikasi:** 100% Client-Side Web Application. **DILARANG** menambahkan kode backend, endpoint API eksternal untuk pembuatan QR, atau analitik pelacak pihak ketiga.
* **Referensi Dokumen:** Selalu patuhi spesifikasi fitur di `PRD.md`, struktur folder & tipe data di `ARCHITECT.md`, serta token visual di `DESIGN.md`.

## 2. Aturan Penulisan Kode (Coding Standards)
1. **Strict TypeScript:**
   * Jangan pernah menggunakan tipe `any`. Gunakan `unknown` atau definisikan *interface* secara eksplisit di `src/types/qr.types.ts`.
   * Pastikan semua fungsi pemformat *payload* memiliki tipe *input* dan *return* `string` yang ketat.
2. **Pemisahan Logika Bisnis & UI (Separation of Concerns):**
   * Komponen React di `src/components/` hanya bertugas menangani tampilan dan *event* pengguna.
   * Perhitungan rasio kontras warna, perakitan format string `WIFI:` / `BEGIN:VCARD`, dan konversi *file blob* **wajib** ditempatkan di dalam `src/core/` sebagai *pure functions* (fungsi murni yang mudah diuji tanpa perlu me-render DOM).
3. **Zero External Network Dependency untuk QR:**
   * Jangan pernah menggunakan API gambar eksternal seperti `api.qrserver.com` atau `chart.googleapis.com`. Semua *rendering* harus menggunakan *library* lokal di dalam browser (`qr-code-styling` atau `qrcode`).

## 3. Urutan Implementasi Bertahap (Step-by-Step Execution Plan)
Jika pengguna meminta untuk membangun proyek dari awal, kerjakan secara berurutan per fase berikut dan pastikan tiap fase bebas *error* sebelum lanjut:

* **Fase 1 — Core & Types:**
  1. Buat `src/types/qr.types.ts` sesuai skema di `ARCHITECT.md`.
  2. Buat `src/core/payloadFormatters.ts` (dukung URL, Text, Wi-Fi, vCard, WhatsApp) beserta fungsi *escape character* untuk karakter spesial (`;`, `:`, `,`) pada string Wi-Fi.
  3. Buat `src/core/contrastChecker.ts` untuk menghitung *relative luminance* antara `fgColor` dan `bgColor`.
* **Fase 2 — QR Engine & State Hook:**
  1. Buat `src/core/qrEngine.ts` untuk membungkus inisialisasi, pembaruan (`update()`), dan pengunduhan (`download()`) kanvas/SVG.
  2. Buat `src/hooks/useQRConfig.ts` dengan nilai *default* yang aman dan sinkronisasi otomatis ke `localStorage`.
* **Fase 3 — UI Workspace & Controls:**
  1. Bangun *layout* 2 kolom responsif (`SplitWorkspace.tsx`) sesuai `DESIGN.md`.
  2. Bangun komponen kontrol tab *payload*, kustomisasi warna/bentuk, dan unggah logo lokal (`FileReader` ke Base64).
* **Fase 4 — Ekspor, Clipboard, & History:**
  1. Implementasikan tombol unduh `PNG`, `SVG`, `WebP`, dan fitur *Copy Image to Clipboard* menggunakan `navigator.clipboard.write([new ClipboardItem(...)])`.
  2. Tambahkan laci *Local History* dan fitur Import/Export konfigurasi `.json`.

## 4. Guardrails & Penanganan Edge-Case Wajib
* **Memory Leak Prevention:** Saat pengguna mengganti logo berkali-kali, bersihkan URL objek sementara (`URL.revokeObjectURL`) atau batasi ukuran unggahan gambar maksimal `2MB` sebelum dikonversi ke Base64.
* **Empty Payload Fallback:** Jika kolom input pengguna masih kosong (`""`), jangan biarkan kanvas QR *crash* atau hilang; gunakan nilai *fallback* sementara (misalnya `"https://example.com"`) dengan opasitas kanvas sedikit diredupkan (`opacity-60`) sebagai indikator *placeholder*.
* **High-DPI Export Accuracy:** Ukuran pratinjau di layar harus dikunci agar pas dengan kartu UI (misal `300x300 px` menggunakan CSS), namun saat tombol **Unduh** ditekan, *generate* ulang instance QR di memori sesuai resolusi pilihan pengguna (misal `1024x1024 px` atau `2048x2048 px`) agar hasil unduhan tidak pecah.

## 5. Perintah Verifikasi (Self-Check sebelum Selesai)
Sebelum menyatakan tugas selesai, AI Agent harus memastikan:
- [ ] `npm run build` / `tsc --noEmit` berjalan tanpa *error* tipe data.
- [ ] Saat logo diunggah, `errorCorrectionLevel` otomatis berubah ke `'Q'` atau `'H'`.
- [ ] Peringatan kontras muncul ketika warna titik diatur menjadi putih (`#FFFFFF`) di atas latar putih (`#FFFFFF`).
- [ ] Hasil unduhan `.svg` dan `.png` dapat dipindai dengan aplikasi kamera standar.