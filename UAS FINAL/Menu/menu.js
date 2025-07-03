function createMiniMap(mapId, start, end) {
      const map = L.map(mapId, {
        zoomControl: false,
        dragging: true,
        scrollWheelZoom: false,
        attributionControl: false
      }).setView(start, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

      const startMarker = L.marker(start, { draggable: true }).addTo(map).bindPopup("Asal").openPopup();
      const endMarker = L.marker(end, { draggable: true }).addTo(map).bindPopup("Tujuan");

      let routingControl = null;

      function drawRoute() {
        if (routingControl) {
          map.removeControl(routingControl);
        }

        routingControl = L.Routing.control({
          waypoints: [startMarker.getLatLng(), endMarker.getLatLng()],
          router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
          createMarker: () => null,
          lineOptions: { styles: [{ color: 'blue', weight: 3, opacity: 0.7 }] },
          addWaypoints: false,
          draggableWaypoints: false,
          fitSelectedRoutes: false
        }).addTo(map);
      }

      drawRoute();
      startMarker.on('dragend', drawRoute);
      endMarker.on('dragend', drawRoute);
    }

    // Inisialisasi dua peta mini
    createMiniMap('map1', [-6.2065, 106.81], [-6.3, 106.85]);
    createMiniMap('map2', [-6.21, 106.81], [-6.29, 106.83]);

  // Sidebar
  const openSidebar = document.getElementById("openSidebar");
  const closeSidebar = document.getElementById("closeSidebar");
  const sidebar = document.getElementById("sidebar");

  if (openSidebar && closeSidebar && sidebar) {
    openSidebar.addEventListener("click", () => {
      sidebar.classList.add("active");
    });

    closeSidebar.addEventListener("click", () => {
      sidebar.classList.remove("active");
    });
  }
})];
// Tutup sidebar saat klik di luar
document.addEventListener("click", function (event) {
  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("openSidebar");

  // Jika sidebar terbuka dan klik terjadi di luar sidebar dan bukan tombol open
  if (
    sidebar.classList.contains("active") &&
    !sidebar.contains(event.target) &&
    !openBtn.contains(event.target)
  ) {
    sidebar.classList.remove("active");
  }
});