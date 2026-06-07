import {
  sheetsService
} from '../../services/sheets.service.js';

import {
  render
} from '../../ui/dom.js';

import {
  shelterTemplate
} from './shelter.ui.js';

import {
  renderErrorScreen
} from '../../ui/screens.js';

import {
  mapAbout
} from './shelter.mapper.js';

import {
  initAllEffects
} from '../../effects/index.js';

export async function initShelterPage() {

  try {

    const [
      rawAbout,
      rawPets
    ] = await Promise.all([
      sheetsService.getAbout(),
      sheetsService.getPets()
    ]);

    validateAboutData(rawAbout);

    const about =
      mapAbout(rawAbout);

    const pets =
      Array.isArray(rawPets)
        ? rawPets
        : [];

    render(
      shelterTemplate(
        about,
        pets
      )
    );

    initAllEffects();

  } catch (error) {

    console.error(
      '[SHELTER PAGE]',
      error
    );

    renderErrorScreen(
      'No se pudo cargar la información del refugio.'
    );
  }
}