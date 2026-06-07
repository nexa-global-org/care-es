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

  initNavbarScroll();

  initSmoothScroll();

  initRevealOnScroll();

  initHeroParallax();
}