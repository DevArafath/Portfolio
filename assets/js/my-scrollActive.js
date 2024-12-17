// Get the current page path
const currentPath = window.location.pathname;
const rootPath = '/';

function isIndexPage() {
    return currentPath === rootPath || 
        currentPath.endsWith('/index.html') || 
        currentPath.endsWith('/');
}

function isMobileMenuOpen() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    return navbarCollapse.classList.contains('show');
}

// Function to handle portfolio and service active states
function updateSectionActive(sectionName) {
    const navLink = document.querySelector(`a.nav-link[href$="#${sectionName}"]`);
    
    // Case 1: We're on the specific page (portfolio.html or service.html)
    if (currentPath.includes(`${sectionName}.html`)) {
        if (navLink) {
            navLink.classList.add('active');
        }
        return true;
    }
    
    // Case 2: We're on index page's section
    if (isIndexPage()) {
        const section = document.getElementById(sectionName);
        if (!section) return false;
        
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const scrollPosition = window.scrollY + navbarHeight + 50;
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            if (navLink) {
                navLink.classList.add('active');
            }
            return true;
        }
    }
    
    return false;
}

// Main function to update active states
function updateActiveStates() {
    if (isMobileMenuOpen()) {
        return;
    }

    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Check portfolio and services first (Commented for Future Updates)
    // if (updateSectionActive('portfolio') || updateSectionActive('services') || updateSectionActive('about')){
    if (updateSectionActive('portfolio') || updateSectionActive('services')) {
        return;
    }
    // Check all sections that have both index and separate pages *********************This is for more new section if have sections and separate
    // if (updateSectionActive('portfolio') || 
    // updateSectionActive('services') || 
    // updateSectionActive('about') ||     // new section
    // updateSectionActive('team')) {      // another new section
    // return;
    // }
    
    // Handle blog page
    if (currentPath.includes('blog.html')) {
        const blogLink = document.querySelector('a.nav-link[href="blog.html"]');
        if (blogLink) {
            blogLink.classList.add('active');
        }
        return;
    }
    
    // Rest of your existing index page sections code...
    
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
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section;
            }
        });
        
        if (currentSection) {
            const sectionId = currentSection.id;
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${sectionId}` || href === `index.html#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }
}

// Rest of your code remains the same...

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
