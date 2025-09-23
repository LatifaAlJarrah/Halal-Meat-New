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

    // Notifications modal functionality
    const notificationBtn = document.getElementById('notification-btn');
    const mobileNotificationBtn = document.getElementById('mobile-notification-btn');
    const notificationsModal = document.getElementById('notifications-modal');
    const closeModalBtn = document.getElementById('close-notifications-modal');

    function openNotificationsModal() {
        if (notificationsModal) {
            notificationsModal.classList.remove('hidden');
            const modalContent = notificationsModal.querySelector('.animate-slide-in-right');
            if (modalContent) {
                modalContent.classList.remove('animate-slide-out-right');
                modalContent.classList.add('animate-slide-in-right');
            }
            // Close mobile menu if open
            if (mobileMenuDropdown && !mobileMenuDropdown.classList.contains('hidden')) {
                mobileMenuDropdown.classList.add('hidden');
                mobileMenuDropdown.classList.remove('animate-slide-down', 'animate-slide-up');
            }
        }
    }

    function closeNotificationsModal() {
        if (notificationsModal) {
            // Hide notification badges when closing modal
            const badges = document.querySelectorAll('#notification-badge, #mobile-notification-badge');
            badges.forEach(badge => {
                badge.style.display = 'none';
            });
            
            // Change all notification dots to gray (mark as read) when closing modal
            const notificationDots = document.querySelectorAll('.notification-item .bg-red-500, .notification-item .bg-blue-500, .notification-item .bg-green-500');
            notificationDots.forEach(dot => {
                dot.className = dot.className.replace(/bg-(red|blue|green)-500/, 'bg-gray-300');
            });
            
            const modalContent = notificationsModal.querySelector('.animate-slide-in-right');
            if (modalContent) {
                modalContent.classList.remove('animate-slide-in-right');
                modalContent.classList.add('animate-slide-out-right');
                setTimeout(() => {
                    notificationsModal.classList.add('hidden');
                    modalContent.classList.remove('animate-slide-out-right');
                }, 300);
            } else {
                notificationsModal.classList.add('hidden');
            }
        }
    }

    // Desktop notification button
    if (notificationBtn) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openNotificationsModal();
        });
    }

    // Mobile notification button
    if (mobileNotificationBtn) {
        mobileNotificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openNotificationsModal();
        });
    }

    // Close modal button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeNotificationsModal);
    }

    // Close modal when clicking outside
    if (notificationsModal) {
        notificationsModal.addEventListener('click', function (event) {
            // Check if clicked on the backdrop (the dark overlay area)
            const modalContent = notificationsModal.querySelector('.bg-white');
            if (!modalContent || !modalContent.contains(event.target)) {
                closeNotificationsModal();
            }
        });
    }

    // Mark all as read functionality
    const markAllReadBtn = notificationsModal?.querySelector('button:last-child');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function() {
            // Get all notification dots
            const notificationDots = document.querySelectorAll('.notification-item .bg-red-500, .notification-item .bg-blue-500, .notification-item .bg-green-500');
            
            // Change all notification dots to gray (read state)
            notificationDots.forEach(dot => {
                dot.className = dot.className.replace(/bg-(red|blue|green)-500/, 'bg-gray-300');
            });
            
            // Update button text and disable it
            markAllReadBtn.textContent = 'All notifications read';
            markAllReadBtn.disabled = true;
            markAllReadBtn.classList.add('opacity-50', 'cursor-not-allowed');
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && notificationsModal && !notificationsModal.classList.contains('hidden')) {
            closeNotificationsModal();
        }
    });
});