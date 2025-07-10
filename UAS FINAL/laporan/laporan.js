document.addEventListener('DOMContentLoaded', function() {
    // =======================================
    // Logika Sidebar/Navbar
    // =======================================
    class Sidebar {
        constructor(sidebarId, overlayId, menuToggleId) {
            this.sidebar = document.getElementById(sidebarId);
            this.overlay = document.getElementById(overlayId);
            this.menuToggle = document.getElementById(menuToggleId);
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
            document.body.classList.add("sidebar-open");
        }

        close() {
            this.sidebar.classList.remove("active");
            this.overlay.classList.remove("active");
            document.body.classList.remove("sidebar-open");
        }
    }

    // Inisialisasi sidebar
    new Sidebar("sidebar", "overlay", "menuToggle");


    // =======================================
    // Logika Peta Leaflet
    // =======================================

    // Inisialisasi peta Leaflet
    const map = L.map('trafficMap', {
        zoomControl: true,
        dragging: true,
        scrollWheelZoom: true,
        attributionControl: false
    }).setView([-6.2088, 106.8456], 13); // Pusat peta di Jakarta, zoom level 13

    // Tambahkan layer OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let selectedMarker = null; // Variabel untuk menyimpan marker yang dipilih

    // Event listener ketika peta diklik
    map.on('click', function(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        // Update nilai input hidden
        document.getElementById('trafficLat').value = lat;
        document.getElementById('trafficLng').value = lng;

        // Hapus marker sebelumnya jika ada
        if (selectedMarker) {
            map.removeLayer(selectedMarker);
        }

        // Tambahkan marker baru di lokasi yang diklik
        selectedMarker = L.marker([lat, lng]).addTo(map)
            .bindPopup(`<b>Lokasi Dipilih:</b><br>Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}`)
            .openPopup();

        console.log(`Lokasi dipilih: Latitude: ${lat}, Longitude: ${lng}`);
    });
});