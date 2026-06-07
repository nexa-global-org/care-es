/* ============================================================
   EFFECT — navbar-scroll.js

   Añade la clase "scrolled"
   al navbar cuando el usuario
   hace scroll más de 20px.

   Compatible con SPA.
============================================================ */

let initialized = false;

function handleNavbarScroll() {

  const nav =
    document.getElementById('nav');

  if (!nav) {
    return;
  }

  nav.classList.toggle(
    'scrolled',
    window.scrollY > 20
  );
}

export function initNavbarScroll() {

  if (initialized) {
    return;
  }

  initialized = true;

  window.addEventListener(
    'scroll',
    handleNavbarScroll,
    { passive: true }
  );

  handleNavbarScroll();
}