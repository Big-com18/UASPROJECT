document.addEventListener('DOMContentLoaded', function() {
    const openSidebarBtn = document.getElementById('openSidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const body = document.body;

    if (openSidebarBtn && sidebar && overlay) {
        openSidebarBtn.addEventListener('click', function() {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            body.classList.add('sidebar-open');
        });

        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('sidebar-open');
        });

        // Opsional: Tutup sidebar jika salah satu link di sidebar diklik
        const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('sidebar-open');
            });
        });
    }
});