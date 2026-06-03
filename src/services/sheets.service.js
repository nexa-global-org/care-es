import { state } from '../core/state.js';
import sheltersData from '../config/shelters.json';

const cache = new Map();

export const sheetsService = {

  async fetchSheet(sheetName) {

    const spreadsheetId =
      state.currentShelter?.spreadsheet?.id;

    if (!spreadsheetId) {
      throw new Error(
        'No existe Spreadsheet ID para el refugio actual.'
      );
    }

    const cacheKey =
      `${spreadsheetId}:${sheetName}`;

    const cached =
      this.getFromCache(cacheKey);

    if (cached) {
      return cached;
    }

    const response = await fetch(
      `/api/sheets?spreadsheetId=${encodeURIComponent(
        spreadsheetId
      )}&sheet=${encodeURIComponent(
        sheetName
      )}`
    );

    if (!response.ok) {
      throw new Error(
        `Error HTTP ${response.status}`
      );
    }

    const data =
      await response.json();

    const rows =
      data.values || [];

    this.saveToCache(
      cacheKey,
      rows
    );

    return rows;
  },

  /**
   * ABOUT
   * Formato esperado:
   *
   * Field          | Value
   * shelterName    | Salvando Patitas
   * shelterLogo    | https://...
   * adoptionForm   | https://...
   */
  async getAbout() {

    const rows =
      await this.fetchSheet('about');

    if (rows.length < 2) {
      return {};
    }

    const about = {};

    rows
      .slice(1)
      .forEach(row => {

        const field =
          row[0]?.trim();

        const value =
          row[1] ?? '';

        if (field) {
          about[field] = value;
        }

      });

    return about;
  },

  /**
   * PETS
   * Formato:
   * name | gender | size | age | description | image
   */
  async getPets() {

    const rows =
      await this.fetchSheet('pets');

    if (rows.length < 2) {
      return [];
    }

    return this.mapCollection(rows);
  },

  /**
   * SHOP
   * Formato:
   * name | description | price | image
   */
  async getShop() {

    const rows =
      await this.fetchSheet('shop');

    if (rows.length < 2) {
      return [];
    }

    return this
      .mapCollection(rows)
      .map(product => ({
        ...product,
        price:
          Number(product.price) || 0
      }));
  },

  mapCollection(rows) {

    const headers =
      rows[0];

    return rows
      .slice(1)
      .map(row =>
        headers.reduce(
          (obj, header, index) => {

            obj[header] =
              row[index] ?? '';

            return obj;

          },
          {}
        )
      );
  },

  getCacheDuration() {

    return (
      sheltersData?.global?.cacheMinutes ??
      15
    );
  },

  getFromCache(key) {

    const item =
      cache.get(key);

    if (!item) {
      return null;
    }

    const age =
      Date.now() -
      item.timestamp;

    const maxAge =
      this.getCacheDuration() *
      60 *
      1000;

    if (age > maxAge) {

      cache.delete(key);

      return null;
    }

    return item.data;
  },

  saveToCache(key, data) {

    cache.set(key, {
      data,
      timestamp:
        Date.now()
    });
  },

  clearCache() {
    cache.clear();
  },

  clearTenantCache() {

    const spreadsheetId =
      state.currentShelter
        ?.spreadsheet?.id;

    if (!spreadsheetId) {
      return;
    }

    [...cache.keys()]
      .filter(key =>
        key.startsWith(
          spreadsheetId
        )
      )
      .forEach(key =>
        cache.delete(key)
      );
  }
};