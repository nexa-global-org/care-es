/* ============================================================
   ADOPTION SECTION
   Preview de adopciones para la landing.

   Fixes aplicados:
   ─────────────────────────────────────────────────────────
   1. LOOP SEAMLESS: se generan 4 grupos idénticos.
      La animación CSS mueve -50% (= 2 grupos completos).
      Cuando llega al punto de reset, los grupos 3–4 son
      visualmente idénticos a 1–2, sin ningún salto visible.
      Con 2 grupos y pocas cards (ej. 1–4 mascotas) el track
      era más corto que la pantalla y el gap aparecía.

   2. banco.png FUERA del .carousel-wrapper:
      El wrapper tiene overflow:hidden para cortar las cards
      lateralmente. Si banco.png está dentro, ese overflow
      lo recorta o lo empuja. Ahora vive directo en la
      sección como último elemento, y el CSS lo posiciona
      con absolute en el borde inferior de .content-section.
============================================================ */

import './adoption.css';

const MAX_PREVIEW_PETS = 4;

/* Número de grupos duplicados. Con 4 el loop nunca muestra
   un hueco, incluso en pantallas muy anchas o con pocas cards. */
const GROUP_COUNT = 4;

export function renderAdoption(about, pets = []) {

  const visiblePets = Array.isArray(pets)
    ? pets.slice(0, MAX_PREVIEW_PETS)
    : [];

  const cardsHtml = visiblePets.length
    ? visiblePets.map(pet => /* html */`
        <article class="pet-carousel-card">

          <div class="card-glow"></div>

          ${pet.image
            ? /* html */`
                <img
                  src="${pet.image}"
                  alt="${pet.name}"
                  loading="lazy"
                  decoding="async"
                  onerror="
                    this.remove();
                    this.closest('.pet-carousel-card')
                      .insertAdjacentHTML('afterbegin',
                        '<div class=\\'pet-card-fallback\\'>🐾</div>'
                      );
                  "
                >
              `
            : /* html */`<div class="pet-card-fallback">🐾</div>`
          }

          <h3>${pet.name || 'Mascota'}</h3>

          <button class="pet-card-btn" data-route="pets">
            Conóceme
          </button>

        </article>
      `).join('')
    : /* html */`
        <article class="pet-carousel-card pet-carousel-card--placeholder">
          <div class="card-glow"></div>
          <div class="pet-card-fallback">🐾</div>
          <h3>Próximamente</h3>
          <p class="pet-placeholder-text">
            Nuevos amigos estarán disponibles muy pronto.
          </p>
        </article>
      `;

  /*
    Genera N grupos idénticos.
    El primero es el "real" (aria visible), el resto son
    aria-hidden para que los lectores de pantalla no los repitan.
  */
  const groupsHtml = Array.from({ length: GROUP_COUNT }, (_, i) => /* html */`
    <div class="group" ${i > 0 ? 'aria-hidden="true"' : ''}>
      ${cardsHtml}
    </div>
  `).join('');

  return /* html */`
    <section
      id="adoptar"
      class="content-section reveal-section"
    >

      <div class="section-heading">

        <span class="section-badge">Adopta una vida</span>

        <h2>Ellos te necesitan</h2>

        <p>
          Conoce a nuestros peluditos y encuentra
          a ese amigo que cambiará tu vida para siempre.
        </p>

        <div class="section-buttons">

          <button class="primary-btn" data-route="pets">
            Ver todas las mascotas
          </button>

          ${about.adoptionForm
            ? /* html */`
                <a
                  href="${about.adoptionForm}"
                  class="secondary-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Formulario de adopción
                </a>
              `
            : ''
          }

        </div>

      </div>

      <!-- Carrusel: overflow:hidden solo recorta lateralmente -->
      <div class="carousel-wrapper">
        <div class="carousel-track">
          ${groupsHtml}
        </div>
      </div>

      <!--
        banco.png FUERA del wrapper.
        El CSS lo posiciona absolute en el bottom de
        .content-section → toca exactamente el borde
        superior de .historia-section (about).
        z-index:5 la superpone sobre las cards.
      -->
      <img
        src="/assets/backgrounds/banco.png"
        alt=""
        class="carrusel-bg"
        loading="lazy"
        aria-hidden="true"
      >

    </section>
  `;
}