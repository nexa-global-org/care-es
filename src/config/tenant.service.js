/* ============================================================
   tenant.service.js
============================================================ */

import sheltersData from './shelters.json';

export function getTenantBySlug(slug) {
  return sheltersData?.tenants?.[slug] ?? null;
}

export function validateTenant(tenant) {
  if (!tenant) {
    throw new Error('Refugio no encontrado.');
  }

  if (!tenant.id) {
    throw new Error('Tenant sin ID.');
  }

  if (!tenant.name) {
    throw new Error('Tenant sin nombre.');
  }

  if (!tenant.spreadsheet?.id) {
    throw new Error(
      `El refugio "${tenant.name}" no tiene Spreadsheet configurado.`
    );
  }

  return true;
}

export function isTenantInMaintenance(tenant) {
  return tenant?.settings?.maintenance === true;
}

export function getGlobalConfig() {
  return sheltersData?.global ?? {};
}

console.log(
  '[TENANTS]',
  sheltersData
);