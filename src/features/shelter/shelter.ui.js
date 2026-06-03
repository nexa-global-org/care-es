export function shelterTemplate(data) {

  return `
    <main class="shelter-page">

      <section class="hero">
        <div class="hero__content">

          <img
            class="hero__logo"
            src="${data.shelterLogo}"
            alt="${data.shelterName}"
          />

          <h1>
            ${data.shelterName}
          </h1>

          <p class="hero__story">
            ${data.shelterStory}
          </p>

          <a
            href="${data.adoptionForm}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary"
          >
            Adoptar una mascota
          </a>

        </div>

        <div class="hero__image">
          <img
            src="${data.shelterImage}"
            alt="${data.shelterName}"
          />
        </div>
      </section>

      <section class="stats">

        <article>
          <h3>${data.animalsSaved}</h3>
          <span>Animales rescatados</span>
        </article>

        <article>
          <h3>${data.yearsActive}</h3>
          <span>Años de servicio</span>
        </article>

        <article>
          <h3>${data.volunteers}</h3>
          <span>Voluntarios</span>
        </article>

      </section>

    </main>
  `;
}