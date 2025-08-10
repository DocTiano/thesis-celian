// basket.js – Handles basket/cart functionality

import { showNotification } from './notifications.js'; // ensure filename matches exactly
import { updateCartTotal } from './quantity.js'; // ensure filename matches exactly

// Initialize basket when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    updateBasketCounter();
    initializeAddToBasket();
});

// Attach event listeners to "Add to Basket" buttons
export function initializeAddToBasket() {
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

// Add product to basket in localStorage
export function addToBasket(productId, quantity) {
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    
    const existingProductIndex = basket.findIndex(item => item.id === productId);
    
    if (existingProductIndex > -1) {
        basket[existingProductIndex].quantity += quantity;
    } else {
        basket.push({ id: productId, quantity });
    }
    
    localStorage.setItem('basket', JSON.stringify(basket));

    updateBasketCounter();  // Refresh badge
    updateCartTotal?.();    // Optional: update cart total if on cart page
}

// Update basket badge count
export function updateBasketCounter() {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const totalItems = basket.reduce((total, item) => total + item.quantity, 0);
    const basketWrapper = document.querySelector('.basket-wrapper');
  
    if (!basketWrapper) return;

    let badge = basketWrapper.querySelector('.basket-badge');
    if (!badge) {
        badge = document.createElement('span');
        badge.classList.add('basket-badge');
        basketWrapper.appendChild(badge);
    }

    badge.textContent = totalItems;

    // Style badge
    Object.assign(badge.style, {
        backgroundColor: '#e44c31',
        color: 'white',
        position: 'absolute',
        top: '-10px',
        right: '-10px',
        borderRadius: '50%',
        minWidth: '20px',
        height: '20px',
        fontSize: '12px',
        display: totalItems > 0 ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px'
    });
}
