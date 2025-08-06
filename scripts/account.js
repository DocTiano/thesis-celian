// account.js – Handles login and registration logic

import { showNotification } from './notifications.js';

export function initializeAccountForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Simulated login action
            showNotification('Login successful!', 'success');
            setTimeout(() => {
                window.location.href = 'account.html';
            }, 1500);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Simulated registration action
            showNotification('Registration successful! Please check your email to verify your account.', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }
}
