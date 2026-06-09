/* ============================================================
   SECTION — nexa.section.js

   Sección institucional de Nexa.
   Contenido fijo (no viene del Sheet).

   Cuando exista la web oficial:
   reemplazar NEXA_URL.
============================================================ */

const NEXA_URL =
  'https://www.linkedin.com/company/nexa-global-impact-org';

const NEXA_LOGO =
  '/assets/logos/nexa-logo.png';

const NEXA_BANNER =
  '/assets/backgrounds/banner.png';

import './nexa.css';

export function renderNexa() {
  return /* html */ `
    <section
      id="nexa"
      class="nexa-section"
    >

      <div
        class="nexa-top-wave"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 L1440,0 L1440,30
               Q1080,90 720,60
               Q360,30 0,80 Z"
            fill="#1a1530"
          />
        </svg>
      </div>

      <div
        class="nexa-bg-shapes"
        aria-hidden="true"
      >
        <div class="nexa-shape nexa-shape-1"></div>
        <div class="nexa-shape nexa-shape-2"></div>
        <div class="nexa-shape nexa-shape-3"></div>
      </div>

      <div
        class="nexa-inner reveal-section"
      >
        <div class="nexa-grid">

          <!-- TEXTO -->

          <div class="nexa-text">

            <div class="nexa-made-by">
              <span class="nexa-dot"></span>
              Esta web fue hecha por
            </div>

            <div class="nexa-logo-wrap">

              <img
                src="${NEXA_LOGO}"
                alt="Nexa"
                class="nexa-logo-img"
                loading="lazy"
                decoding="async"
                onerror="this.remove()"
              >

              <h2 class="nexa-brand">
                Nexa
              </h2>

            </div>

            <p class="nexa-tagline">
              Tecnología al servicio
              <br>
              del bien común.
            </p>

            <p class="nexa-body">
              Somos una organización que impulsa
              proyectos sociales mediante tecnología.
              Diseñamos y construimos plataformas
              digitales como esta de forma
              <strong>gratuita</strong>,
              acompañando a los equipos para que
              puedan administrarlas y crecer de
              manera autónoma.
            </p>

            <div class="nexa-pills">

              <div class="nexa-pill">
                <span class="nexa-pill-icon">💻</span>
                <span>Webs gratuitas</span>
              </div>

              <div class="nexa-pill">
                <span class="nexa-pill-icon">🎓</span>
                <span>Capacitación incluida</span>
              </div>

              <div class="nexa-pill">
                <span class="nexa-pill-icon">🤝</span>
                <span>Impacto social</span>
              </div>

            </div>

            <a
              href="${NEXA_URL}"
              class="nexa-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                Conoce nuestros proyectos
              </span>

              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

            </a>

          </div>

          <!-- VISUAL -->

          <div class="nexa-visual">

            <div class="nexa-hero-img-wrap">

              <img
                src="${NEXA_BANNER}"
                alt="Tecnología social Nexa"
                loading="lazy"
                decoding="async"
                onerror="
                  this.style.display='none';
                  this.parentElement.classList.add('nexa-banner-fallback');
                "
              >

            </div>

            <div class="nexa-card-stack">

              <div
                class="nexa-card nexa-card-main"
              >

                <div class="nexa-card-glow"></div>

                <div class="nexa-card-header">

                  <div class="nexa-card-avatar">

                    <img
                      src="${NEXA_LOGO}"
                      alt="Equipo Nexa"
                      loading="lazy"
                      decoding="async"
                      onerror="
                        this.parentElement.innerHTML='🚀'
                      "
                    >

                  </div>

                  <div>
                    <strong>Nexa</strong>
                    <span>
                      Tecnología social
                    </span>
                  </div>

                </div>

                <p class="nexa-card-quote">
                  "Creemos que la tecnología no
                  debe ser un privilegio.
                  Toda organización social merece
                  herramientas de primer nivel."
                </p>

                <div class="nexa-card-stats">

                  <div class="nexa-cstat">
                    <strong>12+</strong>
                    <span>Proyectos</span>
                  </div>

                  <div class="nexa-cstat">
                    <strong>100%</strong>
                    <span>Gratuito</span>
                  </div>

                  <div class="nexa-cstat">
                    <strong>∞</strong>
                    <span>Impacto</span>
                  </div>

                </div>

              </div>

              <div
                class="nexa-card nexa-card-float"
              >

                <span class="nexa-float-icon">
                  🚀
                </span>

                <div>
                  <strong>
                    Tu proyecto
                  </strong>
                  <span>
                    podría ser el siguiente
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      <div
        class="nexa-bottom-wave"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 70"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,70 L1440,70 L1440,40
               Q1080,0 720,30
               Q360,60 0,10 Z"
            fill="currentColor"
          />
        </svg>
      </div>

    </section>
  `;
}