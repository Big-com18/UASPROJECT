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
            // This console error is useful for debugging if an ID is misspelled
            console.error(`Menu icon with ID '${this.openIconId}' not found.`); 
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

document.addEventListener("DOMContentLoaded", () => {
    // Corrected: Ensure the ID passed here matches the HTML element's ID
    const sidebar = new Sidebar("sidebar", "overlay", "menu-icon"); 

    // Assuming you might add a close button later; otherwise, this block is not strictly needed.
    const closeButton = document.getElementById("close-button");
    if (closeButton) {
        closeButton.addEventListener("click", () => sidebar.close());
    }
});