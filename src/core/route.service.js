export function resolveCurrentRoute() {
  const segments = window.location.pathname
    .split('/')
    .filter(Boolean);

  return {
    slug: segments[0] || null,
    subRoute: segments.slice(1).join('/') || '/'
  };
}