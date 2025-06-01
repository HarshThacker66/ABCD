// Cart functionality for Hotel Hakaji

// Display cart items
function displayCart() {
    const cart = getCart();
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">Your cart is empty</h4>
                <p class="text-muted">Add some delicious food or book a room to get started!</p>
                <a href="/menu" class="btn btn-primary me-2">Browse Menu</a>
                <a href="/rooms" class="btn btn-outline-primary">View Rooms</a>
            </div>
        `;
        if (cartTotal) cartTotal.textContent = formatCurrency(0);
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }
    
    let totalAmount = 0;
    let cartHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        
        cartHTML += `
            <div class="cart-item" data-id="${item.id}" data-type="${item.type}">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="${item.image}" alt="${item.name}" class="img-fluid rounded" style="height: 80px; object-fit: cover;">
                    </div>
                    <div class="col-md-4">
                        <h6 class="mb-1">${item.name}</h6>
                        <small class="text-muted">${item.type === 'room' ? 'Room Booking' : 'Food Item'}</small>
                        ${item.checkIn ? `<br><small class="text-muted">Check-in: ${item.checkIn} | Check-out: ${item.checkOut}</small>` : ''}
                        ${item.guests ? `<br><small class="text-muted">Guests: ${item.guests}</small>` : ''}
                    </div>
                    <div class="col-md-2">
                        <span class="fw-bold">${formatCurrency(item.price)}</span>
                        ${item.type === 'room' ? '<br><small class="text-muted">per night</small>' : ''}
                    </div>
                    <div class="col-md-2">
                        <div class="input-group input-group-sm">
                            <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity('${item.id}', '${item.type}', ${item.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" class="form-control text-center" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', '${item.type}', parseInt(this.value))">
                            <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity('${item.id}', '${item.type}', ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-1">
                        <span class="fw-bold">${formatCurrency(itemTotal)}</span>
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart('${item.id}', '${item.type}')" title="Remove item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartContainer.innerHTML = cartHTML;
    if (cartTotal) cartTotal.textContent = formatCurrency(totalAmount);
    if (checkoutBtn) checkoutBtn.disabled = false;
}

// Handle checkout process
function handleCheckout() {
    const cart = getCart();
    
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // Show loading state
    const checkoutBtn = document.getElementById('checkout-btn');
    const originalText = checkoutBtn.innerHTML;
    checkoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    checkoutBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Clear cart
        localStorage.removeItem('hakaji-cart');
        updateCartCount();
        
        // Show success message
        showCheckoutSuccess(cart);
        
        // Reset button
        checkoutBtn.innerHTML = originalText;
        checkoutBtn.disabled = false;
        
        // Refresh cart display
        displayCart();
    }, 2000);
}

// Show checkout success modal/message
function showCheckoutSuccess(cart) {
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderNumber = 'HH' + Date.now().toString().slice(-6);
    
    // Create success modal content
    const successHTML = `
        <div class="modal fade" id="successModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body text-center p-4">
                        <i class="fas fa-check-circle fa-4x text-success mb-3"></i>
                        <h4 class="mb-3">Order Confirmed!</h4>
                        <p class="mb-3">Thank you for choosing Hotel Hakaji!</p>
                        <div class="bg-light p-3 rounded mb-3">
                            <strong>Order Number: ${orderNumber}</strong><br>
                            <span class="text-muted">Total Amount: ${formatCurrency(totalAmount)}</span>
                        </div>
                        <p class="small text-muted mb-3">
                            ${cart.some(item => item.type === 'food') ? 'Your food will be prepared and served shortly. ' : ''}
                            ${cart.some(item => item.type === 'room') ? 'Your room booking has been confirmed. Please visit reception with a valid ID for check-in. ' : ''}
                            You will receive a confirmation email shortly.
                        </p>
                        <button type="button" class="btn btn-primary" onclick="closeSuccessModal()">Continue</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = successHTML;
    document.body.appendChild(modalContainer);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    modal.show();
    
    // Store order in localStorage for order history
    const orders = getOrderHistory();
    orders.unshift({
        orderNumber,
        items: cart,
        total: totalAmount,
        date: new Date().toISOString(),
        status: 'confirmed'
    });
    localStorage.setItem('hakaji-orders', JSON.stringify(orders));
}

// Close success modal
function closeSuccessModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('successModal'));
    if (modal) {
        modal.hide();
    }
    // Remove modal from DOM
    setTimeout(() => {
        const modalElement = document.getElementById('successModal');
        if (modalElement) {
            modalElement.closest('div').remove();
        }
    }, 300);
}

// Get order history
function getOrderHistory() {
    const orders = localStorage.getItem('hakaji-orders');
    return orders ? JSON.parse(orders) : [];
}

// Apply discount code (placeholder functionality)
function applyDiscount() {
    const discountCode = document.getElementById('discount-code');
    const discountMessage = document.getElementById('discount-message');
    
    if (!discountCode || !discountMessage) return;
    
    const code = discountCode.value.trim().toLowerCase();
    let discount = 0;
    let message = '';
    
    switch (code) {
        case 'welcome10':
            discount = 10;
            message = '10% discount applied!';
            break;
        case 'hakaji20':
            discount = 20;
            message = '20% discount applied!';
            break;
        case 'firsttime':
            discount = 15;
            message = '15% first-time visitor discount applied!';
            break;
        default:
            message = 'Invalid discount code';
            discountMessage.className = 'alert alert-danger';
            discountMessage.textContent = message;
            discountMessage.style.display = 'block';
            return;
    }
    
    // Apply discount
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = (subtotal * discount) / 100;
    const total = subtotal - discountAmount;
    
    // Update display
    document.getElementById('cart-subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('cart-discount').textContent = formatCurrency(discountAmount);
    document.getElementById('cart-total').textContent = formatCurrency(total);
    
    discountMessage.className = 'alert alert-success';
    discountMessage.textContent = message;
    discountMessage.style.display = 'block';
    
    // Store discount in session
    sessionStorage.setItem('applied-discount', JSON.stringify({
        code,
        percentage: discount,
        amount: discountAmount
    }));
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('cart')) {
        displayCart();
        
        // Check for applied discount
        const appliedDiscount = sessionStorage.getItem('applied-discount');
        if (appliedDiscount) {
            const discount = JSON.parse(appliedDiscount);
            document.getElementById('discount-code').value = discount.code;
            applyDiscount();
        }
    }
});
