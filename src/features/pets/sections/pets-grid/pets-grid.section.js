/* ============================================================
   SECTION — pets-grid
   Renderiza el grid de mascotas con filtros y paginación client-side.

   Filtros:
   - Género:  Todos | Macho | Hembra
   - Tamaño:  Todos | Pequeño | Mediano | Grande

   Comparación normalizada (case-insensitive, sin espacios extra)
   para gender y size: "Macho", "macho", "Male", "male" → todos válidos.

   Paginación:
   - PETS_PER_PAGE = 12 por defecto.
   - Cada cambio de página hace scroll suave al inicio del grid.

   Campos usados de pets[]:
     name, description, age, gender, size, species, image
============================================================ */

import './pets-grid.css';

const PETS_PER_PAGE = 12;

/* Estado de módulo — se resetea al navegar */
let _allPets       = [];
let _filtered      = [];
let _currentPage   = 1;
let _whatsapp      = '';
let _activeFilters = { gender: 'Todos', size: 'Todos' };

/* ── Normalización ───────────────────────────────────────── */

/** Devuelve el valor normalizado (lowercase + trim) de un campo. */
const _norm = (val) => (val ?? '').toString().toLowerCase().trim();

/**
 * Mapa de alias para gender.
 * Permite que "male" / "Male" / "Macho" / "macho" coincidan con el
 * valor canónico almacenado en _activeFilters ("Macho" / "Hembra").
 */
const GENDER_ALIASES = {
  macho: 'Macho',
  male:  'Macho',
  hembra: 'Hembra',
  female: 'Hembra',
};

/**
 * Mapa de alias para size.
 * Permite variantes en español e inglés.
 */
const SIZE_ALIASES = {
  pequeño: 'Pequeño',
  pequeno: 'Pequeño',
  small:   'Pequeño',
  mediano: 'Mediano',
  medium:  'Mediano',
  grande:  'Grande',
  large:   'Grande',
};

/** Devuelve el valor canónico de gender a partir de cualquier variante. */
function _canonicalGender(raw) {
  return GENDER_ALIASES[_norm(raw)] ?? raw;
}

/** Devuelve el valor canónico de size a partir de cualquier variante. */
function _canonicalSize(raw) {
  return SIZE_ALIASES[_norm(raw)] ?? raw;
}

/* ── Render inicial (solo HTML estático) ─────────────────── */

export function renderPetsGrid(pets = [], whatsappNumber = '') {
  _allPets   = pets;
  _filtered  = pets;
  _currentPage = 1;
  _whatsapp    = whatsappNumber;
  _activeFilters = { gender: 'Todos', size: 'Todos' };

  return /* html */ `
    <section class="pets-section" id="pets-section">
      <div class="pets-section-inner">

        <div class="pets-section-header">
          <h2 class="pets-section-title">Encuentra tu compañero</h2>
          <p class="pets-section-sub">
            Todos nuestros animales están vacunados, desparasitados
            y llenos de amor por dar.
          </p>
        </div>

        <div class="pets-filters" id="pets-filters">
          <!-- Inyectado por initPetsGrid() -->
        </div>

        <div class="pets-grid" id="pets-grid">
          <!-- Inyectado por initPetsGrid() -->
        </div>

        <div class="pets-pagination" id="pets-pagination">
          <!-- Inyectado por initPetsGrid() -->
        </div>

      </div>
    </section>
  `;
}

/* ── Inicializar: filtros + grid + listeners ─────────────── */

export function initPetsGrid(whatsappNumber = '', pets = []) {
  _allPets  = pets.length ? pets : _allPets;
  _whatsapp = whatsappNumber;
  _applyFilters();
  _renderFilters();
  _renderGrid();
  _renderPagination();
  _bindFilterListeners();
  _bindPaginationListener();
}

/* ── Filtros ─────────────────────────────────────────────── */

function _renderFilters() {
  const el = document.getElementById('pets-filters');
  if (!el) return;

  const genders = ['Todos', ..._unique(_allPets, 'gender', _canonicalGender)];
  const sizes   = ['Todos', ..._unique(_allPets, 'size',   _canonicalSize)];

  el.innerHTML = /* html */ `
    ${_filterGroup('gender',  'Género',  genders, _activeFilters.gender)}
    ${_filterGroup('size',    'Tamaño',  sizes,   _activeFilters.size)}
  `;
}

function _filterGroup(key, label, options, active) {
  const btns = options.map((opt) => /* html */ `
    <button
      class="filter-btn ${opt === active ? 'filter-btn--active' : ''}"
      data-filter-key="${key}"
      data-filter-value="${opt}"
      aria-pressed="${opt === active}"
    >${opt}</button>
  `).join('');

  return /* html */ `
    <div class="filters-group">
      <span class="filter-label">${label}</span>
      <div class="filter-btns">${btns}</div>
    </div>
  `;
}

function _bindFilterListeners() {
  const el = document.getElementById('pets-filters');
  if (!el) return;

  el.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter-key]');
    if (!btn) return;

    const key   = btn.dataset.filterKey;
    const value = btn.dataset.filterValue;

    if (_activeFilters[key] === value) return;

    _activeFilters[key] = value;
    _currentPage = 1;

    _applyFilters();
    _renderFilters();
    _renderGrid();
    _renderPagination();
  });
}

function _applyFilters() {
  _filtered = _allPets.filter((pet) => {
    const matchGender = _activeFilters.gender === 'Todos'
      || _canonicalGender(pet.gender) === _activeFilters.gender;

    const matchSize = _activeFilters.size === 'Todos'
      || _canonicalSize(pet.size) === _activeFilters.size;

    return matchGender && matchSize;
  });
}

/* ── Grid ────────────────────────────────────────────────── */

function _renderGrid() {
  const el = document.getElementById('pets-grid');
  if (!el) return;
  el.innerHTML = _renderPage(_currentPage);
  _triggerReveal(el);
}

function _renderPage(page) {
  if (!_filtered.length) return _emptyState();

  const start = (page - 1) * PETS_PER_PAGE;
  const slice = _filtered.slice(start, start + PETS_PER_PAGE);

  return slice.map((pet, i) => _petCard(pet, i)).join('');
}

function _triggerReveal(container) {
  container.querySelectorAll('.reveal-card').forEach((card, i) => {
    setTimeout(() => card.classList.add('visible'), i * 60);
  });
}

/* ── Paginación ──────────────────────────────────────────── */

function _renderPagination() {
  const el = document.getElementById('pets-pagination');
  if (!el) return;
  el.innerHTML = _paginationHTML(_currentPage, _filtered.length);
}

function _paginationHTML(currentPage, total) {
  const totalPages = Math.ceil(total / PETS_PER_PAGE);
  if (totalPages <= 1) return '';

  const pages = _pageNumbers(currentPage, totalPages);

  const buttons = pages.map((p) => {
    if (p === '…') return `<span class="pagination-ellipsis">…</span>`;
    const active = p === currentPage ? 'pagination-btn--active' : '';
    return /* html */ `
      <button
        class="pagination-btn ${active}"
        data-page="${p}"
        aria-label="Página ${p}"
        aria-current="${p === currentPage ? 'page' : 'false'}"
        ${p === currentPage ? 'disabled' : ''}
      >${p}</button>
    `;
  }).join('');

  const prevDisabled = currentPage === 1         ? 'disabled' : '';
  const nextDisabled = currentPage === totalPages ? 'disabled' : '';

  return /* html */ `
    <div class="pagination-controls" role="navigation" aria-label="Paginación de mascotas">

      <button
        class="pagination-btn pagination-btn--nav"
        data-page="${currentPage - 1}"
        aria-label="Página anterior"
        ${prevDisabled}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      ${buttons}

      <button
        class="pagination-btn pagination-btn--nav"
        data-page="${currentPage + 1}"
        aria-label="Página siguiente"
        ${nextDisabled}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

    </div>

    <p class="pagination-info">
      Mostrando
      ${Math.min((currentPage - 1) * PETS_PER_PAGE + 1, total)}–${Math.min(currentPage * PETS_PER_PAGE, total)}
      de ${total} mascotas
    </p>
  `;
}

function _bindPaginationListener() {
  const el = document.getElementById('pets-pagination');
  if (!el) return;

  el.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-page]');
    if (!btn || btn.disabled) return;

    const page = parseInt(btn.dataset.page, 10);
    if (page === _currentPage) return;

    _currentPage = page;
    _updateGrid();
    _renderPagination();
    _scrollToGrid();
  });
}

function _updateGrid() {
  const grid = document.getElementById('pets-grid');
  if (!grid) return;

  grid.style.opacity    = '0';
  grid.style.transition = 'opacity 0.2s ease';

  setTimeout(() => {
    grid.innerHTML    = _renderPage(_currentPage);
    grid.style.opacity = '1';
    _triggerReveal(grid);
  }, 200);
}

function _scrollToGrid() {
  const section = document.getElementById('pets-section');
  if (!section) return;
  const top = section.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: 'smooth' });
}

/* ── Card individual ─────────────────────────────────────── */

function _petCard(pet, index) {
  const delay  = index * 80;
  const waText = encodeURIComponent(`Hola, me interesa adoptar a: ${pet.name}`);
  const waHref = _whatsapp
    ? `https://wa.me/${_whatsapp}?text=${waText}`
    : '#';

  const imgHtml = pet.image
    ? /* html */ `
        <img
          src="${pet.image}"
          alt="${pet.name}"
          loading="lazy"
          decoding="async"
          onerror="
            this.style.background='var(--gradient-card-bg)';
            this.removeAttribute('src');
          "
        >
      `
    : '';

  const genderClass = _norm(pet.gender) === 'macho' || _norm(pet.gender) === 'male'
    ? 'male'
    : _norm(pet.gender) === 'hembra' || _norm(pet.gender) === 'female'
      ? 'female'
      : '';

  const canonGender = _canonicalGender(pet.gender);

  const genderBadge = pet.gender
    ? /* html */ `
        <span class="pet-adopt-gender ${genderClass}">
          ${genderClass === 'male' ? '♂' : genderClass === 'female' ? '♀' : ''} ${canonGender}
        </span>
      `
    : '';

  const sizeBadge = pet.size
    ? `<span class="pet-adopt-size">${_canonicalSize(pet.size)}</span>`
    : '';

  return /* html */ `
    <article
      class="pet-adopt-card reveal-card"
      style="--delay: ${delay}"
    >
      <div class="pet-adopt-img-wrap">
        ${imgHtml}
        ${genderBadge}
      </div>

      <div class="pet-adopt-body">
        <div class="pet-adopt-meta">
          <h3 class="pet-adopt-name">${pet.name}</h3>
          ${pet.age ? `<span class="pet-adopt-age">${pet.age}</span>` : ''}
        </div>

        ${sizeBadge}

        ${pet.description
          ? `<p class="pet-adopt-desc">${pet.description}</p>`
          : ''
        }

        <a
          href="${waHref}"
          class="pet-adopt-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Consultar adopción de ${pet.name}"
        >
          Quiero adoptarlo
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.8"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>

    </article>
  `;
}

/* ── Estado vacío ────────────────────────────────────────── */

function _emptyState() {
  return /* html */ `
    <div class="pets-empty">
      <span>🐾</span>
      <p>No encontramos mascotas con esos filtros.<br>Prueba con otra combinación.</p>
    </div>
  `;
}

/* ── Skeletons de carga ──────────────────────────────────── */

export function renderPetsSkeletons() {
  return Array.from({ length: 6 }, () => /* html */ `
    <div class="pet-adopt-card pet-adopt-card--skeleton">
      <div class="pet-adopt-img-wrap skeleton-box"></div>
      <div class="pet-adopt-body">
        <div class="skeleton-line skeleton-line--title"></div>
        <div class="skeleton-line skeleton-line--short"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-btn"></div>
      </div>
    </div>
  `).join('');
}

/* ── Utilidades ──────────────────────────────────────────── */

/**
 * Extrae valores únicos canónicos de un campo del dataset.
 * @param {Array}    items      - Array de objetos
 * @param {string}   key        - Campo a leer
 * @param {Function} canonical  - Función que devuelve el valor canónico
 */
function _unique(items, key, canonical = (v) => v) {
  return [...new Set(
    items
      .map((item) => canonical(item[key]))
      .filter(Boolean)
  )];
}

function _pageNumbers(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [];
  const addPage     = (n) => pages.push(n);
  const addEllipsis = () => {
    if (pages[pages.length - 1] !== '…') pages.push('…');
  };

  addPage(1);
  if (current > 3) addEllipsis();

  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    addPage(i);
  }

  if (current < total - 2) addEllipsis();
  addPage(total);

  return pages;
}