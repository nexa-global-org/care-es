export const state = {

  currentShelter: null,

  setShelter(tenant) {
    this.currentShelter = tenant;
  },

  clearShelter() {
    this.currentShelter = null;
  },

  get shelterId() {
    return this.currentShelter?.id ?? null;
  },

  get shelterName() {
    return this.currentShelter?.name ?? null;
  },

  get spreadsheetId() {
    return this.currentShelter?.spreadsheet?.id ?? null;
  },

  isModuleEnabled(moduleName) {
    return Boolean(
      this.currentShelter?.modules?.[moduleName]
    );
  }
};