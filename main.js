document.addEventListener('DOMContentLoaded', () => {
    // --- Business Information ---
    const businessWhatsAppNumber = '919675212169'; // Use country code without '+'

    // --- Mobile Menu Elements & Logic ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburgerLines = mobileMenuBtn?.querySelectorAll('.hamburger-line');

    if (mobileMenuBtn && mobileMenu && hamburgerLines) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains('hidden');
            if (isOpen) {
                // Close menu
                mobileMenu.classList.add('hidden');
                hamburgerLines[0].style.transform = 'rotate(0deg) translateY(0px)';
                hamburgerLines[1].style.opacity = '1';
                hamburgerLines[2].style.transform = 'rotate(0deg) translateY(0px)';
            } else {
                // Open menu
                mobileMenu.classList.remove('hidden');
                hamburgerLines[0].style.transform = 'rotate(45deg) translateY(6px)';
                hamburgerLines[1].style.opacity = '0';
                hamburgerLines[2].style.transform = 'rotate(-45deg) translateY(-6px)';
            }
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                hamburgerLines[0].style.transform = 'rotate(0deg) translateY(0px)';
                hamburgerLines[1].style.opacity = '1';
                hamburgerLines[2].style.transform = 'rotate(0deg) translateY(0px)';
            });
        });
    }

    // --- Modal Elements & Logic ---
    const bookingModal = document.getElementById('bookingModal');
    const modalContent = document.getElementById('modalContent');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const openModalButtons = [
        document.getElementById('openModalBtnDesktop'),
        document.getElementById('openModalBtnMobile'),
        document.getElementById('openModalBtnHero')
    ];

    const openModal = () => {
        if (bookingModal && modalContent) {
            bookingModal.classList.remove('hidden');
            // Trigger reflow to apply transition
            void modalContent.offsetWidth;
            modalContent.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }
    };

    const closeModal = () => {
        if (bookingModal && modalContent) {
            modalContent.style.opacity = '0';
            modalContent.style.transform = 'scale(0.95)';
            // Wait for animation to finish before hiding
            setTimeout(() => {
                bookingModal.classList.add('hidden');
            }, 300); // Must match transition duration
        }
    };

    openModalButtons.forEach(btn => {
        if(btn) btn.addEventListener('click', openModal);
    });

    if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    // Close modal if user clicks outside the content
    if (bookingModal) {
        bookingModal.addEventListener('click', (event) => {
            if (event.target === bookingModal) {
                closeModal();
            }
        });
    }

    // Close modal on 'Escape' key press
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && bookingModal && !bookingModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // --- Form Logic ---
    const bookingForm = document.getElementById('bookingForm');
    const serviceSelection = document.getElementById('serviceSelection');
    const otherServiceDiv = document.getElementById('otherServiceDiv');
    const otherServiceText = document.getElementById('otherServiceText');

    // Show/hide 'Other Service' text field based on dropdown selection
    if (serviceSelection && otherServiceDiv && otherServiceText) {
        serviceSelection.addEventListener('change', () => {
            if (serviceSelection.value === 'Other') {
                otherServiceDiv.classList.remove('hidden');
                otherServiceText.required = true;
            } else {
                otherServiceDiv.classList.add('hidden');
                otherServiceText.required = false;
            }
        });
    }

    // --- WhatsApp Integration on Form Submission ---
    if (bookingForm) {
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            // Get form data
            const customerName = document.getElementById('customerName')?.value || '';
            const phoneNumber = document.getElementById('phoneNumber')?.value || '';
            const pickupDate = document.getElementById('pickupDate')?.value || '';
            const pickupTime = document.getElementById('pickupTime')?.value || '';
            const pickupLocation = document.getElementById('pickupLocation')?.value || '';
            const destination = document.getElementById('destination')?.value || '';
            const address = document.getElementById('address')?.value || '';
            let selectedService = serviceSelection?.value || '';

            // If 'Other' is selected, use the text from the custom input field
            if (selectedService === 'Other' && otherServiceText) {
                selectedService = otherServiceText.value;
            }

            // Construct the pre-filled WhatsApp message
            // %0A is the URL encoding for a new line
            let message = `🚖 New Cab Booking - Uttarakhand Cab 24/7
------------------------------------

👤 *Name:* ${customerName}
📱 *Phone:* ${phoneNumber}
🛣️ *Service Required:* ${selectedService}`;

            if (pickupDate) message += `
📅 *Pickup Date:* ${pickupDate}`;
            if (pickupTime) message += `
⏰ *Pickup Time:* ${pickupTime}`;
            if (pickupLocation) message += `
📍 *Pickup Location:* ${pickupLocation}`;
            if (destination) message += `
🎯 *Destination:* ${destination}`;
            if (address) message += `
📝 *Additional Details:* ${address}`;

            message += `
------------------------------------

Hello, I want to book a cab. Please confirm availability.`;

            // Encode the message for use in a URL
            const encodedMessage = encodeURIComponent(message);

            // Create the WhatsApp API link
            const whatsappURL = `https://wa.me/${businessWhatsAppNumber}?text=${encodedMessage}`;

            // Open the link in a new tab
            window.open(whatsappURL, '_blank');

            // Optional: Reset form and close modal after submission
            bookingForm.reset();
            if (otherServiceDiv) {
                otherServiceDiv.classList.add('hidden'); // Re-hide the 'other' field
            }
            closeModal();
        });
    }

    // --- Smooth Scrolling for Navigation Links ---
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // --- Dark Mode Toggle Logic ---
    const darkToggle = document.getElementById('darkToggle');
    const darkToggleMobile = document.getElementById('darkToggleMobile');

    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Apply the saved theme on page load
    if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
        updateDarkToggleIcon(true);
    } else {
        document.documentElement.classList.remove('dark');
        updateDarkToggleIcon(false);
    }

    function updateDarkToggleIcon(isDark) {
        const icon = isDark ? '☀️' : '🌙';
        if (darkToggle) {
            darkToggle.querySelector('span').textContent = icon;
        }
        if (darkToggleMobile) {
            darkToggleMobile.querySelector('span').textContent = icon;
        }
    }

    function toggleDarkMode() {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            updateDarkToggleIcon(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            updateDarkToggleIcon(true);
        }
    }

    // Add event listeners for both desktop and mobile toggle buttons
    if (darkToggle) {
        darkToggle.addEventListener('click', toggleDarkMode);
    }
    if (darkToggleMobile) {
        darkToggleMobile.addEventListener('click', toggleDarkMode);
    }

    // Add intersection observer for animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            observer.observe(el);
        });
    }

    // --- Tour Booking Form Logic ---
    const tourBookingForm = document.getElementById('tourBookingForm');
    const whatsappBookBtn = document.getElementById('whatsappBookBtn');

    // Function to open booking form and pre-fill destination
    window.openBookingForm = function(packageName) {
        const destinationSelect = document.getElementById('destination');
        const tourDurationSelect = document.getElementById('tourDuration');

        if (destinationSelect && packageName) {
            // Extract duration and destination from package name
            const parts = packageName.split(' - ');
            if (parts.length >= 2) {
                const duration = parts[0];
                const destination = parts[1];

                if (tourDurationSelect) {
                    tourDurationSelect.value = duration;
                }
                destinationSelect.value = destination;
            }
        }

        // Scroll to booking form
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const elementPosition = bookingSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Function to generate WhatsApp message from tour form data
    function generateTourWhatsAppMessage() {
        const name = document.getElementById('customerName')?.value || '';
        const phone = document.getElementById('customerPhone')?.value || '';
        const pickup = document.getElementById('pickupLocation')?.value || '';
        const startDate = document.getElementById('startDate')?.value || '';
        const duration = document.getElementById('tourDuration')?.value || '';
        const destination = document.getElementById('destination')?.value || '';
        const car = document.getElementById('carPreference')?.value || '';
        const notes = document.getElementById('additionalNotes')?.value || '';

        let message = `Hello Uttarakhand Cab 24/7 🚖

Name: ${name}
Phone: ${phone}
Pickup: ${pickup}
Start Date: ${startDate}
Duration: ${duration}
Destination: ${destination}
Car: ${car}`;

        if (notes) {
            message += `\nNotes: ${notes}`;
        }

        message += `\n\nPlease confirm availability & price.`;

        return message;
    }

    // WhatsApp booking button handler
    if (whatsappBookBtn) {
        whatsappBookBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Validate required fields
            const requiredFields = ['customerName', 'customerPhone', 'pickupLocation', 'startDate', 'tourDuration', 'destination'];
            let isValid = true;

            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field || !field.value.trim()) {
                    isValid = false;
                    if (field) {
                        field.style.borderColor = '#ef4444';
                        field.focus();
                    }
                } else if (field) {
                    field.style.borderColor = '';
                }
            });

            if (!isValid) {
                alert('Please fill in all required fields marked with *');
                return;
            }

            // Generate and send WhatsApp message
            const message = generateTourWhatsAppMessage();
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${businessWhatsAppNumber}?text=${encodedMessage}`;

            window.open(whatsappURL, '_blank');
        });
    }

    // Tour booking form submission handler
    if (tourBookingForm) {
        tourBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // For now, just show success message
            alert('Thank you! Your enquiry has been submitted. We will contact you soon.');
            // You can add email submission logic here
            tourBookingForm.reset();
        });
    }

    // Set minimum date to today for date inputs
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.min = today;
    });

    console.log('Uttarakhand Cab 24/7 website initialized successfully');
});
