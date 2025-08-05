// Main JavaScript for From Sagnay to Every Home E-commerce Platform

document.addEventListener('DOMContentLoaded', function() {
    // Initialize search functionality
    initializeSearch();
    
    // Initialize components
    initializeAddToBasket();
    initializeQuantitySelectors();
    initializeProductSearch();
    initializeLocationMap();
    initializeLGUValidation();
    initializeProducerVerification();
    trackPerformance();
    
    // Sample data for demonstration
    loadFeaturedProducts();
    
    // Initialize basket badge
    updateBasketCounter();

    // Ensure basket badge is visible
    const basketBadges = document.querySelectorAll('.basket-badge');
    basketBadges.forEach(badge => {
        // Make sure the badge is visible
        badge.style.display = 'flex';
    });
});

// Search functionality
function initializeSearch() {
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-input');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `products.html?search=${encodeURIComponent(query)}`;
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }
}

// Update active navigation based on current page
function updateActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentPath === linkPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

// Add to Basket Functionality
function initializeAddToBasket() {
    const addToBasketButtons = document.querySelectorAll('.add-to-cart, .add-to-basket');
    
    addToBasketButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            addToBasket(productId, 1);
            
            // Show confirmation message
            showNotification('Product added to basket successfully!', 'success');
        });
    });
}

function addToBasket(productId, quantity) {
    // Get current basket from localStorage
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    
    // Check if product already exists in basket
    const existingProductIndex = basket.findIndex(item => item.id === productId);
    
    if (existingProductIndex > -1) {
        // Update quantity if product already in basket
        basket[existingProductIndex].quantity += quantity;
    } else {
        // Add new product to basket
        basket.push({
            id: productId,
            quantity: quantity
        });
    }
    
    // Save updated basket to localStorage
    localStorage.setItem('basket', JSON.stringify(basket));
    
    // Update basket counter
    updateBasketCounter();
}

function updateBasketCounter() {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const totalItems = basket.reduce((total, item) => total + item.quantity, 0);

    const basketWrapper = document.querySelector('.basket-wrapper');
    if (!basketWrapper) return;

    //if badge exists
    let badge = basketWrapper.querySelector('.basket-badge');

    // if missing, create and appends
    if (!badge) {
        badge = document.createElement('span');
        badge.classList.add('basket-badge');
        basketWrapper.appendChild(badge);
    }

    //update the badge
    badge.textContent = totalItems;

    // Apply consistent style
    badge.style.backgroundColor = '#e44c31';
    badge.style.color = 'white';
    badge.style.position = 'absolute';
    badge.style.top = '-10px';
    badge.style.right = '-10px';
    badge.style.borderRadius = '50%';
    badge.style.minWidth = '20px';
    badge.style.height = '20px';
    badge.style.fontSize = '12px';
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
    badge.style.alignItems = 'center';
    badge.style.justifyContent = 'center';
    badge.style.padding = '2px';
}


// Quantity Selector Functionality
function initializeQuantitySelectors() {
    const quantitySelectors = document.querySelectorAll('.quantity-selector');
    
    quantitySelectors.forEach(selector => {
        const decrementBtn = selector.querySelector('.quantity-decrease'); // Fixed class name
        const incrementBtn = selector.querySelector('.quantity-increase');   // Fixed class name
        const quantityInput = selector.querySelector('.quantity-input');     // More specific selector
        
        if (decrementBtn && incrementBtn && quantityInput) {
            decrementBtn.addEventListener('click', function() {
                const currentValue = parseInt(quantityInput.value);
                const minValue = parseInt(quantityInput.getAttribute('min')) || 1;
                
                if (currentValue > minValue) {
                    quantityInput.value = currentValue - 1;
                    updateCartItemQuantity(selector);
                }
            });
            
            incrementBtn.addEventListener('click', function() {
                const currentValue = parseInt(quantityInput.value);
                const maxValue = parseInt(quantityInput.getAttribute('max')) || Infinity;
                
                if (currentValue < maxValue) {
                    quantityInput.value = currentValue + 1;
                    updateCartItemQuantity(selector);
                }
            });
            
            quantityInput.addEventListener('change', function() {
                const minValue = parseInt(this.getAttribute('min')) || 1;
                const maxValue = parseInt(this.getAttribute('max')) || Infinity;
                let value = parseInt(this.value);
                
                if (isNaN(value) || value < minValue) {
                    this.value = minValue;
                } else if (value > maxValue) {
                    this.value = maxValue;
                }
                
                updateCartItemQuantity(selector);
            });
            
            // Prevent typing non-numeric characters
            quantityInput.addEventListener('keypress', function(e) {
                // Allow: backspace, delete, tab, escape, enter
                if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
                    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                    (e.keyCode === 65 && e.ctrlKey === true) ||
                    (e.keyCode === 67 && e.ctrlKey === true) ||
                    (e.keyCode === 86 && e.ctrlKey === true) ||
                    (e.keyCode === 88 && e.ctrlKey === true)) {
                    return;
                }
                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            });
        }
    });
}

function updateCartItemQuantity(selector) {
    const productId = selector.getAttribute('data-product-id');
    const quantityInput = selector.querySelector('input');
    const newQuantity = parseInt(quantityInput.value);

    // Update basket in localStorage
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    const productIndex = basket.findIndex(item => item.id == productId); // Match ID

    if (productIndex > -1) {
        basket[productIndex].quantity = newQuantity;
        localStorage.setItem('basket', JSON.stringify(basket)); // ✅ Corrected

        // Update subtotal display
        const subtotalElement = selector.closest('.cart-item')?.querySelector('.subtotal');
        if (subtotalElement) {
            const price = parseFloat(selector.getAttribute('data-price'));
            subtotalElement.textContent = '₱' + (price * newQuantity).toFixed(2);
        }

        // Update cart total and badge
        updateCartTotal();
        updateBasketCounter(); // ✅ So badge is updated too
    }
}


function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('basket')) || [];
    const cartTotalElement = document.getElementById('cart-total');
    
    if (cartTotalElement) {
        // In a real application, you would fetch prices from the server
        // This is just a simplified example
        let total = 0;
        
        cart.forEach(item => {
            const priceElement = document.querySelector(`.quantity-selector[data-product-id="${item.id}"]`);
            if (priceElement) {
                const price = parseFloat(priceElement.getAttribute('data-price'));
                total += price * item.quantity;
            }
        });
        
        cartTotalElement.textContent = '₱' + total.toFixed(2);
    }
}

// Product Search Functionality
function initializeProductSearch() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchQuery = searchInput.value.trim();
            
            if (searchQuery) {
                window.location.href = `products.html?search=${encodeURIComponent(searchQuery)}`;
            }
        });
    }
}

// Load Featured Products (Simulated)
function loadFeaturedProducts() {
    const featuredProductsContainer = document.querySelector('.featured-products .row');
    
    if (featuredProductsContainer) {
        // In a real application, this data would come from an API
        const products = [
            {
                id: 1,
                name: 'Organic Rice',
                seller: 'Juan Dela Cruz',
                price: 150.00,
                image: 'images/product1.jpg'
            },
            {
                id: 2,
                name: 'Handwoven Basket',
                seller: 'Maria Santos',
                price: 350.00,
                image: 'images/product2.jpg'
            },
            {
                id: 3,
                name: 'Coconut Jam',
                seller: 'Pedro Reyes',
                price: 120.00,
                image: 'images/product3.jpg'
            },
            {
                id: 4,
                name: 'Abaca Bag',
                seller: 'Ana Dizon',
                price: 450.00,
                image: 'images/product4.jpg'
            }
        ];
        
        // Clear existing content
        featuredProductsContainer.innerHTML = '';
        
        // Add product cards
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'col-md-3';
            productCard.innerHTML = `
                <div class="card product-card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="seller-name">${product.seller}</p>
                        <p class="price">₱${product.price.toFixed(2)}</p>
                        <div class="d-flex justify-content-between">
                            <a href="product-details.html?id=${product.id}" class="btn btn-sm btn-outline-primary">View Details</a>
                            <button class="btn btn-sm btn-primary add-to-cart" data-product-id="${product.id}">Add to Basket</button>
                        </div>
                    </div>
                </div>
            `;
            
            featuredProductsContainer.appendChild(productCard);
        });
        
        // Reinitialize add to cart buttons
        initializeAddToBasket();
    }
}

// Seller Location Map (using Leaflet.js)
function initializeLocationMap() {
    const mapContainer = document.getElementById('seller-map');
    
    if (mapContainer && typeof L !== 'undefined') {
        // Create map centered on Sagnay, Camarines Sur
        const map = L.map('seller-map').setView([13.6010, 123.5125], 13);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add markers for sellers
        // In a real application, this data would come from an API
        const sellers = [
            {
                id: 1,
                name: 'Juan Dela Cruz',
                lat: 13.6010,
                lng: 123.5125,
                products: 'Agricultural Goods'
            },
            {
                id: 2,
                name: 'Maria Santos',
                lat: 13.6050,
                lng: 123.5200,
                products: 'Handwoven Crafts'
            },
            {
                id: 3,
                name: 'Pedro Reyes',
                lat: 13.5950,
                lng: 123.5150,
                products: 'Local Delicacies'
            }
        ];
        
        sellers.forEach(seller => {
            const marker = L.marker([seller.lat, seller.lng]).addTo(map);
            marker.bindPopup(`
                <strong>${seller.name}</strong><br>
                Products: ${seller.products}<br>
                <a href="seller-profile.html?id=${seller.id}">View Profile</a>
            `);
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide and remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Account Management
function initializeAccountForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, this would send a request to the server
            showNotification('Login successful!', 'success');
            setTimeout(() => {
                window.location.href = 'account.html';
            }, 1500);
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, this would send a request to the server
            showNotification('Registration successful! Please check your email to verify your account.', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }
}

// Initialize account forms if present
if (document.getElementById('login-form') || document.getElementById('register-form')) {
    initializeAccountForms();
}

// Update basket counter on page load
updateBasketCounter(); 

// LGU Price Validation System
function initializeLGUValidation() {
    const priceInputs = document.querySelectorAll('.price-input');
    
    priceInputs.forEach(input => {
        input.addEventListener('change', async function() {
            const productId = this.getAttribute('data-product-id');
            const price = this.value;
            
            try {
                // In production, this would call the Laravel backend
                const response = await validatePriceWithLGU(productId, price);
                
                if (response.validated) {
                    this.classList.add('is-lgu-validated');
                    showNotification('Price validated by LGU', 'success');
                } else {
                    this.classList.remove('is-lgu-validated');
                    showNotification('Price requires LGU review', 'warning');
                }
            } catch (error) {
                console.error('LGU validation error:', error);
                showNotification('Price validation failed', 'error');
            }
        });
    });
}

async function validatePriceWithLGU(productId, price) {
    // This would be an API call to the Laravel backend in production
    // For now, return mock response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                validated: price <= 1000, // Mock validation logic
                message: 'Price within acceptable range'
            });
        }, 1000);
    });
}

// Producer Verification System
function initializeProducerVerification() {
    const verificationForms = document.querySelectorAll('.producer-verification-form');
    
    verificationForms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            try {
                // In production, this would submit to Laravel backend
                const response = await submitProducerVerification(formData);
                
                if (response.success) {
                    showNotification('Verification submitted successfully', 'success');
                    updateProducerStatus(response.status);
                } else {
                    showNotification('Verification submission failed', 'error');
                }
            } catch (error) {
                console.error('Producer verification error:', error);
                showNotification('Verification system error', 'error');
            }
        });
    });
}

async function submitProducerVerification(formData) {
    // This would be an API call to the Laravel backend in production
    // For now, return mock response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                status: 'pending',
                message: 'Verification submitted for LGU review'
            });
        }, 1000);
    });
}

function updateProducerStatus(status) {
    const statusBadge = document.querySelector('.producer-status');
    if (statusBadge) {
        statusBadge.className = `producer-status producer-${status}`;
        statusBadge.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    }
}

// Performance Monitoring
let performanceMetrics = {
    pageLoads: 0,
    errors: 0,
    averageResponseTime: 0
};

function trackPerformance() {
    // Track page load time
    window.addEventListener('load', () => {
        performanceMetrics.pageLoads++;
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        performanceMetrics.averageResponseTime = 
            (performanceMetrics.averageResponseTime * (performanceMetrics.pageLoads - 1) + loadTime) 
            / performanceMetrics.pageLoads;
    });

    // Track errors
    window.addEventListener('error', () => {
        performanceMetrics.errors++;
        // In production, this would send error data to the backend
    });
} 

// Initialize basket badge on page load
updateBasketCounter();

// Set a small timeout to ensure the badge is visible after page is fully loaded
setTimeout(function() {
    const basketBadges = document.querySelectorAll('.basket-badge');
    basketBadges.forEach(badge => {
        // Force badge to be visible
        badge.style.display = 'flex';
    });
}, 500); 