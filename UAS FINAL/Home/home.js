// PENTING: Mengatur jalur gambar ikon default Leaflet
// Ini mengatasi masalah di mana ikon penanda tidak muncul karena jalur gambar yang salah
L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.9.4/dist/images/';
const laporanData = [
      {
        title: "Banjir di Puri",
        waktu: "28 Jun 2025, 08:30 WIB",
        deskripsi: "Banjir menutupi jalan di perempatan lampu merah Puri.",
        kategori: "Banjir",
        koordinat: [-6.2001, 106.8005] // Contoh koordinat untuk Puri Jakarta Barat
      },
      {
        title: "Kecelakaan di Sudirman",
        waktu: "28 Jun 2025, 09:45 WIB",
        deskripsi: "Tabrakan dua kendaraan arah Blok M.",
        kategori: "Kecelakaan",
        koordinat: [-6.2145, 106.8210] // Contoh koordinat untuk Sudirman Jakarta Pusat
      },
      {
        title: "Pohon tumbang di Cempaka",
        waktu: "28 Jun 2025, 10:20 WIB",
        deskripsi: "Menghalangi jalan dan menyebabkan kemacetan.",
        kategori: "Pohon Tumbang",
        koordinat: [-6.1833, 106.8650] // Contoh koordinat untuk Cempaka Putih Jakarta Pusat
      },
      {
        title: "Kemacetan Parah di Gatot Subroto",
        waktu: "1 Jul 2025, 13:00 WIB", // Waktu saat ini
        deskripsi: "Volume kendaraan tinggi menyebabkan kemacetan panjang dari Slipi hingga Kuningan.",
        kategori: "Kemacetan",
        koordinat: [-6.2250, 106.8180] // Contoh koordinat untuk Gatot Subroto
      },
      {
        title: "Perbaikan Jalan di Tomang",
        waktu: "1 Jul 2025, 13:15 WIB",
        deskripsi: "Ada pekerjaan perbaikan jalan di jalur lambat Tomang, harap berhati-hati.",
        kategori: "Perbaikan Jalan",
        koordinat: [-6.1751436, 106.7742652] // Contoh koordinat untuk Tomang
      }
    ];

    function renderLaporan() {
      const container = document.getElementById("laporan-list");
      container.innerHTML = "";

      laporanData.forEach((data, index) => {
        const card = document.createElement("div");
        card.className = "card";

        const mapId = `map${index}`;

        card.innerHTML = `
          <div class="card-map">
            <div id="${mapId}" class="mini-map"></div>
          </div>
          <div class="card-text">
            <strong>${data.title}</strong>
            <div>Dilaporkan: ${data.waktu}</div>
            <div>${data.deskripsi}</div>
            <span class="badge">${data.kategori}</span>
          </div>
        `;

        container.appendChild(card);

        // Penting: Inisialisasi peta setelah elemen DOM ada dan ukurannya ditentukan
        // Timeout 0ms tetap digunakan untuk memastikan DOM siap
        setTimeout(() => {
          const map = L.map(mapId, {
            zoomControl: false,
            dragging: false,
            scrollWheelZoom: false,
            attributionControl: false,
            doubleClickZoom: false,
            boxZoom: false
          }).setView(data.koordinat, 14);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
          L.marker(data.koordinat).addTo(map);

          // Baris ini sangat penting untuk memastikan peta dan penanda terlihat
          map.invalidateSize();

          // Tambahkan log untuk debugging:
          console.log(`Peta ${mapId} diinisialisasi di koordinat: ${data.koordinat}`);
          console.log(`Penanda ditambahkan ke peta ${mapId}.`);

        }, 0);
      });
    }

    function lihatLebihBanyak() {
      // Mengganti alert dengan modal kustom atau pesan di UI
      // Karena alert() tidak disarankan dalam lingkungan Canvas/iFrame
      const messageBox = document.createElement('div');
      messageBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        z-index: 10000;
        text-align: center;
      `;
      messageBox.innerHTML = `
        <p>Menampilkan laporan tambahan...</p>
        <button onclick="this.parentNode.remove()" style="margin-top: 15px; padding: 8px 15px; background-color: #08bbb9; color: white; border: none; border-radius: 5px; cursor: pointer;">Tutup</button>
      `;
      document.body.appendChild(messageBox);
    }

    document.addEventListener("DOMContentLoaded", () => {
      renderLaporan();

      const sidebar = document.getElementById("sidebar");
      const overlay = document.getElementById("overlay");
      const menuIcon = document.getElementById("openSidebar"); // Menggunakan variabel untuk menu-icon
      const menuLinks = document.querySelectorAll(".sidebar-link");

      menuIcon.addEventListener("click", () => { // Menggunakan menuIcon
        sidebar.classList.add("active");
        overlay.classList.add("active");
        document.body.classList.add("sidebar-open");
      });

      overlay.addEventListener("click", closeSidebar);
      menuLinks.forEach(link => link.addEventListener("click", closeSidebar));

      function closeSidebar() {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("sidebar-open");
      }
    });