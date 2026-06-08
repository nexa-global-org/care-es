/* ============================================================
   UI — footer.js

   Footer dinámico del refugio.
============================================================ */
import './footer.css';
import {
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  YouTubeIcon
} from '../../icons/index.js';

const NEXA_URL =
  'https://www.linkedin.com/company/nexa-global-impact-org';

export const FooterUI = {

  render(about) {

    const year = new Date().getFullYear();

    const phone = (about.whatsappNumber || '').replace(/\D/g, '');

    const waLink = phone ? `https://wa.me/${phone}` : '#';

    const logo = about.shelterLogo
      ? `
          <img
            src="${about.shelterLogo}"
            alt="${about.shelterName}"
            class="footer-logo-img"
            loading="lazy"
            decoding="async"
            onerror="this.remove()"
          >
        `
      : `
          <div class="footer-logo-fallback">
            🐾
          </div>
        `;

    return /* html */ `
      <footer class="site-footer">

        <div class="footer-inner">

          <div class="footer-top">

            <!-- Marca -->
            <div class="footer-brand">
              <div class="footer-logo">
                ${logo}
                <span class="footer-logo-text">
                  ${about.shelterName}
                </span>
              </div>

              <p class="footer-tagline-text">
                Cada vida merece una segunda oportunidad.
              </p>

              <div class="footer-socials">
                ${_socialLink(about.instagramLink,'Instagram',InstagramIcon())}
                ${_socialLink(about.facebookLink,'Facebook',FacebookIcon())}
                ${_socialLink(about.tiktokLink,'TikTok',TikTokIcon())}
                ${_socialLink(about.youtubeLink,'YouTube',YouTubeIcon())}
              </div>
            </div>

            <!-- Adopta -->
            <div class="footer-links-group">
              <h4>Adopta</h4>
              <ul>
                <li><a href="#" data-route="pets">Ver mascotas</a></li>
                ${
                  about.adoptionForm
                    ? `
                      <li>
                        <a href="${about.adoptionForm}" target="_blank" rel="noopener noreferrer">
                          Formulario de adopción
                        </a>
                      </li>
                    `
                    : ''
                }
                <li><a href="#historia">Historias reales</a></li>
              </ul>
            </div>

            <!-- Apoya -->
            <div class="footer-links-group">
              <h4>Apoya</h4>
              <ul>
                <li><a href="#donar">Donar</a></li>
                <li><a href="#" data-route="shop">Tienda solidaria</a></li>
                ${
                  about.volunteersForm
                    ? `
                      <li>
                        <a href="${about.volunteersForm}" target="_blank" rel="noopener noreferrer">
                          Sé voluntario
                        </a>
                      </li>
                    `
                    : ''
                }
              </ul>
            </div>

            <!-- Nosotros -->
            <div class="footer-links-group">
              <h4>Nosotros</h4>
              <ul>
                <li><a href="#nosotros">Nuestra historia</a></li>
                ${
                  phone
                    ? `
                      <li>
                        <a href="${waLink}" target="_blank" rel="noopener noreferrer">
                          Contacto
                        </a>
                      </li>
                    `
                    : ''
                }
                <li>
                  <a href="${NEXA_URL}" target="_blank" rel="noopener noreferrer">
                    Alianzas
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div class="footer-divider"></div>

          <div class="footer-bottom">
            <p class="footer-copy">© ${year} ${about.shelterName}</p>
            <div class="footer-nexa-credit">
              <span>Hecho con</span>
              <span class="footer-heart">♥</span>
              <span>por</span>
              <a href="${NEXA_URL}" class="footer-nexa-link" target="_blank" rel="noopener noreferrer">
                <span class="footer-nexa-dot"></span>
                Nexa
              </a>
            </div>
          </div>

        </div>

      </footer>
    `;
  }

};


/* ============================================================
   Helpers
============================================================ */

function _socialLink(
  href,
  label,
  iconSvg
) {

  if (!href) {
    return '';
  }

  return /* html */ `
    <a
      href="${href}"
      class="footer-social ui-icon"
      aria-label="${label}"
      target="_blank"
      rel="noopener noreferrer"
    >
      ${iconSvg}
    </a>
  `;
}