// Senthil Balaganesh Portfolio JavaScript - Fixed Navigation

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initPageNavigation();
    initMobileMenu();
    initContactForm();
    initScrollAnimations();
    initInteractiveElements();
});

// Multi-page navigation system - FIXED
function initPageNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const pages = document.querySelectorAll('.page');
    const homeLink = document.getElementById('home-link');
    const heroButtons = document.querySelectorAll('[data-page]');
    
    console.log('Found pages:', pages.length);
    console.log('Found nav links:', navLinks.length);
    
    // Set initial active page
    showPage('home');
    updateActiveNavLink('home');
    
    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const targetPage = this.getAttribute('data-page');
            console.log('Navigating to:', targetPage);
            if (targetPage) {
                showPage(targetPage);
                updateActiveNavLink(targetPage);
                closeMobileMenu();
            }
        });
    });
    
    // Handle OCEANMATE header click
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Home link clicked');
            showPage('home');
            updateActiveNavLink('home');
            closeMobileMenu();
        });
    }
    
    // Handle hero buttons and other page navigation buttons
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const targetPage = this.getAttribute('data-page');
            console.log('Button clicked for page:', targetPage);
            if (targetPage) {
                showPage(targetPage);
                updateActiveNavLink(targetPage);
            }
        });
    });
    
    function showPage(pageId) {
        console.log('Showing page:', pageId);
        
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
            page.style.display = 'none';
        });
        
        // Show target page
        const targetPage = document.getElementById(pageId + '-page');
        console.log('Target page element:', targetPage);
        
        if (targetPage) {
            targetPage.classList.add('active');
            targetPage.style.display = 'block';
            
            // Scroll to top of page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Trigger animations for visible elements
            setTimeout(() => {
                triggerPageAnimations(targetPage);
            }, 100);
        } else {
            console.error('Page not found:', pageId + '-page');
        }
    }
    
    function updateActiveNavLink(pageId) {
        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current page nav links
        const activeLinks = document.querySelectorAll(`[data-page="${pageId}"]`);
        activeLinks.forEach(link => {
            if (link.classList.contains('nav-link') || link.classList.contains('mobile-nav-link')) {
                link.classList.add('active');
            }
        });
    }
    
    function triggerPageAnimations(page) {
        const animatedElements = page.querySelectorAll('.card, .timeline-item, .skill-item');
        animatedElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in', 'visible');
            }, index * 100);
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.navbar-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Close mobile menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                setTimeout(closeMobileMenu, 100);
            });
        });
        
        // Close mobile menu when clicking outside
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }
    
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('hidden');
        mobileMenuToggle.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('hidden') ? 'auto' : 'hidden';
    }
    
    function closeMobileMenu() {
        if (mobileMenu && mobileMenuToggle) {
            mobileMenu.classList.add('hidden');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Make closeMobileMenu globally accessible
    window.closeMobileMenu = closeMobileMenu;
}

// Contact form functionality with email integration
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formObject = {};
        
        // Convert FormData to object
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Validate all fields
        let isValid = true;
        const fields = ['name', 'email', 'subject', 'message'];
        
        fields.forEach(fieldName => {
            const field = contactForm.querySelector(`[name="${fieldName}"]`);
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Create email content
            const emailBody = `Name: ${formObject.name}%0D%0AEmail: ${formObject.email}%0D%0ASubject: ${formObject.subject}%0D%0A%0D%0AMessage:%0D%0A${formObject.message}`;
            const mailtoLink = `mailto:hanusent@gmail.com?subject=${encodeURIComponent(formObject.subject)}&body=${emailBody}`;
            
            // Open email client
            window.open(mailtoLink);
            
            // Show success message
            showFormSuccess();
            
            // Reset form
            contactForm.reset();
            
            console.log('Form submitted:', formObject);
        }
    }
    
    function validateField(field) {
        const fieldName = field.getAttribute('name');
        const value = field.value.trim();
        const errorElement = document.getElementById(fieldName + 'Error');
        
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (!value) {
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
            isValid = false;
        }
        // Email validation
        else if (fieldName === 'email' && !isValidEmail(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
        // Message length validation
        else if (fieldName === 'message' && value.length < 10) {
            errorMessage = 'Message must be at least 10 characters long';
            isValid = false;
        }
        
        // Show/hide error message
        if (errorElement) {
            if (isValid) {
                errorElement.textContent = '';
                errorElement.classList.remove('show');
                field.style.borderColor = '';
            } else {
                errorElement.textContent = errorMessage;
                errorElement.classList.add('show');
                field.style.borderColor = 'var(--color-error)';
            }
        }
        
        return isValid;
    }
    
    function clearFieldError(field) {
        const fieldName = field.getAttribute('name');
        const errorElement = document.getElementById(fieldName + 'Error');
        
        if (errorElement && field.value.trim()) {
            errorElement.classList.remove('show');
            field.style.borderColor = '';
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormSuccess() {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--color-primary);
            color: var(--color-btn-primary-text);
            padding: var(--space-16) var(--space-24);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            font-weight: var(--font-weight-medium);
            text-align: center;
            max-width: 300px;
        `;
        successMessage.textContent = 'Email client opened! Your message will be sent to hanusent@gmail.com';
        
        document.body.appendChild(successMessage);
        
        // Remove success message after 4 seconds
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.parentNode.removeChild(successMessage);
            }
        }, 4000);
    }
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.card, .timeline-item, .skill-item, .section-title');
    
    // Add fade-in class to elements that should animate
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Create intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Interactive elements functionality
function initInteractiveElements() {
    // Download Resume functionality
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'download-resume') {
            e.preventDefault();
            handleResumeDownload();
        }
    });
    
    // Project buttons
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('project-btn')) {
            e.preventDefault();
            handleProjectView(e.target);
        }
    });
    
    // Blog buttons
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('blog-btn')) {
            e.preventDefault();
            handleBlogRead(e.target);
        }
    });
    
    // Read More button
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'read-more-btn') {
            e.preventDefault();
            handleReadMoreBlogs();
        }
    });
    
    function handleResumeDownload() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--color-surface);
            border: 2px solid var(--color-primary);
            color: var(--color-text);
            padding: var(--space-24);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            text-align: center;
            max-width: 400px;
        `;
        message.innerHTML = `
            <h4 style="margin-bottom: var(--space-16); color: var(--color-primary);">Resume Download</h4>
            <p style="margin-bottom: var(--space-16); color: var(--color-text-secondary);">Resume download functionality would connect to the CV file from G:\\Portfolio\\Senthil CV.pdf</p>
            <button onclick="this.parentNode.remove()" style="padding: var(--space-8) var(--space-16); background: var(--color-primary); color: var(--color-btn-primary-text); border: none; border-radius: var(--radius-base); cursor: pointer; font-weight: var(--font-weight-medium);">Close</button>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 5000);
        
        console.log('Resume download triggered - would download: G:\\Portfolio\\Senthil CV.pdf');
    }
    
    function handleProjectView(button) {
        const projectCard = button.closest('.project-card');
        const projectTitle = projectCard.querySelector('.project-title').textContent;
        
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--color-surface);
            border: 2px solid var(--color-primary);
            color: var(--color-text);
            padding: var(--space-24);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            text-align: center;
            max-width: 400px;
        `;
        message.innerHTML = `
            <h4 style="margin-bottom: var(--space-16); color: var(--color-primary);">Project Details</h4>
            <p style="margin-bottom: var(--space-16); color: var(--color-text-secondary);">Opening detailed view for:<br><strong>${projectTitle}</strong></p>
            <p style="margin-bottom: var(--space-16); color: var(--color-text-secondary); font-size: var(--font-size-sm);">This would navigate to a separate project details page with comprehensive information, images, and technical documentation.</p>
            <button onclick="this.parentNode.remove()" style="padding: var(--space-8) var(--space-16); background: var(--color-primary); color: var(--color-btn-primary-text); border: none; border-radius: var(--radius-base); cursor: pointer; font-weight: var(--font-weight-medium);">Close</button>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 6000);
        
        console.log('Project view triggered for:', projectTitle);
    }
    
    function handleBlogRead(button) {
        const blogCard = button.closest('.blog-card');
        const blogTitle = blogCard.querySelector('.blog-title').textContent;
        
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--color-surface);
            border: 2px solid var(--color-primary);
            color: var(--color-text);
            padding: var(--space-24);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            text-align: center;
            max-width: 400px;
        `;
        message.innerHTML = `
            <h4 style="margin-bottom: var(--space-16); color: var(--color-primary);">Blog Post</h4>
            <p style="margin-bottom: var(--space-16); color: var(--color-text-secondary);">Opening full blog post:<br><strong>${blogTitle}</strong></p>
            <p style="margin-bottom: var(--space-16); color: var(--color-text-secondary); font-size: var(--font-size-sm);">Content sourced from: https://oceanmate.weebly.com/blog</p>
            <button onclick="this.parentNode.remove()" style="padding: var(--space-8) var(--space-16); background: var(--color-primary); color: var(--color-btn-primary-text); border: none; border-radius: var(--radius-base); cursor: pointer; font-weight: var(--font-weight-medium);">Close</button>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 5000);
        
        console.log('Blog read triggered for:', blogTitle);
    }
    
    function handleReadMoreBlogs() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--color-surface);
            border: 2px solid var(--color-primary);
            color: var(--color-text);
            padding: var(--space-24);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            text-align: center;
            max-width: 400px;
        `;
        message.innerHTML = `
            <h4 style="margin-bottom: var(--space-16); color: var(--color-primary);">More Blog Posts</h4>
            <p style="margin-bottom: var(--space-16); color: var(--color-text-secondary);">Loading additional blog posts from OceanMate blog...</p>
            <p style="margin-bottom: var(--space-16); color: var(--color-text-secondary); font-size: var(--font-size-sm);">Source: https://oceanmate.weebly.com/blog</p>
            <button onclick="this.parentNode.remove()" style="padding: var(--space-8) var(--space-16); background: var(--color-primary); color: var(--color-btn-primary-text); border: none; border-radius: var(--radius-base); cursor: pointer; font-weight: var(--font-weight-medium);">Close</button>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 5000);
        
        console.log('Read more blogs triggered');
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Navbar background opacity on scroll
window.addEventListener('scroll', debounce(function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY;
    
    if (scrolled > 50) {
        navbar.style.background = 'rgba(33, 37, 41, 0.98)';
    } else {
        navbar.style.background = 'rgba(33, 37, 41, 0.95)';
    }
}, 10));

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        if (window.closeMobileMenu) {
            window.closeMobileMenu();
        }
        
        // Close any open modals
        const modals = document.querySelectorAll('.form-success-message, [onclick*="remove"]');
        modals.forEach(modal => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        });
    }
});

// Handle external links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('target') === '_blank') {
        console.log('Opening external link:', e.target.href);
    }
});

// Timeline animation on scroll
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease-in-out ${index * 0.1}s, transform 0.6s ease-in-out ${index * 0.1}s`;
        timelineObserver.observe(item);
    });
}

// Initialize timeline animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initTimelineAnimation, 500);
});

// Add loading animation for the page
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    console.log('Page loaded, initializing animations...');
});

// Console welcome message
console.log('%c🌊 Welcome to Senthil Balaganesh Portfolio 🌊', 'color: #495057; font-size: 16px; font-weight: bold;');
console.log('%cGeospatial Scientist | Turning pixels into predictions, and predictions into protection', 'color: #6c757d; font-size: 12px;');
console.log('%cContact: hanusent@gmail.com', 'color: #6c757d; font-size: 12px;');