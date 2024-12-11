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
    
    // First remove all active classes
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Handle portfolio page
    if (currentPath.includes('portfolio.html')) {
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
                // Check both formats: "#section" and "index.php#section"
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
        // Update active states when mobile menu closes
        navbarCollapse.addEventListener('hidden.bs.collapse', () => {
            updateActiveStates();
        });
        
        // Handle nav link clicks in mobile menu
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMobileMenuOpen()) {
                    // Close the mobile menu
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            });
        });
    }
});