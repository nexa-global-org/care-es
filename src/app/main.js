import '../ui/styles/global.css';

import { state } from '../core/state.js';
import { router } from '../core/router.js';
import { bootstrap } from './bootstrap.js';

import { resolveCurrentRoute } from '../core/route.service.js';

import {
  getTenantBySlug,
  validateTenant,
  isTenantInMaintenance
} from '../config/tenant.service.js';

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