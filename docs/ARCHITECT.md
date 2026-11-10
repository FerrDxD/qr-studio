# Architecture Specification: QRStudio

## 1. Prinsip Arsitektur
* **Pure Client-Side (Static SPA / PWA):** Berjalan sepenuhnya di browser pengguna tanpa ketergantungan pada server backend atau database cloud.
* **Modular & Decoupled:** Logika pemformatan *payload* (seperti merakit string Wi-Fi atau vCard) dipisahkan secara ketat dari komponen UI dan *engine rendering* kanvas.
* **Local-First Persistence:** Seluruh *state* sesi dan riwayat disimpan secara lokal menggunakan `localStorage` dan dapat diekspor sebagai file `.json`.

## 2. Tech Stack yang Direkomendasikan
* **Core Framework:** Vite + TypeScript + React (atau Vanilla TS jika ingin *bundle size* ekstra minimalis).
* **Styling:** Tailwind CSS (Utility-first, mendukung *Dark Mode*).
* **QR Rendering Engine:** `qr-code-styling` (mendukung kustomisasi titik, sudut, gradien, logo tengah, serta *output* Canvas & SVG) atau `qrcode` (untuk *fallback* super ringan).
* **Icons:** `lucide-react`.
* **Validation:** `zod` (opsional, untuk validasi skema konfigurasi JSON dan input form).

## 3. Struktur Direktori Proyek

```text
qrstudio/
├── public/
│   ├── manifest.json          # Konfigurasi PWA untuk penggunaan offline
│   └── icons/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── SplitWorkspace.tsx
│   │   ├── controls/
│   │   │   ├── PayloadTabs.tsx       # Tab pemilih URL, Teks, Wi-Fi, vCard
│   │   │   ├── StyleCustomizer.tsx   # Kontrol warna, bentuk titik, & sudut
│   │   │   ├── LogoUploader.tsx      # Input FileReader untuk logo tengah
│   │   │   └── TechnicalSettings.tsx # Error correction level (L/M/Q/H) & resolusi
│   │   ├── preview/
│   │   │   ├── QRCanvasCard.tsx      # Container sticky tempat QR di-render
│   │   │   ├── ContrastWarning.tsx   # Badge peringatan jika kontras warna buruk
│   │   │   └── ExportActions.tsx     # Tombol Download PNG/SVG & Copy Clipboard
│   │   └── history/
│   │       └── LocalHistoryDrawer.tsx
│   ├── core/
│   │   ├── payloadFormatters.ts      # Fungsi murni perakit string Wi-Fi, vCard, WA
│   │   ├── contrastChecker.ts        # Kalkulator rasio kontras WCAG (Foreground vs Bg)
│   │   └── qrEngine.ts               # Wrapper abstraksi untuk library qr-code-styling
│   ├── hooks/
│   │   ├── useQRConfig.ts            # State management utama & sinkronisasi localStorage
│   │   └── useDebounce.ts            # Mencegah re-render berlebih saat mengetik cepat
│   ├── types/
│   │   └── qr.types.ts               # Definisi interface TypeScript & JSON Schema
│   ├── App.tsx
│   └── main.tsx
├── PRD.md
├── ARCHITECT.md
├── DESIGN.md
├── AGENTS.md
├── package.json
└── tsconfig.json