// Main JavaScript functionality for Hotel Hakaji

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count display
    updateCartCount();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
});

// Update cart count in navigation
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'inline' : 'none';
    }
}

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem('hakaji-cart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('hakaji-cart', JSON.stringify(cart));
    updateCartCount();
}

// Add item to cart
function addToCart(item) {
    const cart = getCart();
    const existingItem = cart.find(cartItem => cartItem.id === item.id && cartItem.type === item.type);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1,
            addedAt: new Date().toISOString()
        });
    }
    
    saveCart(cart);
    showNotification(`${item.name} added to cart!`, 'success');
}

// Remove item from cart
function removeFromCart(itemId, itemType) {
    let cart = getCart();
    cart = cart.filter(item => !(item.id === itemId && item.type === itemType));
    saveCart(cart);
    
    // Refresh cart display if on cart page
    if (window.location.pathname.includes('cart')) {
        displayCart();
    }
}

// Update item quantity in cart
function updateQuantity(itemId, itemType, newQuantity) {
    const cart = getCart();
    const item = cart.find(cartItem => cartItem.id === itemId && cartItem.type === itemType);
    
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(itemId, itemType);
        } else {
            item.quantity = newQuantity;
            saveCart(cart);
            
            // Refresh cart display if on cart page
            if (window.location.pathname.includes('cart')) {
                displayCart();
            }
        }
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} notification-toast`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 250px;
        animation: slideIn 0.3s ease-out;
    `;
    notification.innerHTML = `
        <strong>${message}</strong>
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

// Validate form fields
function validateForm(formElement) {
    const requiredFields = formElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// Handle contact form submission
function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    if (!validateForm(form)) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Simulate form submission
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Contact form submitted:', data);
    
    // Show success message
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    form.reset();
}

// Handle review submission
function handleReviewSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    if (!validateForm(form)) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    const formData = new FormData(form);
    const review = {
        id: Date.now(),
        name: formData.get('name'),
        rating: parseInt(formData.get('rating')),
        comment: formData.get('comment'),
        date: new Date().toLocaleDateString('en-IN')
    };
    
    // Save review to localStorage
    const reviews = getReviews();
    reviews.unshift(review);
    localStorage.setItem('hakaji-reviews', JSON.stringify(reviews));
    
    // Refresh reviews display
    if (typeof displayReviews === 'function') {
        displayReviews();
    }
    
    showNotification('Thank you for your review!', 'success');
    form.reset();
}

// Get reviews from localStorage
function getReviews() {
    const reviews = localStorage.getItem('hakaji-reviews');
    return reviews ? JSON.parse(reviews) : [];
}

// Generate star rating HTML
function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .notification-toast {
        animation: slideIn 0.3s ease-out;
    }
    
    .is-invalid {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
`;
document.head.appendChild(style);
