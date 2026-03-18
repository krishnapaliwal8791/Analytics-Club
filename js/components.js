document.addEventListener('DOMContentLoaded', () => {
    // Load Navbar
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            // Initialize mobile menu after navbar is loaded
            initMobileMenu();
            notifyComponentsLoaded();
        })
        .catch(error => console.error('Error loading navbar:', error));

    // Load Footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
            notifyComponentsLoaded();
        })
        .catch(error => console.error('Error loading footer:', error));
});

// Dispatch event when components are loaded
function notifyComponentsLoaded() {
    window.dispatchEvent(new CustomEvent('componentsLoaded'));
}

function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}