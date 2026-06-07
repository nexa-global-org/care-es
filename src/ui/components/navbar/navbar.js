/* ============================================================
   UI — navbar.js

   Navbar global Shelter
   Compatible con Router SPA de Nexa V3

   Campos:
   about.shelterName
   about.shelterLogo
   about.whatsappNumber
============================================================ */

export const NavbarUI = {

  render(about) {

    const waLink =
      about.whatsappNumber
        ? `https://wa.me/${about.whatsappNumber}`
        : '#';

    const logoImg =
      about.shelterLogo
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

    return /* html */ `
      <nav class="nav" id="nav">

        <a
          href="#hero"
          class="nav-logo"
        >
          ${logoImg}

          <div class="nav-logo-paw">
            🐾
          </div>

          <span class="nav-logo-name">
            ${about.shelterName}
          </span>
        </a>

        <button
          class="nav-toggle"
          id="navToggle"
          aria-label="Abrir menú"
          aria-expanded="false"
        >
          ☰
        </button>

        <div
          class="nav-menu"
          id="navMenu"
        >

          <ul class="nav-links">

            <li>
              <a href="#hero">
                Inicio
              </a>
            </li>

            <li>
              <a
                href="#"
                data-route="pets"
              >
                Adoptar
              </a>
            </li>

            <li>
              <a
                href="#"
                data-route="shop"
              >
                Tienda
              </a>
            </li>

            <li>
              <a href="#nosotros">
                Nosotros
              </a>
            </li>

            <li>
              <a
                href="${waLink}"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contacto
              </a>
            </li>

          </ul>

          <a
            href="#donar"
            class="nav-donar"
          >
            Donar 🤍
          </a>

        </div>

      </nav>
    `;
  },

    init() {

    const toggle =
      document.getElementById('navToggle');

    const menu =
      document.getElementById('navMenu');

    if (!toggle || !menu) {
      return;
    }

    toggle.addEventListener(
      'click',
      () => {

        menu.classList.toggle(
          'nav-menu-open'
        );

        toggle.setAttribute(
          'aria-expanded',
          menu.classList.contains(
            'nav-menu-open'
          )
        );
      }
    );

    const links =
      menu.querySelectorAll('a');

    links.forEach(link => {

      link.addEventListener(
        'click',
        () => {

          menu.classList.remove(
            'nav-menu-open'
          );

          toggle.setAttribute(
            'aria-expanded',
            'false'
          );
        }
      );

    });

  }

};