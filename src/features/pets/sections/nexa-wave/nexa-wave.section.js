/* ============================================================
   SECTION — nexa-wave
   Ola decorativa de transición hacia el footer.
   No usa datos dinámicos.
============================================================ */

import './nexa-wave.css';

export function renderNexaWave() {
  return /* html */ `
    <div
      class="nexa-bottom-wave"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,70 L1440,70 L1440,40 Q1080,0 720,30 Q360,60 0,10 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  `;
}