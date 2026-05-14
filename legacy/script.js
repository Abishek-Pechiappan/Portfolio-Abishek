// ========================================
// Portfolio Website - Interactive Scripts
// ========================================

// Check if GSAP is loaded
if (typeof gsap === 'undefined') {
    console.error('GSAP not loaded! Animations may not work.');
}

// Security Boot Sequence Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingBarFill = document.getElementById('loadingBarFill');
    const loadingPercent = document.getElementById('loadingPercent');
    
    // Simulate loading progress with boot sequence
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5; // Slightly faster progress
        if (progress > 100) progress = 100;
        
        if (loadingBarFill) {
            loadingBarFill.style.width = progress + '%';
        }
        
        if (loadingPercent) {
            loadingPercent.textContent = Math.floor(progress) + '%';
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('loaded');
                document.body.classList.add('loaded');
            }, 500);
        }
    }, 150);
});

// Scroll Progress Indicator with Terminal Percentage
let lastMilestone = 0;
const milestones = [25, 50, 75, 100];

window.addEventListener('scroll', () => {
    const scrollPercentage = document.getElementById('scrollPercentage');
    const percentValue = document.getElementById('percentValue');
    
    if (!scrollPercentage || !percentValue) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Update percentage text
    percentValue.textContent = Math.round(scrollPercent);
    
    // Trigger glitch effect at milestones
    const currentMilestone = milestones.find(m => 
        scrollPercent >= m && lastMilestone < m
    );
    
    if (currentMilestone) {
        scrollPercentage.classList.add('milestone-glitch');
        lastMilestone = currentMilestone;
        
        // Remove glitch class after animation
        setTimeout(() => {
            scrollPercentage.classList.remove('milestone-glitch');
        }, 500);
    }
    
    // Reset milestone tracker when scrolling back up
    if (scrollPercent < 25) {
        lastMilestone = 0;
    }
});

// Smooth Scroll Reveal Animations
const initSmoothScrollReveal = () => {
    const revealElements = document.querySelectorAll(
        '.section-header, .about-content, .about-image-wrapper, ' +
        '.project-card, .skill-card, .contact-form, .contact-info, ' +
        '.hero-content, .stat-item'
    );

    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        el.classList.add('fade-in');
        revealObserver.observe(el);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrollReveal();
    initNavigation();
    initMagneticButtons();
    initSpotlightCards();
    initScrollAnimations();
    initTypingEffect();
    initNameTyping();
    initDecryptedText();
    initFormHandling();
    initModulesCarousel();
    initProfileTilt();
    initCircuitCanvas();
    initNetworkGraph();
});

// ========================================
// Smooth Navigation
// ========================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const ease = 'power3.out';

    // Setup pill animations for each nav link
    const tlRefs = [];
    const activeTweenRefs = [];

    const layoutPills = () => {
        navLinks.forEach((link, index) => {
            const circle = link.querySelector('.hover-circle');
            if (!circle) return;

            const rect = link.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;

            // Calculate circle dimensions for pill effect
            const R = ((w * w) / 4 + h * h) / (2 * h);
            const D = Math.ceil(2 * R) + 2;
            const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
            const originY = D - delta;

            circle.style.width = `${D}px`;
            circle.style.height = `${D}px`;
            circle.style.bottom = `-${delta}px`;

            gsap.set(circle, {
                xPercent: -50,
                scale: 0,
                transformOrigin: `50% ${originY}px`
            });

            const label = link.querySelector('.pill-label');
            const labelHover = link.querySelector('.pill-label-hover');

            if (label) gsap.set(label, { y: 0 });
            if (labelHover) {
                gsap.set(labelHover, { y: h + 12, opacity: 0 });
            }

            // Kill existing timeline
            if (tlRefs[index]) tlRefs[index].kill();

            // Create hover animation timeline
            const tl = gsap.timeline({ paused: true });

            tl.to(circle, {
                scale: 1.2,
                xPercent: -50,
                duration: 0.6,
                ease: ease
            }, 0);

            if (label) {
                tl.to(label, {
                    y: -(h + 8),
                    duration: 0.6,
                    ease: ease
                }, 0);
            }

            if (labelHover) {
                gsap.set(labelHover, { y: Math.ceil(h + 100), opacity: 0 });
                tl.to(labelHover, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: ease
                }, 0);
            }

            tlRefs[index] = tl;
        });
    };

    // Initial layout
    if (typeof gsap !== 'undefined') {
        layoutPills();
        window.addEventListener('resize', layoutPills);
    }

    // Hover animations
    navLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', () => {
            if (!tlRefs[index]) return;
            if (activeTweenRefs[index]) activeTweenRefs[index].kill();
            activeTweenRefs[index] = tlRefs[index].tweenTo(tlRefs[index].duration(), {
                duration: 0.3,
                ease: ease
            });
        });

        link.addEventListener('mouseleave', () => {
            if (!tlRefs[index]) return;
            if (activeTweenRefs[index]) activeTweenRefs[index].kill();
            activeTweenRefs[index] = tlRefs[index].tweenTo(0, {
                duration: 0.2,
                ease: ease
            });
        });
    });

    // Smooth scroll on click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Update active nav on scroll
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.id) observer.observe(section);
    });

    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.transform = 'translateX(-50%) translateY(0)';
        } else {
            navbar.style.transform = 'translateX(-50%)';
        }
    });
}

// ========================================
// Magnetic Button Effect
// ========================================
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

// ========================================
// Spotlight Card Effect
// ========================================
function initSpotlightCards() {
    const cards = document.querySelectorAll('.spotlight-card, .project-card, .bento-card, .skill-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.section-header, .about-content, .about-image-wrapper, ' +
        '.project-card, .bento-card, .contact-form, .contact-info, ' +
        '.info-card'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Name Decryption Effect
// ========================================
function initNameTyping() {
    const nameElement = document.getElementById('decryptedName');
    if (!nameElement) return;

    const originalText = 'Abishek Pechiappan';
    const speed = 50;
    const maxIterations = 15;
    const sequential = true;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';
    
    let interval = null;
    let iteration = 0;
    let revealedIndices = new Set();
    let hasAnimated = false;

    const availableChars = characters.split('');

    const shuffleText = (text, revealed) => {
        return text.split('').map((char, i) => {
            if (char === ' ') return ' ';
            if (revealed.has(i)) return text[i];
            return availableChars[Math.floor(Math.random() * availableChars.length)];
        }).join('');
    };

    const startDecryption = () => {
        iteration = 0;
        revealedIndices.clear();
        
        interval = setInterval(() => {
            // Sequential reveal from start
            if (revealedIndices.size < originalText.length) {
                revealedIndices.add(revealedIndices.size);
            }

            nameElement.textContent = shuffleText(originalText, revealedIndices);
            iteration++;

            if (iteration >= maxIterations || revealedIndices.size >= originalText.length) {
                clearInterval(interval);
                nameElement.textContent = originalText;
            }
        }, speed);
    };

    // Auto-start on view (IntersectionObserver)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                setTimeout(() => startDecryption(), 500);
                hasAnimated = true;
                observer.unobserve(nameElement);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(nameElement);

    // Re-animate on hover
    nameElement.addEventListener('mouseenter', () => {
        if (interval) clearInterval(interval);
        startDecryption();
    });
}

// Apply Decryption Effect to All Elements
// ========================================
function initDecryptedText() {
    const elements = document.querySelectorAll('.decrypted-text');
    const speed = 70;
    const maxIterations = 20;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+0123456789';
    const availableChars = characters.split('');

    elements.forEach(element => {
        const originalHTML = element.innerHTML;
        const originalText = element.textContent;
        let interval = null;
        let hasAnimated = false;

        const shuffleText = (text, revealed) => {
            return text.split('').map((char, i) => {
                if (char === ' ' || char === '\n') return char;
                if (revealed.has(i)) return text[i];
                return availableChars[Math.floor(Math.random() * availableChars.length)];
            }).join('');
        };

        const startDecryption = () => {
            let iteration = 0;
            const revealedIndices = new Set();
            
            interval = setInterval(() => {
                if (revealedIndices.size < originalText.length) {
                    revealedIndices.add(revealedIndices.size);
                }

                element.textContent = shuffleText(originalText, revealedIndices);
                iteration++;

                if (iteration >= maxIterations || revealedIndices.size >= originalText.length) {
                    clearInterval(interval);
                    element.innerHTML = originalHTML;
                }
            }, speed);
        };

        // Auto-start on view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    setTimeout(() => startDecryption(), 300);
                    hasAnimated = true;
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(element);

        // Re-animate on hover
        element.addEventListener('mouseenter', () => {
            if (interval) clearInterval(interval);
            startDecryption();
        });
    });
}

// ========================================
// Typing Effect
// ========================================
// Security Roles Typing Effect
// ========================================
function initTypingEffect() {
    const typingElement = document.getElementById('typingRoles');
    if (!typingElement) return;

    const roles = [
        'Security Researcher',
        'Threat Analyst',
        'Penetration Tester',
        'Cyber Defense Specialist',
        'Security Enthusiast'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing after initial animation
    setTimeout(type, 2000);
}

// ========================================
// Form Handling - Formspree with Security
// ========================================
function initFormHandling() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Sanitize input to prevent XSS
    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }

    // Validate inputs before submission
    function validateForm() {
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();
        const honeypot = form.querySelector('[name="_honey"]').value;

        // Honeypot check (bot detection)
        if (honeypot) {
            console.warn('Bot detected');
            return false;
        }

        // Name validation (2-50 chars, letters and spaces only)
        if (!/^[A-Za-z\s]{2,50}$/.test(name)) {
            alert('Name must be 2-50 characters and contain only letters and spaces');
            return false;
        }

        // Email validation
        if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) {
            alert('Please enter a valid email address');
            return false;
        }

        // Message validation (10-1000 chars)
        if (message.length < 10 || message.length > 1000) {
            alert('Message must be between 10 and 1000 characters');
            return false;
        }

        // Check for suspicious patterns (SQL injection attempts, script tags, etc.)
        const suspiciousPatterns = [
            /<script/i,
            /javascript:/i,
            /on\w+\s*=/i,
            /SELECT.*FROM/i,
            /INSERT.*INTO/i,
            /DELETE.*FROM/i,
            /DROP.*TABLE/i,
            /UNION.*SELECT/i,
            /<iframe/i,
            /<embed/i,
            /<object/i
        ];

        const allInputs = name + email + message + (form.querySelector('#subject')?.value || '');
        for (const pattern of suspiciousPatterns) {
            if (pattern.test(allInputs)) {
                alert('Your message contains invalid content. Please remove any HTML or special characters.');
                return false;
            }
        }

        return true;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Sanitize all inputs
        const sanitizedData = new FormData();
        const formData = new FormData(form);
        
        for (const [key, value] of formData.entries()) {
            if (key !== '_honey') { // Don't sanitize honeypot
                sanitizedData.append(key, sanitizeInput(value.toString()));
            } else {
                sanitizedData.append(key, value);
            }
        }

        // Show loading state
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg class="spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
            </svg>
        `;
        submitBtn.disabled = true;

        // Rate limiting check (prevent spam)
        const lastSubmit = localStorage.getItem('lastFormSubmit');
        const now = Date.now();
        if (lastSubmit && (now - parseInt(lastSubmit)) < 60000) { // 1 minute cooldown
            alert('Please wait a moment before submitting another message.');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            return;
        }

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: sanitizedData,
                headers: { 
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                submitBtn.innerHTML = `
                    <span>Message Sent!</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6L9 17l-5-5"/>
                    </svg>
                `;
                submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
                form.reset();
                
                // Set last submit time
                localStorage.setItem('lastFormSubmit', now.toString());
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            submitBtn.innerHTML = `
                <span>Failed to Send</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        }

        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });

    // Add CSS for loading animation
    const style = document.createElement('style');
    style.textContent = `
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;
    if (!document.querySelector('style[data-form-styles]')) {
        style.setAttribute('data-form-styles', '');
        document.head.appendChild(style);
    }
}

// ========================================
// Parallax Effect for Aurora
// ========================================
document.addEventListener('mousemove', (e) => {
    const auroraGradients = document.querySelectorAll('.aurora-gradient');
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;

    auroraGradients.forEach((gradient, index) => {
        const speed = (index + 1) * 0.5;
        gradient.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// ========================================
// Smooth Scroll Polyfill Check
// ========================================
if (!('scrollBehavior' in document.documentElement.style)) {
    // Fallback for browsers that don't support smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Card Swap Animation (GSAP)
// ========================================
// ========================================
// Security Modules Carousel - Infinite Smooth Scroll
// ========================================
function initModulesCarousel() {
    const grid = document.getElementById('modulesGrid');
    const indicators = document.querySelectorAll('.scroll-dot');
    
    if (!grid) {
        console.warn('Modules carousel element not found');
        return;
    }
    
    const modules = grid.querySelectorAll('.security-module');
    const totalModules = modules.length / 2; // We have duplicates
    const moduleWidth = 420; // Module width + gap
    let scrollSpeed = 1; // Pixels per frame
    let isScrolling = true;
    let animationFrame;
    
    // Update active indicator based on scroll position
    function updateIndicators() {
        const scrollPercentage = (grid.scrollLeft % (moduleWidth * totalModules)) / (moduleWidth * totalModules);
        const activeIndex = Math.floor(scrollPercentage * 3) % 3;
        
        indicators.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }
    
    // Smooth continuous scroll
    function smoothScroll() {
        if (!isScrolling) {
            animationFrame = requestAnimationFrame(smoothScroll);
            return;
        }
        
        grid.scrollLeft += scrollSpeed;
        
        // Reset to start when reaching halfway (where duplicates begin)
        const maxScroll = moduleWidth * totalModules;
        if (grid.scrollLeft >= maxScroll) {
            grid.scrollLeft = 0;
        }
        
        updateIndicators();
        animationFrame = requestAnimationFrame(smoothScroll);
    }
    
    // Start smooth scrolling
    smoothScroll();
    
    // Pause on hover
    grid.addEventListener('mouseenter', () => {
        isScrolling = false;
    });
    
    // Resume on mouse leave
    grid.addEventListener('mouseleave', () => {
        isScrolling = true;
    });
    
    // Click indicators to jump to section
    indicators.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const targetScroll = moduleWidth * 2 * index; // Each section has ~2 modules
            grid.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
            
            // Pause briefly after manual navigation
            isScrolling = false;
            setTimeout(() => {
                isScrolling = true;
            }, 2000);
        });
    });
}

// ========================================
// Profile Card 3D Tilt Effect
// ========================================
function initProfileTilt() {
    const wrap = document.querySelector('#profileTiltCard');
    const shell = wrap?.querySelector('.tilt-card-shell');
    
    if (!wrap || !shell) return;

    const ANIMATION_CONFIG = {
        INITIAL_DURATION: 1200,
        INITIAL_X_OFFSET: 70,
        INITIAL_Y_OFFSET: 60,
        ENTER_TRANSITION_MS: 180
    };

    const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
    const round = (v, precision = 3) => parseFloat(v.toFixed(precision));
    const adjust = (v, fMin, fMax, tMin, tMax) => round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

    let rafId = null;
    let running = false;
    let lastTs = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let initialUntil = 0;
    let enterTimer = null;
    let leaveRaf = null;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;

    const setVarsFromXY = (x, y) => {
        const width = shell.clientWidth || 1;
        const height = shell.clientHeight || 1;

        const percentX = clamp((100 / width) * x);
        const percentY = clamp((100 / height) * y);

        const centerX = percentX - 50;
        const centerY = percentY - 50;

        const properties = {
            '--pointer-x': `${percentX}%`,
            '--pointer-y': `${percentY}%`,
            '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
            '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
            '--pointer-from-center': clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1),
            '--pointer-from-top': percentY / 100,
            '--pointer-from-left': percentX / 100,
            '--rotate-x': `${round(-(centerX / 5))}deg`,
            '--rotate-y': `${round(centerY / 4)}deg`
        };

        for (const [k, v] of Object.entries(properties)) {
            wrap.style.setProperty(k, v);
        }
    };

    const step = (ts) => {
        if (!running) return;
        if (lastTs === 0) lastTs = ts;
        const dt = (ts - lastTs) / 1000;
        lastTs = ts;

        const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
        const k = 1 - Math.exp(-dt / tau);

        currentX += (targetX - currentX) * k;
        currentY += (targetY - currentY) * k;

        setVarsFromXY(currentX, currentY);

        const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

        if (stillFar || document.hasFocus()) {
            rafId = requestAnimationFrame(step);
        } else {
            running = false;
            lastTs = 0;
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        }
    };

    const start = () => {
        if (running) return;
        running = true;
        lastTs = 0;
        rafId = requestAnimationFrame(step);
    };

    const setImmediate = (x, y) => {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
    };

    const setTarget = (x, y) => {
        targetX = x;
        targetY = y;
        start();
    };

    const toCenter = () => {
        setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
    };

    const getOffsets = (evt) => {
        const rect = shell.getBoundingClientRect();
        return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
    };

    const handlePointerMove = (event) => {
        const { x, y } = getOffsets(event);
        setTarget(x, y);
    };

    const handlePointerEnter = (event) => {
        shell.classList.add('active');
        shell.classList.add('entering');
        if (enterTimer) clearTimeout(enterTimer);
        enterTimer = setTimeout(() => {
            shell.classList.remove('entering');
        }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

        const { x, y } = getOffsets(event);
        setTarget(x, y);
    };

    const handlePointerLeave = () => {
        toCenter();

        const checkSettle = () => {
            const dx = targetX - currentX;
            const dy = targetY - currentY;
            const settled = Math.hypot(dx, dy) < 0.6;
            if (settled) {
                shell.classList.remove('active');
                leaveRaf = null;
            } else {
                leaveRaf = requestAnimationFrame(checkSettle);
            }
        };
        if (leaveRaf) cancelAnimationFrame(leaveRaf);
        leaveRaf = requestAnimationFrame(checkSettle);
    };

    // Attach event listeners
    shell.addEventListener('pointerenter', handlePointerEnter);
    shell.addEventListener('pointermove', handlePointerMove);
    shell.addEventListener('pointerleave', handlePointerLeave);

    // Initial animation
    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    setImmediate(initialX, initialY);
    toCenter();
    initialUntil = performance.now() + ANIMATION_CONFIG.INITIAL_DURATION;
    start();
}

// ========================================
// Circuit Board Canvas Animation
// ========================================
function initCircuitCanvas() {
    const canvas = document.getElementById('circuitCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Circuit nodes
    const nodes = [];
    const nodeCount = 30;
    
    // Create circuit nodes
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            radius: Math.random() * 2 + 1
        });
    }
    
    function drawCircuit() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.globalAlpha = 1 - (distance / 150);
                    ctx.stroke();
                }
            }
        }
        
        // Draw nodes
        ctx.globalAlpha = 1;
        nodes.forEach(node => {
            ctx.fillStyle = 'rgba(99, 102, 241, 0.6)';
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Add glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(99, 102, 241, 0.8)';
            ctx.fill();
            ctx.shadowBlur = 0;
            
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        });
        
        requestAnimationFrame(drawCircuit);
    }
    
    drawCircuit();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ========================================
// Network Graph - Interactive Project Display
// ========================================
function initNetworkGraph() {
    const networkSvg = document.getElementById('networkSvg');
    const networkNodes = document.getElementById('networkNodes');
    const detailsPanel = document.getElementById('projectDetailsPanel');
    const panelContent = document.getElementById('panelContent');
    const panelClose = document.getElementById('panelClose');
    
    if (!networkSvg || !networkNodes) return;
    
    // Project data
    const projectData = {
        project1: {
            title: 'Ransomware Resilience Simulator',
            category: 'Cybersecurity',
            status: 'Active',
            threat: 'CRITICAL',
            description: 'Comprehensive study of ransomware attack lifecycle with focus on simulated attack and recovery scenarios. Developed resilience strategies emphasizing prevention, detection, and response mechanisms.',
            details: [
                'Analyzed ransomware propagation patterns',
                'Designed multi-layer defense strategies',
                'Created incident response playbooks',
                'Implemented recovery protocols'
            ],
            technologies: ['Python', 'Incident Response', 'Forensics'],
            connections: ['hub', 'tech3']
        },
        project2: {
            title: 'Security Tool Automation',
            category: 'Security Automation',
            status: 'Completed',
            threat: 'HIGH',
            description: 'Developed automated security scanning and monitoring solutions using PowerShell scripting. Streamlined repetitive security checks to improve efficiency and consistency.',
            details: [
                'Automated vulnerability scanning',
                'Created security audit scripts',
                'Implemented scheduled monitoring',
                'Built reporting dashboards'
            ],
            technologies: ['PowerShell', 'Automation', 'Security Scanning'],
            connections: ['hub', 'tech1']
        },
        project3: {
            title: 'Personal Automation Workflows',
            category: 'Productivity',
            status: 'In Progress',
            threat: 'MEDIUM',
            description: 'Built comprehensive automation workflows for routine tasks using modern automation tools. Focused on reducing manual effort and improving productivity through intelligent task orchestration.',
            details: [
                'Designed workflow architectures',
                'Automated repetitive processes',
                'Integrated multiple tools',
                'Optimized task sequences'
            ],
            technologies: ['Python', 'Automation', 'Workflows'],
            connections: ['hub', 'tech1', 'tech2']
        }
    };
    
    // Get node positions
    function getNodePosition(nodeElement) {
        const rect = nodeElement.getBoundingClientRect();
        const containerRect = networkNodes.getBoundingClientRect();
        return {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2
        };
    }
    
    // Draw connection lines
    function drawConnections() {
        const svgNS = 'http://www.w3.org/2000/svg';
        networkSvg.innerHTML = '';
        
        const connections = [
            { from: 'hub', to: 'project1' },
            { from: 'hub', to: 'project2' },
            { from: 'hub', to: 'project3' },
            { from: 'project1', to: 'tech3' },
            { from: 'project2', to: 'tech1' },
            { from: 'project3', to: 'tech1' },
            { from: 'project3', to: 'tech2' },
            { from: 'tech1', to: 'hub' }
        ];
        
        connections.forEach(conn => {
            const fromNode = document.querySelector(`[data-node="${conn.from}"]`);
            const toNode = document.querySelector(`[data-node="${conn.to}"]`);
            
            if (fromNode && toNode) {
                const fromPos = getNodePosition(fromNode);
                const toPos = getNodePosition(toNode);
                
                const line = document.createElementNS(svgNS, 'line');
                line.setAttribute('x1', fromPos.x);
                line.setAttribute('y1', fromPos.y);
                line.setAttribute('x2', toPos.x);
                line.setAttribute('y2', toPos.y);
                line.classList.add('connection-line');
                line.dataset.from = conn.from;
                line.dataset.to = conn.to;
                
                networkSvg.appendChild(line);
            }
        });
    }
    
    // Animate data packet
    function animateDataPacket(fromNode, toNode) {
        const fromPos = getNodePosition(fromNode);
        const toPos = getNodePosition(toNode);
        
        const packet = document.createElement('div');
        packet.classList.add('data-packet');
        packet.style.left = fromPos.x + 'px';
        packet.style.top = fromPos.y + 'px';
        networkNodes.appendChild(packet);
        
        const distance = Math.sqrt(
            Math.pow(toPos.x - fromPos.x, 2) + 
            Math.pow(toPos.y - fromPos.y, 2)
        );
        const duration = distance * 2; // Speed factor
        
        packet.animate([
            { left: fromPos.x + 'px', top: fromPos.y + 'px', opacity: 1 },
            { left: toPos.x + 'px', top: toPos.y + 'px', opacity: 1 }
        ], {
            duration: duration,
            easing: 'linear'
        }).onfinish = () => {
            packet.remove();
        };
    }
    
    // Continuous data flow animation
    function startDataFlow() {
        const connections = [
            { from: 'hub', to: 'project1' },
            { from: 'hub', to: 'project2' },
            { from: 'hub', to: 'project3' },
            { from: 'project2', to: 'tech1' },
            { from: 'project3', to: 'tech2' }
        ];
        
        function sendRandomPacket() {
            const conn = connections[Math.floor(Math.random() * connections.length)];
            const fromNode = document.querySelector(`[data-node="${conn.from}"]`);
            const toNode = document.querySelector(`[data-node="${conn.to}"]`);
            
            if (fromNode && toNode) {
                animateDataPacket(fromNode, toNode);
            }
            
            setTimeout(sendRandomPacket, Math.random() * 2000 + 1000);
        }
        
        sendRandomPacket();
    }
    
    // Show project details
    function showProjectDetails(projectId) {
        const project = projectData[projectId];
        if (!project) return;
        
        const threatClass = project.threat.toLowerCase();
        
        panelContent.innerHTML = `
            <div class="panel-section">
                <h3 style="color: var(--accent-primary); font-size: 1.1rem; margin-bottom: 15px;">
                    ${project.title}
                </h3>
                <div class="panel-meta">
                    <div class="meta-item">
                        <span class="meta-label">Category</span>
                        <span class="meta-value">${project.category}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Status</span>
                        <span class="meta-value">${project.status}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Threat Level</span>
                        <span class="meta-value" style="color: ${
                            threatClass === 'critical' ? '#ff4444' : 
                            threatClass === 'high' ? '#ffaa00' : '#ffff00'
                        };">${project.threat}</span>
                    </div>
                </div>
            </div>
            
            <div class="panel-section">
                <div class="panel-section-title">Overview</div>
                <p class="panel-description">${project.description}</p>
            </div>
            
            <div class="panel-section">
                <div class="panel-section-title">Key Achievements</div>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${project.details.map(detail => `
                        <li style="color: var(--text-tertiary); font-size: 0.85rem; margin-bottom: 8px; padding-left: 15px; position: relative;">
                            <span style="position: absolute; left: 0; color: var(--accent-primary);">▹</span>
                            ${detail}
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="panel-section">
                <div class="panel-section-title">Technologies</div>
                <div class="panel-tags">
                    ${project.technologies.map(tech => `
                        <span class="tag tag-forensics">${tech}</span>
                    `).join('')}
                </div>
            </div>
        `;
        
        detailsPanel.classList.add('active');
        
        // Highlight connections
        const lines = networkSvg.querySelectorAll('.connection-line');
        lines.forEach(line => line.classList.remove('active'));
        
        project.connections.forEach(connId => {
            const line = networkSvg.querySelector(`[data-from="${projectId}"][data-to="${connId}"], [data-from="${connId}"][data-to="${projectId}"]`);
            if (line) line.classList.add('active');
        });
    }
    
    // Hide project details
    function hideProjectDetails() {
        detailsPanel.classList.remove('active');
        const lines = networkSvg.querySelectorAll('.connection-line');
        lines.forEach(line => line.classList.remove('active'));
    }
    
    // Node click handlers
    const projectNodes = document.querySelectorAll('.project-node');
    projectNodes.forEach(node => {
        node.addEventListener('click', () => {
            const projectId = node.dataset.node;
            showProjectDetails(projectId);
            
            // Animate data burst from clicked node
            const connections = projectData[projectId]?.connections || [];
            connections.forEach(targetId => {
                const targetNode = document.querySelector(`[data-node="${targetId}"]`);
                if (targetNode) {
                    setTimeout(() => {
                        animateDataPacket(node, targetNode);
                    }, Math.random() * 300);
                }
            });
        });
    });
    
    // Close panel
    if (panelClose) {
        panelClose.addEventListener('click', hideProjectDetails);
    }
    
    // Close panel when clicking outside
    networkNodes.addEventListener('click', (e) => {
        if (e.target === networkNodes) {
            hideProjectDetails();
        }
    });
    
    // Initialize
    drawConnections();
    startDataFlow();
    
    // Redraw on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            drawConnections();
        }, 250);
    });
}
