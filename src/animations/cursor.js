/**
 * Custom Fluid Magnetic Physics Cursor
 * Operates under mix-blend-mode: difference
 */

export function initCursor() {
  // Check if touch device
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    return;
  }

  // Create cursor elements if not present in DOM
  let dot = document.getElementById('custom-cursor-dot');
  let ring = document.getElementById('custom-cursor-ring');

  if (!dot) {
    dot = document.createElement('div');
    dot.id = 'custom-cursor-dot';
    document.body.appendChild(dot);
  }

  if (!ring) {
    ring = document.createElement('div');
    ring.id = 'custom-cursor-ring';
    document.body.appendChild(ring);
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let dotX = mouseX;
  let dotY = mouseY;
  let isHovering = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Attach hover detection to interactive elements
  function attachHoverListeners() {
    const interactiveElements = document.querySelectorAll(
      'a, button, .btn, .nav-link, .discipline-blade, .choice-btn, .dossier-card, .lab-card, input, textarea, select, [data-interactive]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        isHovering = true;
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        isHovering = false;
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  attachHoverListeners();

  // Re-attach periodically or when DOM mutations happen
  const observer = new MutationObserver(() => {
    attachHoverListeners();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Physics animation loop with smooth lerp
  function renderCursor() {
    // Direct position for inner precision dot
    dotX += (mouseX - dotX) * 0.45;
    dotY += (mouseY - dotY) * 0.45;
    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;

    // Smooth lerp damping for outer magnetic ring (0.18 per specification)
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(renderCursor);
  }

  requestAnimationFrame(renderCursor);
}
