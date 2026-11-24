TASTE EXPERIENCE – BRIGHTSPOT – Kiosk TV 43" (portrait)
=======================================================

VERSI BRIGHTSPOT: hanya 2 hasil, yaitu BOLD dan CREAMY (tidak ada FRESH).

ISI FOLDER
- index.html   : aplikasinya (gambar, font, dan 2 video hasil sudah tertanam di dalamnya)
- lib/qrcode.js: library pembuat kode QR (supaya QR tetap jalan tanpa internet)
- video/       : 2 video background hasil (bold, creamy) sebagai arsip

CARA PAKAI DI TV
1. Salin seluruh folder ini ke TV / mini-PC / USB. Jangan pisahkan index.html dari folder lib.
2. Buka index.html di browser berbasis Chrome (Chrome, Edge, atau browser bawaan TV yang berbasis Chromium).
3. Layar penuh: tahan pojok kiri atas layar 2 detik (atau tekan Ctrl+M) untuk membuka panel admin,
   lalu tekan "Layar penuh". Untuk mini-PC bisa juga jalankan Chrome dengan mode kiosk:
   chrome --kiosk --autoplay-policy=no-user-gesture-required "file:///path/ke/index.html"
4. Tampilan otomatis menyesuaikan layar. Di TV portrait 9:16 tampil penuh. Di layar lain (misalnya laptop),
   sisi kiri-kanan dibuat hitam polos. Tambahkan ?fill=1 kalau sisi itu mau diisi lanjutan background.
5. 4K: desain portrait 1080x1920 otomatis diskalakan x2 di TV 4K portrait (2160x3840).
   Gambar sudah resolusi 2x, efek glitch & video hasil ikut dirender tajam di 4K.
6. Kalau TV dipasang berdiri tapi browser-nya tetap landscape (3840x2160), putar tampilan:
   panel admin > "Orientasi layar", atau buka index.html?rotate=90 (atau ?rotate=270).

LINK UNTUK REVIEW
- Langsung ke hasil di kiosk (tanpa menjawab pertanyaan): index.html?result=bold atau ?result=creamy
- Halaman hasil di HP (yang dibuka dari QR): index.html#bold atau #creamy

TAMPILAN HP
- Kalau dibuka di HP (portrait), tampilan otomatis memenuhi layar dan tulisannya diperbesar.
  Di TV dan laptop tampilannya tetap seperti biasa.

TAMPILAN TABLET
- Di tablet (iPad / Android tablet), portrait maupun landscape, tampilan otomatis memenuhi layar tanpa terpotong:
  isi tetap di tengah, latar biru diperluas sampai ke tepi kiri-kanan. Tes di laptop: index.html?tablet=1

PANEL ADMIN (tahan pojok kiri atas 2 detik / Ctrl+M)
- Matrix hasil: atur hasil (BOLD / CREAMY) untuk tiap kombinasi 3 jawaban.
  Default = tabel client (A = pilihan atas, B = pilihan bawah):
    AAA BOLD   AAB BOLD   ABA BOLD   ABB CREAMY
    BAA BOLD   BAB CREAMY BBA CREAMY BBB CREAMY
  BOLD = Passionfruit, CREAMY = Strawberry.
  PENTING: kalau di TV pernah menekan Simpan di panel admin, pengaturan lama tersimpan di browser TV.
  Tekan "Kembalikan matrix awal" lalu "Simpan" supaya memakai tabel ini.
- Upload API: kartu hasil (JPEG) di-upload ke API IQOS saat layar QR; QR berisi URL publik foto (field file).
  Default endpoint: https://photo-ai-iims.zirolu.id/v1/mizuho (bisa diganti di panel admin).
  TV butuh internet di layar QR. Credential bisa diisi di admin; kosongkan untuk memakai default bawaan.
- Reset otomatis: kembali ke layar awal setelah X detik tidak disentuh (default 45, isi 0 untuk mematikan).
Pengaturan tersimpan di browser perangkat itu, terpisah dari versi Taste Experience biasa.

CATATAN
- HP pengunjung butuh internet untuk membuka / mengunduh foto dari QR. TV butuh internet saat menampilkan layar QR (upload).
- Untuk mengganti video hasil, kirim video final (MP4 H.264, portrait 9:16, tanpa audio, 6–10 detik,
  idealnya < 3 MB per video) supaya ditanam ulang ke index.html.
- Browser yang disarankan: Chrome terbaru. Safari dan browser lama mungkin tidak menampilkan semua efek.
