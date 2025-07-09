// MenuTJ.js

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
// --------------------------------------------------
// 2. Route Management (Encapsulation & Abstraction)
// --------------------------------------------------
class RouteManager {
    constructor(routesData, routeListId, searchInputId) {
        this.routes = routesData;
        this.routeListElement = document.getElementById(routeListId);
        this.searchInput = document.getElementById(searchInputId);

        this.initEvents();
        this.renderRoutes(this.routes); // Initial render
    }

    initEvents() {
        this.searchInput.addEventListener("input", this.handleSearch.bind(this));
        // Back icon functionality
        const backIcon = document.querySelector('.back-icon');
        if (backIcon) {
            backIcon.addEventListener('click', () => {
                window.history.back();
            });
        }
    }

    renderRoutes(data) {
        this.routeListElement.innerHTML = "";
        data.forEach(route => {
            const item = document.createElement("div");
            item.className = "route-item";

            item.innerHTML = `
                <div class="route-left">
                    <div class="route-icon">
                        <img src="${route.iconImage}" alt="Route Icon" class="route-image-in-circle">
                    </div>
                    <div class="route-info">
                        <strong>${route.name}</strong>
                        <small>${route.desc}</small>
                    </div>
                </div>
                <div class="route-right">
                    ${route.warning
                        ? '<i class="fas fa-exclamation-circle warning-icon"></i>'
                        : '<i class="fas fa-chevron-right"></i>'}
                </div>
            `;
            this.routeListElement.appendChild(item);
        });
    }

    handleSearch() {
        const keyword = this.searchInput.value.toLowerCase();
        const filtered = this.routes.filter(route =>
            route.name.toLowerCase().includes(keyword) ||
            route.desc.toLowerCase().includes(keyword)
        );
        this.renderRoutes(filtered);
    }
}

// --------------------------------------------------
// 3. Application Initialization
// --------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    // Sample route data
    const routesData = [
        { name: 'Koridor 1: Blok M - Kota', desc: 'Melewati Sudirman, Thamrin, Monas', warning: true, iconImage: "./Picture/TJ1.png" },
        { name: 'Koridor 2: Pulo Gadung - Harmoni', desc: 'Melewati Cempaka Putih, Senen', warning: false, iconImage: './Picture/TJ2.png' },
        { name: 'Koridor 3: Kalideres - Pasar Baru', desc: 'Melewati Grogol, Tomang', warning: false, iconImage: './Picture/TJ3.png' },
        { name: 'Koridor 4: Pulo Gadung - Dukuh Atas', desc: 'Melewati Matraman, Salemba', warning: false, iconImage: './Picture/TJ4.png' },
        { name: 'Koridor 5: Kampung Melayu - Ancol', desc: 'Melewati Jatinegara, Gunung Sahari', warning: false, iconImage: './Picture/TJ5.png' },
        { name: 'Koridor 6: Ragunan - Dukuh Atas', desc: 'Melewati Warung Buncit, Mampang', warning: false, iconImage: './Picture/TJ6.png' },
        { name: 'Koridor 7: Kampung Rambutan - Kampung Melayu', desc: 'Melewati Cililitan, Cawang', warning: false, iconImage: './Picture/TJ7.png' },
        { name: 'Koridor 8: Lebak Bulus - Harmoni', desc: 'Melewati Pondok Indah, Blok M', warning: true, iconImage: './Picture/TJ8.png' },
        { name: 'Koridor 9: Pinang Ranti - Pluit', desc: 'Melewati Cakung, Sunter', warning: false, iconImage: './Picture/TJ9.png' },
        { name: 'Koridor 10: Tanjung Priok - Kota', desc: 'Melewati Ancol, Mangga Dua', warning: false, iconImage: './Picture/TJ10.png' }
    ];

    // Initialize sidebar and route manager
    new Sidebar("sidebar", "overlay", "menuToggle");
    new RouteManager(routesData, "routeList", "searchInput");
});