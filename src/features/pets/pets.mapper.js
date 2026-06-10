/* ============================================================
   MAPPER — pets.mapper.js
   Transforma cada fila cruda de la hoja "pets"
   al objeto tipado `pet` consumido por la sección de adopción.

   Campos esperados por fila:
     name        — nombre de la mascota
     description — descripción corta
     age         — edad (ej. "2 años", "6 meses")
     gender      — "Macho" | "Hembra"
     size        — "Pequeño" | "Mediano" | "Grande"
     species     — "Perro" | "Gato" | otro
     image       — URL de Cloudinary
     whatsapp    — número de WhatsApp del refugio (opcional, sobreescribe el global)
============================================================ */

export function mapPets(rawRows = []) {
  if (!Array.isArray(rawRows)) return [];
  return rawRows
    .map(mapPet)
    .filter((p) => Boolean(p.name));
}

export function mapPet(raw = {}) {
  return {
    name:        _str(raw.name),
    description: _str(raw.description),
    age:         _str(raw.age),
    gender:      _gender(raw.gender),
    size:        _str(raw.size),
    image:       _url(raw.image),
  };
}

/* ── Helpers privados ────────────────────────────────────── */

function _str(value, fallback = '') {
  return String(value ?? '').trim() || fallback;
}

function _gender(value) {
  const v = String(value ?? '').trim().toLowerCase();
  if (v === 'macho' || v === 'male' || v === 'm') return 'Macho';
  if (v === 'hembra' || v === 'female' || v === 'f') return 'Hembra';
  return _str(value);
}

function _url(value) {
  const url = String(value ?? '').trim();
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
}