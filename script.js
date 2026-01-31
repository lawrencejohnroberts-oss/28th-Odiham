// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'white';
        navbar.style.backdropFilter = 'none';
    }
});

// Form submission handling with security improvements
const membershipForm = document.getElementById('membership-form');
const formSuccess = document.getElementById('form-success');

// Generate CSRF token for form security
function generateCSRFToken() {
    return 'csrf_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

// Add CSRF token to form
if (membershipForm) {
    const csrfToken = generateCSRFToken();
    const csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = 'csrf_token';
    csrfInput.value = csrfToken;
    membershipForm.appendChild(csrfInput);
}

// Rate limiting for form submissions
let lastSubmissionTime = 0;
const SUBMISSION_COOLDOWN = 30000; // 30 seconds

membershipForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Check rate limiting
    const currentTime = Date.now();
    if (currentTime - lastSubmissionTime < SUBMISSION_COOLDOWN) {
        alert('Please wait before submitting another application.');
        return;
    }
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    
    // Convert FormData to object with sanitization
    for (let [key, value] of formData.entries()) {
        // Basic input sanitization
        if (typeof value === 'string') {
            // Remove potentially dangerous characters
            value = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
            value = value.replace(/javascript:/gi, '');
            value = value.replace(/on\w+\s*=/gi, '');
            // Trim whitespace
            value = value.trim();
        }
        formObject[key] = value;
    }
    
    // Enhanced validation with security checks
    const requiredFields = ['child-name', 'child-dob', 'preferred-section', 'parent-name', 'parent-email', 'parent-phone', 'address', 'consent'];
    let isValid = true;
    
    // Check for suspicious patterns
    const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /data:text\/html/i,
        /vbscript:/i,
        /<iframe/i,
        /<object/i,
        /<embed/i
    ];
    
    // Validate all text inputs for suspicious content
    for (let [key, value] of formData.entries()) {
        if (typeof value === 'string') {
            for (let pattern of suspiciousPatterns) {
                if (pattern.test(value)) {
                    alert('Invalid characters detected in form submission.');
                    return;
                }
            }
        }
    }
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field) || document.querySelector(`[name="${field}"]`);
        if (!input || !input.value.trim()) {
            isValid = false;
            if (input) {
                input.style.borderColor = '#ed3f23';
                input.focus();
            }
        } else {
            if (input) {
                input.style.borderColor = '#ddd';
            }
        }
    });
    
    // Validate email format
    const emailInput = document.getElementById('parent-email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput && !emailRegex.test(emailInput.value)) {
        isValid = false;
        emailInput.style.borderColor = '#ed3f23';
        emailInput.focus();
    }
    
    // Validate age for section
    const dobInput = document.getElementById('child-dob');
    const sectionInput = document.getElementById('preferred-section');
    
    if (dobInput && sectionInput && dobInput.value && sectionInput.value) {
        const birthDate = new Date(dobInput.value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        let actualAge = age;
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            actualAge--;
        }
        
        const sectionAges = {
            'squirrels': [4, 6],
            'beavers': [6, 8],
            'cubs': [8, 10.5],
            'scouts': [10.5, 14]
        };
        
        const selectedSection = sectionInput.value;
        if (sectionAges[selectedSection]) {
            const [minAge, maxAge] = sectionAges[selectedSection];
            if (actualAge < minAge || actualAge > maxAge) {
                isValid = false;
                sectionInput.style.borderColor = '#ed3f23';
                alert(`The selected section is not appropriate for the child's age (${actualAge} years). Please select the correct section.`);
            }
        }
    }
    
    if (!isValid) {
        return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Update rate limiting
        lastSubmissionTime = Date.now();
        
        // Hide form and show success message
        membershipForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Log form data (in real implementation, this would be sent to membership@28thodiham.org.uk)
        console.log('Membership Application Submitted:', formObject);
        console.log('Form should be sent to: membership@28thodiham.org.uk');
        
        // In a real implementation, you would send this data to your server
        // Example:
        // fetch('/api/membership-application', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formObject)
        // });
        
    }, 2000);
});

// Gallery lightbox functionality
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('.gallery-image');
        const overlay = item.querySelector('.gallery-overlay');
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${img.alt}" class="lightbox-image">
                <div class="lightbox-caption">
                    <h4>${overlay.querySelector('h4').textContent}</h4>
                    <p>${overlay.querySelector('p').textContent}</p>
                </div>
            </div>
        `;
        
        // Add lightbox styles
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const lightboxContent = lightbox.querySelector('.lightbox-content');
        lightboxContent.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            text-align: center;
        `;
        
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        lightboxImage.style.cssText = `
            max-width: 100%;
            max-height: 70vh;
            border-radius: 10px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        `;
        
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        lightboxClose.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            background: none;
            border: none;
            padding: 10px;
        `;
        
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        lightboxCaption.style.cssText = `
            color: white;
            margin-top: 1rem;
            padding: 1rem;
        `;
        
        document.body.appendChild(lightbox);
        
        // Fade in
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
        
        // Close lightbox
        const closeLightbox = () => {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        };
        
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Close on escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    });
});

// Intersection Observer for animations
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

// Observe elements for animation
document.querySelectorAll('.section-card, .activity-card, .gallery-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Age calculator for section recommendation
const dobInput = document.getElementById('child-dob');
const sectionSelect = document.getElementById('preferred-section');

if (dobInput && sectionSelect) {
    dobInput.addEventListener('change', function() {
        if (this.value) {
            const birthDate = new Date(this.value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            let actualAge = age;
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                actualAge--;
            }
            
            // Recommend section based on age
            let recommendedSection = '';
            if (actualAge >= 4 && actualAge < 6) {
                recommendedSection = 'squirrels';
            } else if (actualAge >= 6 && actualAge < 8) {
                recommendedSection = 'beavers';
            } else if (actualAge >= 8 && actualAge <= 10) {
                recommendedSection = 'cubs';
            } else if (actualAge > 10 && actualAge <= 14) {
                recommendedSection = 'scouts';
            }
            
            if (recommendedSection) {
                sectionSelect.value = recommendedSection;
                sectionSelect.style.borderColor = '#23a950';
            }
        }
    });
}

// Form field validation feedback
const formInputs = document.querySelectorAll('#membership-form input, #membership-form select, #membership-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#ed3f23';
        } else {
            this.style.borderColor = '#ddd';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(237, 63, 35)') {
            this.style.borderColor = '#ddd';
        }
    });
});

// Email validation
const emailInput = document.getElementById('parent-email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
            this.style.borderColor = '#ed3f23';
        } else if (this.value) {
            this.style.borderColor = '#23a950';
        }
    });
}

// Phone number formatting (UK format)
const phoneInput = document.getElementById('parent-phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        // Remove all non-digits
        let value = this.value.replace(/\D/g, '');
        
        // Format as UK phone number
        if (value.length > 0) {
            if (value.startsWith('44')) {
                // International format
                value = '+' + value.substring(0, 2) + ' ' + value.substring(2);
            } else if (value.startsWith('0')) {
                // National format
                if (value.length > 5) {
                    value = value.substring(0, 5) + ' ' + value.substring(5);
                }
            }
        }
        
        this.value = value;
    });
}

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--scout-purple);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.background = '#ffe627';
    scrollToTopBtn.style.color = '#7413dc';
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.background = '#7413dc';
    scrollToTopBtn.style.color = 'white';
    scrollToTopBtn.style.transform = 'scale(1)';
});

// Loading screen (optional)
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Console message for developers
console.log(`
🏕️ Welcome to 28th Odiham Scouts Website!
🎯 Built with modern web technologies
🌟 Skills for Life • Adventure • Friendship

For technical inquiries about this website, please contact the web development team.
`);