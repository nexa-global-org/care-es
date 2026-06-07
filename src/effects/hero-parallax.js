let initialized = false;

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
    heroImage.style.transform =
      `translateY(${window.scrollY * 0.04}px) scale(1.04)`;
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