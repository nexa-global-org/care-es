/* ============================================================
   SECTION — history.section.js

   Historias reales:
   transformación antes y después del rescate.

   Campos usados:
     beforeHistory
     afterHistory
     beforeImage
     afterImage
============================================================ */
import './history.css';

export function renderHistory(about) {

  const beforeTitle =
    about.beforeHistory ||
    'Antes del rescate';

  const afterTitle =
    about.afterHistory ||
    'Después del rescate';

  const beforeImage =
    about.beforeImage || '';

  const afterImage =
    about.afterImage || '';

  return /* html */ `

    <section
      id="historia"
      class="pet-stories"
    >

      <div class="pet-stories-inner">

        <div class="pet-stories-header reveal-section">

          <span class="section-badge">
            Historias reales
          </span>

          <h2 class="section-title">
            Cada rescate<br>
            <em>cambia todo</em>
          </h2>

          <p class="section-sub">
            Detrás de cada animal hay un antes y un después.
            Tu apoyo hace posible esta transformación.
          </p>

        </div>

        <div class="pet-cards">

          <article
            class="pet-card reveal-card"
            style="--delay:0ms"
          >

            <div class="pet-card-img">

              <img
                src="${beforeImage}"
                alt="${beforeTitle}"
                loading="lazy"
                decoding="async"
                onerror="
                  this.style.background='var(--gradient-card-bg)';
                  this.removeAttribute('src');
                "
              >

              <span class="pet-label before">
                Antes
              </span>

              <div class="pet-card-icon">
                😔
              </div>

            </div>

            <div class="pet-card-body">
              <h2>${beforeTitle}</h2>
            </div>

          </article>

          <article
            class="pet-card reveal-card"
            style="--delay:120ms"
          >

            <div class="pet-card-img">

              <img
                src="${afterImage}"
                alt="${afterTitle}"
                loading="lazy"
                decoding="async"
                onerror="
                  this.style.background='linear-gradient(
                    135deg,
                    #d0f0e4,
                    #a8e6ce
                  )';
                  this.removeAttribute('src');
                "
              >

              <span class="pet-label after">
                Después
              </span>

              <div class="pet-card-icon">
                🥰
              </div>

            </div>

            <div class="pet-card-body">
              <h2>${afterTitle}</h2>
            </div>

          </article>

        </div>

        <div class="pet-connector">

          <div class="pet-connector-line"></div>

          <div class="pet-connector-pill">
            💜 Tu adopción escribe esta historia
          </div>

        </div>

      </div>

    </section>
  `;
}