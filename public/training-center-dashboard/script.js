// Training Center Dashboard JavaScript

// Banner Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

// Auto-play timer
let autoplayTimer;

function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlide = index;
}

function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    showSlide(next);
    resetAutoplay();
}

function previousSlide() {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prev);
    resetAutoplay();
}

function goToSlide(index) {
    showSlide(index);
    resetAutoplay();
}

function startAutoplay() {
    autoplayTimer = setInterval(() => {
        nextSlide();
    }, 5000);
}

function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
}

// Initialize banner
document.addEventListener('DOMContentLoaded', function() {
    // Set up initial state
    showSlide(0);
    startAutoplay();
    
    // Initialize circular progress animations
    initializeProgressRings();
    
    // Add hover effects to cards
    addCardHoverEffects();
});

// Circular Progress Ring Animation
function initializeProgressRings() {
    const progressRings = document.querySelectorAll('.circular-progress');
    
    progressRings.forEach(ring => {
        const progress = parseInt(ring.getAttribute('data-progress'));
        const circle = ring.querySelector('.progress-ring-bar');
        
        if (circle) {
            const radius = 26; // From the SVG circle r attribute
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (progress / 100) * circumference;
            
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = offset;
            
            // Set color based on progress
            if (progress >= 80) {
                circle.style.stroke = '#059669'; // emerald-600
            } else if (progress >= 50) {
                circle.style.stroke = '#f59e0b'; // amber-500
            } else {
                circle.style.stroke = '#ef4444'; // red-500
            }
        }
    });
    
    // TV Courses progress rings
    const tvProgressRings = document.querySelectorAll('.tv-circular-progress');
    
    tvProgressRings.forEach(ring => {
        const progress = parseInt(ring.getAttribute('data-progress'));
        const circle = ring.querySelector('.progress-bar');
        
        if (circle) {
            const radius = 28; // From the SVG circle r attribute
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (progress / 100) * circumference;
            
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = offset;
            
            // Set color based on progress
            if (progress >= 80) {
                circle.style.stroke = '#059669'; // emerald-600
            } else if (progress >= 50) {
                circle.style.stroke = '#f59e0b'; // amber-500
            } else {
                circle.style.stroke = '#ef4444'; // red-500
            }
        }
    });
}

// Card hover effects
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.program-card, .tv-course-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Smooth scrolling for navigation
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card, .program-card, .tv-course-card');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Responsive table handling
function handleResponsiveTable() {
    const table = document.querySelector('.courses-table');
    const container = document.querySelector('.table-container');
    
    if (table && container) {
        const checkWidth = () => {
            if (window.innerWidth < 768) {
                container.style.overflowX = 'auto';
            } else {
                container.style.overflowX = 'visible';
            }
        };
        
        checkWidth();
        window.addEventListener('resize', checkWidth);
    }
}

// Progress bar color updates
function updateProgressColors() {
    const progressBadges = document.querySelectorAll('.progress-badge');
    
    progressBadges.forEach(badge => {
        const progress = parseInt(badge.textContent);
        
        if (progress >= 80) {
            badge.style.background = 'rgba(16, 185, 129, 0.9)';
        } else if (progress >= 50) {
            badge.style.background = 'rgba(245, 158, 11, 0.9)';
        } else {
            badge.style.background = 'rgba(239, 68, 68, 0.9)';
        }
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    handleResponsiveTable();
    updateProgressColors();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Performance optimization - debounce resize events
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

// Debounced resize handler
const debouncedResize = debounce(() => {
    handleResponsiveTable();
}, 250);

window.addEventListener('resize', debouncedResize);

// Export functions for external use
window.TrainingDashboard = {
    nextSlide,
    previousSlide,
    goToSlide,
    smoothScrollTo
};