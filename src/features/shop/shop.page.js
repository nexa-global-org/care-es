/* ============================================================
   PAGE — shop.page.js
============================================================ */

import { state }                  from '../../core/state.js';
import { shopTemplate }           from './shop.ui.js';
import { mapProducts }            from './shop.mapper.js';
import { NavbarUI }               from '../../ui/components/navbar/navbar.js';
import { FooterUI }               from '../../ui/components/footer/footer.js';
import { renderFloatingActions }  from '../../ui/components/floating-actions/floating-actions.js';
import { initAllEffects }         from '../../effects/index.js';
import { initProductsPagination } from './sections/products-grid/products-grid.section.js';

export async function initShopPage() {
  const app = document.getElementById('app');
  if (!app) return;

  try {
    /* 1. Datos ──────────────────────────────────────────── */
    const { sheetsService } = await import('../../services/sheets.service.js');
    const spreadsheetId = state.spreadsheetId;

    const [rawAbout, rawProducts] = await Promise.all([
      sheetsService.getAbout(spreadsheetId),
      sheetsService.getShop(spreadsheetId),
    ]);

    const { mapAbout } = await import('../shelter/shelter.mapper.js');
    const about    = mapAbout(rawAbout);
    const products = mapProducts(rawProducts);

    /* 2. Render ─────────────────────────────────────────── */
    app.innerHTML = [
      NavbarUI.render(about),
      shopTemplate(about, products),
      FooterUI.render(about),
      renderFloatingActions(about),
    ].join('\n');

    /* 3. Efectos + paginación ───────────────────────────── */
    initAllEffects();
    initProductsPagination(about.whatsappNumber);

    /* 4. Título ─────────────────────────────────────────── */
    document.title = `Tienda Solidaria · ${about.shelterName}`;

  } catch (err) {
    console.error('[ShopPage]', err);
    _renderError(app);
  }
}

function _renderError(app) {
  if (!app) return;
  app.innerHTML = /* html */ `
    <div class="page-error">
      <span>⚠️</span>
      <p>No pudimos cargar la tienda.<br>Intenta de nuevo.</p>
      <button onclick="location.reload()">Reintentar</button>
    </div>
  `;
}