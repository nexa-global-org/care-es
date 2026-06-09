/* ============================================================
   SECTION — shop hero
   Campos usados de about: shelterName, animalsSaved, shelterImage
============================================================ */

import './hero.css';

export function renderShopHero(about) {
  const shelterName  = about.shelterName  || 'Refugio';
  const animalsSaved = about.animalsSaved || '0';
  const heroImage    = about.shelterImage || '';

  return /* html */ `
    <section class="shop-hero">

      <div class="shop-hero-bg">
        <div class="shop-hero-blob shop-hero-blob-1"></div>
        <div class="shop-hero-blob shop-hero-blob-2"></div>
        <div class="shop-hero-dots"></div>
      </div>

      <div class="shop-hero-inner">

        <div class="shop-hero-text">

          <div class="shop-hero-badge">
            <span class="shop-hero-badge-dot"></span>
            Tienda solidaria
          </div>

          <h1 class="shop-hero-title">
            Compra con<br><em>propósito</em>
          </h1>

          <p class="shop-hero-sub">
            Cada producto que eliges financia rescates, vacunas
            y el hogar temporal de quienes más lo necesitan.
          </p>

          <div class="shop-hero-stats">
            <div class="shop-hero-stat">
              <strong>100%</strong>
              <span>Al refugio</span>
            </div>
            <div class="shop-hero-stat">
              <strong>${animalsSaved}+</strong>
              <span>Vidas salvadas</span>
            </div>
            <div class="shop-hero-stat">
              <strong>∞</strong>
              <span>Impacto real</span>
            </div>
          </div>

        </div>

        <div class="shop-hero-visual">
          <div class="shop-hero-img-wrap">
            <img
              src="${heroImage}"
              alt="Productos de ${shelterName}"
              loading="eager"
              decoding="async"
              onerror="
                this.style.background='linear-gradient(135deg,#ece9f6,#d8d3f0)';
                this.removeAttribute('src');
              "
            >
            <div class="shop-hero-img-badge">🐾 Hecho con amor</div>
          </div>
        </div>

      </div>

    </section>
  `;
}