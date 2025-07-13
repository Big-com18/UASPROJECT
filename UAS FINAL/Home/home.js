// Baris ini untuk Leaflet, biarkan jika menggunakan Leaflet
L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.9.4/dist/images/';

// 1. Manajemen Sidebar (Enkapsulasi & Abstraksi)
class Sidebar {
    // Menghapus closeSidebarId dari parameter constructor
    constructor(sidebarId, overlayId, menuToggleId) {
        this.sidebar = document.getElementById(sidebarId);
        this.overlay = document.getElementById(overlayId);
        this.menuToggle = document.getElementById(menuToggleId); // Ini adalah kontainer ikon di navbar
        // Hapus baris ini: this.closeSidebar = document.getElementById(closeSidebarId);
        this.menuLinks = document.querySelectorAll(".sidebar-link");

        this.initEvents();
    }

    initEvents() {
        if (this.menuToggle) {
            this.menuToggle.addEventListener("click", this.toggle.bind(this));
        } else {
            console.error(`Error: Elemen menu toggle dengan ID 'menuToggle' tidak ditemukan.`);
        }
        this.overlay.addEventListener("click", this.close.bind(this));
        this.menuLinks.forEach(link => link.addEventListener("click", this.close.bind(this)));
    }

    toggle() {
        if (this.sidebar.classList.contains("active")) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.sidebar.classList.add("active");
        this.overlay.classList.add("active");
        document.body.classList.add("sidebar-open"); // Penting: Tambahkan kelas ini ke body
    }

    close() {
        this.sidebar.classList.remove("active");
        this.overlay.classList.remove("active");
        document.body.classList.remove("sidebar-open"); // Penting: Hapus kelas ini dari body
    }
}

// --- DEFINISI CLASS LaporanKemacetan (Tidak berubah) ---
class LaporanKemacetan {
    constructor(data, index) {
        this.title = data.title;
        this.waktu = data.waktu;
        this.deskripsi = data.deskripsi;
        this.kategori = data.kategori;
        this.koordinat = data.koordinat;
        this.id = `map${index}`;
    }

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

    initializeMap() {
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
            map.invalidateSize();
        }, 0);
    }
}

// --- DATA LAPORAN ASLI (Tidak berubah) ---
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

// --- Fungsi untuk menginisialisasi laporan ---
function renderLaporan() {
    const container = document.getElementById("laporan-list");
    if (!container) {
        console.error("Elemen dengan ID 'laporan-list' tidak ditemukan.");
        return;
    }
    container.innerHTML = "";

    const laporanObjek = laporanDataNew.map((data, index) => new LaporanKemacetan(data, index));

    laporanObjek.forEach(laporan => {
        const cardElement = laporan.renderCard();
        container.appendChild(cardElement);
        laporan.initializeMap();
    });
}

// --- Fungsi lainnya ---
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
    // Inisialisasi Sidebar: Cukup berikan ID untuk sidebar, overlay, dan menuToggle
    new Sidebar("sidebar", "overlay", "menuToggle");

    renderLaporan();

    const transjakartaButton = document.querySelector(".btn-transjakarta");
    if (transjakartaButton) {
        transjakartaButton.addEventListener("click", () => {
            window.location.href = "../Transjakarta/MenuTJ.html";
        });
    }
});