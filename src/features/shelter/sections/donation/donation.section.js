/* ============================================================
   SECTION — donation.section.js

   Sección "Donar" con QR dinámico y tarjetas de impacto.

   Campos usados:
     about.donationQR
     about.donationPhone
     about.shelterName
============================================================ */
import './donation.css';

export function renderDonation(about) {

  const shelterName =
    about.shelterName ||
    'este refugio';

  const qrContent =
    about.donationQR?.trim()
      ? `
          <img
            src="${about.donationQR}"
            alt="QR para donar a ${shelterName}"
            class="qr-image"
            loading="lazy"
            decoding="async"
          >
        `
      : _qrPlaceholder();

  const phoneLabel =
    about.donationPhone?.trim()
      ? `Al: ${about.donationPhone}`
      : 'Número no disponible';

  return /* html */ `

    <section id="donar" class="donar-section">

      <div class="donar-blob donar-blob-1"></div>
      <div class="donar-blob donar-blob-2"></div>

      <div class="donar-inner reveal-section">

        <div class="donar-heading">

          <span class="donar-badge">
            Haz la diferencia hoy
          </span>

          <h2 class="donar-titulo">
            Tu ayuda<br>salva vidas reales
          </h2>

          <p class="donar-sub">
            Cada sol que donas se convierte en alimento,
            medicina y un techo para quien más lo necesita.
          </p>

        </div>

        <div class="donar-cards">

          <div class="qr-card">

            <div class="qr-card-glow"></div>

            <p class="qr-card-label">
              Escanea y dona ahora
            </p>

            <div
              class="qr-placeholder"
              aria-label="Código QR para donaciones"
            >
              ${qrContent}
            </div>

            <div class="qr-methods">

              <span class="qr-method yape">
                Yape
              </span>

              <span class="qr-method plin">
                Plin
              </span>

              <span class="qr-method banco">
                ${phoneLabel}
              </span>

            </div>

            <p class="qr-message">
              "Con S/20 alimentamos a un animal durante una semana."
            </p>

          </div>

          <div class="impacto-cards">

            <article class="impacto-item">
              <span class="impacto-icon">🍖</span>

              <div>
                <strong>S/ 20</strong>
                <span>Una semana de alimento</span>
              </div>
            </article>

            <article class="impacto-item">
              <span class="impacto-icon">💉</span>

              <div>
                <strong>S/ 50</strong>
                <span>Vacuna completa</span>
              </div>
            </article>

            <article class="impacto-item">
              <span class="impacto-icon">🏥</span>

              <div>
                <strong>S/ 120</strong>
                <span>Consulta veterinaria</span>
              </div>
            </article>

            <article class="impacto-item">
              <span class="impacto-icon">🏠</span>

              <div>
                <strong>Sé padrino</strong>
                <span>Apoya a un perrito</span>
              </div>
            </article>

          </div>

        </div>

      </div>

    </section>
  `;
}

function _qrPlaceholder() {

  return /* html */ `

    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="QR de donación pendiente de configurar"
    >

      <rect
        x="10"
        y="10"
        width="40"
        height="40"
        rx="6"
        fill="#1e1d2a"
        opacity=".9"
      />

      <rect
        x="18"
        y="18"
        width="24"
        height="24"
        rx="3"
        fill="white"
      />

      <rect
        x="22"
        y="22"
        width="16"
        height="16"
        rx="2"
        fill="#1e1d2a"
      />

      <rect
        x="70"
        y="10"
        width="40"
        height="40"
        rx="6"
        fill="#1e1d2a"
        opacity=".9"
      />

      <rect
        x="78"
        y="18"
        width="24"
        height="24"
        rx="3"
        fill="white"
      />

      <rect
        x="82"
        y="22"
        width="16"
        height="16"
        rx="2"
        fill="#1e1d2a"
      />

      <rect
        x="10"
        y="70"
        width="40"
        height="40"
        rx="6"
        fill="#1e1d2a"
        opacity=".9"
      />

      <rect
        x="18"
        y="78"
        width="24"
        height="24"
        rx="3"
        fill="white"
      />

      <rect
        x="22"
        y="82"
        width="16"
        height="16"
        rx="2"
        fill="#1e1d2a"
      />

      <rect
        x="56"
        y="10"
        width="8"
        height="8"
        rx="2"
        fill="#6d4cff"
        opacity=".8"
      />

      <rect
        x="10"
        y="56"
        width="8"
        height="8"
        rx="2"
        fill="#6d4cff"
        opacity=".8"
      />

      <rect
        x="56"
        y="56"
        width="8"
        height="8"
        rx="2"
        fill="#1e1d2a"
      />

      <rect
        x="70"
        y="56"
        width="8"
        height="8"
        rx="2"
        fill="#1e1d2a"
      />

      <rect
        x="84"
        y="56"
        width="8"
        height="8"
        rx="2"
        fill="#6d4cff"
        opacity=".8"
      />

      <rect
        x="56"
        y="70"
        width="8"
        height="8"
        rx="2"
        fill="#1e1d2a"
      />

      <rect
        x="70"
        y="70"
        width="8"
        height="8"
        rx="2"
        fill="#6d4cff"
        opacity=".6"
      />

      <rect
        x="84"
        y="70"
        width="8"
        height="8"
        rx="2"
        fill="#1e1d2a"
      />

    </svg>
  `;
}