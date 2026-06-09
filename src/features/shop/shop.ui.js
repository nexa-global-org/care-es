/* ============================================================
   UI — shop.ui.js
============================================================ */

import { renderShopHero }     from './sections/hero/hero.section.js';
import { renderProductsGrid } from './sections/products-grid/products-grid.section.js';
import { renderCtaBanner }    from './sections/cta-banner/cta-banner.section.js';
import { renderNexaWave }     from './sections/nexa-wave/nexa-wave.section.js';

export function shopTemplate(about, products = []) {
  return /* html */ `
    <main class="shop-page">
      ${renderShopHero(about)}
      ${renderProductsGrid(products, about.whatsappNumber)}
      ${renderCtaBanner()}
      ${renderNexaWave()}
    </main>
  `;
}