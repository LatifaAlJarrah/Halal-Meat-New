// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuDropdown = document.getElementById('mobile-menu-dropdown');

    if (mobileMenuButton && mobileMenuDropdown) {
        mobileMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            // Toggle mobile menu visibility with smooth animation
            if (mobileMenuDropdown.classList.contains('hidden')) {
                mobileMenuDropdown.classList.remove('hidden');
                mobileMenuDropdown.classList.add('animate-slide-down');
            } else {
                mobileMenuDropdown.classList.add('animate-slide-up');
                setTimeout(() => {
                    mobileMenuDropdown.classList.add('hidden');
                    mobileMenuDropdown.classList.remove('animate-slide-down', 'animate-slide-up');
                }, 300);
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenuDropdown.contains(event.target)) {
                mobileMenuDropdown.classList.add('hidden');
                mobileMenuDropdown.classList.remove('animate-slide-down', 'animate-slide-up');
            }
        });

        // Close mobile menu when clicking on a menu item
        const menuItems = mobileMenuDropdown.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', function () {
                mobileMenuDropdown.classList.add('hidden');
                mobileMenuDropdown.classList.remove('animate-slide-down', 'animate-slide-up');
            });
        });
    }
});