/* ============================================================
   SECTION — hero.section.js

   Hero principal del refugio.

   Campos usados:
     shelterName
     shelterImage
     adoptionForm
     animalsSaved
     whatsappNumber
============================================================ */
import './hero.css';

export function renderHero(about) {

  const whatsapp =
    String(
      about.whatsappNumber || ''
    ).replace(/\D/g, '');

  const waLink =
    whatsapp
      ? `https://wa.me/${whatsapp}`
      : '#';

  const adoptionLink =
    about.adoptionForm || '#';

  const heroImage =
    about.shelterImage || '';

  const animalsSaved =
    about.animalsSaved || 0;

  return /* html */ `

    

    <section
      id="hero"
      class="hero"
    >

      <div class="hero-blob hero-blob-1"></div>
      <div class="hero-blob hero-blob-2"></div>
      <div class="hero-blob hero-blob-3"></div>

      <div class="hero-dots"></div>
      <div class="hero-dots-left"></div>

      <div class="hero-top">

        <div class="hero-badge">
          <span class="hero-badge-dot"></span>
          Refugio ${about.shelterName}
        </div>

        <h1 class="hero-title">
          Solo buscan<br>
          <em>un hogar</em>
        </h1>

        <p class="hero-sub">
          Cada animal que rescatamos tiene una historia.
          Dales una segunda oportunidad: adopta,
          apadrina o apoya desde donde estés.
        </p>

        <div class="hero-actions">

          <a
            href="/pets"
            class="btn-primary"
          >
            Ver mascotas en adopción ↗
          </a>

          <a
            href="${adoptionLink}"
            class="btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Formulario de adopción
          </a>

        </div>

      </div>

      <div class="hero-image-wrap">

        <div class="hero-image-frame">

          <img
            src="${heroImage}"
            alt="Animales de ${about.shelterName}"
            decoding="async"
            fetchpriority="high"
            onerror="
              this.style.background='var(--gradient-card-bg)';
              this.removeAttribute('src');
            "
          >

          <div class="hero-float-card card-1">

            <div class="float-icon green">
              🐶
            </div>

            <div class="float-card-text">
              ${animalsSaved}+
              vidas salvadas

              <small>
                y contando...
              </small>
            </div>

          </div>

          <div class="hero-float-card card-2">

            <div class="float-icon purple">
              🤍
            </div>

            <div class="float-card-text">
              100% al refugio

              <small>
                Cada compra importa
              </small>
            </div>

          </div>

        </div>

      </div>

      <div class="hero-stats-bar">

        <div class="hero-stat">
          <strong>
            ${animalsSaved}+
          </strong>
          <span>
            Vidas salvadas
          </span>
        </div>

        <div class="hero-stat">
          <strong>
            100%
          </strong>
          <span>
            Fondos al refugio
          </span>
        </div>

        <div class="hero-stat">
          <strong>
            100%
          </strong>
          <span>
            Impacto real
          </span>
        </div>

      </div>

    </section>
  `;
}