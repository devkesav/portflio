const BASE_URL = import.meta.env.BASE_URL;
const BASE_PATH = BASE_URL.replace(/\/+$/, '');

export const normalizeRoutePath = (path) => {
  let normalized = path.replace(/\/+$/, '') || '/';

  if (BASE_PATH && normalized === BASE_PATH) return '/';
  if (BASE_PATH && normalized.startsWith(`${BASE_PATH}/`)) {
    normalized = normalized.slice(BASE_PATH.length);
  }

  if (normalized === '/projects') return '/work';
  if (normalized.startsWith('/projects/')) {
    normalized = `/work${normalized.slice('/projects'.length)}`;
  }

  return normalized.startsWith('/') ? normalized : `/${normalized}`;
};

export const getCurrentRoutePath = () => normalizeRoutePath(window.location.pathname);

export const routeHref = (path) => {
  const normalized = normalizeRoutePath(path);
  return `${BASE_URL}${normalized === '/' ? '' : normalized.slice(1)}`;
};
