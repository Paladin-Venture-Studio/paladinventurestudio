jQuery.noConflict()(function ($) {

    'use strict';

    gsap.to(".swiper-container", { opacity: 1, ease: "power2.inOut", duration: .7, delay: .1 });

    $.exists = function (selector) {
        return ($(selector).length > 0);
    }

    ms_full_slider();

    /*------------------
    Full Page Slider
    -------------------*/
    function ms_full_slider() {

        // Full Page Fade Effect
        if ($.exists('.swiper-full-page')) {
            var total_count = $('.swiper-counter').data('counter'),
                l = $('.swiper-slide').data('autoplay');
            $('.total-count').html(total_count);
            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 1,
                loop: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                speed: 700,
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                freeMode: false,
                grabCursor: true,
                mousewheel: {
                    enabled: true,
                    releaseOnEdges: true,
                },
                keyboard: {
                    enabled: true,
                    onlyInViewport: false,
                },
                noSwipingClass: 'no-swipe'
            });

            console.log("swiper: ", swiper)
            window.swiper = swiper;
        }


    }

    function submitToGoogleForms(e) {
        e.preventDefault();
        window.swiper.update();
        console.log("swiper: ", window.swiper)
        var form = document.getElementById('contact-form');
        console.log("form.checkValidity()", form.checkValidity());
        if (!form.checkValidity()) {

            return;

        }
        e.preventDefault();
        var formStatus = document.getElementById("contact-form-status");
        var formData = new FormData(form);

        fetch('https://docs.google.com/forms/d/e/1FAIpQLScjAMgr_MuXqoI_K7ZW8RFuC6RabRQaeJH4a5x6Q_MgjlI2-g/formResponse', {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        })
            .then(function (response) {
                if (response.status == 0 || response.ok) {
                    formStatus.innerHTML = "Thanks for contacting us!"
                    // Reset the form after successful submission
                    form.reset();
                } else {
                    // Optionally, handle the error
                    formStatus.innerHTML = "Oops! Submission failed. Please contact us directly."
                }
            })
            .catch(function (error) {
                // Optionally, handle the error
                formStatus.innerHTML = "Oops! Submission failed. Please contact us directly."
                // Optionally, handle the error
            });
    }

    // Attach the function to the global scope
    window.submitToGoogleForms = submitToGoogleForms;

});