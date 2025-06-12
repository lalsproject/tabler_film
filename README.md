# MovieFlix - Aplikasi Streaming Film

MovieFlix adalah aplikasi web untuk streaming film yang menampilkan film-film populer dan terbaru. Aplikasi ini menggunakan API dari TMDB (The Movie Database) untuk mendapatkan data film.

## Fitur

- 🎬 Tampilan film populer dan terbaru
- 🔍 Pencarian film (tekan Enter untuk mencari)
- 🎯 Filter berdasarkan negara
- 📊 Pengurutan berdasarkan popularitas, rating, tanggal rilis, dan pendapatan
- 🖼️ Banner slideshow film populer
- 📱 Responsif untuk desktop, tablet, dan mobile
- 🎨 Desain modern dengan animasi dan transisi yang halus
- 🔄 Loading state dan error handling

## Teknologi yang Digunakan

- HTML5
- CSS3 (dengan variabel CSS dan Flexbox/Grid)
- JavaScript (ES6+)
- TMDB API
- Font Awesome untuk ikon
- Google Fonts (Poppins)

## Cara Menggunakan

1. Clone repository ini
2. Buka file `index.html` di browser
3. Atau jalankan di server lokal (misalnya XAMPP)

## Struktur Proyek

```
movieflix/
├── index.html          # Halaman utama
├── player.html         # Halaman pemutaran film
├── src/
│   └── getMovie.js     # Script untuk mengambil data film
├── README.md           # Dokumentasi
└── .gitignore
```

## Fitur Pencarian

- Ketik kata kunci di kolom pencarian
- Tekan Enter untuk memulai pencarian
- Hasil pencarian akan ditampilkan secara real-time

## Filter dan Pengurutan

- Filter berdasarkan negara
- Pengurutan berdasarkan:
  - Popularitas
  - Rating Tertinggi
  - Terbaru
  - Pendapatan Tertinggi

## Banner Slideshow

- Menampilkan 5 film populer
- Auto-scroll setiap 5 detik
- Navigasi manual dengan tombol kiri/kanan
- Indikator slide
- Tombol untuk menonton dan melihat detail film

## Responsivitas

- Desktop: Tampilan penuh dengan grid 4 kolom
- Tablet: Grid 3 kolom
- Mobile: Grid 2 kolom
- Banner dan konten menyesuaikan ukuran layar

## Screenshot

![Screenshot Aplikasi MovieFlix](link-gambar-screenshot-anda.png)

## Kontribusi

Silakan buat pull request untuk kontribusi. Untuk perubahan besar, harap buka issue terlebih dahulu untuk mendiskusikan perubahan yang diinginkan.

## Lisensi

[MIT](https://choosealicense.com/licenses/mit/)

## Kontak

Jika ada pertanyaan atau saran, silakan buka issue di repository ini. 