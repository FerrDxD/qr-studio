# Kebijakan Keamanan QRStudio

Terima kasih telah membantu menjaga QRStudio aman bagi semua pengguna.

---

## 🔒 Filosofi Keamanan

QRStudio adalah aplikasi **client-side 100%**. Semua pemrosesan terjadi di dalam browser pengguna:

| Aspek | Kebijakan |
| :--- | :--- |
| Penyimpanan data | Hanya di `localStorage` milik pengguna |
| Rendering QR | Lokal dengan `qr-code-styling` / `qrcode` |
| Request jaringan | **Tidak ada** untuk pembuatan QR |
| Pelacak pihak ketiga | Dilarang |
| Backend / Server | Tidak ada |
| Akun pengguna | Tidak ada |

Artinya, data Anda — termasuk sandi Wi-Fi dan kontak vCard — **tidak pernah mengandung ke server kami atau siapa pun**.

---

## 📢 Melaporkan Kelemahan Keamanan

Jika Anda menemukan kelemahan keamanan, silakan laporkan kepada kami dengan cara berikut:

### Saluran pelaporan

Kirim email ke pemelihara proyek dengan subjek:

```
[SECURITY] Laporan kelemahan QRStudio
```

Sertakan dalam email:

1. **Deskripsi singkat** kelemahan yang ditemukan
2. **Langkah untuk mereproduksi** (langkah demi langkah)
3. **Dampak potensial** bagi pengguna
4. **Proof of concept** atau *screenshot* (jika relevan)
5. **Versi browser dan sistem operasi** yang Anda gunakan

### Tanggapan

Kami akan merespon laporan keamanan dalam **7 hari kerja** dan memberikan pembaruan berkala tentang kemajuan penanganan.

Jika laporan Anda divalidasi, kami akan:
- Mengakui kontribusi Anda (dengan izin Anda)
- Merilis perbaikan secepat mungkin
- Mencantumkan Anda dalam daftar pengakua (jika diinginkan)

---

## 🌐 Versi yang Didukung

| Versi | Status | Dukungan Keamanan |
| :--- | :--- | :--- |
| 0.1.x | 🟢 Aktif | Ya |
| < 0.1.0 | 🔴 Tidak aktif | Tidak |

Pastikan Anda selalu menggunakan versi terbaru dari `main` untuk mendapatkan perbaikan keamanan terbaru.

---

## 🛡️ Praktik Keamanan untuk Pengguna

- Unduh QRStudio hanya dari sumber resmi
- Periksa integritas berkas sebelum build (`npm install` dari `package-lock.json`)
- Jangan membuka file konfigurasi JSON yang tidak Anda percaya dari sumber tidak diketahui
- QRStudio tidak mengirim data ke mana pun — jika Anda menemukan permintaan jaringan yang mencurigakan, lapor segera

---

## 🙏 Pengakuan

Terima kasih kepada semua peneliti keamanan yang telah membantu menjaga QRStudio tetap aman.

*(Daftar pengakua akan ditambahkan setelah laporan pertama divalidasi.)*

---

<p align="center">
  <b>QRStudio</b> — Keamanan adalah prioritas kami.<br>
  Dibuat dengan ❤️ untuk Indonesia.
</p>
