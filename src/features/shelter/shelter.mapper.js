/* ============================================================
   MAPPER — shelter.mapper.js

   Transforma la respuesta cruda de la hoja "about"
   al objeto tipado `about` consumido por la landing.

   Campos esperados:

   shelterName
   shelterLogo
   shelterImage

   shelterStory
   storyImage

   beforeHistory
   afterHistory

   beforeImage
   afterImage

   animalsSaved
   yearsActive
   volunteers

   adoptionForm
   volunteersForm

   donationQR
   donationPhone

   whatsappNumber
   address

   instagramLink
   facebookLink
   tiktokLink
   youtubeLink

   slogan (opcional)
============================================================ */

export function mapAbout(raw = {}) {

  return {

    /* ─────────────────────────────────────────────
       Identidad
    ───────────────────────────────────────────── */

    shelterName:
      _str(
        raw.shelterName,
        'Refugio'
      ),

    shelterLogo:
      _url(raw.shelterLogo),

    shelterImage:
      _url(raw.shelterImage),

    slogan:
      _str(
        raw.slogan,
        'Cada vida merece una segunda oportunidad.'
      ),

    /* ─────────────────────────────────────────────
       Historia
    ───────────────────────────────────────────── */

    shelterStory:
      _str(raw.shelterStory),

    storyImage:
      _url(raw.storyImage),

    beforeHistory:
      _str(raw.beforeHistory),

    afterHistory:
      _str(raw.afterHistory),

    beforeImage:
      _url(raw.beforeImage),

    afterImage:
      _url(raw.afterImage),

    /* ─────────────────────────────────────────────
       Estadísticas
    ───────────────────────────────────────────── */

    animalsSaved:
      _number(raw.animalsSaved),

    yearsActive:
      _number(raw.yearsActive),

    volunteers:
      _number(raw.volunteers),

    /* ─────────────────────────────────────────────
       Formularios
    ───────────────────────────────────────────── */

    adoptionForm:
      _url(raw.adoptionForm),

    volunteersForm:
      _url(raw.volunteersForm),

    /* ─────────────────────────────────────────────
       Donaciones
    ───────────────────────────────────────────── */

    donationQR:
      _url(raw.donationQR),

    donationPhone:
      _normalizePhone(
        raw.donationPhone
      ),

    /* ─────────────────────────────────────────────
       Contacto
    ───────────────────────────────────────────── */

    whatsappNumber:
      _normalizeWhatsApp(
        raw.whatsappNumber
      ),

    address:
      _str(raw.address),

    /* ─────────────────────────────────────────────
       Redes sociales
    ───────────────────────────────────────────── */

    instagramLink:
      _url(raw.instagramLink),

    facebookLink:
      _url(raw.facebookLink),

    tiktokLink:
      _url(raw.tiktokLink),

    youtubeLink:
      _url(raw.youtubeLink)

  };

}

/* ============================================================
   Helpers privados
============================================================ */

function _str(
  value,
  fallback = ''
) {

  const result =
    String(value ?? '')
      .trim();

  return result || fallback;

}

function _number(
  value,
  fallback = 0
) {

  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;

}

function _url(value) {

  const url =
    String(value ?? '')
      .trim();

  if (!url) {
    return '';
  }

  if (
    url.startsWith('http://') ||
    url.startsWith('https://')
  ) {
    return url;
  }

  return `https://${url}`;

}

/**
 * Convierte:
 *
 * 987654321
 * +51 987654321
 * 51-987654321
 *
 * en:
 *
 * 51987654321
 */

function _normalizePhone(
  value = ''
) {

  return String(value ?? '')
    .replace(/\D/g, '');

}

/**
 * Acepta:
 *
 * 987654321
 * 51987654321
 * https://wa.me/51987654321
 *
 * Devuelve:
 *
 * 51987654321
 */

function _normalizeWhatsApp(
  value = ''
) {

  const raw =
    String(value ?? '')
      .trim();

  if (!raw) {
    return '';
  }

  if (
    raw.includes('wa.me/')
  ) {

    const match =
      raw.match(
        /wa\.me\/(\d+)/
      );

    return match
      ? match[1]
      : '';

  }

  return raw.replace(/\D/g, '');

}