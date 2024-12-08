
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


    // // Change the background image of the hero section based on the time of day
    // var heroSection = $('.hero');

    // // Get the current hour
    // var currentHour = new Date().getHours();
    
    // // Define the images for different times of the day
    // var morningImage = 'url("./assets/img/morning.jpg")';
    // var afternoonImage = 'url("../assets/img/afternoon.jpg")';
    // var eveningImage = 'url("./assets/img/evening.jpg")';
    // var nightImage = 'url("./assets/img/night.jpg")';
    
    // // Change the background image based on the current hour
    // if (currentHour >= 6 && currentHour < 12) {
    //     heroSection.css('background-image', morningImage);  // Morning (6 AM - 12 PM)
    // } else if (currentHour >= 12 && currentHour < 18) {
    //     heroSection.css('background-image', afternoonImage);  // Afternoon (12 PM - 6 PM)
    // } else if (currentHour >= 18 && currentHour < 21) {
    //     heroSection.css('background-image', eveningImage);  // Evening (6 PM - 9 PM)
    // } else {
    //     heroSection.css('background-image', nightImage);  // Night (9 PM - 6 AM)
    // }


    
});




