# UI/UX & Design System Specification: QRStudio

## 1. Filosofi Desain
* **Tactile Studio Aesthetic:** Antarmuka dirancang seperti alat desain modern (terinspirasi dari Linear, Raycast, dan Figma)—bersih, fokus pada fungsi, menggunakan *border* tipis yang tegas (`1px`), dan tanpa elemen dekoratif yang mengganggu.
* **Split-Screen Ergonomics:** Pengaturan berada di sisi kiri yang dapat digulir (*scrollable*), sementara pratinjau QR Code terkunci (*sticky*) di sisi kanan agar pengguna selalu melihat perubahan secara langsung.

## 2. Palet Warna (Dark & Light Mode)

| Token | Light Mode | Dark Mode (Default Studio) | Penggunaan |
| :--- | :--- | :--- | :--- |
| `--bg-app` | `#F8FAFC` (Slate 50) | `#090D16` (Deep Slate) | Latar belakang utama halaman |
| `--bg-panel` | `#FFFFFF` (White) | `#111827` (Gray 900) | Kartu kontrol & panel konfigurasi |
| `--bg-canvas-well` | `#F1F5F9` (Slate 100) | `#1E293B` (Slate 800) | Area latar tempat kanvas QR dipajang |
| `--text-primary` | `#0F172A` (Slate 900) | `#F8FAFC` (Slate 50) | Judul, label aktif, input utama |
| `--text-muted` | `#64748B` (Slate 500) | `#94A3B8` (Slate 400) | Teks bantuan, *caption*, sub-label |
| `--border-subtle` | `#E2E8F0` (Slate 200) | `#1F2937` (Gray 800) | Garis pemisah panel (`1px solid`) |
| `--accent-primary` | `#4F46E5` (Indigo 600) | `#6366F1` (Indigo 500) | Tombol utama, tab aktif, *focus ring* |
| `--status-warn` | `#D97706` (Amber 600) | `#F59E0B` (Amber 500) | Peringatan kontras rendah / sulit dipindai |

## 3. Tipografi
* **UI & Body Font:** `Inter` atau `Plus Jakarta Sans` (Ukuran dasar `14px` untuk kontrol form agar padat dan rapi, `16px` untuk input utama).
* **Monospace Font:** `JetBrains Mono` atau `Fira Code` (Digunakan untuk menampilkan nilai *Hex Color*, ukuran dimensi piksel `1024x1024 px`, serta pratinjau *raw string payload*).

## 4. Tata Letak (Wireframe & Grid Layout)

### Desktop (`>= 1024px` - 12 Kolom Grid)
```text
+-----------------------------------------------------------------------------------+
| [Logo] QRStudio                     [Riwayat Lokal] [Import/Export JSON] [Tema ☾] |
+-------------------------------------------------+---------------------------------+
| PANEL KONFIGURASI (7 Kolom - Scrollable)        | PANEL PRATINJAU (5 Kolom-Sticky)|
|                                                 |                                 |
| [🔗 URL] [📝 Teks] [📶 Wi-Fi] [👤 vCard] [💬 WA] |   +-------------------------+   |
| +---------------------------------------------+ |   |                         |   |
| | Masukkan URL Website                        | |   |                         |   |
| | [ https://...                             ] | |   |      [ LIVE CANVAS ]    |   |
| +---------------------------------------------+ |   |        QR PREVIEW       |   |
|                                                 |   |                         |   |
| ▼ 1. Kustomisasi Gaya & Warna                   |   |                         |   |
|   Warna Titik: [■ #0F172A]  Latar: [□ #FFFFFF]  |   +-------------------------+   |
|   Bentuk Titik: [Kotak] [Bulat] [Titik]         |   Status: ✓ Kontras Sangat Baik |
|                                                 |   Resolusi: [===O===] 1024 px   |
| ▼ 2. Logo Tengah (Opsional)                     |                                 |
|   [ + Unggah Gambar (PNG/SVG) ]  [Hapus]        |   [ ⬇ Unduh PNG ] [ ⬇ SVG ]     |
|                                                 |   [ 📋 Salin Gambar ke Clipboard]|
| ▼ 3. Pengaturan Teknis                          |   [ 💾 Simpan ke Riwayat Lokal ] |
|   Error Correction: (L) (M) (• Q) (H)           |                                 |
+-------------------------------------------------+---------------------------------+