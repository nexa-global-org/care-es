import { state } from './state.js';
import { routes } from '../config/routes.js';
import { renderErrorScreen } from '../ui/screens.js';

export const router = {

  async navigateTo(
    subRoute = '/',
    scrollTarget = null
  ) {

    const route =
      this.normalizeRoute(
        subRoute
      );

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

      this.updateBrowserUrl(
        route
      );

      if (scrollTarget) {

        requestAnimationFrame(() => {

          setTimeout(() => {

            const target =
              document.getElementById(
                scrollTarget
              );

            if (target) {

              target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });

            }

          }, 100);

        });

      }

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

  async go(
    route = '/',
    scrollTarget = null
  ) {

    await this.navigateTo(
      route,
      scrollTarget
    );

  },

  normalizeRoute(
    route = '/'
  ) {

    return (
      route
        .replace(/^\/|\/$/g, '')
      || '/'
    );

  },

  updateBrowserUrl(
    route
  ) {

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

  render404(
    message
  ) {

    renderErrorScreen(
      message
    );

  }

};

/* ============================================================
   ATRÁS / ADELANTE
============================================================ */

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

/* ============================================================
   NAVEGACIÓN SPA
============================================================ */

document.addEventListener(
  'click',
  async event => {

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

    const scrollTarget =
      element.dataset.scroll ||
      null;

    await router.go(
      route,
      scrollTarget
    );

  }
);