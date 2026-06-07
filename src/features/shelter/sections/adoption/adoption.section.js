/* ============================================================
   ADOPTION SECTION
   Preview de adopciones para la landing.

   Campos usados:

   about.adoptionForm

   pets[]
   ├─ name
   └─ image

   Solo muestra una pequeña muestra de mascotas.
   El catálogo completo vive en pets.page.js
============================================================ */

const MAX_PREVIEW_PETS = 4;

export function renderAdoption(
  about,
  pets = []
) {

  const visiblePets =
    Array.isArray(pets)
      ? pets.slice(0, MAX_PREVIEW_PETS)
      : [];

  const cardsHtml =
    visiblePets.length
      ? visiblePets
          .map(
            pet => /* html */ `
              <article class="pet-carousel-card">

                <div class="card-glow"></div>

                ${
                  pet.image
                    ? `
                      <img
                        src="${pet.image}"
                        alt="${pet.name}"
                        loading="lazy"
                        decoding="async"
                        onerror="
                          this.remove();
                          this.parentNode.insertAdjacentHTML(
                            'beforeend',
                            '<div class=&quot;pet-card-fallback&quot;>🐾</div>'
                          );
                        "
                      >
                    `
                    : `
                      <div class="pet-card-fallback">
                        🐾
                      </div>
                    `
                }

                <h3>
                  ${pet.name || 'Mascota'}
                </h3>

                <button
                  class="pet-card-btn"
                  data-route="pets"
                >
                  Conóceme
                </button>

              </article>
            `
          )
          .join('')
      : `
          <article class="pet-carousel-card pet-carousel-card--placeholder">

            <div class="card-glow"></div>

            <div class="pet-card-fallback">
              🐾
            </div>

            <h3>
              Próximamente
            </h3>

            <p class="pet-placeholder-text">
              Nuevos amigos estarán disponibles muy pronto.
            </p>

          </article>
        `;

  return /* html */ `
    <section
      id="adoptar"
      class="content-section reveal-section"
    >

      <div class="section-heading">

        <span class="section-badge">
          Adopta una vida
        </span>

        <h2>
          Ellos te necesitan
        </h2>

        <p>
          Conoce a nuestros peluditos y encuentra
          a ese amigo que cambiará tu vida para siempre.
        </p>

        <div class="section-buttons">

          <button
            class="primary-btn"
            data-route="pets"
          >
            Ver todas las mascotas
          </button>

          ${
            about.adoptionForm
              ? `
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

      <div class="carousel-wrapper">

        <div class="carousel-track">

          <div class="group">
            ${cardsHtml}
          </div>

          <div
            class="group"
            aria-hidden="true"
          >
            ${cardsHtml}
          </div>

        </div>

      </div>

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