const BASE_URL = import.meta.env.BASE_URL;
const BASE_PATH = BASE_URL.replace(/\/+$/, '');

export const STORY_ROUTES = {
  hub: '/stories',
  memories: '/stories/happy-memories',
  memoryPost: '/stories/happy-memories/creator-moments',
  idealsAndHobbies: '/stories/ideals-and-hobby-projects',
  inspirations: '/stories/inspirations',
};

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

  if (normalized === '/stories/creator-moments') {
    return STORY_ROUTES.memoryPost;
  }

  return normalized.startsWith('/') ? normalized : `/${normalized}`;
};

export const getCurrentRoutePath = () => normalizeRoutePath(window.location.pathname);

export const routeHref = (path) => {
  const normalized = normalizeRoutePath(path);
  return `${BASE_URL}${normalized === '/' ? '' : normalized.slice(1)}`;
};
