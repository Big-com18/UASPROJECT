L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.9.4/dist/images/'; // Baris ini untuk Leaflet, biarkan jika menggunakan Leaflet

// 1. Manajemen Sidebar (Enkapsulasi & Abstraksi)
//    Kelas ini sekarang dapat digunakan kembali di berbagai halaman.
class Sidebar {
    constructor(sidebarId, overlayId, openIconId) {
        this.sidebar = document.getElementById(sidebarId);
        this.overlay = document.getElementById(overlayId);
        this.openIcon = document.getElementById(openIconId);
        this.menuLinks = document.querySelectorAll(".sidebar-link");

        this.initEvents();
    }

    initEvents() {
        if (this.openIcon) {
            this.openIcon.addEventListener("click", this.open.bind(this));
        } else {
            console.error(`Menu icon with ID '${this.openIcon.id}' not found.`); // Biarkan ini untuk debugging jika diperlukan
        }
        this.overlay.addEventListener("click", this.close.bind(this));
        this.menuLinks.forEach(link => link.addEventListener("click", this.close.bind(this)));
    }

    open() {
        this.sidebar.classList.add("active");
        this.overlay.classList.add("active");
        document.body.classList.add("sidebar-open");
    }

    close() {
        this.sidebar.classList.remove("active");
        this.overlay.classList.remove("active");
        document.body.classList.remove("sidebar-open");
    }
}


// --- DEFINISI CLASS LaporanKemacetan ---
class LaporanKemacetan {
    // Konstruktor adalah metode khusus yang dipanggil saat objek baru dibuat
    constructor(data, index) {
        this.title = data.title;
        this.waktu = data.waktu;
        this.deskripsi = data.deskripsi;
        this.kategori = data.kategori;
        this.koordinat = data.koordinat;
        this.id = `map${index}`;
    }

    // Metode untuk membuat elemen kartu HTML untuk laporan ini
    renderCard() {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="card-map">
                <div id="${this.id}" class="mini-map"></div>
            </div>
            <div class="card-text">
                <strong>${this.title}</strong>
                <div>Dilaporkan: ${this.waktu}</div>
                <div>${this.deskripsi}</div>
                <span class="badge">${this.kategori}</span>
            </div>
        `;
        return card;
    }

    // Metode untuk menginisialisasi peta Leaflet di dalam kartu laporan ini
    initializeMap() {
        // Timeout 0ms tetap digunakan untuk memastikan DOM siap
        setTimeout(() => {
            if (!document.getElementById(this.id)) {
                console.error(`Elemen dengan ID ${this.id} tidak ditemukan.`);
                return;
            }
            const map = L.map(this.id, {
                zoomControl: false,
                dragging: false,
                scrollWheelZoom: false,
                attributionControl: false,
                doubleClickZoom: false,
                boxZoom: false
            }).setView(this.koordinat, 14);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            L.marker(this.koordinat).addTo(map);

            // Penting: Memastikan peta menyesuaikan ukurannya
            map.invalidateSize();

            console.log(`Peta ${this.id} diinisialisasi di koordinat: ${this.koordinat}`);
        }, 0);
    }
}

// --- DATA LAPORAN ASLI (tetap sebagai array objek literal awal) ---
const laporanDataNew = [
    {
        title: "Banjir di Puri",
        waktu: "28 Jun 2025, 08:30 WIB",
        deskripsi: "Banjir menutupi jalan di perempatan lampu merah Puri.",
        kategori: "Banjir",
        koordinat: [-6.2001, 106.8005]
    },
    {
        title: "Kecelakaan di Sudirman",
        waktu: "28 Jun 2025, 09:45 WIB",
        deskripsi: "Tabrakan dua kendaraan arah Blok M.",
        kategori: "Kecelakaan",
        koordinat: [-6.2145, 106.8210]
    },
    {
        title: "Pohon tumbang di Cempaka",
        waktu: "28 Jun 2025, 10:20 WIB",
        deskripsi: "Menghalangi jalan dan menyebabkan kemacetan.",
        kategori: "Pohon Tumbang",
        koordinat: [-6.1833, 106.8650]
    },
    {
        title: "Kemacetan Parah di Gatot Subroto",
        waktu: "1 Jul 2025, 13:00 WIB",
        deskripsi: "Volume kendaraan tinggi menyebabkan kemacetan panjang dari Slipi hingga Kuningan.",
        kategori: "Kemacetan",
        koordinat: [-6.2250, 106.8180]
    },
    {
        title: "Perbaikan Jalan di Tomang",
        waktu: "1 Jul 2025, 13:15 WIB",
        deskripsi: "Ada pekerjaan perbaikan jalan di jalur lambat Tomang, harap berhati-hati.",
        kategori: "Perbaikan Jalan",
        koordinat: [-6.1751436, 106.7742652]
    },
    {
        title: "Kecelakaan di Senayan",
        waktu: "1 Jul 2025, 14:00 WIB",
        deskripsi: "Kecelakaan tunggal di dekat pintu masuk Senayan, lalu lintas tersendat.",
        kategori: "Kecelakaan",
        koordinat: [-6.2220, 106.8030]
    }
];

// --- Fungsi untuk menginisialisasi laporan (sekarang menggunakan class) ---
function renderLaporan() {
    const container = document.getElementById("laporan-list");
    if (!container) {
        console.error("Elemen dengan ID 'laporan-list' tidak ditemukan.");
        return;
    }
    container.innerHTML = "";

    // Mengubah data mentah menjadi array objek LaporanKemacetan
    const laporanObjek = laporanDataNew.map((data, index) => new LaporanKemacetan(data, index));

    laporanObjek.forEach(laporan => {
        const cardElement = laporan.renderCard(); // Panggil metode dari objek laporan
        container.appendChild(cardElement);
        laporan.initializeMap(); // Panggil metode untuk inisialisasi peta
    });
}

// --- Fungsi lainnya tetap sama ---
function lihatLebihBanyak() {
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

// --- DOMContentLoaded listener ---
document.addEventListener("DOMContentLoaded", () => {
    // Inisialisasi Sidebar menggunakan kelas baru
    new Sidebar("sidebar", "overlay", "openSidebar");

    renderLaporan(); // Render laporan kemacetan

    // Event listener untuk tombol "Rute TransJakarta"
    const transjakartaButton = document.querySelector(".btn-transjakarta");
    if (transjakartaButton) {
        transjakartaButton.addEventListener("click", () => {
            window.location.href = "../Transjakarta/MenuTJ.html"; // Pastikan path ini benar
        });
    }
});