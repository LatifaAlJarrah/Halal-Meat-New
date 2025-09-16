// Products Swiper Configuration
document.addEventListener('DOMContentLoaded', function () {
    // Wait for Swiper library to be loaded
    if (typeof Swiper === 'undefined') {
        console.error('Swiper library not loaded!');
        return;
    }

    // Initialize Products Swiper
    window.productsSwiper = new Swiper('.products-swiper', {
        loop: false,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        slidesPerView: 3,
        spaceBetween: 24,
        speed: 600,
        grabCursor: true,
        effect: 'slide',
        allowTouchMove: true,
        navigation: {
            nextEl: '.products-next',
            prevEl: '.products-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 16,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 24,
            }
        },
        on: {
            init: function() {
                console.log('Products Swiper initialized successfully');
                console.log('Swiper slides:', this.slides.length);
            },
            update: function() {
                console.log('Swiper updated, slides count:', this.slides.length);
            }
        }
    });

    // Wait a bit for Swiper to be fully initialized
    setTimeout(() => {
        // Initialize with chicken category (default active)
        if (typeof renderProducts === 'function') {
            renderProducts('chicken');
        }
        if (typeof updateActiveCategory === 'function') {
            updateActiveCategory('chicken');
        }

        // Add click event listeners to category items
        document.querySelectorAll('.category-item').forEach(item => {
            item.addEventListener('click', function () {
                const category = this.getAttribute('data-category');
                console.log('Category clicked:', category);
                
                if (typeof updateActiveCategory === 'function') {
                    updateActiveCategory(category);
                }
                if (typeof renderProducts === 'function') {
                    renderProducts(category);
                }
            });
        });
    }, 300);
});