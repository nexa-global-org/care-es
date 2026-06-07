/* ============================================================
   EFFECT — reveal-on-scroll.js

   Revela:
   - .reveal-section
   - .reveal-card

   Compatible con SPA.
============================================================ */

let sectionObserver = null;
let cardObserver = null;

export function initRevealOnScroll() {

  destroyRevealOnScroll();

  createSectionObserver();
  createCardObserver();
}

export function destroyRevealOnScroll() {

  sectionObserver?.disconnect();
  cardObserver?.disconnect();

  sectionObserver = null;
  cardObserver = null;
}

/* ───────────────────────────────────────────── */

function createSectionObserver() {

  sectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            'visible',
            'active'
          );

          sectionObserver.unobserve(
            entry.target
          );
        });

      },
      {
        threshold: 0,
        rootMargin:
          '0px 0px -80px 0px'
      }
    );

  document
    .querySelectorAll(
      '.reveal-section'
    )
    .forEach(element =>
      sectionObserver.observe(
        element
      )
    );
}

/* ───────────────────────────────────────────── */

function createCardObserver() {

  cardObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }

          const delay =
            parseInt(
              entry.target.style
                .getPropertyValue(
                  '--delay'
                )
            ) || 0;

          setTimeout(
            () => {
              entry.target.classList.add(
                'visible'
              );
            },
            delay
          );

          cardObserver.unobserve(
            entry.target
          );
        });

      },
      {
        threshold: 0.08,
        rootMargin:
          '0px 0px -20px 0px'
      }
    );

  document
    .querySelectorAll(
      '.reveal-card'
    )
    .forEach(element =>
      cardObserver.observe(
        element
      )
    );
}