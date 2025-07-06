const routes = [
            { name: 'Koridor 1: Blok M - Kota', desc: 'Melewati Sudirman, Thamrin, Monas', warning: true, iconImage: "./Picture/TJ1.png" }, // Sesuaikan dengan nama file ikon home Anda
            { name: 'Koridor 2: Pulo Gadung - Harmoni', desc: 'Melewati Cempaka Putih, Senen', warning: false, iconImage: './Picture/bus_teal.png' },
            { name: 'Koridor 3: Kalideres - Pasar Baru', desc: 'Melewati Grogol, Tomang', warning: false, iconImage: './Picture/bus_green.png' },
            { name: 'Koridor 4: Pulo Gadung - Dukuh Atas', desc: 'Melewati Matraman, Salemba', warning: false, iconImage: './Picture/bus_blue.png' },
            { name: 'Koridor 5: Kampung Melayu - Ancol', desc: 'Melewati Jatinegara, Gunung Sahari', warning: false, iconImage: './Picture/bus_orange.png' },
            { name: 'Koridor 6: Ragunan - Dukuh Atas', desc: 'Melewati Warung Buncit, Mampang', warning: false, iconImage: './Picture/bus_pink.png' },
            { name: 'Koridor 7: Kampung Rambutan - Kampung Melayu', desc: 'Melewati Cililitan, Cawang', warning: false, iconImage: './Picture/bus_purple.png' },
            { name: 'Koridor 8: Lebak Bulus - Harmoni', desc: 'Melewati Pondok Indah, Blok M', warning: true, iconImage: './Picture/warning_red.png' },
            { name: 'Koridor 9: Pinang Ranti - Pluit', desc: 'Melewati Cakung, Sunter', warning: false, iconImage: './Picture/bus_yellow.png' },
            { name: 'Koridor 10: Tanjung Priok - Kota', desc: 'Melewati Ancol, Mangga Dua', warning: false, iconImage: './Picture/bus_gray.png' }
        ];

        const routeList = document.getElementById("routeList");

        function renderRoutes(data) {
            routeList.innerHTML = "";
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

                routeList.appendChild(item);
            });
        }

        renderRoutes(routes);

        // Search functionality
        const searchInput = document.getElementById("searchInput");
        searchInput.addEventListener("input", () => {
            const keyword = searchInput.value.toLowerCase();
            const filtered = routes.filter(route =>
                route.name.toLowerCase().includes(keyword) ||
                route.desc.toLowerCase().includes(keyword)
            );
            renderRoutes(filtered);
        });

        // Sidebar functionality
        document.addEventListener("DOMContentLoaded", () => {
            const sidebar = document.getElementById("sidebar");
            const overlay = document.getElementById("overlay");
            const menuIcon = document.getElementById("openSidebar");
            const closeSidebarBtn = document.getElementById("closeSidebar");
            const menuLinks = document.querySelectorAll(".sidebar-link");

            if (menuIcon) {
                menuIcon.addEventListener("click", () => {
                    sidebar.classList.add("active");
                    overlay.classList.add("active");
                    document.body.classList.add("sidebar-open");
                });
            } else {
                console.error("Menu icon with ID 'openSidebar' not found.");
            }

            overlay.addEventListener("click", closeSidebar);
            if (closeSidebarBtn) {
                closeSidebarBtn.addEventListener("click", closeSidebar);
            }
            menuLinks.forEach(link => link.addEventListener("click", closeSidebar));

            function closeSidebar() {
                sidebar.classList.remove("active");
                overlay.classList.remove("active");
                document.body.classList.remove("sidebar-open");
            }
        });