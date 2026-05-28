/**
 * Kingsley Mmadubugwu - Portfolio Website
 * Network Engineer & System Administrator
 * Features: Particles.js, AOS animations, YouTube modal, Formspree contact, smooth scrolling, back to top
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
    
    // ========== YOUTUBE MODAL INTEGRATION ==========
    const youtubeModal = document.getElementById('youtubeModal');
    const youtubeIframe = document.getElementById('youtubeIframe');
    const modalClose = document.querySelector('.youtube-modal .modal-close');
    
    // Open video modal function - FIXED: Using youtube-nocookie.com to prevent Error 153
    window.openVideoModal = function(videoId) {
        if (youtubeIframe && youtubeModal) {
            // Use youtube-nocookie.com instead of youtube.com to avoid referrer blocking
            youtubeIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
            youtubeModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };
    
    // Close video modal function
    window.closeVideoModal = function() {
        if (youtubeIframe && youtubeModal) {
            youtubeIframe.src = '';
            youtubeModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
    
    // Add click handlers to all video demo buttons and thumbnails
    document.querySelectorAll('.video-demo-btn, .youtube-thumbnail').forEach(element => {
        element.addEventListener('click', function(e) {
            e.stopPropagation();
            const videoId = this.getAttribute('data-video-id');
            if (videoId) {
                openVideoModal(videoId);
            }
        });
    });
    
    // Close modal when clicking close button
    if (modalClose) {
        modalClose.addEventListener('click', closeVideoModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === youtubeModal) {
            closeVideoModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && youtubeModal && youtubeModal.style.display === 'block') {
            closeVideoModal();
        }
    });
    
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
    
    // ========== ACTIVE SECTION HIGHLIGHTING ==========
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function updateActiveSection() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
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
    updateActiveSection();
    
    // ========== BACK TO TOP BUTTON ==========
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
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
    
    // ========== CASE STUDIES FILTERING ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    const caseCards = document.querySelectorAll('.case-card');
    
    if (filterButtons.length > 0 && caseCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                caseCards.forEach(card => {
                    const categories = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Add fadeIn animation for filtered cards
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    // ========== CONTACT FORM HANDLING WITH FORMSPREE ==========
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showFormStatus('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormStatus('Please enter a valid email address', 'error');
                return;
            }
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showFormStatus('Message sent successfully! I will get back to you soon.', 'success');
                    contactForm.reset();
                    
                    setTimeout(() => {
                        if (formStatus) {
                            formStatus.style.display = 'none';
                        }
                    }, 5000);
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        showFormStatus(data.errors.map(error => error.message).join(', '), 'error');
                    } else {
                        showFormStatus('Something went wrong. Please try again.', 'error');
                    }
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showFormStatus('Network error. Please check your connection and try again.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    if (formStatus && formStatus.style.background.includes('rgba(239, 68, 68)')) {
                        formStatus.style.display = 'none';
                    }
                }, 5000);
            }
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
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

// ========== PRELOADER / SPLASH SCREEN ==========
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Add a minimum display time of 1.5 seconds for better UX
        setTimeout(function() {
            preloader.classList.add('hide');
            // Remove from DOM after animation completes
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    }
});

// ========== GLOBAL ERROR HANDLING ==========
window.addEventListener('error', function(e) {
    console.error('Global error caught:', e.message);
});