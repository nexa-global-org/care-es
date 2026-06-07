/* ============================================================
   EFFECTS — index.js

   Punto único de inicialización de efectos globales.

   Uso:
     import {
       initAllEffects
     } from '../../effects/index.js';

     initAllEffects();

============================================================ */

/* ── Exports individuales ─────────────────────────────────── */

export {
  initNavbarScroll
} from './navbar-scroll.js';

export {
  initSmoothScroll
} from './smooth-scroll.js';

export {
  initRevealOnScroll
} from './reveal-on-scroll.js';

export {
  initHeroParallax
} from './hero-parallax.js';

/* ── Imports internos ─────────────────────────────────────── */

import {
  initNavbarScroll
} from './navbar-scroll.js';

import {
  initSmoothScroll
} from './smooth-scroll.js';

import {
  initRevealOnScroll
} from './reveal-on-scroll.js';

import {
  initHeroParallax
} from './hero-parallax.js';

/* ── Inicialización global ────────────────────────────────── */

export function initAllEffects() {
  initNavbar();          // toggle hamburguesa — DEBE ir primero (DOM ya montado)

  initNavbarScroll();

  initSmoothScroll();

  initRevealOnScroll();

  initHeroParallax();
}

/* ── Navbar toggle — DOM directo, sin import NavbarUI ────── */
/*
  Misma lógica que NavbarUI.init() pero accede al DOM
  directamente para evitar el import circular que rompe
  el build de Vite/Rolldown.
*/

function initNavbar() {

  const toggle =
    document.getElementById('navToggle');

  const menu =
    document.getElementById('navMenu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {

    const isOpen =
      menu.classList.toggle('nav-menu-open');

    toggle.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

    toggle.textContent = isOpen ? '✕' : '☰';
  });

  menu.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', () => {
      menu.classList.remove('nav-menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    });

  });

  document.addEventListener('click', (e) => {

    if (!e.target.closest('#nav')) {
      menu.classList.remove('nav-menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }

  });
}