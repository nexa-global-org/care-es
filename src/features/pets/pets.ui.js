/* ============================================================
   UI — pets.ui.js
============================================================ */

import { renderPetsHero }   from './sections/hero/hero.section.js';
import { renderPetsGrid }   from './sections/pets-grid/pets-grid.section.js';
import { renderCtaBanner }  from './sections/cta-banner/cta-banner.section.js';
import { renderNexaWave }   from './sections/nexa-wave/nexa-wave.section.js';

export function petsTemplate(about, pets = []) {
  return /* html */ `
    <main class="pets-page">
      ${renderPetsHero(about)}
      ${renderPetsGrid(pets, about.whatsappNumber)}
      ${renderCtaBanner()}
      ${renderNexaWave()}
    </main>
  `;
}