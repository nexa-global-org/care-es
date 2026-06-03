export const routes = {

  '/': async () => {
    const module =
      await import(
        '../features/shelter/shelter.page.js'
      );

    return module.initShelterPage();
  },

  pets: async () => {
    const module =
      await import(
        '../features/pets/pets.page.js'
      );

    return module.initPetsPage();
  },

  shop: async () => {
    const module =
      await import(
        '../features/shop/shop.page.js'
      );

    return module.initShopPage();
  }
};