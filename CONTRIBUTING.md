# Panduan Kontribusi QRStudio

Terima kasih telah ingin berkontribusi pada QRStudio! 🎉 Setiap kontribusi — baik laporan bug, fitur baru, perbaikan typo, atau dokumentasi — sangat berharga bagi kami.

Dokumen ini menjelaskan cara berkontribusi agar prosesnya lancar dan hasilnya berkualitas.

---

## 🧭 Jalan Pintas Kontribusi

| Apa yang ingin Anda lakukan? | Lihat |
| :--- | :--- |
| Melaporkan bug | [Lapor Masalah](#-lapor-masalah) |
| Usulkan fitur baru | [Usulan Fitur](#-usulan-fitur) |
| Perbaiki kode atau dokumentasi | [Kirim Pull Request](#-kirim-pull-request) |
| Tanya mengenai penggunaan | [Diskusi](#-diskusi) |

---

## 🛠️ Cara Memulai

### 1. Fork & Klon

```bash
# Fork repositori di GitHub, lalu klon hasil fork Anda
git clone https://github.com/ANDA/qr-studio.git
cd qr-studio

# Tambahkan repositori utama sebagai upstream
git remote add upstream https://github.com/ORIGINAL/qr-studio.git
```

### 2. Buat Branch Fitur

Selalu buat branch baru dari `main`:

```bash
git checkout -b fitur/nama-fitur-anda
# atau
git checkout -b perbaikan/deskripsi-perbaikan
```

### 3. Instal & Jalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # Verifikasi build produksi
npm run lint     # Verifikasi kode bersih
```

---

## ✍️ Standar Kode

QRStudio mengikuti [`AGENTS.md`](./AGENTS.md) sebagai panduan wajib. Beberapa poin penting:

| Aturan | Detail |
| :--- | :--- |
| **TypeScript ketik** | Jangan gunakan `any`. Gunakan `unknown` atau definisikan interface di `src/types/qr.types.ts`. |
| **Pemisahan logika** | Komponen UI di `src/components/` hanya tampilan. Logika bisnis (format payload, kontras warna, konversi blob) di `src/core/` sebagai fungsi murni. |
| **Tanpa API eksternal** | QR selalu dirender lokal dengan `qr-code-styling` atau `qrcode`. Dilarang `api.qrserver.com` / `chart.googleapis.com`. |
| **Bahasa UI** | Bahasa Indonesia adalah suara ikutama untuk semua salinan produk dan dokumentasi. |
| **Estetika** | Ikuti token DESAIN.md: Tactile Studio, dark mode default, border 1px, split-screen. |

### Guardrails wajib sebelum kirim PR

- [ ] `npm run build` lolos tanpa error tipe
- [ ] `npm run lint` bersih tanpa peringatan
- [ ] Saat logo diunggah, `errorCorrectionLevel` otomatis `'Q'` atau `'H'`
- [ ] Peringatan kontras muncul saat titik putih di atas latar putih
- [ ] Unduhan `.svg` dan `.png` dapat dipindai kamera standar

---

## 🐛 Lapor Masalah

Buat *issue* baru dengan judul yang jelas dan sertakan:

1. **Deskripsi singkat** apa yang terjadi
2. **Langkah untuk mereproduksi** (langkah demi langkah)
3. **Hasil yang diharapkan** vs **hasil yang nyata**
4. **Screenshot** (jika relevan dengan tampilan)
5. **Browser dan sistem operasi** yang Anda gunakan

Gunakan template laporan bawaan GitHub jika tersedia.

---

## ✨ Usulan Fitur

Buka *issue* dengan label `enhancement` dan jelaskan:

1. **Masalah** yang ingin Anda selesaikan
2. **Solusi yang diusulkan**
3. **Alternatif** yang telah Anda pertimbangkan
4. **Dampak** bagi pengguna (pelajar, sekolah, kreator, UMKM)

---

## 📤 Kirim Pull Request

1. Pastikan branch Anda berasal dari `main` yang terbaru
2. Buat perubahan yang kecil dan terfokus (satu fitur / satu perbaikan per PR)
3. Tambahkan atau perbarui dokumentasi jika perlu
4. Jalankan `npm run build` dan `npm run lint` sebelum mengajukan
5. Isi template Pull Request dengan jelas
6. Tunggu review dari pemelihara

> ⚠️ Jangan mengajukan PR yang menggabungkan banyak perubahan yang tidak terkait dalam satu branch.

---

## 💬 Diskusi

Jika Anda memiliki pertanyaan tentang penggunaan QRStudio atau ingin mendiskusikan ide, buka *issue* dengan label `question` atau `discussion`.

---

## 📜 Lisensi

Dengan berkontribusi, Anda setuju bahwa kontribusi Anda akan dilisensikan di bawah [Lisensi MIT](./LICENSE) yang sama dengan proyek ini.

---

<p align="center">
  <b>Terima kasih telah membantu QRStudio berkembang!</b> 🙏<br>
  Dibuat dengan ❤️ untuk komunitas Indonesia.
</p>
