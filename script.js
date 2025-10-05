// Modern Portfolio JavaScript for Kanish U

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
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
    document.querySelectorAll('.skill-category, .experience-card, .project-card, .timeline-card, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Initialize EmailJS (loaded via CDN in index.html)
    if (window.emailjs) {
        try {
            emailjs.init({ publicKey: '4iXzW_H6vIuaKk7Xc' });
        } catch (err) {
            console.warn('EmailJS init failed:', err);
        }
    } else {
        console.warn('EmailJS SDK not loaded');
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            if (!window.emailjs) {
                alert('Email service unavailable. Please try again later.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                return;
            }
            
            emailjs.sendForm('service_nvv1igr', 'template_4t7kwe8', this)
                .then(() => {
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.background = '#10b981';
                    
                    // Reset form
                    this.reset();
                    
                    // Reset button after delay
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 3000);
                })
                .catch((error) => {
                    console.error('EmailJS error:', error);
                    alert('Failed to send message. Please try again.');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Add click animations to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Smooth section transitions without parallax collision
    let ticking = false;
    
    function updateScroll() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const about = document.querySelector('.about');
        
        // Add subtle opacity change instead of transform
        if (hero && scrolled > 100) {
            hero.style.opacity = Math.max(0.3, 1 - (scrolled / window.innerHeight));
        }
        
        // Ensure about section is properly positioned
        if (about) {
            about.style.position = 'relative';
            about.style.zIndex = '3';
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    });

    // Typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML = text.slice(0, i + 1);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Add hover effects to skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Add floating animation to cards
    document.querySelectorAll('.floating-card').forEach((card, index) => {
        const delay = index * 2000;
        card.style.animationDelay = `${delay}ms`;
    });

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxScroll) * 100;
        progressBar.style.width = progress + '%';
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Create floating background particles
    function createFloatingParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 20 + 10}s linear infinite;
            `;
            particlesContainer.appendChild(particle);
        }
        
        document.body.appendChild(particlesContainer);
    }
    
    // Add particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
    
    // Initialize particles
    createFloatingParticles();
    
    // Add mouse interaction effect
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create trail effect
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            left: ${mouseX}px;
            top: ${mouseY}px;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: fadeOut 1s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 1000);
    });
    
    // Add fadeOut animation for mouse trail
    const trailStyle = document.createElement('style');
    trailStyle.textContent = `
        @keyframes fadeOut {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0);
            }
        }
    `;
    document.head.appendChild(trailStyle);
    
    console.log('🚀 Kanish Portfolio Loaded Successfully!');
});

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

// Add performance optimization for scroll events
const optimizedScrollHandler = debounce(() => {
    // Additional scroll-based functionality can be added here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);
