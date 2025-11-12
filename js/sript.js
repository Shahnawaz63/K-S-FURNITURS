document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Newsletter Form Handler ---
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    const emailInput = document.getElementById("email-input");
    const submitButton = newsletterForm.querySelector("button");
    const successMessage = document.getElementById("success-message");

    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const email = emailInput.value.trim();
      if (email) {
        emailInput.style.display = "none";
        submitButton.style.display = "none";
        successMessage.textContent = "Awesome! Thanks for subscribing! 🎉";
        successMessage.style.display = "block";
        console.log(`Email submitted: ${email}`);
      }
    });
  }

  // --- 2. Hero Slider (Auto-playing) ---
  const heroSlider = document.querySelector(".feacherd-perent .slider-container");
  if (heroSlider) {
    const sliderTrack = heroSlider.querySelector(".slider-track");
    const slides = heroSlider.querySelectorAll(".slide");
    const prevBtn = heroSlider.querySelector(".prev");
    const nextBtn = heroSlider.querySelector(".next");
    const indicatorsContainer = heroSlider.querySelector(".slider-indicators");

    let currentIndex = 0;
    const slideCount = slides.length;
    let autoPlayInterval;
    const autoPlayDelay = 5000; // 5 seconds

    function updateSlider() {
      const slideWidth = slides[0].clientWidth;
      sliderTrack.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
      updateIndicators();
    }

    function showNextSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      updateSlider();
    }

    function showPrevSlide() {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateSlider();
    }

    function createIndicators() {
      for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement("div");
        dot.classList.add("indicator-dot");
        dot.addEventListener("click", () => {
          currentIndex = i;
          updateSlider();
          resetAutoPlay();
        });
        indicatorsContainer.appendChild(dot);
      }
    }

    function updateIndicators() {
      const dots = indicatorsContainer.querySelectorAll(".indicator-dot");
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

    function startAutoPlay() {
      autoPlayInterval = setInterval(showNextSlide, autoPlayDelay);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }

    nextBtn.addEventListener("click", () => {
      showNextSlide();
      resetAutoPlay();
    });

    prevBtn.addEventListener("click", () => {
      showPrevSlide();
      resetAutoPlay();
    });

    window.addEventListener("resize", updateSlider);

    // Initial setup
    if (slideCount > 0) {
        createIndicators();
        updateSlider();
        startAutoPlay();
    }
  }

  // --- 3. Product Card Sliders (Manual) ---
  const allProductSliders = document.querySelectorAll(".product-slider");
  
  // Initialize each product slider found on the page
  allProductSliders.forEach(initProductSlider);

  function initProductSlider(slider) {
    const wrapper = slider.querySelector(".slider-wrapper");
    const cards = slider.querySelectorAll(".product-card");
    const prevBtn = slider.querySelector(".prev-btn");
    const nextBtn = slider.querySelector(".next-btn");
    
    // If essential elements don't exist in this slider, skip it.
    if (!wrapper || cards.length === 0 || !prevBtn || !nextBtn) {
      return;
    }

    let currentIndex = 0;

    function updateSliderState() {
      // Calculate widths and gaps
      const cardWidth = cards[0].offsetWidth;
      const gap = parseInt(window.getComputedStyle(wrapper).gap) || 20;
      const slideWidth = cardWidth + gap;
      
      const containerWidth = slider.offsetWidth;
      const visibleCards = Math.floor(containerWidth / slideWidth);
      
      const maxIndex = cards.length > visibleCards ? cards.length - visibleCards : 0;
      
      // Clamp currentIndex to valid range
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;

      // Apply transformation
      wrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

      // Update button disabled state
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;
    }

    nextBtn.addEventListener("click", () => {
      currentIndex++;
      updateSliderState();
    });

    prevBtn.addEventListener("click", () => {
      currentIndex--;
      updateSliderState();
    });
    
    // Recalculate on resize
    window.addEventListener("resize", updateSliderState);

    // Initial calculation
    updateSliderState();
  }
});