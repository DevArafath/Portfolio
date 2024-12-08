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


    // Change background image based on time of day #######################
    const heroSection = document.querySelector(".hero");
    const morningImage = "./assets/img/morning.jpg";
    const afternoonImage = ".assets/img/afternoon.jpg";
    const eveningImage = ".assets/img/evening.jpg";
    const nightImage = ".assets/img/night.jpg";

    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 12) {
        // Morning (6 AM - 12 PM)
        heroSection.style.backgroundImage = `url('${morningImage}')`;
    } else if (currentHour >= 12 && currentHour < 18) {
        // Afternoon (12 PM - 6 PM)
        heroSection.style.backgroundImage = `url('${afternoonImage}')`;
    } else if (currentHour >= 18 && currentHour < 21) {
        // Evening (6 PM - 9 PM)
        heroSection.style.backgroundImage = `url('${eveningImage}')`;
    } else {
        // Night (9 PM - 6 AM)
        heroSection.style.backgroundImage = `url('${nightImage}')`;
    }
    
});
