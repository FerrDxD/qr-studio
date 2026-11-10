# Product Requirements Document (PRD): QRStudio (Local-First QR Code Generator)

## 1. Ringkasan Eksekutif (Product Overview)
**QRStudio** adalah aplikasi web *client-side* untuk membuat, mengkustomisasi, dan mengekspor QR Code berkualitas tinggi secara instan tanpa memerlukan server backend, pendaftaran akun, atau biaya berlangganan. Seluruh pemrosesan dilakukan di dalam browser pengguna untuk menjamin privasi 100% dan kecepatan *real-time*.

## 2. Masalah & Solusi
* **Masalah:** Banyak generator QR gratis di internet menyisipkan *redirect link* berbayar (yang akan mati setelah masa *trial* habis), membatasi resolusi unduhan (hanya PNG buram), atau melacak data input pengguna di server mereka.
* **Solusi:** Aplikasi web *static* & *offline-capable* (PWA) yang menghasilkan *static QR code* murni langsung di perangkat pengguna dengan fitur kustomisasi visual setara aplikasi berbayar, riwayat penyimpanan lokal, serta dukungan ekspor vektor (SVG) dan raster resolusi tinggi (PNG/WebP).

## 3. Target Pengguna
* **Kreator & Pengembang:** Membutuhkan QR code cepat untuk tautan portofolio, repositori, atau proyek web.
* **Pelajar & Organisasi Sekolah:** Membuat QR code untuk formulir pendaftaran, akses Wi-Fi kelas/acara, atau tautan materi belajar.
* **UMKM Lokal:** Membuat QR code untuk menu digital, kontak WhatsApp, atau lokasi tempat usaha dengan logo brand di tengahnya.

## 4. Fitur Utama (Functional Requirements)

### 4.1. Tipe Payload (Input Data)
1. **URL / Tautan Web:** Input teks dengan validasi format `http://` atau `https://`.
2. **Teks Bebas (Plain Text):** Catatan singkat, kode unik, atau ID.
3. **Wi-Fi Access:** Input SSID, Tipe Keamanan (`WPA/WPA2`, `WEP`, `None`), Password, dan opsi *Hidden Network* (Format standar: `WIFI:T:WPA;S:mynetwork;P:mypass;;`).
4. **Kontak vCard:** Nama, Nomor Telepon, Email, Organisasi, dan Website.
5. **Quick WhatsApp / Email:** Generator otomatis format `https://wa.me/` dengan pesan *pre-filled* atau `mailto:`.

### 4.2. Kustomisasi Visual
1. **Warna & Gradien:** Pilihan warna *Foreground* (titik QR) dan *Background* (termasuk opsi latar transparan), serta dukungan gradien linear/radial.
2. **Gaya Modul (Pattern Style):** Kotak standar (*Square*), membulat (*Rounded*), atau titik-titik (*Dots*).
3. **Gaya Sudut (Corner Square & Dot Style):** Kustomisasi bentuk 3 mata pencari (*finder patterns*) di sudut QR.
4. **Integrasi Logo Tengah:** Unggah gambar lokal (PNG/JPG/SVG) untuk diletakkan di tengah QR Code, lengkap dengan pengaturan ukuran logo dan *margin* otomatis di sekitar logo.
5. **Pengaturan Teknis QR:** Pilihan *Error Correction Level* (`L` 7%, `M` 15%, `Q` 25%, `H` 30%) dan pengaturan *Quiet Zone* (margin tepi).

### 4.3. Ekspor & Manajemen Lokal
1. **Multi-Format Export:** Unduh hasil dalam format `PNG`, `SVG` (vektor tajam untuk cetak), dan `WebP`.
2. **Resolusi Kustom:** Slider ukuran ekspor mulai dari `256x256 px` hingga `2048x2048 px`.
3. **Copy to Clipboard:** Salin gambar QR langsung ke *clipboard* dengan satu klik.
4. **Local History & Preset:** Menyimpan hingga 20 QR terakhir dan konfigurasi warna favorit di `localStorage` / `IndexedDB` (tanpa keluar dari perangkat).
5. **JSON Config Import/Export:** Ekspor dan impor pengaturan gaya QR dalam format `.json`.

## 5. Kebutuhan Non-Fungsional (Non-Functional Requirements)
* **Zero-Latency Preview:** Pembaruan kanvas QR harus berlangsung di bawah `50ms` (*debounced*) setiap kali pengguna mengubah input.
* **100% Privacy & Client-Side:** Tidak ada satu pun *request* jaringan yang mengirimkan isi teks/password Wi-Fi pengguna ke pihak ketiga.
* **Scannability Guard:** Sistem memberikan peringatan visual jika rasio kontras warna terlalu rendah (sulit dipindai kamera) atau jika ukuran logo terlalu besar saat *Error Correction Level* berada di bawah `Q`/`H`.

## 6. Batasan Ruang Lingkup (Out of Scope - v1.0)
* Pembuatan *Dynamic QR Code* yang membutuhkan database *shortlink* di sisi server.
* Analitik pemindaian (jumlah scan, lokasi pemindai).
* Sistem autentikasi/login pengguna.