# QRStudio

<p align="center">
  <img src="https://img.shields.io/badge/status-aktif-brightgreen?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/versi-0.1.0-indigo?style=for-the-badge" alt="Versi" />
  <img src="https://img.shields.io/badge/lisans-MIT-blue?style=for-the-badge" alt="Lisensi" />
  <img src="https://img.shields.io/badge/bahasa-Indonesia-orange?style=for-the-badge" alt="Bahasa" />
</p>

<p align="center">
  <b>Generator QR Code lokal-prioritas, buat siapa saja, sepenuhnya di browser.</b><br>
  Tanpa server, tanpa akun, tanpa pelacak, tanpa batasan resolusi.
</p>

---

## 🎯 Tentang QRStudio

QRStudio adalah aplikah web *client-side* 100% untuk membuat, mengkustomisasi, dan mengekspor QR Code berkualitas tinggi secara instan. Semua pemrosesan terjadi di dalam browser pengguna — data Anda (termasuk sandi Wi-Fi) tidak pernah meninggalkan perangkat.

Dengan estetika **Tactile Studio** (border 1px yang tegas, dark mode default, split-screen ergonomis), QRStudio dirancang untuk pelajar, sekolah, kreator, dan UMKM yang butuh QR Code yang bisa langsung dipindai dan dicetak.

### Keunggulan Utama

| Fitur | Detail |
| :--- | :--- |
| 🔗 **5 Tipe Payload** | URL, Teks, Wi-Fi, vCard, WhatsApp |
| 🎨 **Kustomisasi Penuh** | Warna titik & latar, bentuk modul, sudut pencari |
| 🖼️ **Logo Tengah** | Unggah gambar lokal (PNG/JPG/SVG), maks 2 MB |
| 🛡️ **Error Correction** | L / M / Q / H — naik otomatis ke Q saat logo dipasang |
| 📥 **Ekspor Multi-Format** | PNG, SVG, WebP hingga 2048×2048 px |
| 📋 **Clipboard** | Salin gambar QR dengan satu klik |
| 💾 **Riwayat Lokal** | Simpan hingga 20 konfigurasi di `localStorage` |
| 📦 **Impor/Ekspor JSON** | Backup dan bagikan konfigurasi gaya QR |

---

## 🚀 Mulai Cepat

```bash
# 1. Klon repositori
git clone https://github.com/anda/qr-studio.git
cd qr-studio

# 2. Instal dependensi
npm install

# 3. Jalankan server pengembangan
npm run dev

# 4. Build untuk produksi
npm run build
```

Buka `http://localhost:5173` di browser. Aplikasi siap digunakan segera — tidak perlu konfigurasi tambahan.

---

## 🧱 Struktur Proyek

```
qr-studio/
├── src/
│   ├── components/          # Lapisan UI (split workspace, kontrol, pratinjau, riwayat)
│   │   ├── layout/          # Header, SplitWorkspace
│   │   ├── controls/        # PayloadTabs, StyleCustomizer, LogoUploader, TechnicalSettings
│   │   ├── preview/         # QRCanvasCard, ContrastWarning, ExportActions
│   │   ├── history/         # LocalHistoryDrawer
│   │   └── ui/              # Ikon SVG inline
│   ├── core/                # Logika bisnis murni (tanpa DOM)
│   │   ├── payloadFormatters.ts
│   │   ├── contrastChecker.ts
│   │   └── qrEngine.ts
│   ├── hooks/               # State management (useQRConfig, useDebounce)
│   ├── types/               # Definisi TypeScript (qr.types.ts)
│   ├── App.tsx
│   ├── index.css            # Desain token Tactile Studio
│   └── main.tsx
├── public/                  # Aset statis & manifest PWA
├── PRD.md                   # Spesifikasi produk
├── ARCHITECT.md             # Arsitektur & direktori
├── DESIGN.md                # Token visual & wireframe
├── AGENTS.md                # Panduan pengembangan AI
└── README.md
```

---

## 🛠️ Teknologi

| Layer | Teknologi |
| :--- | :--- |
| Framework | React 19 + TypeScript + Vite |
| Styling | CSS utilitas (token DESAIN.md) |
| QR Rendering | `qr-code-styling` (lokal, tanpa API eksternal) |
| Ikon | SVG inline (custom) |
| Validasi | Zod (opsional) |
| Simpan Lokal | `localStorage` |

---

## 📜 Panduan Pengembangan

Lihat [`AGENTS.md`](./AGENTS.md) untuk standar penulisan kode, urutan implementasi bertahap, dan guardrails wajib (memory leak, kontras warna, empty payload, high-DPI export).

Perintah verifikasi sebelum selesai:

```bash
npm run build      # Build tanpa error tipe
npm run lint       # Lint bersih
```

---

## 🤝 Kontribusi

Kami sangat terima kontribusi! Silakan baca [`CONTRIBUTING.md`](./CONTRIBUTING.md) untuk panduan berkontribusi, dan [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md) untuk norma komunitas kami.

---

## 🔒 Keamanan

QRStudio diproses sepenuhnya di sisi klien — tidak ada data yang dikirim ke server. Untuk laporan keamanan, lihat [`SECURITY.md`](./SECURITY.md).

---

## 📄 Lisensi

Distribusikan di bawah Lisensi MIT. Lihat file [`LICENSE`](./LICENSE) untuk detail lebih lanjut.

---

<p align="center">
  <b>QRStudio</b> — Buat QR Code yang bisa dipindai, tanpa batasan, tanpa pelacak.<br>
  Dibuat dengan ❤️ untuk pelajar, sekolah, kreator, dan UMKM di Indonesia.
</p>
