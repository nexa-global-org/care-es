/* ============================================================
   SECTION — products-grid
   Renderiza el grid de productos con paginación client-side.

   Paginación:
   - PRODUCTS_PER_PAGE = 12 por defecto.
   - Si hay más de 12 productos, aparece la barra de paginación.
   - Cada cambio de página hace scroll suave al inicio del grid.
   - Los productos de la página actual se revelan con stagger
     igual que en el render inicial.

   Campos usados de products[]:
     name, description, price, image
============================================================ */

import './products-grid.css';

const PRODUCTS_PER_PAGE = 12;
const CURRENCY          = 'S/';

/* Estado de paginación — módulo-level, se resetea al navegar */
let _allProducts = [];
let _currentPage = 1;

/* ── Render inicial ──────────────────────────────────────── */

export function renderProductsGrid(products = [], whatsappNumber = '') {
  _allProducts  = products;
  _currentPage  = 1;

  return /* html */ `
    <section class="shop-products" id="shop-products">
      <div class="shop-products-inner">

        <div class="shop-products-header">
          <h2 class="shop-products-title">Productos solidarios</h2>
          <p class="shop-products-sub">
            Cada pieza está hecha con cariño y financia directamente
            el cuidado de nuestros animales.
          </p>
        </div>

        <div class="products-grid" id="products-grid">
          ${_renderPage(1, products, whatsappNumber)}
        </div>

        <div class="products-pagination" id="products-pagination">
          ${_renderPagination(1, products.length)}
        </div>

      </div>
    </section>
  `;
}

/* ── Inicializar listeners (llamar desde shop.page.js
   después del render, igual que initAllEffects) ──────────── */

export function initProductsPagination(whatsappNumber = '') {
  const paginationEl = document.getElementById('products-pagination');
  if (!paginationEl) return;

  paginationEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-page]');
    if (!btn || btn.disabled) return;

    const page = parseInt(btn.dataset.page, 10);
    if (page === _currentPage) return;

    _currentPage = page;
    _updateGrid(whatsappNumber);
    _updatePagination();
    _scrollToGrid();
  });
}

/* ── Helpers internos ────────────────────────────────────── */

function _renderPage(page, products, whatsappNumber) {
  if (!products.length) return _skeletons();

  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const slice = products.slice(start, start + PRODUCTS_PER_PAGE);

  return slice
    .map((product, i) => _productCard(product, i, whatsappNumber))
    .join('');
}

function _renderPagination(currentPage, total) {
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
  if (totalPages <= 1) return '';

  const pages = _pageNumbers(currentPage, totalPages);

  const buttons = pages.map((p) => {
    if (p === '…') {
      return `<span class="pagination-ellipsis">…</span>`;
    }
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

  const prevDisabled = currentPage === 1 ? 'disabled' : '';
  const nextDisabled = currentPage === totalPages ? 'disabled' : '';

  return /* html */ `
    <div class="pagination-controls" role="navigation" aria-label="Paginación de productos">

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
      ${Math.min((currentPage - 1) * PRODUCTS_PER_PAGE + 1, total)}–${Math.min(currentPage * PRODUCTS_PER_PAGE, total)}
      de ${total} productos
    </p>
  `;
}

/* Genera el array de números de página con elipsis:
   [1, 2, 3, '…', 10]  o  [1, '…', 4, 5, 6, '…', 10] */
function _pageNumbers(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [];
  const addPage = (n) => pages.push(n);
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

function _updateGrid(whatsappNumber) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  /* Fade out → swap → fade in */
  grid.style.opacity = '0';
  grid.style.transition = 'opacity 0.2s ease';

  setTimeout(() => {
    grid.innerHTML = _renderPage(_currentPage, _allProducts, whatsappNumber);
    grid.style.opacity = '1';

    /* Trigger reveal con stagger */
    grid.querySelectorAll('.reveal-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 60);
    });
  }, 200);
}

function _updatePagination() {
  const el = document.getElementById('products-pagination');
  if (!el) return;
  el.innerHTML = _renderPagination(_currentPage, _allProducts.length);
}

function _scrollToGrid() {
  const section = document.getElementById('shop-products');
  if (!section) return;
  const top = section.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: 'smooth' });
}

/* ── Card individual ─────────────────────────────────────── */

function _productCard(product, index, whatsappNumber) {
  const delay   = index * 80;
  const waText  = encodeURIComponent(`Hola, me interesa: ${product.name}`);
  const waHref  = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${waText}`
    : '#';

  const imgHtml = product.image
    ? /* html */ `
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          decoding="async"
          onerror="
            this.style.background='var(--gradient-card-bg)';
            this.removeAttribute('src');
          "
        >
      `
    : '';

  const priceHtml = product.price !== null
    ? /* html */ `
        <div class="prod-price">
          <span>Precio</span>
          ${CURRENCY} ${_formatPrice(product.price)}
        </div>
      `
    : `<div class="prod-price"><span>Precio</span>Consultar</div>`;

  return /* html */ `
    <article
      class="prod-card reveal-card"
      style="--delay: ${delay}"
    >
      <div class="prod-img-wrap">
        ${imgHtml}
      </div>

      <div class="prod-body">
        <h3 class="prod-name">${product.name}</h3>
        ${product.description
          ? `<p class="prod-desc">${product.description}</p>`
          : ''
        }
        <div class="prod-footer">
          ${priceHtml}
          <a
            href="${waHref}"
            class="prod-btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consultar por ${product.name}"
          >
            Consultar
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.8"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

    </article>
  `;
}

/* ── Skeletons de carga ──────────────────────────────────── */

function _skeletons() {
  return Array.from({ length: 6 }, () => /* html */ `
    <div class="prod-card prod-card--skeleton">
      <div class="prod-img-wrap skeleton-box"></div>
      <div class="prod-body">
        <div class="skeleton-line skeleton-line--title"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line skeleton-line--short"></div>
        <div class="prod-footer">
          <div class="skeleton-line skeleton-line--price"></div>
          <div class="skeleton-btn"></div>
        </div>
      </div>
    </div>
  `).join('');
}

function _formatPrice(price) {
  return Number.isInteger(price) ? String(price) : price.toFixed(2);
}