/* ============================================================
   main.js
============================================================ */
import '../ui/styles/variables.css';
import '../ui/styles/global.css';
import '../ui/styles/animations.css';
import '../ui/styles/utilities.css';
import '../ui/styles/button.css';

import { state }  from '../core/state.js';
import { router } from '../core/router.js';
import { bootstrap } from './bootstrap.js';

import { resolveCurrentRoute } from '../core/route.service.js';

import {
  getTenantBySlug,
  validateTenant,
  isTenantInMaintenance
} from '../config/tenant.service.js';

import { applyTenantBranding } from '../config/branding.service.js';

import {
  renderErrorScreen,
  renderMaintenanceScreen
} from '../ui/screens.js';

async function initApp() {
  try {
    const { slug, subRoute } = resolveCurrentRoute();

    if (!slug) {
      throw new Error(
        'No se especificó un refugio en la URL.'
      );
    }

    const tenant = getTenantBySlug(slug);

    validateTenant(tenant);

    if (isTenantInMaintenance(tenant)) {
      renderMaintenanceScreen(tenant);
      return;
    }

    state.setShelter(tenant);

    /* Aplica la paleta del refugio antes de montar la UI.
       Si el tenant no tiene branding.accentColor no hace nada
       y las variables de variables.css quedan intactas. */
    applyTenantBranding(tenant);

    bootstrap.init();

    await router.navigateTo(subRoute);

    console.info(
      `[NEXA] Tenant cargado: ${tenant.name}`
    );

  } catch (error) {
    console.error('[NEXA]', error);

    renderErrorScreen(
      error.message || 'Error inesperado.'
    );
  }
}

document.addEventListener(
  'DOMContentLoaded',
  initApp
);