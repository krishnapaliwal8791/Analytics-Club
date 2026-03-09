const isMobile = window.innerWidth < 768
document.addEventListener('DOMContentLoaded', () => {

    if(!isMobile){
        initCursorGlow();
        initHeroCanvas();
        initHorizontalScroll();
        initLiveChart();
    }

    initCounters();
    initInteractions();
    initMobileMenu();

});
/**
 * Cursor Spotlight Effect
 */
function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Update CSS variables for radial gradient center
        document.documentElement.style.setProperty('--mouse-x', `${(x / window.innerWidth) * 100}%`);
        document.documentElement.style.setProperty('--mouse-y', `${(y / window.innerHeight) * 100}%`);
        
        // Move the glow element
        glow.style.transform = `translate(${x - window.innerWidth/2}px, ${y - window.innerHeight/2}px)`;
    });
}

/**
 * Hero Background Canvas (Data Nodes & Lines)
 */
function initHeroCanvas() {
   const canvas = document.getElementById('hero-canvas');
if(!canvas) return

const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    const particleCount = 60;
    const connectionDistance = 150;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 212, 255, 0.4)';
            ctx.fill();
        }
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];
            p1.update();
            p1.draw();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 212, 255, ${1 - dist / connectionDistance})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    init();
    animate();
}

/**
 * Sticky Vertical-to-Horizontal Scroll
 */
function initHorizontalScroll() {
    const container = document.querySelector('.horizontal-scroll-container');
    const stickyWrapper = document.querySelector('.sticky-wrapper');
    const scrollContent = document.querySelector('.scroll-content');
    
    window.addEventListener('scroll', () => {
        const offsetTop = container.offsetTop;
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const containerHeight = container.offsetHeight;
        
        if (scrollY >= offsetTop && scrollY <= offsetTop + containerHeight - windowHeight) {
            const percentage = (scrollY - offsetTop) / (containerHeight - windowHeight);
            const scrollWidth = scrollContent.scrollWidth - window.innerWidth + (window.innerWidth * 0.2); // Add some padding
            scrollContent.style.transform = `translateX(-${percentage * scrollWidth}px)`;
        }
    });
}

/**
 * Animated Number Counters
 */
function initCounters() {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = Number(entry.target.dataset.target);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });

    function animateCounter(element, target) {
        let current = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / target));
        
        const timer = setInterval(() => {
            current += Math.ceil(target / 100);
            if (current >= target) {
                element.innerText = target;
                clearInterval(timer);
            } else {
                element.innerText = current;
            }
        }, 20);
    }
}

/**
 * Live Chart Visualization
 */
function initLiveChart() {
    const canvas = document.getElementById('live-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    
    let dataPointsBlue = Array(30).fill(40).map(() => Math.random() * 50 + 20);
    let dataPointsCyan = Array(30).fill(50).map(() => Math.random() * 40 + 40);

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        width = canvas.width = rect.width;
        height = canvas.height = rect.height;
    }

    function drawLine(points, color) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        const step = width / (points.length - 1);
        ctx.moveTo(0, height - (points[0] / 100) * height);

        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(i * step, height - (points[i] / 100) * height);
        }
        ctx.stroke();

        // Add Gradient under line
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, color.replace('rgb', 'rgba').replace(')', ', 0.2)'));
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fill();
    }

    function updateData() {
        dataPointsBlue.shift();
        dataPointsBlue.push(Math.max(10, Math.min(90, dataPointsBlue[dataPointsBlue.length - 1] + (Math.random() - 0.5) * 10)));
        
        dataPointsCyan.shift();
        dataPointsCyan.push(Math.max(10, Math.min(90, dataPointsCyan[dataPointsCyan.length - 1] + (Math.random() - 0.5) * 12)));
    }

    function render() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
            const y = (i / 4) * height;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        drawLine(dataPointsBlue, '#00D4FF');
        drawLine(dataPointsCyan, '#00F5FF');
        
        updateData();
        setTimeout(() => requestAnimationFrame(render), 100);
    }

    window.addEventListener('resize', resize);
    resize();
    render();
}

/**
 * Scroll Reveal Interactions
 */
function initInteractions() {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.getAttribute('data-delay')) {
                    entry.target.style.transitionDelay = entry.target.getAttribute('data-delay') + 's';
                }
            }
        });
    }, { threshold: 0.1 });

    const elementsToReveal = [
        '.animate-in',
        '.reveal-up',
        '.reveal-left',
        '.reveal-right',
        '.feature-card'
    ];

    elementsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => revealObserver.observe(el));
    });

    // Handle smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}
function initMobileMenu(){

    const menuToggle = document.querySelector(".menu-toggle")
    const navLinks = document.querySelector(".nav-links")

    if(!menuToggle || !navLinks) return

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active")

    })

}

if(menuToggle){

menuToggle.addEventListener("click", () => {

navLinks.classList.toggle("active")

})

}