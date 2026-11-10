[Input Pengguna (Form / Picker)]
       │
       ▼ (Debounce 100ms)
[Payload Formatter (core/payloadFormatters.ts)] ──► Menghasilkan Raw String (misal: "WIFI:S:Kelas12;...")
       │
       ▼
[Contrast & Scannability Validator] ──► Mengecek rasio kontras & otomatis menaikkan Error Correction ke 'H' jika ada Logo
       │
       ▼
[QR Engine Wrapper (core/qrEngine.ts)] ──► Memperbarui instance Canvas / SVG di DOM secara langsung
       │
       ├──► [Export Handler] ──► Blob Converter ──► Unduh File (.png / .svg / .webp) atau Clipboard API
       └──► [Storage Sync]   ──► Simpan state ke localStorage ('qrstudio_active_state')