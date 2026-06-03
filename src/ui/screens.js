export function renderErrorScreen(message) {
  const app = document.getElementById('app');

  app.innerHTML = `
    <section class="nexa-screen nexa-screen-error">
      <h1>🐾 Nexa Platform</h1>
      <p>${message}</p>
    </section>
  `;
}

export function renderMaintenanceScreen(tenant) {
  const app = document.getElementById('app');

  app.innerHTML = `
    <section class="nexa-screen nexa-screen-maintenance">
      <h1>🛠️ ${tenant.name}</h1>
      <p>
        Este refugio se encuentra temporalmente
        en mantenimiento.
      </p>
    </section>
  `;
}