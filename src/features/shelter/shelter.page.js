import { sheetsService } from '../../services/sheets.service.js';

import { render } from '../../ui/dom.js';

import {
  shelterTemplate
} from './shelter.ui.js';

export async function initShelterPage() {

  try {

    const about =
      await sheetsService.getAbout();

      console.log(
  '[ABOUT]',
  about
);

    render(
      shelterTemplate(about)
    );

  } catch (error) {

    console.error(
      '[SHELTER]',
      error
    );

    render(`
      <section class="error">
        <h2>
          No se pudo cargar la información del refugio.
        </h2>
      </section>
    `);
  }
}