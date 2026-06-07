import {
  renderHero
} from './sections/hero/hero.section.js';

import {
  renderHistory
} from './sections/history/history.section.js';

import {
  renderAdoption
} from './sections/adoption/adoption.section.js';

import {
  renderAbout
} from './sections/about/about.section.js';

import {
  renderDonation
} from './sections/donation/donation.section.js';

import {
  renderStore
} from './sections/store/store.section.js';

import {
  renderNexa
} from './sections/nexa/nexa.section.js';

import {
  NavbarUI
} from '../../ui/components/navbar/navbar.js';

import {
  FooterUI
} from '../../ui/components/footer/footer.js';

import {
  renderFloatingActions
} from '../../ui/components/floating-actions/floating-actions.js';

export function shelterTemplate(
  about,
  pets = []
) {

  return `
    ${NavbarUI.render(about)}

    <main class="shelter-page">

      ${renderHero(about)}

      ${renderHistory(about)}

      ${renderAdoption(
        about,
        pets
      )}

      ${renderAbout(about)}

      ${renderDonation(about)}

      ${renderStore(about)}

      ${renderNexa()}

    </main>

    ${FooterUI.render(about)}

    ${renderFloatingActions(about)}

  `;
}