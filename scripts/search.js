// search.js – Handles product search functionality

export function initializeSearch() {
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-input');

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `products.html?search=${encodeURIComponent(query)}`;
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }
}

export function initializeProductSearch() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchQuery = searchInput.value.trim();
            if (searchQuery) {
                window.location.href = `products.html?search=${encodeURIComponent(searchQuery)}`;
            }
        });
    }
}
