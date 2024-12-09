$(document).ready(function () {
    // Function to animate the counter
    function animateCounter(counterElement) {
        var targetValue = $(counterElement).data('target');
        $({ countNum: 0 }).animate(
            { countNum: targetValue },
            {
                duration: 3000, // Animation duration
                easing: 'swing',
                step: function () {
                    $(counterElement).text(Math.floor(this.countNum));
                },
                complete: function () {
                    $(counterElement).text(this.countNum);
                },
            }
        );
    }

    // Typing effect
    function typeWriter(spanElement, text) {
        var i = 0;
        var speed = 100; // Typing speed (in milliseconds)

        // Clear the span text and start the typing effect
        $(spanElement).text('');

        function type() {
            if (i < text.length) {
                $(spanElement).append(text.charAt(i));
                i++;
                setTimeout(type, speed); // Call the function recursively with delay
            }
        }

        type(); // Start typing effect
    }

    // Function to trigger the typing effect every time the user scrolls to the element
    function triggerTypingEffect(spanElement) {
        var text = $(spanElement).data('text');
        typeWriter(spanElement, text); // Start typing effect
    }

    // Use IntersectionObserver to detect when the element is in the viewport and trigger animation
    var observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Trigger typing effect each time the element comes into view
                triggerTypingEffect(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is in the viewport
    });

    // Target all elements that have the data-text attribute for typing effect
    $('[data-text]').each(function () {
        observer.observe(this); // Observe each element with the data-text attribute
    });

    // Use IntersectionObserver to detect when the counter element is in the viewport
    var counterObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target); // Animate the counter when in view
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is in the viewport
    });

    // Target all counters for observation
    $('.counter-value').each(function () {
        counterObserver.observe(this);
    });
});
