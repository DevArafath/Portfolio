// <!-- NAVBAR -->
// <nav class="navbar navbar-expand-lg fixed-top navbar-dark" id="navbar">
//     <div class="container">
//         <a class="navbar-brand" href="index.html#home">
//             <span class="brand-name">Mohamed Arafath <span class="dot">v.01</span></span>
//             <!-- 02 B/W Logos for Mobile Screen -->
//             <img src="./assets/img/logo-b.png" alt="logo-black" class="logo-b">
//             <img src="./assets/img/logo-w.png" alt="logo-white" class="logo-w">
//         </a>
//         <!-- Custom Toggler -->
//         <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onclick="this.classList.toggle('nav-open')">
//             <span></span>
//             <span></span>
//             <span></span>
//             <span></span>
//             <span></span>
//             <span></span>
//         </button>
//         <div class="collapse navbar-collapse" id="navbarNav">
//             <ul class="navbar-nav ms-auto">
//                 <li class="nav-item">
//                     <a class="nav-link" href="index.html#home">Home</a>
//                 </li>
//                 <li class="nav-item">
//                     <a class="nav-link" href="index.html#about">About</a>
//                 </li>
//                 <li class="nav-item">
//                     <a class="nav-link" href="index.html#services">Services</a>
//                 </li>
//                 <li class="nav-item">
//                     <a class="nav-link" href="portfolio.html">Portfolio</a>
//                 </li>
//                 <li class="nav-item">
//                     <a class="nav-link" href="index.html#reviews">Reviews</a>
//                 </li>
//                 <li class="nav-item">
//                     <a class="nav-link" href="index.html#pricing">Pricing</a>
//                 </li>
//                 <li class="nav-item">
//                     <a class="nav-link" href="blog.html">Blog</a>
//                 </li>
//                 <li class="nav-item">
//                     <a class="nav-link" href="index.html#contact">Contact</a>
//                 </li>
//             </ul>
//         </div>
//     </div>
// </nav>

// Get the current page path
const currentPath = window.location.pathname;
const rootPath = '/'; // Adjust this if your site is in a subdirectory

// Helper function to check if we're on index page
function isIndexPage() {
    return currentPath === rootPath || 
        currentPath.endsWith('/index.html') || 
        currentPath.endsWith('/');
}

// Function to check if mobile menu is open
function isMobileMenuOpen() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    return navbarCollapse.classList.contains('show');
}

// Function to update active states
function updateActiveStates() {
    // Don't update active states if mobile menu is open
    if (isMobileMenuOpen()) {
        return;
    }

    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // First, remove all active classes
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Handle blog page
    if (currentPath.includes('blog.html') || currentPath.endsWith('/blog/')) {
        const blogLink = document.querySelector('a.nav-link[href="blog.html"]');
        if (blogLink) {
            blogLink.classList.add('active');
        }
        return;
    }

    // Handle portfolio page
    if (currentPath.includes('portfolio.html') || currentPath.endsWith('/portfolio/')) {
        const portfolioLink = document.querySelector('a.nav-link[href="portfolio.html"]');
        if (portfolioLink) {
            portfolioLink.classList.add('active');
        }
        return;
    }
    
    // Handle index page sections
    if (isIndexPage()) {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const scrollPosition = window.scrollY + navbarHeight + 50;
        
        // At the very top of the page, activate home
        if (window.scrollY < 50) {
            const homeLink = document.querySelector('a.nav-link[href="index.html#home"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
            return;
        }
        
        // Find which section we're currently in
        let currentSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100; // Added extra offset
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section;
            }
        });
        
        if (currentSection) {
            const sectionId = currentSection.id;
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                // Check both formats: "#section" and "index.html#section"
                if (href === `#${sectionId}` || href === `index.html#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }
}


// Debounce function to improve scroll performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll event listener with debouncing
const debouncedUpdate = debounce(updateActiveStates, 50);
window.addEventListener('scroll', debouncedUpdate);

// Update active state on page load
document.addEventListener('DOMContentLoaded', updateActiveStates);

// Update active state on hash change
window.addEventListener('hashchange', updateActiveStates);

// Handle mobile menu state changes
document.addEventListener('DOMContentLoaded', () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        // Handle toggler click to toggle the 'nav-open' class
        navbarToggler.addEventListener('click', () => {
            const isOpen = navbarCollapse.classList.contains('show');
            if (isOpen) {
                navbarToggler.classList.remove('nav-open');
            } else {
                navbarToggler.classList.add('nav-open');
            }
        });

        // Remove 'nav-open' class when the mobile menu is closed
        navbarCollapse.addEventListener('hidden.bs.collapse', () => {
            navbarToggler.classList.remove('nav-open');
        });

        // Add 'nav-open' class when the mobile menu is opened
        navbarCollapse.addEventListener('shown.bs.collapse', () => {
            navbarToggler.classList.add('nav-open');
        });

        // Handle nav link clicks to close the menu
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false,
                    });
                    bsCollapse.hide();
                    navbarToggler.classList.remove('nav-open');
                }
            });
        });
    }
});