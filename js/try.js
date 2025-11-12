document.addEventListener('DOMContentLoaded', function() {

    /**
     * =============================================
     * NEWSLETTER FORM HANDLER
     * =============================================
     */
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const emailInput = document.getElementById('email-input');
            const submitButton = newsletterForm.querySelector('button');
            const successMessage = document.getElementById('success-message');
            const email = emailInput.value.trim();

            // Simple email validation
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                emailInput.style.display = 'none';
                submitButton.style.display = 'none';
                successMessage.textContent = "Awesome! Thanks for subscribing! 🎉";
                successMessage.style.display = 'block';
                
                console.log(`Email submitted for newsletter: ${email}`);
                // In a real app, you would send this to a server.
                // e.g., fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
            } else {
                // Optional: Add an error state
                emailInput.style.border = '2px solid red';
            }
        });
    }

    /**
     * =============================================
     * REUSABLE HERO SLIDER FUNCTIONALITY
     * =============================================
     * This handles sliders with auto-play and dot indicators.
     */
    function initializeHeroSlider(sliderElement) {
        if (!sliderElement) return;

        const track = sliderElement.querySelector('.slider-track');
        const slides = Array.from(track.children);
        const nextButton = sliderElement.querySelector('.next');
        const prevButton = sliderElement.querySelector('.prev');
        const indicatorsContainer = sliderElement.querySelector('.slider-indicators');
        
        if (!track || slides.length === 0) return;

        const slideWidth = slides[0].getBoundingClientRect().width;
        let currentIndex = 0;
        let autoPlayInterval;

        // Arrange slides next to one another
        const setSlidePosition = (slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        };
        slides.forEach(setSlidePosition);

        // Create indicator dots
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('button');
            dot.classList.add('indicator-dot');
            dot.addEventListener('click', () => {
                moveToSlide(i);
                resetAutoPlay();
            });
            indicatorsContainer.appendChild(dot);
        }
        const indicators = Array.from(indicatorsContainer.children);

        const updateUI = (targetIndex) => {
            track.style.transform = `translateX(-${slideWidth * targetIndex}px)`;
            
            indicators.forEach((dot, index) => {
                dot.classList.toggle('active', index === targetIndex);
            });
            
            currentIndex = targetIndex;
        };
        
        const moveToSlide = (index) => {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            updateUI(index);
        };
        
        const showNextSlide = () => moveToSlide(currentIndex + 1);
        const showPrevSlide = () => moveToSlide(currentIndex - 1);

        // Auto-play functionality
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(showNextSlide, 5000);
        };

        const resetAutoPlay = () => {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        };

        // Event Listeners
        nextButton.addEventListener('click', () => {
            showNextSlide();
            resetAutoPlay();
        });
        prevButton.addEventListener('click', () => {
            showPrevSlide();
            resetAutoPlay();
        });
        window.addEventListener('resize', () => moveToSlide(currentIndex)); // Recalculate on resize

        // Initial setup
        updateUI(0);
        startAutoPlay();
    }

    // Initialize the main hero slider
    initializeHeroSlider(document.querySelector('.hero-slider'));


    /**
     * =============================================
     * REUSABLE PRODUCT SLIDER FUNCTIONALITY
     * =============================================
     * This handles card-based sliders that show multiple items at once.
     */
    function initializeProductSlider(sliderElement) {
        if (!sliderElement) return;

        const track = sliderElement.querySelector('.slider-track');
        const cards = Array.from(track.children);
        const nextButton = sliderElement.querySelector('.next');
        const prevButton = sliderElement.querySelector('.prev');
        
        if (!track || cards.length === 0 || !nextButton || !prevButton) return;

        let currentIndex = 0;

        const updateSlider = () => {
            const sliderVisibleWidth = sliderElement.querySelector('.slider-wrapper').offsetWidth;
            const cardWidth = cards[0].offsetWidth;
            const gap = parseInt(window.getComputedStyle(track).gap) || 0;
            const fullCardWidth = cardWidth + gap;
            
            const visibleCards = Math.floor(sliderVisibleWidth / fullCardWidth);
            const maxIndex = Math.max(0, cards.length - visibleCards);

            // Clamp currentIndex to valid range
            currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

            track.style.transform = `translateX(-${currentIndex * fullCardWidth}px)`;

            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex >= maxIndex;
        };

        nextButton.addEventListener('click', () => {
            currentIndex++;
            updateSlider();
        });

        prevButton.addEventListener('click', () => {
            currentIndex--;
            updateSlider();
        });

        // Use ResizeObserver for better performance on resize
        const observer = new ResizeObserver(updateSlider);
        observer.observe(sliderElement);
        
        // Initial call
        updateSlider();
    }
    
    // Initialize all product sliders on the page
    document.querySelectorAll('.product-slider').forEach(initializeProductSlider);

});