let initialized = false;

const SPEED      = 0.04;
const MAX_OFFSET = 24; /* px máximo — debe ser < margen que da scale(1.08) en CSS */

function handleParallax() {

  const heroImage =
    document.querySelector(
      '.hero-image-frame img'
    );

  const sectionHeading =
    document.querySelector(
      '.section-heading'
    );

  if (heroImage) {

    const frame = heroImage.closest('.hero-image-frame');
    const rect  = frame?.getBoundingClientRect();

    /* Solo aplicar mientras el frame esté visible */
    if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) {
      /* nada */
    } else {
      const offset = Math.min(window.scrollY * SPEED, MAX_OFFSET);
      heroImage.style.transform =
        `translateY(${offset}px) scale(1.08)`;
    }
  }

  if (sectionHeading) {

    const top =
      sectionHeading
        .getBoundingClientRect()
        .top;

    sectionHeading.style.transform =
      `translate3d(0, ${top * 0.06}px, 0)`;
  }
}

export function initHeroParallax() {

  if (initialized) {
    return;
  }

  initialized = true;

  window.addEventListener(
    'scroll',
    handleParallax,
    { passive: true }
  );
}