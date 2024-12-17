
$(document).ready(function () {  
    
    // Get the "Go to Top" button ############################################################################################################################
    const goToTopButton = document.getElementById("goToTop");    

    // Functions to run on window scroll
    $(window).on('scroll', function () {
        const $scroll = $(window).scrollTop();
        const $navbar = $('#navbar');

        // Navbar scrolling effect ########################################
        if ($scroll > 0) {
            $navbar.addClass('scrolled');
        } else {
            $navbar.removeClass('scrolled');
        }

        // Show or hide the "Go to Top" button ############################
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            goToTopButton.style.display = "block";
        } else {
            goToTopButton.style.display = "none";
        }
    });

    // Scroll to the top function for the "Go to Top" button ####################################################################################################################
    goToTopButton.onclick = function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll
        });
    };

    // Get the "WhatsApp" button ################################################################################################################################################

    const whatsappButton = document.getElementById("whatsappButton");
    // WhatsApp function to open chat ######################################
    function openWhatsApp() {
        const phoneNumber = "+97477375047"; // Replace with the phone number in international format
        const message = encodeURIComponent("Hi! I would like to know more about you. and lets discuss the project"); // Optional preset message
        const url = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(url, "_blank");
    }
    // Attach the WhatsApp function to the button click event
    whatsappButton.onclick = openWhatsApp;


    // Initialize Isotope // ################################################################################################################################################

    const $portfolioContainer = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
        filter: "*",
        getSortData: {
            year: function(itemElem) {
                return parseInt($(itemElem).attr('data-year'), 10);
            }
        }
    });

    // Search functionality
    $('#portfolio-search').on('keyup', function() {
        const searchTerm = $(this).val().toLowerCase();

        // Filter items based on search term (matching project title or description)
        $portfolioContainer.isotope({
            filter: function() {
                const title = $(this).find('.client').text().toLowerCase();
                const description = $(this).find('.country').text().toLowerCase();
                return title.includes(searchTerm) || description.includes(searchTerm);
            }
        });
    });

    // Filter items on category button click
    $('.portfolio-filter li').on('click', function() {
        $('.portfolio-filter li').removeClass('filter-active');
        $(this).addClass('filter-active');
        
        const filterValue = $(this).attr('data-filter');
        applyFiltersAndSort(filterValue, $('#filter-portfolio-country').val());
    });

    // Sort by Year
    $('#sort-portfolio').on('change', function() {
        applyCurrentFiltersAndSort();
    });

    // Filter by Country
    $('#filter-portfolio-country').on('change', function() {
        applyCurrentFiltersAndSort();
    });

    // Function to apply both filters and sorting
    function applyCurrentFiltersAndSort() {
        const categoryFilter = $('.portfolio-filter li.filter-active').attr('data-filter');
        const countryFilter = $('#filter-portfolio-country').val();
        applyFiltersAndSort(categoryFilter, countryFilter);
    }

    function applyFiltersAndSort(categoryFilter, countryFilter) {
        // Combine category and country filters
        let combinedFilter;
        if (categoryFilter === '*' && countryFilter === '*') {
            combinedFilter = '*';
        } else if (categoryFilter === '*') {
            combinedFilter = countryFilter;
        } else if (countryFilter === '*') {
            combinedFilter = categoryFilter;
        } else {
            combinedFilter = function() {
                return $(this).is(categoryFilter) && $(this).is(countryFilter);
            };
        }

        // Get sort settings
        const sortValue = $('#sort-portfolio').val();
        const sortOptions = {
            filter: combinedFilter
        };

        // Apply sorting if not default
        if (sortValue !== 'original-order') {
            sortOptions.sortBy = 'year';
            sortOptions.sortAscending = sortValue === 'ascending';
        }

        // Apply both filtering and sorting
        $portfolioContainer.isotope(sortOptions);
    }

    // Initial sort and filter application
    applyCurrentFiltersAndSort();
    // ################################################################################################################################################

    // Reset button functionality
    $('#reset-filters').on('click', function() {
        // Reset sort dropdown
        $('#sort-portfolio').val('original-order');
        
        // Reset country filter
        $('#filter-portfolio-country').val('*');
        
        // Clear search input
        $('#portfolio-search').val('');
        
        // Reset category filter if it exists
        $('.portfolio-filter li').removeClass('filter-active');
        $('.portfolio-filter li[data-filter="*"]').addClass('filter-active');
        
        // Reset Isotope to default state
        $portfolioContainer.isotope({
            filter: '*',
            sortBy: 'original-order'
        });
    });

    // Swiper JS Carouel for Review ################################################################################################################################################
    var swiper = new Swiper(".swiper-review", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 3,
        loop: true,
        autoplay: {
            delay: 3000,  // 3 seconds between slides
            disableOnInteraction: false  // continues autoplay after user interaction
        },
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    }); 
    

});






