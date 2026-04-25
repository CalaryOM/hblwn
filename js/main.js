/* ============================================================
   HOMABAY LBQ NETWORK — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Navbar scroll effect ── */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    /* ── Mobile menu toggle ── */
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            mobileToggle.textContent = isOpen ? '✕' : '☰';
            mobileToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    /* ── Smooth scroll for nav links ── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (navLinks) {
                    navLinks.classList.remove('active');
                    if (mobileToggle) {
                        mobileToggle.textContent = '☰';
                        mobileToggle.setAttribute('aria-expanded', false);
                    }
                }
            }
        });
    });

    /* ── Scroll reveal animation ── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ── Counter animation for stats ── */
    function animateCounter(element, target, suffix = '+') {
        let current = 0;
        const increment = target / 55;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 28);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat-number, .impact-number').forEach(stat => {
                    const raw = stat.textContent.replace(/\D/g, '');
                    const target = parseInt(raw);
                    if (!isNaN(target)) {
                        stat.textContent = '0';
                        animateCounter(stat, target);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    document.querySelectorAll('.hero-stats, .impact-grid').forEach(el => statsObserver.observe(el));

    /* ── Gallery ── */
    const galleryImages = [
        { id: 1, category: 'programs',   label: 'Health Workshop',       color: 'linear-gradient(135deg, #2D5016, #8ec8a0)' },
        { id: 2, category: 'events',     label: 'Annual Forum 2026',     color: 'linear-gradient(135deg, #E86A33, #ff8c5a)' },
        { id: 3, category: 'community',  label: 'Community Gathering',   color: 'linear-gradient(135deg, #8ec8a0, #a8d8b9)' },
        { id: 4, category: 'programs',   label: 'Legal Aid Session',     color: 'linear-gradient(135deg, #2D5016, #1a3a0f)' },
        { id: 5, category: 'events',     label: 'Women\'s Day March',    color: 'linear-gradient(135deg, #E86A33, #c45a2a)' },
        { id: 6, category: 'community',  label: 'Safe Space Meeting',    color: 'linear-gradient(135deg, #8ec8a0, #2D5016)' },
        { id: 7, category: 'programs',   label: 'Economic Training',     color: 'linear-gradient(135deg, #2D5016, #E86A33)' },
        { id: 8, category: 'events',     label: 'Pride Week 2025',       color: 'linear-gradient(135deg, #E86A33, #8ec8a0)' },
        { id: 9, category: 'community',  label: 'Support Group',         color: 'linear-gradient(135deg, #8ec8a0, #E86A33)' },
        { id: 10, category: 'programs',  label: 'Mental Health Clinic',  color: 'linear-gradient(135deg, #2D5016, #8ec8a0)' },
        { id: 11, category: 'events',    label: 'County Partnership',    color: 'linear-gradient(135deg, #E86A33, #2D5016)' },
        { id: 12, category: 'community', label: 'Advocacy Day',          color: 'linear-gradient(135deg, #8ec8a0, #a8d8b9)' },
    ];

    const galleryGrid = document.getElementById('galleryGrid');

    function renderGallery(filter = 'all') {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = '';
        const filtered = filter === 'all'
            ? galleryImages
            : galleryImages.filter(img => img.category === filter);

        filtered.forEach(img => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `View: ${img.label}`);
            item.setAttribute('tabindex', '0');
            item.innerHTML = `
                <div style="width:100%;height:100%;background:${img.color};display:flex;align-items:flex-end;">
                    <span style="padding:0.5rem 0.75rem;font-size:0.75rem;color:rgba(255,255,255,0.85);font-weight:500;background:rgba(0,0,0,0.25);width:100%;">${img.label}</span>
                </div>`;
            item.addEventListener('click', () => openLightbox(img.id));
            item.addEventListener('keydown', e => { if (e.key === 'Enter') openLightbox(img.id); });
            galleryGrid.appendChild(item);
        });
    }

    renderGallery();

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGallery(btn.dataset.filter);
        });
    });

    /* ── Lightbox ── */
    const lightbox = document.getElementById('lightbox');
    let currentImageId = 0;

    function openLightbox(id) {
        currentImageId = id;
        const img = galleryImages.find(i => i.id === id);
        if (!img || !lightbox) return;
        const lightboxContent = document.getElementById('lightboxContent');
        if (lightboxContent) {
            lightboxContent.style.background = img.color;
            lightboxContent.querySelector('span').textContent = img.label;
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.getElementById('lightboxClose')?.focus();
    }

    function closeLightbox() {
        lightbox?.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

    document.getElementById('lightboxPrev')?.addEventListener('click', () => {
        const allIds = galleryImages.map(i => i.id);
        const idx = allIds.indexOf(currentImageId);
        openLightbox(allIds[(idx - 1 + allIds.length) % allIds.length]);
    });

    document.getElementById('lightboxNext')?.addEventListener('click', () => {
        const allIds = galleryImages.map(i => i.id);
        const idx = allIds.indexOf(currentImageId);
        openLightbox(allIds[(idx + 1) % allIds.length]);
    });

    document.addEventListener('keydown', e => {
        if (!lightbox?.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') document.getElementById('lightboxPrev')?.click();
        if (e.key === 'ArrowRight') document.getElementById('lightboxNext')?.click();
    });

    /* ── Contact form ── */
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    contactForm?.addEventListener('submit', e => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        btn.textContent = 'Sending…';
        btn.disabled = true;

        setTimeout(() => {
            if (formSuccess) {
                formSuccess.style.display = 'block';
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            contactForm.reset();
            btn.textContent = 'Send Message';
            btn.disabled = false;
        }, 900);
    });

});
