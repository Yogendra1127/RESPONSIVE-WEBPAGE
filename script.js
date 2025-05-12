document.addEventListener('DOMContentLoaded', () => {
    // --- Hamburger Menu Toggle ---
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav-menu');
    const body = document.body;

    if (hamburgerBtn && mobileNav) {
        hamburgerBtn.addEventListener('click', () => {
            const isActive = mobileNav.classList.toggle('active');
            hamburgerBtn.classList.toggle('active', isActive); // For styling hamburger icon itself
            body.classList.toggle('mobile-nav-active', isActive);
            hamburgerBtn.setAttribute('aria-expanded', isActive.toString());
        });

        const mobileNavLinks = mobileNav.querySelectorAll('ul li a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                hamburgerBtn.classList.remove('active');
                body.classList.remove('mobile-nav-active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- Video Player Functionality ---
    const videoContainer = document.querySelector('.video-container');
    const video = document.querySelector('.video-section video');
    const playButton = document.querySelector('.video-section .play-button');
    const thumbnail = videoContainer ? videoContainer.querySelector('img.thumbnail') : null;

    if (videoContainer && video) {
        const showControls = () => {
            videoContainer.classList.remove('video-playing');
            if (playButton) playButton.style.opacity = '1';
            if (thumbnail) thumbnail.style.opacity = '1';
        };

        const hideControls = () => {
            videoContainer.classList.add('video-playing');
            if (playButton) playButton.style.opacity = '0';
            if (thumbnail) thumbnail.style.opacity = '0';
        };
        
        // Initially, if there's a thumbnail, ensure play button is visible
        if (thumbnail && playButton) {
            playButton.style.opacity = '1';
        }


        videoContainer.addEventListener('click', function(event) {
            // Prevent click on controls from re-triggering this
            if (event.target === video && video.hasAttribute('controls')) return;

            if (video.paused || video.ended) {
                video.play();
            } else {
                // If video is playing and user clicks container (not controls), pause it
                // This might be unexpected UX, usually click on video toggles play/pause if controls are hidden
                // video.pause(); 
            }
        });

        video.addEventListener('play', hideControls);
        video.addEventListener('ended', () => {
            showControls();
            video.currentTime = 0;
        });
        video.addEventListener('pause', () => {
            if (!video.seeking && !video.ended) {
                showControls();
            }
        });
    }

    // --- Testimonial Slider Functionality ---
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonials .dot');
    let currentTestimonialIndex = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        if (!testimonialSlides.length || index < 0 || index >= testimonialSlides.length) return;

        testimonialSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (testimonialDots[i]) testimonialDots[i].classList.remove('active');
        });

        testimonialSlides[index].classList.add('active');
        if (testimonialDots[index]) testimonialDots[index].classList.add('active');
        currentTestimonialIndex = index;
    }

    function nextTestimonial() {
        let nextIndex = (currentTestimonialIndex + 1) % testimonialSlides.length;
        showTestimonial(nextIndex);
    }

    function startTestimonialInterval() {
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    if (testimonialSlides.length > 0) {
        showTestimonial(0); // Initialize first slide

        if (testimonialDots.length === testimonialSlides.length) {
            testimonialDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showTestimonial(index);
                    startTestimonialInterval(); // Reset interval on manual navigation
                });
            });
        } else if (testimonialDots.length > 0) {
            console.warn("Testimonial dots count does not match slides count.");
        }

        startTestimonialInterval();

        const testimonialsSection = document.querySelector('.testimonials');
        if (testimonialsSection) {
            testimonialsSection.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
            testimonialsSection.addEventListener('mouseleave', startTestimonialInterval);
        }
    }

    // --- Contact Form Modal & Modal Open Body Scroll ---
    const contactForm = document.getElementById('contactForm');
    let successModal = null; 

    function ensureModalExists() {
        if (document.getElementById('successModal')) {
            successModal = document.getElementById('successModal');
            return;
        }

        const modalHTML = `
            <div id="successModal" class="modal">
                <div class="modal-content">
                    <span class="close-button" aria-label="Close modal">×</span>
                    <p>Your message has been sent successfully!</p>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        successModal = document.getElementById('successModal');
        
        const closeModalButton = successModal.querySelector('.close-button');
        if (closeModalButton) {
            closeModalButton.addEventListener('click', closeSuccessModal);
        }
        
        successModal.addEventListener('click', (event) => {
            if (event.target === successModal) { // Click on overlay
                closeSuccessModal();
            }
        });
        // Close with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && successModal.style.display === 'block') {
                closeSuccessModal();
            }
        });
    }
    
    function openSuccessModal() {
        ensureModalExists(); 
        if (successModal) {
            successModal.style.display = 'block';
            body.classList.add('modal-open'); 
            successModal.querySelector('.close-button').focus(); // Focus on close button for accessibility
        }
    }

    function closeSuccessModal() {
        if (successModal) {
            successModal.style.display = 'none';
        }
        body.classList.remove('modal-open');
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            // Simple validation check - real validation should be more robust
            let formIsValid = true;
            contactForm.querySelectorAll('[required]').forEach(input => {
                if (!input.value.trim()) {
                    formIsValid = false;
                    // Optionally, add some visual feedback for invalid fields
                    input.style.borderColor = 'red'; 
                } else {
                    input.style.borderColor = ''; // Reset border color
                }
            });

            if (formIsValid) {
                openSuccessModal();
                contactForm.reset(); 
                 contactForm.querySelectorAll('[required]').forEach(input => {
                    input.style.borderColor = ''; // Reset border color on successful submit
                });
            } else {
                alert("Please fill out all required fields.");
            }
        });
    }
});