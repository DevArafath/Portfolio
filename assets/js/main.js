
$(document).ready(function () {  
    
    // Get the "Go to Top" button
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

    // Scroll to the top function for the "Go to Top" button ################
    goToTopButton.onclick = function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll
        });
    };

    // Get the "WhatsApp" button
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


    // Initialize Isotope
    const $portfolioContainer = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
        getSortData: {
            year: function(itemElem) {
                return parseInt($(itemElem).attr('data-year'), 10);
            }
        }
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




});






