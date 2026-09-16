document.addEventListener('DOMContentLoaded', () => {
  const widget = document.getElementById('promoWidget');
  if (!widget) return;

  const closeBtn = document.getElementById('promoWidgetClose');
  const DISMISS_KEY = 'promoWidgetDismissed';

  // Respect a dismissal for the rest of the browser session
  if (sessionStorage.getItem(DISMISS_KEY) === '1') {
    return;
  }

  // Show it after the visitor has scrolled a bit, so it doesn't
  // fight with the hero for attention on first load.
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

  // Fallback: show anyway after 6s even if they haven't scrolled
  setTimeout(() => {
    if (!shown) {
      widget.classList.add('visible', 'pulse');
      shown = true;
    }
  }, 6000);

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      widget.classList.remove('visible');
      sessionStorage.setItem(DISMISS_KEY, '1');
    });
  }
});
