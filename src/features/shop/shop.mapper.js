/* ============================================================
   MAPPER — shop.mapper.js
   Transforma cada fila cruda de la hoja "shop"
   al objeto tipado `product` consumido por la tienda.

   Campos esperados por fila:
     name        — nombre del producto
     description — descripción corta
     price       — precio numérico (ej. "35" o "35.50")
     image       — URL de Cloudinary
============================================================ */

export function mapProducts(rawRows = []) {
  if (!Array.isArray(rawRows)) return [];
  return rawRows
    .map(mapProduct)
    .filter((p) => Boolean(p.name));
}

export function mapProduct(raw = {}) {
  return {
    name:        _str(raw.name),
    description: _str(raw.description),
    price:       _price(raw.price),
    image:       _url(raw.image),
  };
}

/* ── Helpers privados ────────────────────────────────────── */

function _str(value, fallback = '') {
  return String(value ?? '').trim() || fallback;
}

function _price(value) {
  const n = parseFloat(String(value ?? '').replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

function _url(value) {
  const url = String(value ?? '').trim();
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
}