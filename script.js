// ============================================
// Scroll Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all elements that should animate on scroll
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.feature-card, .step-card, .timeline-item, .catalog-card');
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
});

// ============================================
// Header Scroll Effect
// ============================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for empty hash
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Code Block Copy Functionality (optional)
// ============================================
document.querySelectorAll('.code-block').forEach((codeBlock) => {
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.innerHTML = '📋 Kopieer';
    copyButton.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 6px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.75rem;
        transition: all 0.2s;
        opacity: 0;
    `;
    
    // Make code block container relative for absolute positioning
    codeBlock.style.position = 'relative';
    codeBlock.appendChild(copyButton);
    
    // Show button on hover
    codeBlock.addEventListener('mouseenter', () => {
        copyButton.style.opacity = '1';
    });
    
    codeBlock.addEventListener('mouseleave', () => {
        copyButton.style.opacity = '0';
    });
    
    // Copy functionality
    copyButton.addEventListener('click', async () => {
        const code = codeBlock.querySelector('code').textContent;
        try {
            await navigator.clipboard.writeText(code);
            copyButton.innerHTML = '✓ Gekopieerd!';
            copyButton.style.background = 'rgba(34, 197, 94, 0.3)';
            
            setTimeout(() => {
                copyButton.innerHTML = '📋 Kopieer';
                copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });
});

// ============================================
// Architecture Diagram Animation
// ============================================
const archNodes = document.querySelectorAll('.arch-node');
let currentIndex = 0;

function highlightNode() {
    archNodes.forEach(node => node.style.transform = 'scale(1)');
    
    if (archNodes[currentIndex]) {
        archNodes[currentIndex].style.transform = 'scale(1.05)';
        currentIndex = (currentIndex + 1) % archNodes.length;
    }
}

// Start animation when in viewport
const archDiagram = document.querySelector('.architecture-diagram');
if (archDiagram) {
    const archObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const interval = setInterval(highlightNode, 2000);
                // Stop when element leaves viewport
                return () => clearInterval(interval);
            }
        });
    }, { threshold: 0.5 });
    
    archObserver.observe(archDiagram);
}

// ============================================
// Terminal Typing Effect for Code Blocks
// ============================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    const originalText = text;
    element.textContent = '';
    
    function type() {
        if (i < originalText.length) {
            element.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Optional: Animate first code block on page load
const firstCodeBlock = document.querySelector('.code-block code');
if (firstCodeBlock) {
    const codeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.typed) {
                const originalText = entry.target.textContent;
                entry.target.dataset.typed = 'true';
                typeWriter(entry.target, originalText, 20);
                codeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Uncomment to enable typing effect
    // codeObserver.observe(firstCodeBlock);
}

// ============================================
// Performance: Reduce Motion for Users Who Prefer It
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations
    document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('active');
    });
    
    // Remove transition classes
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// Easter Egg: Konami Code
// ============================================
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
    'b', 'a'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
        
        console.log('🎉 cloudX Easter Egg Activated! 🎉');
    }
});

// ============================================
// Analytics Event Tracking (optional)
// ============================================
function trackEvent(category, action, label) {
    // If you integrate Google Analytics or similar
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Track CTA button clicks
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(button => {
    button.addEventListener('click', () => {
        const text = button.textContent.trim();
        trackEvent('Button', 'Click', text);
    });
});

// Track external link clicks
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('External Link', 'Click', link.href);
    });
});

// ============================================
// Lazy Loading for Images (if you add images)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Mobile Menu Toggle (if needed in future)
// ============================================
function setupMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuButton.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuButton.classList.remove('active');
            }
        });
    }
}

setupMobileMenu();

// ============================================
// Console Message
// ============================================
console.log(
    '%c cloudX ',
    'background: #FF6B35; color: white; font-size: 20px; padding: 10px; border-radius: 5px;',
    '\n\nModern remote development met VSCode en AWS EC2\n' +
    'GitHub: https://github.com/easytocloud/cloudX-proxy\n' +
    '© 2025 easytocloud\n'
);
