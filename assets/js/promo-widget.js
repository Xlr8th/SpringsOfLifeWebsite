document.addEventListener('DOMContentLoaded', () => {

  // ============ ADD FUTURE UPDATES HERE ============
  // Newest first. Each item needs: tag, title, href, image.
  const UPDATES = [
    {
      tag: 'Latest Update',
      title: 'Our Alumni Are on Fire: Highlights from the Maiden MTC Reboot Conference',
      href: '/mtc-blog/index.html',
      image: '/mtc-blog/images/flyer.jpg'
    },
    {
      tag: 'Press Release',
      title: 'SOL Premieres Three Transformative Books by Pastor Henry Oise',
      href: '/book-launch/index.html',
      image: '/book-launch/images/flyer.jpg'
    }
  ];
  // ===================================================

  const widget = document.getElementById('luWidget');
  if (!widget || UPDATES.length === 0) return;

  const body   = document.getElementById('luBody');
  const thumb  = document.getElementById('luThumb');
  const tagEl  = document.getElementById('luTag');
  const titleEl = document.getElementById('luTitle');
  const navEl  = document.getElementById('luNav');
  const closeBtn = document.getElementById('luClose');

  const DISMISS_KEY = 'luWidgetDismissed';
  if (sessionStorage.getItem(DISMISS_KEY) === '1') return;

  let index = 0;
  let rotateTimer = null;

  function render() {
    const item = UPDATES[index];
    body.href = item.href;
    thumb.src = item.image;
    thumb.alt = '';
    tagEl.textContent = item.tag;
    titleEl.textContent = item.title;

    navEl.querySelectorAll('button').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function buildDots() {
    if (UPDATES.length <= 1) { navEl.style.display = 'none'; return; }
    navEl.innerHTML = '';
    UPDATES.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Show update ${i + 1}`);
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        index = i;
        render();
        restartRotation();
      });
      navEl.appendChild(dot);
    });
  }

  function rotate() {
    index = (index + 1) % UPDATES.length;
    render();
  }

  function restartRotation() {
    clearInterval(rotateTimer);
    if (UPDATES.length > 1) {
      rotateTimer = setInterval(rotate, 7000);
    }
  }

  buildDots();
  render();
  restartRotation();

  widget.addEventListener('mouseenter', () => clearInterval(rotateTimer));
  widget.addEventListener('mouseleave', restartRotation);

  // Show after scrolling ~half a screen, with a 6s fallback
  let shown = false;
  function maybeShow() {
    if (shown) return;
    if (window.scrollY > window.innerHeight * 0.5) {
      widget.classList.add('visible', 'pulse');
      shown = true;
      window.removeEventListener('scroll', maybeShow);
    }
  }
  window.addEventListener('scroll', maybeShow, { passive: true });
  setTimeout(() => { if (!shown) { widget.classList.add('visible', 'pulse'); shown = true; } }, 6000);

  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    widget.classList.remove('visible');
    clearInterval(rotateTimer);
    sessionStorage.setItem(DISMISS_KEY, '1');
  });

});