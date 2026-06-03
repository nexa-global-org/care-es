import { state } from './state.js';
import { routes } from '../config/routes.js';
import { renderErrorScreen } from '../ui/screens.js';

export const router = {

  /**
   * Navega a una ruta interna del tenant actual.
   */
  async navigateTo(subRoute = '/') {

    const route =
      this.normalizeRoute(subRoute);

    const routeLoader =
      routes[route];

    if (!routeLoader) {
      return this.render404(
        `La ruta "${route}" no existe.`
      );
    }

    const moduleName =
      route === '/'
        ? 'shelter'
        : route;

    if (
      !state.isModuleEnabled(
        moduleName
      )
    ) {
      return this.render404(
        `El módulo "${moduleName}" no está habilitado para este refugio.`
      );
    }

    try {

      await routeLoader();

      this.updateBrowserUrl(route);

    } catch (error) {

      console.error(
        '[ROUTER] Error cargando ruta:',
        error
      );

      this.render404(
        'Ocurrió un error al cargar esta sección.'
      );
    }
  },

  /**
   * Navegación SPA programática.
   */
  async go(route = '/') {
    await this.navigateTo(route);
  },

  /**
   * Normaliza cualquier ruta recibida.
   *
   * Ejemplos:
   * "/pets/" -> "pets"
   * "pets" -> "pets"
   * "/" -> "/"
   */
  normalizeRoute(route = '/') {
    return (
      route
        .replace(/^\/|\/$/g, '')
      || '/'
    );
  },

  /**
   * Actualiza la URL sin recargar.
   */
  updateBrowserUrl(route) {

    const shelterId =
      state.shelterId;

    if (!shelterId) {
      return;
    }

    const newUrl =
      route === '/'
        ? `/${shelterId}`
        : `/${shelterId}/${route}`;

    if (
      window.location.pathname ===
      newUrl
    ) {
      return;
    }

    window.history.pushState(
      {},
      '',
      newUrl
    );
  },

  /**
   * Pantalla 404.
   */
  render404(message) {
    renderErrorScreen(message);
  }
};

/**
 * Soporte para Atrás / Adelante.
 */
window.addEventListener(
  'popstate',
  () => {

    const segments =
      window.location.pathname
        .split('/')
        .filter(Boolean);

    const route =
      segments
        .slice(1)
        .join('/')
      || '/';

    router.navigateTo(route);
  }
);

/**
 * Navegación SPA mediante:
 *
 * <button data-route="pets">
 * <a data-route="shop">
 */
document.addEventListener(
  'click',
  event => {

    const element =
      event.target.closest(
        '[data-route]'
      );

    if (!element) {
      return;
    }

    event.preventDefault();

    const route =
      element.dataset.route;

    router.go(route);
  }
);