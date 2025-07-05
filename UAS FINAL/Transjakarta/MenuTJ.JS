  const routes = [
    { name: 'Koridor 1: Blok M - Kota', desc: 'Melewati Sudirman, Thamrin, Monas', warning: true },
    { name: 'Koridor 1: Blok M - Kota', desc: 'Melewati Sudirman, Thamrin, Monas', warning: false },
    { name: 'Koridor 1: Blok M - Kota', desc: 'Melewati Sudirman, Thamrin, Monas', warning: false },
    { name: 'Koridor 1: Blok M - Kota', desc: 'Melewati Sudirman, Thamrin, Monas', warning: false },
    { name: 'Koridor 1: Blok M - Kota', desc: 'Melewati Sudirman, Thamrin, Monas', warning: false },
    { name: 'Koridor 1: Blok M - Kota', desc: 'Melewati Sudirman, Thamrin, Monas', warning: false },
    { name: 'Koridor 1: Blok M - Kota', desc: 'Melewati Sudirman, Thamrin, Monas', warning: false },
    { name: 'Koridor 1: Blok M - Kota', desc: 'Melewati Sudirman, Thamrin, Monas', warning: true }
  ];

  const routeList = document.getElementById("routeList");

  function renderRoutes(data) {
    routeList.innerHTML = "";
    data.forEach(route => {
      const item = document.createElement("div");
      item.className = "route-item";

      item.innerHTML = `
        <div class="route-left">
          <div class="route-icon"></div>
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

  // Panggil renderRoutes saat halaman pertama kali dimuat
  renderRoutes(routes);

  // Search functionality
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = routes.filter(route =>
      route.name.toLowerCase().includes(keyword) ||
      route.desc.toLowerCase().includes(keyword) // Tambahkan pencarian berdasarkan deskripsi juga
    );
    renderRoutes(filtered);
  });

  // Sidebar functionality
  document.addEventListener("DOMContentLoaded", () => {
      // Menghapus baris ini karena renderLaporan() tidak didefinisikan
      // renderLaporan(); 

      const sidebar = document.getElementById("sidebar");
      const overlay = document.getElementById("overlay");
      const menuIcon = document.getElementById("openSidebar"); // Sudah benar sekarang karena ID ditambahkan di HTML
      const menuLinks = document.querySelectorAll(".sidebar-link");

      // Pastikan menuIcon ditemukan sebelum menambahkan event listener
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
      menuLinks.forEach(link => link.addEventListener("click", closeSidebar));

      function closeSidebar() {
          sidebar.classList.remove("active");
          overlay.classList.remove("active");
          document.body.classList.remove("sidebar-open");
      }
  });