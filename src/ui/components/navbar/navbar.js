/* ============================================================
   UI — navbar.js
   Solo responsabilidad: generar el HTML del navbar.

   El toggle hamburguesa lo inicializa effects/index.js
   via initNavbar() accediendo al DOM directamente,
   evitando imports circulares con el bundler.

   Campos usados:
     about.shelterName
     about.shelterLogo
     about.whatsappNumber
============================================================ */

import './navbar.css';

export const NavbarUI = {

  render(about) {

    const waLink = about.whatsappNumber
      ? `https://wa.me/${about.whatsappNumber}`
      : '#';

    const logoImg = about.shelterLogo
      ? `
          <img
            src="${about.shelterLogo}"
            alt="${about.shelterName}"
            class="nav-logo-img"
            loading="eager"
            decoding="async"
            onerror="this.style.display='none'"
          >
        `
      : '';

    return `
      <nav class="nav" id="nav">

        <a href="#hero" class="nav-logo">
          ${logoImg}
          <span class="nav-logo-name">${about.shelterName}</span>
        </a>

        <button
          class="nav-toggle"
          id="navToggle"
          aria-label="Abrir menú"
          aria-expanded="false"
        >☰</button>

        <div class="nav-menu" id="navMenu">

          <ul class="nav-links">
            <li><a href="#hero">Inicio</a></li>
            <li><a href="#" data-route="pets">Adoptar</a></li>
            <li><a href="#" data-route="shop">Tienda</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
            <li>
              <a href="${waLink}" target="_blank" rel="noopener noreferrer">
                Contacto
              </a>
            </li>
          </ul>

          <a href="#donar" class="nav-donar">Donar 🤍</a>

        </div>

      </nav>
    `;
  },

};