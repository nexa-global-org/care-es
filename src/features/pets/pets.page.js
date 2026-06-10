/* ============================================================
   PAGE — pets.page.js
============================================================ */

import { state }                from '../../core/state.js';
import { petsTemplate }         from './pets.ui.js';
import { mapPets }              from './pets.mapper.js';
import { NavbarUI }             from '../../ui/components/navbar/navbar.js';
import { FooterUI }             from '../../ui/components/footer/footer.js';
import { renderFloatingActions } from '../../ui/components/floating-actions/floating-actions.js';
import { initAllEffects }       from '../../effects/index.js';
import { initPetsGrid }         from './sections/pets-grid/pets-grid.section.js';

export async function initPetsPage() {
  const app = document.getElementById('app');
  if (!app) return;

  try {
    /* 1. Datos ──────────────────────────────────────────── */
    const { sheetsService } = await import('../../services/sheets.service.js');
    const spreadsheetId = state.spreadsheetId;

    const [rawAbout, rawPets] = await Promise.all([
      sheetsService.getAbout(spreadsheetId),
      sheetsService.getPets(spreadsheetId),
    ]);

    const { mapAbout } = await import('../shelter/shelter.mapper.js');
    const about = mapAbout(rawAbout);
    const pets  = mapPets(rawPets);

    /* 2. Render ─────────────────────────────────────────── */
    app.innerHTML = [
      NavbarUI.render(about),
      petsTemplate(about, pets),
      FooterUI.render(about),
      renderFloatingActions(about),
    ].join('\n');

    /* 3. Efectos + grid interactivo ─────────────────────── */
    initAllEffects();
    initPetsGrid(about.whatsappNumber, pets);

    /* 4. Título ─────────────────────────────────────────── */
    document.title = `Adoptar · ${about.shelterName}`;

  } catch (err) {
    console.error('[PetsPage]', err);
    _renderError(app);
  }
}

function _renderError(app) {
  if (!app) return;
  app.innerHTML = /* html */ `
    <div class="page-error">
      <span>⚠️</span>
      <p>No pudimos cargar las mascotas.<br>Intenta de nuevo.</p>
      <button onclick="location.reload()">Reintentar</button>
    </div>
  `;
}