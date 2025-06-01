// Room booking functionality for Hotel Hakaji

// Room data
const rooms = [
    {
        id: 'deluxe-room',
        name: 'Deluxe Room',
        price: 3500,
        image: 'https://pixabay.com/get/g37df67bd87a4737a280516153064c174ad1090c49a9762a9094675c6cc08c6c0630fdff775b887d09c96252ec8d022e4dfd3d33cb4d980697c00af0f0f82e700_1280.jpg',
        description: 'Spacious and comfortable room with modern amenities',
        features: ['King Size Bed', 'Air Conditioning', 'Free WiFi', 'TV', 'Mini Fridge', 'Room Service'],
        maxGuests: 2
    },
    {
        id: 'suite-room',
        name: 'Suite Room',
        price: 5500,
        image: 'https://pixabay.com/get/g3170a02bef0ddf28e94e899e6cb967cf0e9bc5e1f1279b5af945bfa90de0f408bda35f9bf5f6e6a5c3c7fb08b021a1052f3e658fde743cc35868536e6a69ca9a_1280.jpg',
        description: 'Luxurious suite with separate living area and premium amenities',
        features: ['King Size Bed', 'Living Area', 'Balcony', 'Premium Bathroom', 'Free WiFi', 'TV', 'Mini Bar', '24/7 Room Service'],
        maxGuests: 3
    },
    {
        id: 'family-room',
        name: 'Family Room',
        price: 4500,
        image: 'https://pixabay.com/get/g729eef972f8278900b61972d26bfed6ff9f8b1c4d6f15b5c30ad774ca1543c3c80dbeba587bc40573c0e36be931ba0bfc77a75224e77c6eb98210722004526df_1280.jpg',
        description: 'Perfect for families with children, spacious and child-friendly',
        features: ['2 Double Beds', 'Extra Space', 'Air Conditioning', 'Free WiFi', 'TV', 'Mini Fridge', 'Safe', 'Child-friendly'],
        maxGuests: 4
    },
    {
        id: 'premium-suite',
        name: 'Premium Suite',
        price: 7500,
        image: 'https://pixabay.com/get/g922c3d6e72ea0904fa0d0d74ed70d5e03997a3fdc90dfb282d315ace9c6f345bf4f6221ac4860dc1182e3fd6bbca3874d4f834378759a7ffd41ef3d8893faabe_1280.jpg',
        description: 'Our finest accommodation with luxury amenities and personalized service',
        features: ['King Size Bed', 'Living Room', 'Dining Area', 'Premium Bathroom', 'Balcony', 'Butler Service', 'Free WiFi', 'Premium TV', 'Mini Bar', 'Jacuzzi'],
        maxGuests: 2
    },
    {
        id: 'economy-room',
        name: 'Economy Room',
        price: 2500,
        image: 'https://pixabay.com/get/gcb8ec1085f20bd79045ebb0369aa54a0ea27ecffae30509f6b235d56aa89c4c21e3b0d66a958da52769fe56c378d80363254e0a050893a3c5d6559e691ab25c9_1280.jpg',
        description: 'Comfortable and affordable accommodation with essential amenities',
        features: ['Double Bed', 'Air Conditioning', 'Free WiFi', 'TV', 'Attached Bathroom', 'Room Service'],
        maxGuests: 2
    },
    {
        id: 'honeymoon-suite',
        name: 'Honeymoon Suite',
        price: 8500,
        image: 'https://pixabay.com/get/geb43e41e885c4b65b8c5e682563d35032887abab5d3828b0a4e9399390e2d43500ba081b63c9ce7c87a0071fdce4c7ea056f7404ceb05457836500861bdcd051_1280.jpg',
        description: 'Romantic suite perfect for couples with special amenities',
        features: ['King Size Bed', 'Romantic Decor', 'Private Balcony', 'Jacuzzi', 'Champagne Service', 'Rose Petals', 'Free WiFi', 'Premium TV', 'Mini Bar', 'Butler Service'],
        maxGuests: 2
    }
];

// Initialize room booking page
function initializeRoomBooking() {
    displayRooms();
    setDefaultDates();
}

// Display available rooms
function displayRooms() {
    const roomsContainer = document.getElementById('rooms-container');
    if (!roomsContainer) return;
    
    let roomsHTML = '';
    
    rooms.forEach(room => {
        const featuresHTML = room.features.map(feature => 
            `<li><i class="fas fa-check text-primary"></i> ${feature}</li>`
        ).join('');
        
        roomsHTML += `
            <div class="col-lg-6 mb-4">
                <div class="room-card">
                    <img src="${room.image}" alt="${room.name}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title text-secondary">${room.name}</h5>
                        <p class="card-text">${room.description}</p>
                        <div class="row">
                            <div class="col-md-7">
                                <h6 class="text-primary mb-2">Features:</h6>
                                <ul class="room-features">
                                    ${featuresHTML}
                                </ul>
                            </div>
                            <div class="col-md-5 text-end">
                                <div class="mb-2">
                                    <span class="h4 text-primary">${formatCurrency(room.price)}</span>
                                    <small class="text-muted d-block">per night</small>
                                </div>
                                <div class="mb-2">
                                    <small class="text-muted">Max guests: ${room.maxGuests}</small>
                                </div>
                                <button class="btn btn-primary btn-sm" onclick="openBookingModal('${room.id}')">
                                    <i class="fas fa-calendar-plus"></i> Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    roomsContainer.innerHTML = roomsHTML;
}

// Set default check-in and check-out dates
function setDefaultDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    
    if (checkInInput) {
        checkInInput.value = today.toISOString().split('T')[0];
        checkInInput.min = today.toISOString().split('T')[0];
    }
    
    if (checkOutInput) {
        checkOutInput.value = tomorrow.toISOString().split('T')[0];
        checkOutInput.min = tomorrow.toISOString().split('T')[0];
    }
}

// Open booking modal for specific room
function openBookingModal(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;
    
    const modalHTML = `
        <div class="modal fade" id="bookingModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Book ${room.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="${room.image}" alt="${room.name}" class="img-fluid rounded mb-3">
                                <h6>${room.name}</h6>
                                <p class="text-muted">${room.description}</p>
                                <p class="h5 text-primary">${formatCurrency(room.price)} <small class="text-muted">per night</small></p>
                            </div>
                            <div class="col-md-6">
                                <form id="bookingForm" onsubmit="handleRoomBooking(event, '${roomId}')">
                                    <div class="mb-3">
                                        <label for="modal-checkIn" class="form-label">Check-in Date</label>
                                        <input type="date" class="form-control" id="modal-checkIn" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="modal-checkOut" class="form-label">Check-out Date</label>
                                        <input type="date" class="form-control" id="modal-checkOut" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="modal-guests" class="form-label">Number of Guests</label>
                                        <select class="form-control" id="modal-guests" required>
                                            ${Array.from({length: room.maxGuests}, (_, i) => 
                                                `<option value="${i + 1}">${i + 1} ${i === 0 ? 'Guest' : 'Guests'}</option>`
                                            ).join('')}
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="modal-guestName" class="form-label">Guest Name</label>
                                        <input type="text" class="form-control" id="modal-guestName" required placeholder="Enter full name">
                                    </div>
                                    <div class="mb-3">
                                        <label for="modal-phone" class="form-label">Phone Number</label>
                                        <input type="tel" class="form-control" id="modal-phone" required placeholder="Enter phone number">
                                    </div>
                                    <div class="mb-3">
                                        <label for="modal-email" class="form-label">Email Address</label>
                                        <input type="email" class="form-control" id="modal-email" required placeholder="Enter email address">
                                    </div>
                                    <div class="booking-summary p-3 bg-light rounded mb-3">
                                        <h6>Booking Summary</h6>
                                        <div id="booking-details">
                                            <p class="mb-1"><strong>Room:</strong> ${room.name}</p>
                                            <p class="mb-1"><strong>Nights:</strong> <span id="nights-count">1</span></p>
                                            <p class="mb-1"><strong>Rate:</strong> ${formatCurrency(room.price)} per night</p>
                                            <hr>
                                            <p class="mb-0"><strong>Total:</strong> <span id="total-amount">${formatCurrency(room.price)}</span></p>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary w-100">
                                        <i class="fas fa-plus"></i> Add to Cart
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('bookingModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to page
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    // Set default dates in modal
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    document.getElementById('modal-checkIn').value = today.toISOString().split('T')[0];
    document.getElementById('modal-checkIn').min = today.toISOString().split('T')[0];
    document.getElementById('modal-checkOut').value = tomorrow.toISOString().split('T')[0];
    document.getElementById('modal-checkOut').min = tomorrow.toISOString().split('T')[0];
    
    // Add event listeners for date calculation
    document.getElementById('modal-checkIn').addEventListener('change', updateBookingSummary);
    document.getElementById('modal-checkOut').addEventListener('change', updateBookingSummary);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
    modal.show();
}

// Update booking summary when dates change
function updateBookingSummary() {
    const checkIn = document.getElementById('modal-checkIn').value;
    const checkOut = document.getElementById('modal-checkOut').value;
    const roomId = document.getElementById('bookingForm').getAttribute('onsubmit').match(/'([^']+)'/)[1];
    const room = rooms.find(r => r.id === roomId);
    
    if (checkIn && checkOut && room) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const timeDiff = checkOutDate - checkInDate;
        const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        
        if (nights > 0) {
            const total = room.price * nights;
            document.getElementById('nights-count').textContent = nights;
            document.getElementById('total-amount').textContent = formatCurrency(total);
            
            // Update check-out minimum date
            const minCheckOut = new Date(checkInDate);
            minCheckOut.setDate(minCheckOut.getDate() + 1);
            document.getElementById('modal-checkOut').min = minCheckOut.toISOString().split('T')[0];
        }
    }
}

// Handle room booking form submission
function handleRoomBooking(event, roomId) {
    event.preventDefault();
    
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;
    
    const formData = new FormData(event.target);
    const checkIn = document.getElementById('modal-checkIn').value;
    const checkOut = document.getElementById('modal-checkOut').value;
    const guests = document.getElementById('modal-guests').value;
    const guestName = document.getElementById('modal-guestName').value;
    const phone = document.getElementById('modal-phone').value;
    const email = document.getElementById('modal-email').value;
    
    // Calculate nights and total
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    if (nights <= 0) {
        showNotification('Check-out date must be after check-in date.', 'error');
        return;
    }
    
    // Create booking item
    const bookingItem = {
        id: `${roomId}-${Date.now()}`,
        type: 'room',
        name: room.name,
        price: room.price * nights, // Total price for all nights
        image: room.image,
        checkIn: checkInDate.toLocaleDateString('en-IN'),
        checkOut: checkOutDate.toLocaleDateString('en-IN'),
        nights: nights,
        guests: guests,
        guestName: guestName,
        phone: phone,
        email: email,
        pricePerNight: room.price
    };
    
    // Add to cart
    addToCart(bookingItem);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
    modal.hide();
    
    // Show success message
    showNotification(`${room.name} booking added to cart for ${nights} night${nights > 1 ? 's' : ''}!`, 'success');
}

// Quick booking function for room cards
function quickBookRoom(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;
    
    const checkIn = document.getElementById('checkIn')?.value;
    const checkOut = document.getElementById('checkOut')?.value;
    const guests = document.getElementById('guests')?.value;
    
    if (!checkIn || !checkOut || !guests) {
        showNotification('Please fill in all booking details.', 'error');
        return;
    }
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    if (nights <= 0) {
        showNotification('Check-out date must be after check-in date.', 'error');
        return;
    }
    
    if (parseInt(guests) > room.maxGuests) {
        showNotification(`This room can accommodate maximum ${room.maxGuests} guests.`, 'error');
        return;
    }
    
    // Create booking item
    const bookingItem = {
        id: `${roomId}-${Date.now()}`,
        type: 'room',
        name: room.name,
        price: room.price * nights,
        image: room.image,
        checkIn: checkInDate.toLocaleDateString('en-IN'),
        checkOut: checkOutDate.toLocaleDateString('en-IN'),
        nights: nights,
        guests: guests,
        pricePerNight: room.price
    };
    
    // Add to cart
    addToCart(bookingItem);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('rooms')) {
        initializeRoomBooking();
    }
});
