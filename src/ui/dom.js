const APP_ID = 'app';

function getRoot() {
  return document.getElementById(APP_ID);
}

export function clear() {
  const root = getRoot();

  if (root) {
    root.innerHTML = '';
  }
}

export function render(html) {
  const root = getRoot();

  if (!root) {
    throw new Error(
      'No existe #app en index.html'
    );
  }

  root.innerHTML = html;
}

export function append(html) {
  const root = getRoot();

  if (!root) return;

  root.insertAdjacentHTML(
    'beforeend',
    html
  );
}

export function on(
  selector,
  event,
  callback
) {
  document.addEventListener(
    event,
    e => {
      const target =
        e.target.closest(selector);

      if (!target) return;

      callback(e, target);
    }
  );
}