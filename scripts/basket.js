// basket.js – Handles basket/cart functionality

import { showNotification } from './notification.js';
import { updateCartTotal } from './quantity.js';

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


export function addToBasket(productId, quantity) {
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

export function updateBasketCounter() {
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



