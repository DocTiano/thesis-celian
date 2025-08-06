// notifications.js – Handles showing temporary notifications

export function showNotification(message, type = 'info') {
    // Create notification container
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
        </div>
    `;

    // Append to the body
    document.body.appendChild(notification);

    // Trigger show animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
