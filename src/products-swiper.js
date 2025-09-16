// Products Swiper Implementation
class ProductsSwiper {
    constructor() {
        this.swiper = null;
        this.productsData = {
            beef: [
                {
                    name: "Premium Beef Steak",
                    price: "12.99",
                    image: "assets/images/cow1.jpg",
                    alt: "Premium Beef Steak"
                },
                {
                    name: "Beef Ribs",
                    price: "15.49",
                    image: "assets/images/cow2.jpg",
                    alt: "Beef Ribs"
                },
                {
                    name: "Beef Tenderloin",
                    price: "18.99",
                    image: "assets/images/cow3.jpg",
                    alt: "Beef Tenderloin"
                },
                {
                    name: "Ground Beef",
                    price: "8.99",
                    image: "assets/images/meat.jpg",
                    alt: "Ground Beef"
                },
                {
                    name: "Beef Tenderloin",
                    price: "18.99",
                    image: "assets/images/cow3.jpg",
                    alt: "Beef Tenderloin"
                },
                {
                    name: "Ground Beef",
                    price: "8.99",
                    image: "assets/images/meat.jpg",
                    alt: "Ground Beef"
                }
            ],
            chicken: [
                {
                    name: "Whole Chicken",
                    price: "7.49",
                    image: "assets/images/chicken.jpg",
                    alt: "Whole Chicken"
                },
                {
                    name: "Chicken Breast",
                    price: "9.99",
                    image: "assets/images/uncooked-chicken.jpg",
                    alt: "Chicken Breast"
                },
                {
                    name: "Chicken Wings",
                    price: "6.99",
                    image: "assets/images/image1.jpg",
                    alt: "Chicken Wings"
                },
                {
                    name: "Chicken Thighs",
                    price: "5.99",
                    image: "assets/images/image2.jpg",
                    alt: "Chicken Thighs"
                }
                ,
                {
                    name: "Chicken Wings",
                    price: "6.99",
                    image: "assets/images/image1.jpg",
                    alt: "Chicken Wings"
                },
                {
                    name: "Chicken Thighs",
                    price: "5.99",
                    image: "assets/images/image2.jpg",
                    alt: "Chicken Thighs"
                }
            ],
            lamb: [
                {
                    name: "Lamb Chops",
                    price: "16.99",
                    image: "assets/images/lamp-ribs.png",
                    alt: "Lamb Chops"
                },
                {
                    name: "Lamb Leg",
                    price: "14.99",
                    image: "assets/images/lamp-ribs2.jpg",
                    alt: "Lamb Leg"
                },
                {
                    name: "Lamb Shoulder",
                    price: "12.99",
                    image: "assets/images/lamp-ribs3.jpg",
                    alt: "Lamb Shoulder"
                },
                {
                    name: "Ground Lamb",
                    price: "10.99",
                    image: "assets/images/raw-lamb.png",
                    alt: "Ground Lamb"
                },
                {
                    name: "Lamb Shoulder",
                    price: "12.99",
                    image: "assets/images/lamp-ribs3.jpg",
                    alt: "Lamb Shoulder"
                },
                {
                    name: "Ground Lamb",
                    price: "10.99",
                    image: "assets/images/raw-lamb.png",
                    alt: "Ground Lamb"
                }
            ]
        };
        
        this.currentCategory = 'chicken';
        this.init();
    }

    init() {
        this.initializeSwiper();
        this.setupCategoryListeners();
        this.loadProducts('chicken'); // Load chicken products by default
    }

    initializeSwiper() {
        this.swiper = new Swiper('.products-swiper', {
            // Swiper configuration
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            
            // Navigation arrows
            navigation: {
                nextEl: '.products-swiper-next',
                prevEl: '.products-swiper-prev',
            },
            
            // Pagination
            pagination: {
                el: '.products-swiper-pagination',
                clickable: true,
            },
            
            // Responsive breakpoints
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
                1280: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                }
            },
            
            // Effects
            effect: 'slide',
            speed: 600,
        });
        
        console.log('Products Swiper initialized');
    }

    setupCategoryListeners() {
        const categories = document.querySelectorAll('.category-item');
        
        categories.forEach(category => {
             const categoryName = category.getAttribute('data-category');
                const seeAllLink = document.querySelector('.see-all-link');
                
            category.addEventListener('click', () => {
               
                if (categoryName && this.productsData[categoryName]) {
                    // Update active category
                    this.updateActiveCategory(categoryName);
                    
                    // Load products for the selected category
                    this.loadProducts(categoryName);
                    
                    console.log(`Switched to category: ${categoryName}`);
                }
            });
             // Check if this is the active chicken category
                    if (categoryName === 'chicken' && category.classList.contains('active')) {
                        console.log('Active chicken category clicked - redirecting to chicken-category.html');
                        // Redirect to chicken category page
                        seeAllLink.href = './chicken-category.html';
                        return;
                    }
                    
        });
    }

    updateActiveCategory(selectedCategory) {
        // Remove active class from all categories
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active', 'bg-[#D72638]');
            item.classList.add('hover:bg-gray-50');
            
            const span = item.querySelector('span');
            if (span) {
                span.classList.remove('text-white');
                span.classList.add('text-[#010F1C]');
            }
        });

        // Add active class to selected category
        document.querySelectorAll(`[data-category="${selectedCategory}"]`).forEach(item => {
            item.classList.add('active', 'bg-[#D72638]');
            item.classList.remove('hover:bg-gray-50');
            
            const span = item.querySelector('span');
            if (span) {
                span.classList.add('text-white');
                span.classList.remove('text-[#010F1C]');
            }
        });
    }

    loadProducts(category) {
        const products = this.productsData[category] || [];
        const container = document.getElementById('products-container');
        
        if (!container) {
            console.error('Products container not found!');
            return;
        }

        console.log(`Loading ${products.length} products for category: ${category}`);

        // Clear existing content
        container.innerHTML = '';

        // Add products as swiper slides
        products.forEach(product => {
            const slideElement = document.createElement('div');
            slideElement.className = 'swiper-slide';
            slideElement.innerHTML = this.createProductCard(product);
            container.appendChild(slideElement);
        });

        // Update swiper
        if (this.swiper) {
            this.swiper.update();
            this.swiper.slideTo(0, 0); // Reset to first slide
        }

        this.currentCategory = category;
    }

    createProductCard(product) {
        return `
            <div class="flex-shrink-0 w-full rounded-3xl shadow-lg overflow-hidden product-card h-full">
                <div class="relative h-64 sm:h-72 md:h-96 rounded-3xl">
                    <div class="absolute inset-0 bg-gradient rounded-3xl"></div>
                    <img src="${product.image}" alt="${product.alt}"
                        class="w-full h-full object-cover rounded-3xl" 
                        loading="lazy" />
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-8 font-poppins">
                        <h3 class="text-white font-medium text-base sm:text-lg md:text-xl mb-1 sm:mb-4">${product.name}</h3>
                        <div class="flex items-center gap-2 mb-1 sm:mb-4">
                            <span class="text-[#D72638] font-bold text-xl">$</span>
                            <span class="text-white font-bold text-lg sm:text-xl md:text-2xl">${product.price}</span>
                        </div>
                        <a href="./product.html" class="text-white font-medium text-base sm:text-lg md:text-lg">
                            <button class="flex items-center gap-2 hover:gap-3 transition-all duration-300">
                                Order Now
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M9.005 4L17.005 12L9.005 20L7 18L13.005 12L7 6L9.005 4Z"
                                        fill="white" />
                                </svg>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    // Public method to get current category
    getCurrentCategory() {
        return this.currentCategory;
    }

    // Public method to refresh swiper
    refresh() {
        if (this.swiper) {
            this.swiper.update();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if Swiper is available
    if (typeof Swiper === 'undefined') {
        console.error('Swiper.js is not loaded. Please include Swiper.js before this script.');
        return;
    }
    
    // Initialize products swiper
    window.productsSwiperInstance = new ProductsSwiper();
    console.log('Products Swiper instance created');
});

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductsSwiper;
}
