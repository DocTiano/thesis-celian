// basket.js – Handles basket/cart functionality

import { showNotification } from './notification.js';
import { updateCartTotal } from './quantity.js';

export function initializeAddToBasket() {
    const addToBasketButtons = document.querySelectorAll('.add-to-cart, .add-to-basket');

    addToBasketButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            addToBasket(productId, 1);
            showNotification('Product added to basket successfully!', 'success');
        });
    });
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



