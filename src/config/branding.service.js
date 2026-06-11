/* ============================================================
   branding.service.js
   Genera y aplica toda la paleta dinámica a partir de un
   único accentColor hex definido por tenant.

   Variables generadas (sobreescriben :root de variables.css):
   ─────────────────────────────────────────────────────────
   Tonos base
     --purple-200 .. --purple-500
     --purple-rgb  --purple-dark-rgb  --purple-mid-rgb

   Lavender (fondos suaves)
     --lavender-50 .. --lavender-400
     --off-white

   Gradientes
     --gradient-primary   --gradient-primary-2
     --gradient-lavender  --gradient-donar
     --gradient-card-bg

   Opacidades compuestas (dependen de --purple-rgb en tiempo
   de ejecución, pero las redefinimos para asegurar coherencia)
     --purple-bg-05/07/08/10/12/15
     --purple-border  --purple-border-lg

   Sombras
     --shadow-xs/sm/md/lg/xl/float/card/btn/btn-hover

   Compatible con todos los navegadores modernos.
   Sin color-mix(), sin oklch(), sin lch().
============================================================ */

/**
 * Punto de entrada principal.
 * Llamar después de state.setShelter(tenant) en main.js.
 * Si el tenant no define branding.accentColor, no hace nada.
 *
 * @param {object} tenant
 */
export function applyTenantBranding(tenant) {
  const accent = tenant?.branding?.accentColor;
  if (!accent || typeof accent !== 'string') return;

  const hex = accent.trim();
  if (!isValidHex(hex)) {
    console.warn(`[BRANDING] accentColor inválido: "${hex}". Se mantiene paleta por defecto.`);
    return;
  }

  const hsl     = hexToHsl(hex);
  const palette = buildFullPalette(hsl);

  applyToRoot(palette);
  console.info(`[BRANDING] Paleta aplicada → ${tenant.name} (${hex})`);
}


/* ============================================================
   CONSTRUCCIÓN DE PALETA COMPLETA
============================================================ */

function buildFullPalette({ h, s, l }) {
  /*
    ── Filosofía de generación ──────────────────────────────
    El accentColor del refugio se usa DIRECTAMENTE como -400
    (el tono principal de botones y acentos). No se clampea
    su saturación ni su luminosidad base para no apagarlo.

    Los demás tonos se derivan ajustando solo L:
      -200 → muy claro (fondos, badges)
      -300 → semiaclaro (iconos, textos secundarios)
      -400 → el color exacto del refugio  ← sin tocar
      -500 → oscuro (hover, contraste)

    La saturación solo se sube levemente si viene muy baja
    (colores casi grises) para garantizar que haya tinte visible.
  */

  /* ── 1. Saturación: solo forzamos un mínimo perceptible ── */
  const sat = Math.max(s, 55);   // si viene >55% se respeta tal cual

  /* ── 2. Tonos base — L del accentColor se preserva en -400 ── */
  const l400 = l;                          // exactamente el color configurado
  const l200 = clamp(l + 42, 82, 96);     // muy claro, legible sobre blanco
  const l300 = clamp(l + 20, 62, 78);     // semiaclaro
  const l500 = clamp(l - 18, 18, 48);     // oscuro para hover

  const hex200 = hslToHex(h, sat, l200);
  const hex300 = hslToHex(h, sat, l300);
  const hex400 = hslToHex(h, sat, l400);  // accentColor sin modificar
  const hex500 = hslToHex(h, sat, l500);

  /* ── 3. Canales RGB para sombras y rgba() ── */
  const rgb400  = hexToRgb(hex400);
  const rgbDark = hexToRgb(hslToHex(h, Math.min(sat, 75), clamp(l400 - 20, 15, 42)));
  const rgbMid  = hexToRgb(hslToHex(h, sat, clamp(l400 + 10, 42, 70)));

  const pRgb = `${rgb400.r}, ${rgb400.g}, ${rgb400.b}`;
  const dRgb = `${rgbDark.r}, ${rgbDark.g}, ${rgbDark.b}`;
  const mRgb = `${rgbMid.r}, ${rgbMid.g}, ${rgbMid.b}`;

  /* ── 4. Lavender (fondos suaves) ─────────────────────────
     Saturación muy baja para que sea sutil pero con tinte.
     Se mantiene proporcional al sat original para que colores
     muy saturados (verde, rojo) no produzcan fondos chillones. */
  const lavSat = clamp(sat * 0.15, 6, 20);

  const lav50  = hslToHex(h, lavSat, 98.5);
  const lav100 = hslToHex(h, lavSat, 96.5);
  const lav200 = hslToHex(h, lavSat, 93.5);
  const lav300 = hslToHex(h, lavSat, 96);
  const lav400 = hslToHex(h, lavSat, 97.5);

  const offWhite = hslToHex(h, clamp(lavSat * 0.6, 3, 10), 99);

  /* ── 5. Gradientes ── */
  /*
    --gradient-primary usa -200 → -400 para que arranque
    del tono claro y llegue al color del refugio, igual que
    el gradiente morado original (#9146ff → #6d4cff).
  */
  const gradPrimary  = `linear-gradient(135deg, ${hex200}, ${hex400})`;
  const gradPrimary2 = `linear-gradient(135deg, ${hex300}, ${hex500})`;
  const gradLavender = `linear-gradient(150deg, ${offWhite} 0%, ${lav300} 50%, ${lav400} 100%)`;
  const gradDonar    = `linear-gradient(170deg, ${offWhite} 0%, ${lav100} 40%, ${lav200} 70%, ${lav50} 100%)`;
  const gradCardBg   = `linear-gradient(160deg, ${hslToHex(h, lavSat * 1.5, 95)} 0%, ${hslToHex(h, lavSat * 1.8, 92)} 55%, ${hslToHex(h, lavSat * 1.2, 94)} 100%)`;

  /* ── 6. Opacidades compuestas ── */
  const bg = (a) => `rgba(${pRgb}, ${a})`;

  /* ── 7. Sombras ── */
  const sd = (a) => `rgba(${dRgb}, ${a})`;
  const sm = (a) => `rgba(${mRgb}, ${a})`;

  /* ── Mapa completo ── */
  return {
    /* Tonos base */
    '--purple-200': hex200,
    '--purple-300': hex300,
    '--purple-400': hex400,
    '--purple-500': hex500,

    /* RGB */
    '--purple-rgb':      pRgb,
    '--purple-dark-rgb': dRgb,
    '--purple-mid-rgb':  mRgb,

    /* Lavender */
    '--off-white':    offWhite,
    '--lavender-50':  lav50,
    '--lavender-100': lav100,
    '--lavender-200': lav200,
    '--lavender-300': lav300,
    '--lavender-400': lav400,

    /* Gradientes */
    '--gradient-primary':   gradPrimary,
    '--gradient-primary-2': gradPrimary2,
    '--gradient-lavender':  gradLavender,
    '--gradient-donar':     gradDonar,
    '--gradient-card-bg':   gradCardBg,

    /* Opacidades compuestas */
    '--purple-bg-05':  bg(0.05),
    '--purple-bg-07':  bg(0.07),
    '--purple-bg-08':  bg(0.08),
    '--purple-bg-10':  bg(0.10),
    '--purple-bg-12':  bg(0.12),
    '--purple-bg-15':  bg(0.15),
    '--purple-border':    bg(0.14),
    '--purple-border-lg': bg(0.20),

    /* Sombras */
    '--shadow-xs':       `0 2px 8px ${sd(0.06)}`,
    '--shadow-sm':       `0 8px 24px ${sd(0.08)}`,
    '--shadow-md':       `0 18px 52px -8px ${sd(0.13)}`,
    '--shadow-lg':       `0 30px 70px ${sd(0.16)}`,
    '--shadow-xl':       `0 44px 90px -10px ${sd(0.18)}`,
    '--shadow-float':    `0 20px 50px ${sd(0.14)}, 0 1px 0 rgba(255,255,255,0.90) inset`,
    '--shadow-card':     `0 18px 52px -8px ${sd(0.13)}, 0 2px 0 rgba(255,255,255,0.88) inset, 0 1px 4px ${sm(0.06)}`,
    '--shadow-btn':      `0 15px 30px ${sm(0.22)}`,
    '--shadow-btn-hover': `0 22px 40px ${sm(0.28)}`,
  };
}


/* ============================================================
   APLICAR AL DOM
============================================================ */

function applyToRoot(palette) {
  const root = document.documentElement;
  for (const [prop, value] of Object.entries(palette)) {
    root.style.setProperty(prop, value);
  }
}


/* ============================================================
   UTILIDADES DE COLOR
============================================================ */

function hexToRgb(hex) {
  const clean = normalizeHex(hex);
  const int   = parseInt(clean, 16);
  return {
    r: (int >> 16) & 0xff,
    g: (int >>  8) & 0xff,
    b:  int        & 0xff,
  };
}

function hexToHsl(hex) {
  let { r, g, b } = hexToRgb(hex);
  r /= 255; g /= 255; b /= 255;

  const max  = Math.max(r, g, b);
  const min  = Math.min(r, g, b);
  const diff = max - min;

  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (diff !== 0) {
    s = diff / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r: h = ((g - b) / diff + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / diff + 2)               / 6; break;
      case b: h = ((r - g) / diff + 4)               / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToHex(h, s, l) {
  const { r, g, b } = hslToRgb(h, s, l);
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function normalizeHex(hex) {
  let clean = hex.replace('#', '');
  if (clean.length === 3) clean = clean.split('').map(c => c + c).join('');
  return clean;
}

function isValidHex(hex) {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}