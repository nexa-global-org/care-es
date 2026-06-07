import './floating-actions.css';

export function renderFloatingActions(about = {}) {

  const phone =
    (about.whatsappNumber || '')
      .replace(/\D/g, '');

  const waLink =
    phone
      ? `https://wa.me/${phone}`
      : null;

  return `
    <div class="floating-actions">

      ${
        waLink
          ? `
          <a
            href="${waLink}"
            class="floating-btn whatsapp-btn"
            aria-label="Contactar por WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/icons/whatsapp.svg"
              alt="WhatsApp"
              loading="lazy"
              decoding="async"
              onerror="this.outerHTML='<span>💬</span>'"
            >
          </a>
          `
          : ''
      }

      <a
        href="#donar"
        class="floating-btn donate-btn"
        aria-label="Ir a sección de donaciones"
      >
        <img
          src="/assets/icons/donate.svg"
          alt="Donar"
          loading="lazy"
          decoding="async"
          onerror="this.outerHTML='<span>🤍</span>'"
        >
      </a>

    </div>
  `;
}