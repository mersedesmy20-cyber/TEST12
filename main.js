// ============================================
// GLORIOUS TRAVEL - MODERN REDESIGN JS
// ============================================

// Reveal Body
document.body.classList.add('loaded');

// Initialize Lenis Smooth Scroll
if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

// ============================================
// NAVIGATION
// ============================================

const nav = document.getElementById('mainNav');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

// Sticky Nav on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// DESTINATIONS DATA
// ============================================

const destinations = [
    {
        id: 'turkey',
        name: 'Туреччина',
        season: 'Травень - Жовтень',
        seasonIcon: '☀️',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop',
        flag: '🇹🇷',
        icon: '🏖️',
        desc: 'Країна, де схід зустрічається із заходом',
        price: 'від 300$',
        highlights: ['Все включено', 'Історичні пам\'ятки', 'Шопінг', 'Сімейний відпочинок'],
        tags: ['Море', 'Європа'],
        gridClass: 'large'
    },
    {
        id: 'egypt',
        name: 'Єгипет',
        season: 'Жовтень - Травень',
        seasonIcon: '☀️',
        image: 'https://images.unsplash.com/photo-1544986581-efac024faf62?q=80&w=2070&auto=format&fit=crop',
        flag: '🇪🇬',
        icon: '🏜️',
        desc: 'Колиска цивілізації та найкращий дайвінг',
        price: 'від 400$',
        highlights: ['Дайвінг та снорклінг', 'Піраміди', 'Пустельні сафарі', 'Доступні ціни'],
        tags: ['Море', 'Екзотика'],
        gridClass: ''
    },
    {
        id: 'spain',
        name: 'Іспанія',
        season: 'Червень - Вересень',
        seasonIcon: '☀️',
        image: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?q=80&w=2070&auto=format&fit=crop',
        flag: '🇪🇸',
        icon: '🏛️',
        desc: 'Пристрасть, фламенко та архітектура Гауді',
        price: 'від 350$',
        highlights: ['Архітектура', 'Гастрономія', 'Нічне життя', 'Культура'],
        tags: ['Європа', 'Море'],
        gridClass: ''
    },
    {
        id: 'bulgaria',
        name: 'Болгарія',
        season: 'Червень - Вересень',
        seasonIcon: '☀️',
        image: 'https://images.unsplash.com/photo-1504280317859-9c6bf9c2a532?q=80&w=2070&auto=format&fit=crop',
        flag: '🇧🇬',
        icon: '🏖️',
        desc: 'Золоті піски та гостинність',
        price: 'від 250$',
        highlights: ['Золоті Піски', 'Бюджетний відпочинок', 'Смачна кухня', 'Близький переліт'],
        tags: ['Море', 'Європа'],
        gridClass: ''
    },
    {
        id: 'montenegro',
        name: 'Чорногорія',
        season: 'Червень - Вересень',
        seasonIcon: '☀️',
        image: 'https://images.unsplash.com/photo-1506086679525-9ec6c7563e2e?q=80&w=2070&auto=format&fit=crop',
        flag: '🇲🇪',
        icon: '⛰️',
        desc: 'Перлина Адріатики з неймовірною природою',
        price: 'від 400$',
        highlights: ['Неймовірна природа', 'Адріатичне море', 'Старі міста', 'Екскурсії'],
        tags: ['Море', 'Гори', 'Європа'],
        gridClass: 'large'
    },
    {
        id: 'dominican',
        name: 'Домінікана',
        season: 'Цілий рік',
        seasonIcon: '☀️',
        image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2070&auto=format&fit=crop',
        flag: '🇩🇴',
        icon: '🏝️',
        desc: 'Рай на землі з білосніжним піском',
        price: 'від 800$',
        highlights: ['Карибське море', 'Білий пісок', 'Екзотика', 'Все включено'],
        tags: ['Море', 'Екзотика'],
        gridClass: ''
    },
    {
        id: 'uae',
        name: 'ОАЕ',
        season: 'Жовтень - Квітень',
        seasonIcon: '☀️',
        image: 'https://images.unsplash.com/photo-1504270997636-07ddfbd48945?q=80&w=2070&auto=format&fit=crop',
        flag: '🇦🇪',
        icon: '🏙️',
        desc: 'Майбутнє вже тут - розкіш та сучасність',
        price: 'від 600$',
        highlights: ['Розкіш', 'Шопінг', 'Сучасна архітектура', 'Безпека'],
        tags: ['Екзотика'],
        gridClass: ''
    },
    {
        id: 'thailand',
        name: 'Таїланд',
        season: 'Листопад - Березень',
        seasonIcon: '☀️',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
        flag: '🇹🇭',
        icon: '🏝️',
        desc: 'Країна посмішок та екзотичних храмів',
        price: 'від 700$',
        highlights: ['Екзотика', 'Пляжі', 'Їжа', 'Масаж'],
        tags: ['Екзотика', 'Море'],
        gridClass: ''
    }
];

// ============================================
// RENDER DESTINATIONS
// ============================================

const grid = document.getElementById('destinations-grid');

function renderDestinations(filter = '') {
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = destinations.filter(d => {
        const matchName = d.name.toLowerCase().includes(filter.toLowerCase());
        const matchTag = d.tags && d.tags.some(t => t.toLowerCase().includes(filter.toLowerCase()));
        return matchName || matchTag || !filter;
    });

    filtered.forEach(dest => {
        const card = document.createElement('div');
        card.className = `destination-card ${dest.gridClass || ''}`;
        card.innerHTML = `
            <div class="destination-image" style="background-image: url('${dest.image}')">
                <div class="destination-flag" style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${dest.flag}</text></svg>')"></div>
            </div>
            <div class="destination-content">
                <div>
                    <div class="destination-header">
                        <h3 class="destination-name">${dest.name}</h3>
                        <span class="destination-icon">${dest.icon}</span>
                    </div>
                    <p class="destination-desc">${dest.desc}</p>
                </div>
                <div class="destination-footer">
                    <div class="destination-season">
                        <span>${dest.seasonIcon}</span>
                        <span>${dest.season}</span>
                    </div>
                    <div class="destination-price">${dest.price}</div>
                </div>
            </div>
        `;

        card.addEventListener('click', () => openModal(dest));
        grid.appendChild(card);
    });

    // Trigger animations after render
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.utils.toArray('.destination-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });
    }
}

// Global filter function
window.filterByTag = function(tag) {
    renderDestinations(tag);
    document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
};

// Initial render
renderDestinations();

// ============================================
// MODAL
// ============================================

const modal = document.getElementById('destination-modal');
const closeModalBtn = document.querySelector('.close-modal');

function openModal(data) {
    if (!modal) return;

    document.getElementById('modal-title').textContent = data.name;
    document.getElementById('modal-season-text').textContent = data.season;
    document.getElementById('modal-icon').textContent = data.seasonIcon;
    document.getElementById('modal-desc').textContent = data.desc;
    document.querySelector('.modal-image').style.backgroundImage = `url('${data.image}')`;

    const highlightsList = document.getElementById('modal-highlights');
    highlightsList.innerHTML = '';
    data.highlights.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        highlightsList.appendChild(li);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
    }
});

// ============================================
// GSAP ANIMATIONS
// ============================================

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    gsap.to('.fade-in-up', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.3
    });

    // Section title animations
    gsap.utils.toArray('.fade-in').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Vibe cards animation
    gsap.utils.toArray('.vibe-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power3.out'
        });
    });

    // Contact cards animation
    gsap.utils.toArray('.contact-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// LAZY LOADING IMAGES (if needed)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
