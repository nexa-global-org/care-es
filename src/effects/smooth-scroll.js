/* ============================================================
   EFFECT — smooth-scroll.js

   Gestiona los enlaces internos (#hash)
   para aplicar smooth scroll.

   Compatible con SPA:
   - Sólo registra el listener una vez.
   - Ignora enlaces externos.
============================================================ */

let initialized = false;

export function initSmoothScroll() {

  if (initialized) {
    return;
  }

  initialized = true;

  document.addEventListener(
    'click',
    handleAnchorClick
  );
}

function handleAnchorClick(event) {

  const anchor =
    event.target.closest('a[href^="#"]');

  if (!anchor) {
    return;
  }

  const hash =
    anchor.getAttribute('href');

  if (!hash || hash === '#') {
    return;
  }

  const target =
    document.querySelector(hash);

  if (!target) {
    return;
  }

  event.preventDefault();

  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}