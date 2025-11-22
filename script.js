
// K&S Furniture Website JavaScript

// Global Variables// K&S Furniture Website JavaScript

// Global Variables
let cart = [];
let products = [];
let currentFilter = 'all';

// UPDATED Sample Product Data
// UPDATED Sample Product Data with Ratings and Discounts
const sampleProducts = [
    {
        id: 1,
        name: "Modern Sectional Sofa",
        category: "sofas",
        price: 24999,
        oldPrice: 32000, // Added for discount display
        rating: 4.5,     // Added star rating
        reviews: 128,    // Added review count
        description: "Comfortable 3-seat sectional sofa with premium fabric upholstery.",
        sku: "KS-SOFA-001",
        inStock: true,
        dimensions: "220cm L x 90cm D x 75cm H",
        material: "Premium Fabric, Solid Oak",
        images: ["images/sofa1-1.png", "images/sofa1-2.png", "images/sofa1-3.png"]
    },
    {
        id: 2,
        name: "Elegant Dining Set",
        category: "chairs",
        price: 5000,
        oldPrice: null, // No discount
        rating: 5.0,
        reviews: 45,
        description: "Set of 4 modern dining chairs with ergonomic design.",
        sku: "KS-CHR-002",
        inStock: true,
        dimensions: "45cm W x 50cm D x 85cm H",
        material: "Beech Wood, Faux Leather",
        images: ["images/chair1-1.png", "images/chair1-2.png", "images/chair1-3.png"]
    },
    {
        id: 3,
        name: "Oak Coffee Table",
        category: "tables",
        price: 10000,
        oldPrice: 12500,
        rating: 4.0,
        reviews: 32,
        description: "Solid oak coffee table with a minimalist design.",
        sku: "KS-TBL-003",
        inStock: true,
        dimensions: "110cm L x 60cm W x 40cm H",
        material: "Solid Oak Wood",
        images: ["images/table1-1.png", "images/table1-2.png", "images/table1-3.png"]
    },
    {
        id: 4,
        name: "Storage Cabinet",
        category: "storage",
        price: 15000,
        oldPrice: 18000,
        rating: 4.5,
        reviews: 89,
        description: "Large storage cabinet with multiple compartments.",
        sku: "KS-STO-004",
        inStock: true,
        dimensions: "120cm W x 40cm D x 180cm H",
        material: "Engineered Wood, Laminate",
        images: ["images/storage1-1.png", "images/storage1-2.png", "images/storage1-3.png"]
    },
    {
        id: 5,
        name: "King Size Bed Frame",
        category: "bedroom",
        price: 75999,
        oldPrice: 85000,
        rating: 4.8,
        reviews: 210,
        description: "Modern king size bed frame with upholstered headboard.",
        sku: "KS-BED-005",
        inStock: false,
        dimensions: "190cm W x 210cm L x 100cm H",
        material: "Solid Pine, Linen Fabric",
        images: ["images/bed1-1.png", "images/bed1-2.png", "images/bed1-3.png"]
    },
    {
        id: 6,
        name: "Designer Floor Lamp",
        category: "decor",
        price: 2999,
        oldPrice: null,
        rating: 4.2,
        reviews: 15,
        description: "Contemporary floor lamp with adjustable arc.",
        sku: "KS-DEC-006",
        inStock: true,
        dimensions: "180cm H, 30cm Base",
        material: "Steel, Marble",
        images: ["images/decore1-1.png", "images/decore1-1.png", "images/decore1-1.png"]
    },
    {
        id: 7,
        name: "Luxury Recliner",
        category: "sofas",
        price: 75000,
        oldPrice: 90000,
        rating: 5.0,
        reviews: 67,
        description: "Premium leather recliner with massage function.",
        sku: "KS-SOFA-007",
        inStock: true,
        dimensions: "90cm W x 100cm D x 105cm H",
        material: "Genuine Leather, Steel Frame",
        images: ["images/sofa2-1.png", "images/sofa2-2.png", "images/sofa2-3.png"]
    },
    {
        id: 8,
        name: "Ergonomic Office Chair",
        category: "chairs",
        price: 5000,
        oldPrice: 6500,
        rating: 4.6,
        reviews: 340,
        description: "Professional office chair with lumbar support.",
        sku: "KS-CHR-008",
        inStock: true,
        dimensions: "60cm W x 65cm D x 120cm H",
        material: "Mesh, High-Density Foam",
        images: ["images/chair2-1.png", "images/chair2-2.png", "images/chair2-3.png"]
    }
    ,
    {
        id: 9,
        name: "Industrial Dining Table",
        category: "tables",
        price: 18999,
        oldPrice: 22000,
        rating: 4.7,
        reviews: 95,
        description: "Seats 6, metal frame with solid wood top.",
        sku: "KS-TBL-009",
        inStock: true,
        dimensions: "180cm L x 90cm W x 76cm H",
        material: "Acacia Wood, Steel",
        images: ["images/table2-1.png", "images/table2-2.png", "images/table2-3.png"]
    },
    {
        id: 10,
        name: "Modern 5-Shelf Bookcase",
        category: "storage",
        price: 8999,
        oldPrice: null,
        rating: 4.8,
        reviews: 178,
        description: "Tall, minimalist bookcase for any room.",
        sku: "KS-STO-010",
        inStock: true,
        dimensions: "80cm W x 30cm D x 180cm H",
        material: "Engineered Wood, Metal Frame",
        images: ["images/storage2-1.png", "images/storage2-2.png", "images/storage2-3.png"]
    },
    {
        id: 11,
        name: "Queen Upholstered Bed",
        category: "bedroom",
        price: 34999,
        oldPrice: 39000,
        rating: 4.5,
        reviews: 220,
        description: "Plush velvet headboard with storage.",
        sku: "KS-BED-011",
        inStock: true,
        dimensions: "160cm W x 205cm L x 110cm H",
        material: "Velvet, Solid Wood Frame",
        images: ["images/bed2-1.png", "images/bed2-2.png", "images/bed2-3.png"]
    },
    {
        id: 12,
        name: "Velvet Accent Chair",
        category: "chairs",
        price: 7999,
        oldPrice: 9500,
        rating: 4.9,
        reviews: 102,
        description: "A stylish, comfortable reading chair.",
        sku: "KS-CHR-012",
        inStock: true,
        dimensions: "70cm W x 75cm D x 85cm H",
        material: "Velvet, Gold-plated Steel Legs",
        images: ["images/chair3-1.png", "images/chair3-2.png", "images/chair3-3.png"]
    },
    {
        id: 13,
        name: "Mid-Century TV Stand",
        category: "storage",
        price: 13500,
        oldPrice: null,
        rating: 4.3,
        reviews: 88,
        description: "Fits TVs up to 65 inches, with cabinets.",
        sku: "KS-STO-013",
        inStock: true,
        dimensions: "150cm W x 40cm D x 55cm H",
        material: "Walnut Veneer, Solid Wood Legs",
        images: ["images/storage3-1.png", "images/storage3-2.png", "images/storage3-3.png"]
    },
    {
        id: 14,
        name: "Plush 2-Seater Loveseat",
        category: "sofas",
        price: 19999,
        oldPrice: 24000,
        rating: 4.6,
        reviews: 76,
        description: "Cozy loveseat perfect for small spaces.",
        sku: "KS-SOFA-014",
        inStock: true,
        dimensions: "150cm L x 85cm D x 80cm H",
        material: "Linen Blend, Pine Wood",
        images: ["images/sofa3-1.png", "images/sofa3-2.png", "images/sofa3-3.png"]
    }
];
// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupEventListeners();
    loadProducts();
    setupAnimations();

    
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
});

// Initialize website functionality
function initializeWebsite() {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('ksFurnitureCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
    
    // Set up smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu on link click
                const navMenu = document.getElementById('navMenu');
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

// Set up event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Partnership form
    const partnershipForm = document.getElementById('partnershipForm');
    if (partnershipForm) {
        partnershipForm.addEventListener('submit', handlePartnershipForm);
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubscription);
    }
    
    // Close modal when clicking outside
    const partnershipModal = document.getElementById('partnershipModal');
    if (partnershipModal) {
        partnershipModal.addEventListener('click', function(e) {
            if (e.target === partnershipModal) {
                closePartnershipForm();
            }
        });
    }

    // Close cart when clicking overlay
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
         cartSidebar.addEventListener('click', function(e) {
             // This logic is tricky. Let's add an overlay instead.
             // For now, let's skip this to avoid bugs.
        });
    }
}

// Load products into the grid
function loadProducts() {
    products = [...sampleProducts];
    displayProducts(products);
}

// Display products in the grid
function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}
// Create a product card element
// Create a professional product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    
    // Image handling
    const imageUrl = (product.images && product.images.length > 0) 
                     ? product.images[0] 
                     : 'images/default-placeholder.png';

    // Calculate Discount Badge
    let badgeHTML = '';
    if (!product.inStock) {
        badgeHTML = '<span class="product-badge out-of-stock">Sold Out</span>';
    } else if (product.oldPrice && product.oldPrice > product.price) {
        const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
        badgeHTML = `<span class="product-badge sale">-${discount}%</span>`;
    } else if (product.rating >= 4.8) {
        badgeHTML = '<span class="product-badge hot">Hot</span>';
    }

    // Star Rating Generation
    const fullStars = Math.floor(product.rating || 0);
    const halfStar = (product.rating % 1) >= 0.5;
    let starsHTML = '';
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) starsHTML += '<i class="fas fa-star"></i>';
        else if (i === fullStars && halfStar) starsHTML += '<i class="fas fa-star-half-alt"></i>';
        else starsHTML += '<i class="far fa-star"></i>';
    }

    card.innerHTML = `
        <div class="product-img-wrapper">
            ${badgeHTML}
            <img src="${imageUrl}" alt="${product.name}">
            <div class="product-actions-overlay">
                <button class="action-btn" onclick="addToCart(${product.id})" title="Add to Cart" ${!product.inStock ? 'disabled' : ''}>
                    <i class="fas fa-shopping-cart"></i>
                </button>
                <button class="action-btn" onclick="openProductDetailModal(${product.id})" title="Quick View">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
        
        <div class="product-details">
            <div class="product-category">${product.category}</div>
            <h3 class="product-title" onclick="openProductDetailModal(${product.id})">${product.name}</h3>
            
            <div class="product-rating">
                <div class="stars">${starsHTML}</div>
                <span class="review-count">(${product.reviews || 0})</span>
            </div>

            <div class="product-price-box">
                <span class="current-price">₹${product.price.toLocaleString()}</span>
                ${product.oldPrice ? `<span class="old-price">₹${product.oldPrice.toLocaleString()}</span>` : ''}
            </div>
        </div>
    `;
    
    // Animation delay
    setTimeout(() => {
        card.classList.add('visible');
    }, Math.random() * 300);
    
    return card;
}// --- UPDATED: Filter Products with Scrolling ---
function filterProducts(category, clickedButton) {
    currentFilter = category;
    
    // Update active filter button styling in the Products section
    // (Only if the click came from the filter buttons, not the category cards)
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));

    // If clickedButton exists (clicked from filter bar), set it active
    if (clickedButton) {
        clickedButton.classList.add('active');
    } else {
        // If clicked from Category Card (no button passed), find the matching button and highlight it
        const matchingBtn = Array.from(filterButtons).find(btn => 
            btn.textContent.toLowerCase().includes(category === 'all' ? 'all' : category)
        );
        if (matchingBtn) matchingBtn.classList.add('active');
    }
    
    // Filter logic
    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    displayProducts(filteredProducts);
    
    // --- NEW: SCROLL LOGIC ---
    // If the user clicked a category card (which is usually above the products),
    // or if they are searching, we scroll to the products grid.
    // We check if 'clickedButton' is null (implying it came from a category card or search)
    if (!clickedButton) {
        const productsSection = document.getElementById('products');
        if (productsSection) {
            // Small offset for fixed header
            const headerOffset = 100; 
            const elementPosition = productsSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }
}
// --- UPDATED: Handle Search with Auto-Scroll ---
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    // Standard filter logic
    let filteredProducts = products;
    if (currentFilter !== 'all') {
        filteredProducts = products.filter(product => product.category === currentFilter);
    }
    
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );

        // --- NEW: Scroll to products when user starts typing ---
        // We use a simple check to ensure we don't scroll if they are just backspacing an empty field
        if(searchTerm.length > 1) {
             const productsSection = document.getElementById('products');
             // Only scroll if we aren't already looking at the products
             const rect = productsSection.getBoundingClientRect();
             if (rect.top > window.innerHeight || rect.bottom < 0) {
                 productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
             }
        }
    }
    
    displayProducts(filteredProducts);
}
// Add product to cart
function addToCart(productId, quantityToAdd = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Make sure quantity is a number
    // *** FIX: Changed 'const' to 'let' ***
    let quantity = parseInt(quantityToAdd, 10); 
    if (isNaN(quantity) || quantity <= 0) {
        quantity = 1; // Default to 1 if invalid
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    updateCartUI();
    saveCartToStorage();
    showMessage(`${quantity} x ${product.name} added to cart!`, 'success');
    
    // Add animation to cart icon
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
}
// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    // Update cart items
    if (cartItems) {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <p>Your cart is empty</p>
                    <button class="btn btn-primary" onclick="toggleCart()">Continue Shopping</button>
                </div>
            `;
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                
                // *** FIX: Use images[0] and create a real <img> tag ***
                const imageUrl = (item.images && item.images.length > 0) 
                                 ? item.images[0] 
                                 : 'images/default-placeholder.png';

                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${imageUrl}" alt="${item.name}" style="width:100%; height:100%; object-fit: cover;">
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
                        <div class="quantity-controls">
                            <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                cartItems.appendChild(cartItem);
            });
        }
    }
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) {
        cartTotal.textContent = total.toFixed(2);
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToStorage();
    showMessage('Item removed from cart.', 'success');
}

// Update cart item quantity
function updateCartQuantity(productId, newQuantity) {
    const quantity = parseInt(newQuantity, 10);
    
    // If quantity is 0 or less, remove the item
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        // Add a max quantity check
        if (quantity > 10) {
             showMessage('Maximum quantity is 10.', 'error');
             return;
        }
        item.quantity = quantity;
    }
    
    updateCartUI();
    saveCartToStorage();
}
// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('open');
    }
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('ksFurnitureCart', JSON.stringify(cart));
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Open partnership form modal
function openPartnershipForm() {
    const modal = document.getElementById('partnershipModal');
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

// Close partnership form modal
function closePartnershipForm() {
    const modal = document.getElementById('partnershipModal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    showMessage('Thank you for your message! We will get back to you soon.', 'success');
    e.target.reset();
}

// Handle partnership form submission
// --- New Advanced Validation Function for Partnership Form ---

function validatePartnershipForm() {
    let isValid = true;
    
    // Clear previous errors and error classes
    document.querySelectorAll('.validation-error').forEach(el => {
        el.textContent = '';
    });
    document.querySelectorAll('#partnershipForm input, #partnershipForm select, #partnershipForm textarea').forEach(el => {
        el.classList.remove('error');
    });

    // We will retrieve elements by their IDs directly
    const partnerName = document.getElementById('partnerName');
    const contactPerson = document.getElementById('contactPerson');
    const partnerEmail = document.getElementById('partnerEmail');
    const partnerPhone = document.getElementById('partnerPhone');
    const businessAddress = document.getElementById('businessAddress');
    const productCategory = document.getElementById('productCategory');
    const partnerMessage = document.getElementById('partnerMessage');


    // Helper function to set error message
    const setError = (element, message) => {
        const errorElement = document.getElementById(`error-${element.id}`);
        if (errorElement) {
            errorElement.textContent = message;
        }
        element.classList.add('error');
        isValid = false;
    };


    // 1. Business Name (Min Length 3 chars)
    if (partnerName.value.length < 3) {
        setError(partnerName, 'Business Name must be at least 3 characters.');
    }

    // 2. Contact Person (Only letters and spaces, Min Length 3 chars)
    // NOW VALIDATING TEXT TYPE INPUT
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    if (!nameRegex.test(contactPerson.value)) {
        setError(contactPerson, 'Please enter a valid name (letters and spaces only, min 3 chars).');
    }

    // 3. Email Address (Basic format check)
    if (!partnerEmail.value || !partnerEmail.value.includes('@') || partnerEmail.value.length < 5) {
        setError(partnerEmail, 'Please enter a valid email address (e.g., name@example.com).');
    }

    // 4. Phone Number (10 to 15 digits/symbols)
    // NOW VALIDATING TEL TYPE INPUT
    const phoneRegex = /^\+?[\d\s-]{10,15}$/; 
    if (!phoneRegex.test(partnerPhone.value)) {
        setError(partnerPhone, 'Phone must be 10-15 digits/symbols long.');
    }

    // 5. Business Address (Min Length 10 chars)
    if (businessAddress.value.length < 10) {
        setError(businessAddress, 'Please enter a full, detailed business address (min 10 characters).');
    }
    
    // 6. Product Category (Must select a non-empty option)
    if (productCategory.value === "") {
        setError(productCategory, 'Please select a primary product category.');
    }

    // 7. Partner Message (Min Length 20 chars)
    // Added HTML 'minlength' attribute, but JS check remains for consistency.
    if (partnerMessage.value.length < 20) {
        setError(partnerMessage, 'Please provide a detailed message (min 20 characters).');
    }
    
    return isValid;
}


// Handle partnership form submission
function handlePartnershipForm(e) {
    e.preventDefault();
    
    // Rerun validation on submit
    if (!validatePartnershipForm()) {
        showMessage('Please correct the errors in the form before submitting.', 'error');
        // Find the first error field and scroll to it
        const firstErrorField = document.querySelector('#partnershipForm .error');
        if(firstErrorField) {
            firstErrorField.focus();
        }
        return;
    }
    
    // If validation passes
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    console.log("Partnership Form Submitted:", data);
    showMessage('Thank you for your partnership request! We will review your application and contact you.', 'success');
    e.target.reset();
    closePartnershipForm();
}

// Handle newsletter subscription
function handleNewsletterSubscription(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    if (email) {
        showMessage('Thank you for subscribing to our newsletter!', 'success');
        e.target.reset();
    }
}

// Show message to user
function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
        
    // Auto remove after 4 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 4000);
}

// Setup scroll animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Utility function to debounce function calls
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

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize
    const navMenu = document.getElementById('navMenu');
    if (navMenu && window.innerWidth > 768) {
        navMenu.classList.remove('active');
    }
}, 250));


// Handle scroll events
window.addEventListener('scroll', debounce(() => {
    const header = document.querySelector('.nav-bar');
    if (header) {
        if (window.scrollY > 100) {
            header.style.boxShadow = "0 2px 20px var(--shadow-color)";
        } else {
            header.style.boxShadow = "0 2px 20px var(--shadow-color)";
        }
    }
}, 10));

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('partnershipModal');
        if (modal && modal.classList.contains('open')) {
            closePartnershipForm();
        }
        
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar && cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    }
});

// Add focus management for accessibility
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length === 0) return;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
    
    if (firstElement) {
        firstElement.focus();
    }
}

// Initialize focus trapping for modals
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('partnershipModal');
    if (modal) {
        // We trap focus when the modal is opened
        const observer = new MutationObserver((mutations) => {
            if(mutations[0].target.classList.contains('open')) {
                trapFocus(mutations[0].target);
            }
        });
        observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
    }
});

// Add smooth reveal animation for statistics
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, ''));
        const suffix = stat.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            if (suffix === '+') {
                 stat.textContent = Math.floor(current) + suffix;
            } else {
                 stat.textContent = Math.floor(current);
            }
        }, 30);
    });
}

// Trigger stats animation when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
}


// --- New Product Detail Modal Functions ---

let currentModalProductId = null;
let currentModalBasePrice = 0;

function openProductDetailModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    currentModalProductId = product.id;
    currentModalBasePrice = product.price; // <-- SET BASE PRICE
    const modal = document.getElementById('productDetailModal');

    // --- Populate Text & Price ---
    document.getElementById('modalDetailName').textContent = product.name;
    document.getElementById('modalDetailMeta').innerHTML = `
        <span class="sku">SKU: ${product.sku}</span>
        <span class="category">${product.category}</span>
    `;
    // Set price to base price
    document.getElementById('modalDetailPrice').textContent = `₹${product.price.toFixed(2)}`;

    document.getElementById('modalDetailDesc').textContent = product.description;

    // --- Populate Specs ---
    document.getElementById('modalDetailDimensions').textContent = product.dimensions;
    document.getElementById('modalDetailMaterial').textContent = product.material;

    // --- Populate Gallery ---
    const mainImage = document.getElementById('modalDetailMainImage');
    const thumbnailsContainer = document.getElementById('modalDetailThumbnails');
    thumbnailsContainer.innerHTML = ''; // Clear old thumbnails

    mainImage.src = product.images[0]; // Set main image
    mainImage.alt = product.name;

    product.images.forEach((imgSrc, index) => {
        const thumb = document.createElement('div');
        thumb.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumb.innerHTML = `<img src="${imgSrc}" alt="Thumbnail ${index + 1}">`;
        thumb.onclick = () => {
            mainImage.src = imgSrc;
            // Update active state
            thumbnailsContainer.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        };
        thumbnailsContainer.appendChild(thumb);
    });

    // --- Reset Quantity ---
    document.getElementById('modalQuantityInput').value = 1;

    // --- Populate Stock & Actions ---
    const stockStatusEl = document.getElementById('modalDetailStock');
    const addToCartBtn = document.getElementById('modalDetailAddToCartBtn');

    if (product.inStock) {
        stockStatusEl.textContent = "In Stock";
        stockStatusEl.className = "stock-status in-stock";
        addToCartBtn.disabled = false;
        addToCartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
    } else {
        stockStatusEl.textContent = "Out of Stock";
        stockStatusEl.className = "stock-status out-of-stock";
        addToCartBtn.disabled = true;
        addToCartBtn.innerHTML = 'Unavailable';
    }

    // --- Set Add to Cart Button Action ---
    addToCartBtn.onclick = () => {
        const quantity = parseInt(document.getElementById('modalQuantityInput').value, 10);
        addToCart(product.id, quantity);
        closeProductDetailModal();
    };

    // --- Open Modal ---
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}


function closeProductDetailModal() {
    const modal = document.getElementById('productDetailModal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
    currentModalProductId = null;
}

// --- Modal Quantity Controls ---
// --- Modal Quantity Controls ---
function updateModalQuantity(amount) {
    const input = document.getElementById('modalQuantityInput');
    let currentValue = parseInt(input.value, 10);
    if (isNaN(currentValue)) currentValue = 1;

    let newValue = currentValue + amount;
    if (newValue < 1) newValue = 1; // Minimum quantity is 1
    if (newValue > 10) newValue = 10; // Maximum quantity is 10

    input.value = newValue;

    // --- UPDATE PRICE ---
    if (currentModalBasePrice > 0) {
        const newTotalPrice = currentModalBasePrice * newValue;
        document.getElementById('modalDetailPrice').textContent = `₹${newTotalPrice.toFixed(2)}`;
    }
}

// --- Close modal on outside click ---
document.getElementById('productDetailModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeProductDetailModal();
});

// Function to handle clicks on the Footer Shop links
function handleFooterShopClick(linkText) {
    // Map the descriptive footer link text to your actual product categories
    let categoryMap = {
        'Living Room': 'sofas',
        'Bedroom': 'bedroom',
        'Dining & Kitchen': 'tables',
        'Outdoor': 'chairs', // Using chairs as a proxy for outdoor sets
        'Lighting': 'decor'
    };
    
    const targetCategory = categoryMap[linkText];
    
    if (targetCategory) {
        // 1. Filter the products by the mapped category
        // Passing 'null' for the button ensures it triggers the scrolling logic
        filterProducts(targetCategory, null); 
        
        // 2. Ensure the correct filter button is highlighted (if available)
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => btn.classList.remove('active'));

        const matchingBtn = Array.from(filterButtons).find(btn => 
            btn.textContent.toLowerCase().includes(targetCategory)
        );
        if (matchingBtn) matchingBtn.classList.add('active');
        
    } else {
        // Fallback: just scroll to the product section if no specific category is found
        scrollToSection('products');
    }
}


// --- DASHBOARD AND AUTHENTICATION MANAGEMENT ---

// Retrieve the currently logged-in user from LocalStorage
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('ksCurrentUser') || 'null');
}

// Function to render the dashboard or show main content
// Function to render the dashboard or show main content
// Function to render the dashboard or show main content
// Function to render the dashboard or show main content
function checkAuthState() {
    const user = getCurrentUser();
    const dashboardSection = document.getElementById('user-dashboard');
    const mainContent = document.getElementById('main-content');
    const profileLink = document.getElementById('profileLink');
    const profileNameDisplay = document.getElementById('profileNameDisplay'); // <-- NEW

    // 1. Ensure main content is ALWAYS visible by default on page load.
    if (mainContent) {
        mainContent.style.display = 'block';
    }
    if (dashboardSection) {
        dashboardSection.style.display = 'none';
    }

    if (user) {
        // --- LOGGED IN STATE ---
        
        // Update navigation link text
        if (profileNameDisplay) {
            // Display only the first part of the name
            profileNameDisplay.textContent = `Hello, ${user.name.split(' ')[0]}`; 
        }

        // Set href to point to the dashboard section
        if (profileLink) {
            profileLink.href = '#user-dashboard';

            // Custom click handler to show the dashboard when clicked
            profileLink.onclick = (e) => {
                e.preventDefault();
                // Scroll to dashboard
                dashboardSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Show dashboard, hide regular content
                if (mainContent) mainContent.style.display = 'none';
                if (dashboardSection) dashboardSection.style.display = 'block';
                renderDashboard(user);
            };
        }

        renderDashboard(user);

    } else {
        // --- LOGGED OUT STATE ---
        if (profileNameDisplay) {
            profileNameDisplay.textContent = ''; // Clear name text
        }
        
        if (profileLink) {
            profileLink.href = 'register.html';
            profileLink.onclick = null; 
        }
    }
}
// Function to hide dashboard and show main content
function hideDashboard() {
    const dashboardSection = document.getElementById('user-dashboard');
    const mainContent = document.getElementById('main-content');
    
    if (dashboardSection && mainContent) {
        dashboardSection.style.display = 'none';
        mainContent.style.display = 'block';
    }
    // Scroll back to the top/hero section
    scrollToSection('home'); 
}

// Export the new function
window.hideDashboard = hideDashboard; // <-- Add this to your exports block at the end
// Populate the dashboard with user data
function renderDashboard(user) {
    document.getElementById('dashboard-user-name').textContent = user.name;
    document.getElementById('stat-member-since').textContent = user.memberSince;
    document.getElementById('stat-orders').textContent = user.orders;
    document.getElementById('stat-email').textContent = user.email;
    document.getElementById('stat-last-login').textContent = user.lastLogin;
}

// Function to log the user out
function logoutUser() {
    localStorage.removeItem('ksCurrentUser');
    showMessage('Logged out successfully.', 'success');
    // Reload the page to reset the state
    window.location.reload(); 
}

// --- INITIALIZATION UPDATE ---
// In the initializeWebsite function:
function initializeWebsite() {
    // ... existing initialization code ...
    
    // Check auth state immediately on load
    checkAuthState();
    
    // ... rest of existing initialization code ...
}

// --- EXPORT UPDATE ---
// Add logoutUser to global exports at the end of script.js
window.logoutUser = logoutUser;

// Export functions for global access
window.filterProducts = filterProducts;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.toggleCart = toggleCart;
window.scrollToSection = scrollToSection;
window.toggleMobileMenu = toggleMobileMenu;
window.openPartnershipForm = openPartnershipForm;
window.closePartnershipForm = closePartnershipForm;
window.handleFooterShopClick = handleFooterShopClick;



  

  