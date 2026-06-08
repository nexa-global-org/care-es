/* ============================================================
   SECTION — about
============================================================ */

import './about.css';

export function renderAbout(about) {

  const shelterName  = about.shelterName  || 'Nuestro refugio';
  const story        = about.shelterStory || '';
  const storyImage   = about.storyImage   || '';
  const address      = about.address      || '';
  const animalsSaved = about.animalsSaved || '0';
  const yearsActive  = about.yearsActive  || '0';
  const volunteers   = about.volunteers   || '0';
  const volunteersForm = about.volunteersForm || '#';

  return /* html */ `
    <section id="nosotros" class="historia-section">

      <div class="historia-inner reveal-section">

        <div class="historia-grid">

          <div class="historia-text">

            <span class="historia-badge">
              Nuestra historia
            </span>

            <h2 class="historia-titulo">
              Nacimos del amor,<br>no del deber
            </h2>

            <p class="historia-body">
              ${story}
            </p>

            <div class="historia-stats">

              <div class="stat-item">
                <span class="stat-num">${animalsSaved}</span>
                <span class="stat-label">Animales rescatados</span>
              </div>

              <div class="stat-divider"></div>

              <div class="stat-item">
                <span class="stat-num">${yearsActive}</span>
                <span class="stat-label">Años de amor constante</span>
              </div>

              <div class="stat-divider"></div>

              <div class="stat-item">
                <span class="stat-num">${volunteers}</span>
                <span class="stat-label">Voluntarios activos</span>
              </div>

            </div>

          </div>

          <div class="historia-visual">

            <div class="historia-img-wrap">

              <div class="historia-glow"></div>

              <img
                src="${storyImage}"
                alt="Equipo de ${shelterName}"
                class="historia-img"
                loading="lazy"
                decoding="async"
                onerror="
                  this.style.background='linear-gradient(135deg,#ece9f6,#d8d3f0)';
                  this.removeAttribute('src');
                "
              >

              <div class="historia-img-caption">
                <span>${address}</span>
              </div>

            </div>

            <a
              href="${volunteersForm}"
              class="historia-floating-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="floating-emoji">🐾</span>
              <div>
                <strong>Sé voluntario</strong>
                <span>Haz clic aquí →</span>
              </div>
            </a>

          </div>

        </div>

      </div>

    </section>
  `;
}