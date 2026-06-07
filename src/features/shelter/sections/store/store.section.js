/* ============================================================
   SECTION — store.section.js

   Preview de la tienda solidaria.

   Esta sección NO muestra productos reales.
   Los productos viven exclusivamente en shop.page.js

   Campos usados:
     about.shelterImage
     about.shelterName
============================================================ */
import './store.css';

const IMPACT_CARDS = [
  {
    emoji: '🛍️',
    title: 'Compra',
    description: 'Apoya cada rescate'
  },
  {
    emoji: '🤍',
    title: 'Ayuda',
    description: 'Transforma vidas'
  },
  {
    emoji: '🐾',
    title: 'Impacta',
    description: 'Cada pedido suma'
  },
  {
    emoji: '🌟',
    title: 'Contribuye',
    description: '100% para el refugio'
  }
];

export function renderStore(about) {

  const impactCardsHtml =
    IMPACT_CARDS
      .map(card => `
        <div class="impact-card">

          <span class="impact-icon">
            ${card.emoji}
          </span>

          <strong class="impact-title">
            ${card.title}
          </strong>

          <span class="impact-description">
            ${card.description}
          </span>

        </div>
      `)
      .join('');

  return /* html */ `
    <section
      id="tienda"
      class="tienda-section"
    >

      <div class="tienda-inner reveal-section">

        <div class="tienda-header">

          <span class="tienda-badge">
            Tienda solidaria
          </span>

          <h2 class="tienda-titulo">
            Cada compra<br>
            salva vidas.
          </h2>

          <p class="tienda-sub">
            Cada compra realizada en nuestra tienda ayuda a financiar
            alimento, atención veterinaria y rescates para animales
            que esperan una segunda oportunidad.
          </p>

        </div>

        <div class="tienda-content">

          <!-- Visual -->

          <div class="tienda-visual">

            <div class="tienda-img-frame">

              <div class="tienda-glow"></div>

              <img
                src="${about.shelterImage || ''}"
                alt="Tienda solidaria de ${about.shelterName}"
                class="tienda-img"
                loading="lazy"
                decoding="async"
                onerror="
                  this.removeAttribute('src');
                  this.classList.add('tienda-img-fallback');
                "
              >

              <div class="tienda-tag">
                🤍 Compra con propósito
              </div>

            </div>

          </div>

          <!-- CTA -->

          <div class="tienda-panel">

            <div class="tienda-cta-card">

              <p class="tienda-body">
                Tu compra tiene un impacto real.
                El 100% de las ganancias se destina
                directamente al cuidado de nuestros
                animales rescatados.
              </p>

              <a
                href="#"
                data-route="shop"
                class="tienda-btn"
              >

                <span>
                  Explorar tienda
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
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

              </a>

            </div>

            <div class="tienda-impact-grid">
              ${impactCardsHtml}
            </div>

          </div>

        </div>

      </div>

    </section>
  `;
}