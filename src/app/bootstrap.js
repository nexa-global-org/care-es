import { state } from '../core/state.js';

export const bootstrap = {
  init() {
    const tenant = state.currentShelter;

    if (!tenant) {
      throw new Error(
        'No existe un tenant cargado en el estado global.'
      );
    }

    this.applyBranding(tenant.branding);

    console.info(
      `[NEXA] Branding aplicado para: ${tenant.name}`
    );
  },

  applyBranding(branding = {}) {
    const root = document.documentElement;

    Object.entries(branding).forEach(
      ([variable, value]) => {
        root.style.setProperty(variable, value);
      }
    );
  }
};