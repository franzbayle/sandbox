// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const contactForm = document.getElementById('contactForm');
const ctaButtons = document.querySelectorAll('.cta-button');

// Mobile Menu Toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    if (hamburger.classList.contains('active')) {
        hamburger.style.transform = 'rotate(45deg)';
    } else {
        hamburger.style.transform = 'rotate(0deg)';
    }
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.style.transform = 'rotate(0deg)';
}

// Smooth Scrolling
function smoothScroll(target) {
    const targetElement = document.querySelector(target);
    if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Form Validation
function validateForm(formData) {
    const errors = [];
    
    // Name validation
    if (!formData.get('name') || formData.get('name').trim().length < 2) {
        errors.push('Please enter a valid name (at least 2 characters)');
    }
    
    // Email validation
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Company validation
    if (!formData.get('company') || formData.get('company').trim().length < 2) {
        errors.push('Please enter a valid company name');
    }
    
    // Phone validation (optional but if provided, should be valid)
    const phone = formData.get('phone');
    if (phone && phone.trim().length > 0) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
            errors.push('Please enter a valid phone number');
        }
    }
    
    return errors;
}

// Form Submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const errors = validateForm(formData);
    
    // Clear previous error messages
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    if (errors.length > 0) {
        // Display errors
        errors.forEach(error => {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = '#ef4444';
            errorElement.style.fontSize = '0.875rem';
            errorElement.style.marginTop = '0.5rem';
            errorElement.textContent = error;
            contactForm.appendChild(errorElement);
        });
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.color = '#10b981';
        successMessage.style.fontSize = '1rem';
        successMessage.style.marginTop = '1rem';
        successMessage.style.padding = '1rem';
        successMessage.style.backgroundColor = '#d1fae5';
        successMessage.style.borderRadius = '0.5rem';
        successMessage.style.textAlign = 'center';
        successMessage.innerHTML = `
            <strong>Thank you for your interest!</strong><br>
            We'll get back to you within 24 hours to schedule your free consultation.
        `;
        
        contactForm.appendChild(successMessage);
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
        
    }, 1500);
}

// Scroll-based Animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .testimonial-card, .contact-info, .contact-form-wrapper');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.service-card, .testimonial-card, .contact-info, .contact-form-wrapper');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
}

// Click outside to close mobile menu
function handleOutsideClick(e) {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        closeMobileMenu();
    }
}

// Loading animation for CTA buttons
function addButtonLoadingEffect() {
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Only add loading effect for actual form submissions or external links
            if (this.getAttribute('href') === '#contact' || this.getAttribute('href') === '#services') {
                return; // Skip loading for internal anchors
            }
            
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
            }, 2000);
        });
    });
}

// Testimonial card hover effects
function addTestimonialEffects() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Service card interactive effects
function addServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Intersection Observer for more efficient scroll animations
function initIntersectionObserver() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Observe elements
    const elementsToObserve = document.querySelectorAll('.service-card, .testimonial-card, .contact-info, .contact-form-wrapper');
    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(element);
    });
}

// Initialize all functionality
function init() {
    // Mobile menu functionality
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                smoothScroll(href);
                closeMobileMenu();
            }
        });
    });
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Scroll effects
    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        animateOnScroll();
    });
    
    // Click outside to close menu
    document.addEventListener('click', handleOutsideClick);
    
    // Initialize animations
    initScrollAnimations();
    addButtonLoadingEffect();
    addTestimonialEffects();
    addServiceCardEffects();
    
    // Use Intersection Observer if supported
    if ('IntersectionObserver' in window) {
        initIntersectionObserver();
    }
    
    // Initial header state
    handleHeaderScroll();
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Handle form field focus states
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    handleHeaderScroll();
    animateOnScroll();
}, 100);

window.addEventListener('scroll', throttledScroll);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Lazy loading for images (if any are added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Error handling for any JavaScript errors
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // Could send error to analytics service here
});

// Add loading state to page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth scroll polyfill for older browsers
function smoothScrollPolyfill() {
    if (!Element.prototype.scrollIntoView) {
        Element.prototype.scrollIntoView = function(options) {
            const element = this;
            const start = window.pageYOffset;
            const end = element.offsetTop;
            const duration = 500;
            
            const startTime = performance.now();
            
            function animate(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                window.scrollTo(0, start + (end - start) * easeInOutQuad(progress));
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            }
            
            requestAnimationFrame(animate);
        };
    }
}

function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Initialize polyfills
smoothScrollPolyfill();