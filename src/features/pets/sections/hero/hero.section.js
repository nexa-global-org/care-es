/* ============================================================
   SECTION — pets hero
   Campos usados de about: shelterName, animalsSaved, shelterImage
============================================================ */

import './hero.css';

export function renderPetsHero(about) {
  const shelterName  = about.shelterName  || 'Refugio';
  const animalsSaved = about.animalsSaved || '0';
  const heroImage    = about.shelterImage || '';

  return /* html */ `
    <section class="pets-hero">

      <div class="pets-hero-bg">
        <div class="pets-hero-blob pets-hero-blob-1"></div>
        <div class="pets-hero-blob pets-hero-blob-2"></div>
        <div class="pets-hero-dots"></div>
      </div>

      <div class="pets-hero-inner">

        <div class="pets-hero-text">

          <div class="pets-hero-badge">
            <span class="pets-hero-badge-dot"></span>
            Mascotas en adopción
          </div>

          <h1 class="pets-hero-title">
            Ellos esperan<br><em>un hogar</em>
          </h1>

          <p class="pets-hero-sub">
            Cada uno tiene una historia única. Encuéntralos,
            conócelos y da el paso más importante de tu vida:
            dale una familia a quien más lo necesita.
          </p>

          <div class="pets-hero-stats">
            <div class="pets-hero-stat">
              <strong>${animalsSaved}+</strong>
              <span>Rescatados</span>
            </div>
            <div class="pets-hero-stat">
              <strong>100%</strong>
              <span>Con vacunas</span>
            </div>
            <div class="pets-hero-stat">
              <strong>∞</strong>
              <span>Amor que dan</span>
            </div>
          </div>

        </div>

        <div class="pets-hero-visual">
          <div class="pets-hero-img-wrap">
            <img
              src="${heroImage}"
              alt="Mascotas de ${shelterName}"
              loading="eager"
              decoding="async"
              onerror="
                this.style.background='linear-gradient(135deg,#ece9f6,#d8d3f0)';
                this.removeAttribute('src');
              "
            >
            <div class="pets-hero-img-badge">🐾 Listos para adoptarse</div>
          </div>
        </div>

      </div>

    </section>
  `;
}