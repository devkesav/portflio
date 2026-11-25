export const MEDIUM_PROFILE = 'https://medium.com/@devkesav';
export const MEDIUM_FEED = 'https://api.rss2json.com/v1/api.json';

export const fetchMediumPosts = async (signal, limit = 6) => {
  const query = new URLSearchParams({
    rss_url: 'https://medium.com/feed/@devkesav',
    count: String(limit),
  });
  const response = await fetch(`${MEDIUM_FEED}?${query}`, { signal });
  if (!response.ok) throw new Error('Could not load Medium posts');

  const data = await response.json();
  if (data.status !== 'ok') {
    throw new Error(data.message || 'Could not load Medium posts');
  }

  return Array.isArray(data.items) ? data.items : [];
};

const normalizeTag = (tag) =>
  tag.trim().toLowerCase().replace(/[-_]+/g, ' ').replace(/\s+/g, ' ');

export const hasMediumTag = (post, tag) => {
  const expectedTag = normalizeTag(tag);
  return Array.isArray(post.categories) && post.categories.some(
    (category) =>
      typeof category === 'string' &&
      normalizeTag(category) === expectedTag
  );
};
