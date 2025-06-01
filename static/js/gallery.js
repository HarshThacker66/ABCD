// Gallery functionality for Hotel Hakaji

// Gallery images data
const galleryImages = [
    {
        category: 'lobby',
        title: 'Grand Lobby',
        src: 'https://pixabay.com/get/g15c3aa8c5509961797b14c45f2c88fa2093c5059a2fd003888f0bc8432001a17320582a92cddbaa39c13dc5878c0b42fd20a1e04107d26277c6bd6325c0f1cd9_1280.jpg',
        description: 'Welcome to our luxurious lobby with traditional Indian decor'
    },
    {
        category: 'lobby',
        title: 'Reception Area',
        src: 'https://pixabay.com/get/gb90aeeebda397d99af737bedf7345a6597edbf11bef94bde3a47e1ce60a38f839af555074f155ed2278f99dd4923c834579cf91fccb7e94bd1dc9bbe91acc989_1280.jpg',
        description: 'Our welcoming reception area with 24/7 concierge service'
    },
    {
        category: 'lobby',
        title: 'Lounge Area',
        src: 'https://pixabay.com/get/g8b378e525a5310de5ae6bd037ca5ae344b2f2374bc12abaac64eaca46a6ad47d0565de1a8a3d06844dbafae1b1c361aa2afd4fe2be0c25075e8afe064f9ba639_1280.jpg',
        description: 'Comfortable seating area for guests to relax and socialize'
    },
    {
        category: 'lobby',
        title: 'Entrance Hall',
        src: 'https://pixabay.com/get/gd127f534f466cc2a01088702ca49d9b482ef419a9180389942f7c1c86f1960f981349a5de162e5ca67555450b37a85ae6af486ea4784e2ed0f60437bd3867960_1280.jpg',
        description: 'Elegant entrance with traditional architectural elements'
    },
    {
        category: 'amenities',
        title: 'Swimming Pool',
        src: 'https://pixabay.com/get/gb30094c56136d449bae1699132ee5c72f0df336b572e995439f5b34234d377720f9703ce8d2df5fac0b49da767ae3e389af3075cf29142a26bf08cb0e3bf4934_1280.jpg',
        description: 'Refreshing outdoor swimming pool with poolside service'
    },
    {
        category: 'amenities',
        title: 'Fitness Center',
        src: 'https://pixabay.com/get/gbf5ca61407163fb2985deb36d2dfdf48de71f9c743cd55227603a939e4347b1dba5b3bb795cc055e8338125403179b413616ce355a668c9966286bbd9f5e1578_1280.jpg',
        description: 'Modern fitness center with state-of-the-art equipment'
    },
    {
        category: 'amenities',
        title: "Children's Play Area",
        src: 'https://pixabay.com/get/g62b2501b0e4028742fbfd7270c12973b946757731cbb123f3a593875960c0ff147a39e100cf51c91c38fe4b93681389c88e4c489a1c173dcd18838f8d190381c_1280.jpg',
        description: 'Safe and fun play area designed for children of all ages'
    },
    {
        category: 'amenities',
        title: 'Wellness Center',
        src: 'https://pixabay.com/get/g4b379874292a75a85d929cd57df80d56990d5c10cc93ecc72a953d947ec3941075f6eaf34cbe25cde7ada5f4fcd4d95da49acb8915ab221df5bf32eced66238f_1280.jpg',
        description: 'Spa and wellness center for ultimate relaxation'
    },
    {
        category: 'rooms',
        title: 'Deluxe Room',
        src: 'https://pixabay.com/get/g37df67bd87a4737a280516153064c174ad1090c49a9762a9094675c6cc08c6c0630fdff775b887d09c96252ec8d022e4dfd3d33cb4d980697c00af0f0f82e700_1280.jpg',
        description: 'Comfortable deluxe room with modern amenities'
    },
    {
        category: 'rooms',
        title: 'Suite Room',
        src: 'https://pixabay.com/get/g3170a02bef0ddf28e94e899e6cb967cf0e9bc5e1f1279b5af945bfa90de0f408bda35f9bf5f6e6a5c3c7fb08b021a1052f3e658fde743cc35868536e6a69ca9a_1280.jpg',
        description: 'Spacious suite with separate living area'
    },
    {
        category: 'rooms',
        title: 'Family Room',
        src: 'https://pixabay.com/get/g729eef972f8278900b61972d26bfed6ff9f8b1c4d6f15b5c30ad774ca1543c3c80dbeba587bc40573c0e36be931ba0bfc77a75224e77c6eb98210722004526df_1280.jpg',
        description: 'Perfect family accommodation with extra space'
    },
    {
        category: 'rooms',
        title: 'Premium Suite',
        src: 'https://pixabay.com/get/g922c3d6e72ea0904fa0d0d74ed70d5e03997a3fdc90dfb282d315ace9c6f345bf4f6221ac4860dc1182e3fd6bbca3874d4f834378759a7ffd41ef3d8893faabe_1280.jpg',
        description: 'Luxurious premium suite with premium amenities'
    },
    {
        category: 'rooms',
        title: 'Economy Room',
        src: 'https://pixabay.com/get/gcb8ec1085f20bd79045ebb0369aa54a0ea27ecffae30509f6b235d56aa89c4c21e3b0d66a958da52769fe56c378d80363254e0a050893a3c5d6559e691ab25c9_1280.jpg',
        description: 'Comfortable and affordable accommodation'
    },
    {
        category: 'rooms',
        title: 'Honeymoon Suite',
        src: 'https://pixabay.com/get/geb43e41e885c4b65b8c5e682563d35032887abab5d3828b0a4e9399390e2d43500ba081b63c9ce7c87a0071fdce4c7ea056f7404ceb05457836500861bdcd051_1280.jpg',
        description: 'Romantic suite perfect for special occasions'
    }
];

// Initialize gallery
function initializeGallery() {
    displayGalleryFilters();
    displayGalleryImages('all');
    initializeLightbox();
}

// Display filter buttons
function displayGalleryFilters() {
    const filtersContainer = document.getElementById('gallery-filters');
    if (!filtersContainer) return;
    
    const categories = ['all', ...new Set(galleryImages.map(img => img.category))];
    
    const filtersHTML = categories.map(category => {
        const label = category.charAt(0).toUpperCase() + category.slice(1);
        const activeClass = category === 'all' ? 'active' : '';
        return `
            <button class="btn btn-outline-primary filter-btn ${activeClass}" 
                    onclick="filterGallery('${category}')" 
                    data-category="${category}">
                ${label}
            </button>
        `;
    }).join('');
    
    filtersContainer.innerHTML = filtersHTML;
}

// Display gallery images
function displayGalleryImages(category = 'all') {
    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) return;
    
    const filteredImages = category === 'all' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === category);
    
    const galleryHTML = filteredImages.map((image, index) => `
        <div class="gallery-item" data-category="${image.category}">
            <div class="gallery-image-container">
                <img src="${image.src}" 
                     alt="${image.title}" 
                     class="gallery-image"
                     loading="lazy"
                     onclick="openLightbox(${index}, '${category}')">
                <div class="gallery-overlay">
                    <div class="gallery-overlay-content">
                        <h6 class="gallery-title">${image.title}</h6>
                        <p class="gallery-description">${image.description}</p>
                        <button class="btn btn-sm btn-light" onclick="openLightbox(${index}, '${category}')">
                            <i class="fas fa-expand"></i> View
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    galleryContainer.innerHTML = galleryHTML;
    
    // Animate gallery items
    setTimeout(() => {
        document.querySelectorAll('.gallery-item').forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
}

// Filter gallery by category
function filterGallery(category) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    // Fade out current images
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
    });
    
    // Display filtered images after animation
    setTimeout(() => {
        displayGalleryImages(category);
    }, 300);
}

// Initialize lightbox functionality
function initializeLightbox() {
    // Create lightbox HTML
    const lightboxHTML = `
        <div id="lightbox" class="lightbox" style="display: none;">
            <div class="lightbox-content">
                <span class="lightbox-close" onclick="closeLightbox()">&times;</span>
                <button class="lightbox-prev" onclick="previousImage()">&#10094;</button>
                <button class="lightbox-next" onclick="nextImage()">&#10095;</button>
                <div class="lightbox-image-container">
                    <img id="lightbox-image" src="" alt="">
                    <div class="lightbox-caption">
                        <h5 id="lightbox-title"></h5>
                        <p id="lightbox-description"></p>
                        <div class="lightbox-counter">
                            <span id="lightbox-current">1</span> / <span id="lightbox-total">1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add lightbox to page if it doesn't exist
    if (!document.getElementById('lightbox')) {
        const lightboxContainer = document.createElement('div');
        lightboxContainer.innerHTML = lightboxHTML;
        document.body.appendChild(lightboxContainer);
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        const lightbox = document.getElementById('lightbox');
        if (lightbox.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    previousImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        }
    });
}

// Open lightbox
let currentImageIndex = 0;
let currentCategory = 'all';

function openLightbox(index, category = 'all') {
    currentImageIndex = index;
    currentCategory = category;
    
    const filteredImages = category === 'all' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === category);
    
    const image = filteredImages[index];
    
    document.getElementById('lightbox-image').src = image.src;
    document.getElementById('lightbox-image').alt = image.title;
    document.getElementById('lightbox-title').textContent = image.title;
    document.getElementById('lightbox-description').textContent = image.description;
    document.getElementById('lightbox-current').textContent = index + 1;
    document.getElementById('lightbox-total').textContent = filteredImages.length;
    
    document.getElementById('lightbox').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Navigate to previous image
function previousImage() {
    const filteredImages = currentCategory === 'all' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === currentCategory);
    
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredImages.length - 1;
    openLightbox(currentImageIndex, currentCategory);
}

// Navigate to next image
function nextImage() {
    const filteredImages = currentCategory === 'all' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === currentCategory);
    
    currentImageIndex = currentImageIndex < filteredImages.length - 1 ? currentImageIndex + 1 : 0;
    openLightbox(currentImageIndex, currentCategory);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('gallery')) {
        initializeGallery();
    }
});

// Add gallery-specific styles
const galleryStyles = `
    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        padding: 2rem 0;
    }
    
    .gallery-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    }
    
    .gallery-image-container {
        position: relative;
        overflow: hidden;
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }
    
    .gallery-image {
        width: 100%;
        height: 250px;
        object-fit: cover;
        transition: transform 0.3s ease;
    }
    
    .gallery-image-container:hover .gallery-image {
        transform: scale(1.05);
    }
    
    .gallery-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
        display: flex;
        align-items: flex-end;
        padding: 1.5rem;
    }
    
    .gallery-image-container:hover .gallery-overlay {
        opacity: 1;
    }
    
    .gallery-overlay-content {
        color: white;
    }
    
    .gallery-title {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    
    .gallery-description {
        font-size: 0.9rem;
        margin-bottom: 1rem;
        opacity: 0.9;
    }
    
    .filter-btn {
        margin: 0.25rem;
        border-radius: 25px;
        transition: all 0.3s ease;
    }
    
    .filter-btn.active {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
        color: white;
    }
    
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-image-container {
        position: relative;
    }
    
    .lightbox-image-container img {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
    }
    
    .lightbox-caption {
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 5px;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        background: none;
        border: none;
    }
    
    .lightbox-prev,
    .lightbox-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        padding: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
        border-radius: 5px;
    }
    
    .lightbox-prev {
        left: -60px;
    }
    
    .lightbox-next {
        right: -60px;
    }
    
    .lightbox-counter {
        text-align: center;
        margin-top: 0.5rem;
        font-size: 0.9rem;
        opacity: 0.8;
    }
    
    @media (max-width: 768px) {
        .lightbox-prev,
        .lightbox-next {
            position: static;
            margin: 1rem 0.5rem 0 0.5rem;
            transform: none;
        }
        
        .gallery-grid {
            grid-template-columns: 1fr;
        }
    }
`;

// Add styles to document
const galleryStyleSheet = document.createElement('style');
galleryStyleSheet.textContent = galleryStyles;
document.head.appendChild(galleryStyleSheet);
