/**
 * Kingsley Mmadubugwu - Portfolio Website
 * Network Engineer & System Administrator
 * Features: Particles.js, AOS animations, Formspree contact, smooth scrolling, back to top
 */

// Wait for everything to load
window.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio initialized - Starting all features');
    
    // ========== INITIALIZE AOS (Animate on Scroll) ==========
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            disable: false
        });
        console.log('AOS animations initialized');
    } else {
        console.error('AOS library not loaded - Check CDN connection');
    }
    
    // ========== INITIALIZE PARTICLES.JS BACKGROUND ==========
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: { 
                    value: 80, 
                    density: { 
                        enable: true, 
                        value_area: 800 
                    } 
                },
                color: { value: "#38bdf8" },
                shape: { type: "circle" },
                opacity: { 
                    value: 0.5, 
                    random: false 
                },
                size: { 
                    value: 3, 
                    random: true 
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#38bdf8",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out"
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { 
                        enable: true, 
                        mode: "repulse" 
                    },
                    onclick: { 
                        enable: true, 
                        mode: "push" 
                    }
                }
            }
        });
        console.log('Particles.js background initialized');
    } else {
        console.error('Particles.js not loaded - Applying fallback background');
        const particlesElement = document.getElementById('particles-js');
        if (particlesElement) {
            particlesElement.style.background = 'linear-gradient(135deg, #020617, #0f172a)';
        }
    }
    
    // ========== SMOOTH SCROLLING FOR NAVIGATION ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // ========== ACTIVE SECTION HIGHLIGHTING (IMPROVED) ==========
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function updateActiveSection() {
        let current = '';
        const scrollPosition = window.scrollY + 100; // Lower offset for better accuracy
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Set initial active state
    
    // ========== BACK TO TOP BUTTON ==========
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        // Scroll to top when clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========== MOBILE HAMBURGER MENU ==========
    const hamburger = document.querySelector('.hamburger');
    const navLinksMenu = document.querySelector('.nav-links');
    
    if (hamburger && navLinksMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinksMenu.classList.toggle('active');
        });
    } else {
        console.warn('Mobile menu elements not found');
    }
    
    // ========== CONTACT FORM HANDLING WITH FORMSPREE ==========
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get and validate form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation checks
            if (!name || !email || !message) {
                showFormStatus('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormStatus('Please enter a valid email address', 'error');
                return;
            }
            
            // Disable submit button and show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Create FormData object and send to Formspree
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success
                    showFormStatus('Message sent successfully! I will get back to you soon.', 'success');
                    contactForm.reset();
                    
                    // Clear success message after 5 seconds
                    setTimeout(() => {
                        if (formStatus) {
                            formStatus.style.display = 'none';
                        }
                    }, 5000);
                } else {
                    // Server error
                    const data = await response.json();
                    if (data.errors) {
                        showFormStatus(data.errors.map(error => error.message).join(', '), 'error');
                    } else {
                        showFormStatus('Something went wrong. Please try again.', 'error');
                    }
                }
            } catch (error) {
                // Network error
                console.error('Form submission error:', error);
                showFormStatus('Network error. Please check your connection and try again.', 'error');
            } finally {
                // Re-enable submit button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Clear error message after 5 seconds
                setTimeout(() => {
                    if (formStatus && formStatus.style.background.includes('rgba(239, 68, 68)')) {
                        formStatus.style.display = 'none';
                    }
                }, 5000);
            }
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Form status message display
    function showFormStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.style.display = 'block';
            formStatus.style.background = type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)';
            formStatus.style.color = type === 'success' ? '#4ade80' : '#f87171';
            formStatus.style.border = `1px solid ${type === 'success' ? '#4ade80' : '#f87171'}`;
            formStatus.style.padding = '10px';
            formStatus.style.borderRadius = '8px';
            formStatus.style.textAlign = 'center';
        }
    }
    
    // ========== STATS COUNTER ANIMATION ==========
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.stat h3');
                stats.forEach(stat => {
                    const finalValue = parseInt(stat.textContent);
                    if (!isNaN(finalValue) && !stat.hasAttribute('data-counted')) {
                        animateValue(stat, 0, finalValue, 1000);
                        stat.setAttribute('data-counted', 'true');
                    }
                });
            }
        });
    }, observerOptions);
    
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
    
    // Number counter animation
    function animateValue(element, start, end, duration) {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current + '+';
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = end + '+';
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // ========== TYPING EFFECT FOR HERO SUBTITLE ==========
    const heroText = document.querySelector('.hero-text h2');
    if (heroText && !heroText.hasAttribute('data-typed')) {
        const originalText = heroText.textContent;
        heroText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                heroText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        heroText.setAttribute('data-typed', 'true');
        typeWriter();
    }
    
    // ========== PARALLAX EFFECT FOR HERO IMAGE ==========
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
    
    console.log('All features initialized successfully');
});

// ========== GLOBAL ERROR HANDLING ==========
window.addEventListener('error', function(e) {
    console.error('Global error caught:', e.message);
});