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

    const about =
      mapAbout(rawAbout);

    if (!about.shelterName) {

      throw new Error(
        'El refugio no tiene nombre.'
      );

    }

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