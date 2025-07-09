class Sidebar {
    constructor(sidebarId, overlayId, menuToggleId) {
        this.sidebar = document.getElementById(sidebarId);
        this.overlay = document.getElementById(overlayId);
        this.menuToggle = document.getElementById(menuToggleId); // Ini adalah kontainer ikon di navbar
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

// Inisialisasi sidebar saat DOM selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
    new Sidebar("sidebar", "overlay", "menuToggle");
});