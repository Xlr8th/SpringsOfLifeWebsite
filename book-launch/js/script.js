document.addEventListener('DOMContentLoaded', () => {

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Preloader ----
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(() => preloader.remove(), 700);
    }
  });

  // ---- Progress bar + scroll-top visibility ----
  const progressBar = document.getElementById('progressBar');
  const scrollTopBtn = document.getElementById('scrollTop');
  function onScroll() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
    if (scrollTopBtn) scrollTopBtn.classList.toggle('active', window.scrollY > 300);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Nav: button-based hamburger + off-canvas panel + dropdowns ----
  const navToggle = document.getElementById('toggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    const dropdownToggles = mainNav.querySelectorAll('.dropdown-toggle');

    function closeDropdowns(except) {
      dropdownToggles.forEach(toggle => {
        if (toggle === except) return;
        toggle.setAttribute('aria-expanded', 'false');
        toggle.nextElementSibling.classList.remove('show');
      });
    }

    function closeMenu() {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
      closeDropdowns();
    }

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mainNav.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('nav-open', isOpen);
      if (!isOpen) closeDropdowns();
    });

    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const menu = toggle.nextElementSibling;
        const isOpen = menu.classList.contains('show');
        closeDropdowns(toggle);
        menu.classList.toggle('show', !isOpen);
        toggle.setAttribute('aria-expanded', String(!isOpen));
      });
    });

    mainNav.querySelectorAll('a.menu-item').forEach((link) => {
      link.addEventListener('click', () => closeMenu());
    });

    document.addEventListener('click', (e) => {
      if (mainNav.classList.contains('open') &&
          !mainNav.contains(e.target) &&
          !navToggle.contains(e.target)) {
        closeMenu();
      } else if (!mainNav.contains(e.target)) {
        closeDropdowns();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    let wasDesktop = window.innerWidth >= 992;
    window.addEventListener('resize', () => {
      const isDesktop = window.innerWidth >= 992;
      if (isDesktop !== wasDesktop) {
        closeMenu();
        wasDesktop = isDesktop;
      }
    });
  }

  // ---- Lightbox gallery ----
  const photos = Array.from(document.querySelectorAll('.photo'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const photo = photos[currentIndex];
    const img = photo.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = photo.dataset.caption || img.alt || '';
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function showRelative(delta) {
    currentIndex = (currentIndex + delta + photos.length) % photos.length;
    openLightbox(currentIndex);
  }
  photos.forEach((photo, index) => photo.addEventListener('click', () => openLightbox(index)));
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => showRelative(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => showRelative(1));
  if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showRelative(1);
    if (e.key === 'ArrowLeft') showRelative(-1);
  });

});
