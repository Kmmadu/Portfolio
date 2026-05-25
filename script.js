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
    
    // ========== CASE STUDIES MODAL ==========
    const modal = document.getElementById('caseModal');
    
    // Make openCaseModal available globally for HTML onclick
    window.openCaseModal = function(caseId) {
        const modalBody = document.getElementById('modal-body');
        const caseData = getCaseData(caseId);
        
        if (modalBody && caseData) {
            modalBody.innerHTML = `
                <div class="modal-breakdown">
                    <h2 style="color: var(--accent); margin-bottom: 1rem;">${caseData.title}</h2>
                    <div class="case-badge ${caseData.statusClass}" style="margin-bottom: 1rem; display: inline-block;">${caseData.status}</div>
                    
                    <h3>Technical Breakdown</h3>
                    <p>${caseData.breakdown}</p>
                    
                    <h3>Step-by-Step Resolution</h3>
                    <ul>
                        ${caseData.steps.map(step => `<li>${step}</li>`).join('')}
                    </ul>
                    
                    <h3>Tools & Commands Used</h3>
                    <ul>
                        ${caseData.tools.map(tool => `<li><code style="background: var(--bg-primary); padding: 2px 6px; border-radius: 4px;">${tool}</code></li>`).join('')}
                    </ul>
                    
                    <h3>Preventive Measures</h3>
                    <p>${caseData.prevention}</p>
                    
                    <div style="margin-top: 2rem; padding: 1rem; background: var(--bg-primary); border-radius: 8px; border-left: 3px solid var(--accent);">
                        <strong style="color: var(--accent);">Key Takeaway:</strong>
                        <p style="margin-top: 0.5rem;">${caseData.takeaway}</p>
                    </div>
                    
                    <div style="margin-top: 1.5rem; text-align: center;">
                        <p style="color: var(--text-secondary); font-size: 0.8rem;">Video demonstration is currently being recorded. Check back soon!</p>
                    </div>
                </div>
            `;
        }
        
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };
    
    // Make closeCaseModal available globally
    window.closeCaseModal = function() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target === modal) {
            closeCaseModal();
        }
    };
    
    // Escape key to close modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.style.display === 'block') {
            closeCaseModal();
        }
    });
    
    // Case data for modal content
    function getCaseData(caseId) {
        const cases = {
            case1: {
                title: "DNS Resolution Failure After Server Migration",
                status: "Resolved",
                statusClass: "resolved",
                breakdown: "Post-server migration, internal clients couldn't resolve domain-joined resources. External websites resolved correctly, indicating internet DNS was functional.",
                steps: [
                    "Verified DNS server roles were still active",
                    "Checked forwarders for external resolution",
                    "Reviewed event logs for zone errors",
                    "Discovered missing reverse lookup zones after IP scheme change",
                    "Recreated reverse zones with correct IP ranges",
                    "Updated DHCP scope options and forced renew"
                ],
                tools: ["dnscmd /ZoneUpdateFromDs", "nslookup", "Event Viewer", "DHCP Console"],
                prevention: "Created migration checklist including reverse zone verification before IP scheme changes.",
                takeaway: "Reverse lookup zones are often forgotten but critical for domain-joined resource resolution."
            },
            case2: {
                title: "Radio Link Intermittent Connectivity",
                status: "Resolved",
                statusClass: "resolved",
                breakdown: "Site-to-site radio link experienced intermittent packet loss (15-30%) during peak afternoon hours, affecting VoIP calls and file transfers.",
                steps: [
                    "Logged into MikroTik WinBox to review radio statistics",
                    "Analyzed signal strength and noise floor levels",
                    "Used spectrum analyzer to identify interference on 5GHz",
                    "Changed frequency channel to less congested option",
                    "Adjusted antenna alignment for optimal SNR (25+ dB)",
                    "Implemented automatic channel hopping script"
                ],
                tools: ["MikroTik WinBox", "The Dude", "Spectrum Analyzer", "SNR Meter"],
                prevention: "Monthly spectrum analysis schedule and automated channel selection based on interference detection.",
                takeaway: "Wireless troubleshooting requires understanding of interference patterns - signal strength alone isn't enough."
            },
            case3: {
                title: "PoE Camera Power Failure Tracing",
                status: "Resolved",
                statusClass: "resolved",
                breakdown: "Security camera failed after maintenance work. Other cameras on same switch worked normally.",
                steps: [
                    "Tested switch port voltage with PoE tester (48V present)",
                    "Used tone generator to trace cable path through ceiling",
                    "Found rodent damage causing intermittent short",
                    "Spliced damaged section with waterproof connectors",
                    "Tested continuity and power delivery",
                    "Installed conduit protection for vulnerable sections"
                ],
                tools: ["PoE Tester", "Cable Tone Generator", "Multimeter", "Crimping Tool"],
                prevention: "Installed physical conduit protection in ceiling spaces and scheduled quarterly cable inspections.",
                takeaway: "Physical layer issues require proper diagnostic tools - never assume the problem is at the switch."
            },
            case4: {
                title: "Complete Office Network Outage Resolved Through VLAN Reconfiguration",
                status: "Resolved",
                statusClass: "resolved",
                breakdown: "A client reported a complete internet outage across their office network. Initial checks confirmed physical connectivity, but users were unable to access online services.",
                steps: [
                    "Traced PoE cable path from router to wireless radio",
                    "Performed direct laptop connection tests to isolate failure point",
                    "Logged into MikroTik router using WinBox",
                    "Audited configuration - found all VLAN assignments cleared from main bridge",
                    "Reconfigured VLAN settings through WinBox",
                    "Verified successful internet connectivity across client environment"
                ],
                tools: ["WinBox", "Laptop Diagnostics", "VLAN Configuration", "PoE Tester"],
                prevention: "Implement configuration backup schedule and surge protection for network equipment.",
                takeaway: "Always verify VLAN assignments on bridge interfaces after power events - they can reset unexpectedly."
            },
            case5: {
                title: "Router Connectivity Diagnosis for Remote Site",
                status: "Investigation",
                statusClass: "investigation",
                breakdown: "Remote site router lost connectivity after firmware update. Site unreachable for remote management, requiring on-site diagnosis.",
                steps: [
                    "Accessed via serial console cable",
                    "Reviewed boot logs for error messages",
                    "Identified missing NAT configuration",
                    "Found default route missing post-update",
                    "Rolled back to previous firmware version",
                    "Restored from backup configuration",
                    "Developing staged upgrade process"
                ],
                tools: ["Console Cable", "RouterOS CLI", "Configuration Backup", "WinBox"],
                prevention: "Implement staged firmware upgrade process with pre-upgrade validation checks.",
                takeaway: "Always have backup configurations and rollback plans before any firmware update."
            },
            case6: {
                title: "Network Monitoring Alert Storm Analysis",
                status: "In Progress",
                statusClass: "in-progress",
                breakdown: "Monitoring system generated 500+ false positive alerts daily, causing alert fatigue and missed critical incidents.",
                steps: [
                    "Exported all alert data for pattern analysis",
                    "Identified overlapping monitoring intervals",
                    "Reviewed threshold configurations against baseline",
                    "Implemented deduplication logic in Python",
                    "Created maintenance window suppression rules",
                    "Testing new configuration before full rollout"
                ],
                tools: ["The Dude", "Python", "InfluxDB", "Grafana"],
                prevention: "Establish baseline metrics before setting thresholds; implement change management for monitoring config.",
                takeaway: "Alert fatigue is dangerous - quality over quantity in monitoring alerts is essential."
            }
        };
        
        return cases[caseId];
    }
    
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