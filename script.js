// ========================================
// Portfolio Website - Interactive Scripts
// ========================================

// Check if GSAP is loaded
if (typeof gsap === 'undefined') {
    console.error('GSAP not loaded! Animations may not work.');
}

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingBarFill = document.getElementById('loadingBarFill');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        
        if (loadingBarFill) {
            loadingBarFill.style.width = progress + '%';
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('loaded');
                document.body.classList.add('loaded');
            }, 300);
        }
    }, 150);
});

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    scrollProgress.style.width = scrollPercent + '%';
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
    initCardSwap();
    initProfileTilt();
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
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const roles = ['Creative Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
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
            typingSpeed = 2000; // Pause at end
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
// Form Handling
// ========================================
function initFormHandling() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Initialize EmailJS with your public key
    // Sign up at https://www.emailjs.com/ to get your keys
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg class="spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
        `;
        submitBtn.disabled = true;

        // Add spin animation
        const style = document.createElement('style');
        style.textContent = `
            .spin { animation: spin 1s linear infinite; }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `;
        document.head.appendChild(style);

        // Send email using EmailJS
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
            .then(() => {
                submitBtn.innerHTML = `
                    <span>Message Sent!</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6L9 17l-5-5"/>
                    </svg>
                `;
                submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';

                // Reset form
                form.reset();

                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch((error) => {
                console.error('Email send failed:', error);
                submitBtn.innerHTML = `
                    <span>Failed to Send</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                `;
                submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';

                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            });
    });
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
function initCardSwap() {
    const container = document.getElementById('skillCardSwap');
    if (!container || typeof gsap === 'undefined') {
        console.warn('CardSwap: Container not found or GSAP not loaded');
        return;
    }

    const cards = container.querySelectorAll('.skill-card');
    if (cards.length < 2) return;

    // Configuration
    const config = {
        cardDistance: 60,      // Horizontal offset between cards
        verticalDistance: 70,  // Vertical offset between cards
        delay: 5000,           // Time between swaps (ms)
        skewAmount: 6,         // Skew angle
        easing: 'elastic',     // 'elastic' or 'smooth'
    };

    // Animation settings based on easing type
    const animConfig = config.easing === 'elastic'
        ? {
            ease: 'elastic.out(0.6, 0.9)',
            durDrop: 2,
            durMove: 2,
            durReturn: 2,
            promoteOverlap: 0.9,
            returnDelay: 0.05
        }
        : {
            ease: 'power1.inOut',
            durDrop: 0.8,
            durMove: 0.8,
            durReturn: 0.8,
            promoteOverlap: 0.45,
            returnDelay: 0.2
        };

    // Track card order
    let order = Array.from({ length: cards.length }, (_, i) => i);
    let currentTimeline = null;
    let intervalId = null;
    let isPaused = false;

    // Calculate slot position for a card at index i
    function makeSlot(i, total) {
        return {
            x: i * config.cardDistance,
            y: -i * config.verticalDistance,
            z: -i * config.cardDistance * 1.5,
            zIndex: total - i
        };
    }

    // Place card immediately at slot position
    function placeCard(card, slot) {
        gsap.set(card, {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            xPercent: -50,
            yPercent: -50,
            skewY: config.skewAmount,
            transformOrigin: 'center center',
            zIndex: slot.zIndex,
            force3D: true
        });
    }

    // Initialize all cards at their starting positions
    cards.forEach((card, i) => {
        placeCard(card, makeSlot(i, cards.length));
    });

    // Swap animation - move front card to back
    function swap() {
        if (order.length < 2 || isPaused) return;

        const [frontIndex, ...rest] = order;
        const frontCard = cards[frontIndex];
        const total = cards.length;

        const tl = gsap.timeline();
        currentTimeline = tl;

        // Drop the front card down
        tl.to(frontCard, {
            y: '+=500',
            duration: animConfig.durDrop,
            ease: animConfig.ease
        });

        // Promote remaining cards forward
        tl.addLabel('promote', `-=${animConfig.durDrop * animConfig.promoteOverlap}`);
        rest.forEach((cardIndex, i) => {
            const card = cards[cardIndex];
            const slot = makeSlot(i, total);
            tl.set(card, { zIndex: slot.zIndex }, 'promote');
            tl.to(card, {
                x: slot.x,
                y: slot.y,
                z: slot.z,
                duration: animConfig.durMove,
                ease: animConfig.ease
            }, `promote+=${i * 0.15}`);
        });

        // Return front card to back position
        const backSlot = makeSlot(total - 1, total);
        tl.addLabel('return', `promote+=${animConfig.durMove * animConfig.returnDelay}`);
        tl.call(() => {
            gsap.set(frontCard, { zIndex: backSlot.zIndex });
        }, undefined, 'return');
        tl.to(frontCard, {
            x: backSlot.x,
            y: backSlot.y,
            z: backSlot.z,
            duration: animConfig.durReturn,
            ease: animConfig.ease
        }, 'return');

        // Update order array
        tl.call(() => {
            order = [...rest, frontIndex];
        });
    }

    // Start the swap cycle
    function startSwapping() {
        swap();
        intervalId = setInterval(swap, config.delay);
    }

    // Pause on hover
    function pause() {
        isPaused = true;
        if (currentTimeline) currentTimeline.pause();
        clearInterval(intervalId);
    }

    // Resume on mouse leave
    function resume() {
        isPaused = false;
        if (currentTimeline) currentTimeline.play();
        intervalId = setInterval(swap, config.delay);
    }

    // Setup event listeners
    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', resume);

    // Click to manually swap
    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            if (order[0] === i) {
                // If clicking the front card, trigger swap
                clearInterval(intervalId);
                swap();
                intervalId = setInterval(swap, config.delay);
            }
        });
    });

    // Mouse wheel to swap
    let wheelTimeout = null;
    let isWheelActive = false;

    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        if (isWheelActive) return;
        
        isWheelActive = true;
        clearInterval(intervalId);
        swap();
        
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            isWheelActive = false;
            intervalId = setInterval(swap, config.delay);
        }, 1000);
    }, { passive: false });

    // Start animation
    startSwapping();
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
