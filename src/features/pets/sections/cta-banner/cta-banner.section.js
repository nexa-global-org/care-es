/* ============================================================
   SECTION — cta-banner
   Banner oscuro que invita al usuario a comprar.
   No usa campos dinámicos — el contenido es fijo.
============================================================ */

import './cta-banner.css';

export function renderCtaBanner() {
  return /* html */ `
    <div class="cta-banner reveal-section">

      <div class="cta-banner-bg"></div>

      <div class="cta-banner-text">
        <h3>¿Quieres apoyar<br>sin adoptar?</h3>
        <p>
          Compra en nuestra tienda solidaria o dona directamente. 
          Cada sol va al cuidado de nuestros animales.
        </p>
      </div>

      <button class="cta-banner-btn" data-route="shop">
        Ver tienda solidaria
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor"
                stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

    </div>
  `;
}