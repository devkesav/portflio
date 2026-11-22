import React, { useEffect, useState } from 'react';
import SectionHeading from './SectionHeading';
import { RevealItem } from './RevealText';

const MEDIUM_PROFILE = 'https://medium.com/@devkesav';
const MEDIUM_FEED = 'https://api.rss2json.com/v1/api.json';

const GITHUB_REPOS = [
  {
    name: 'Drowsy Sentry System',
    repo: 'https://github.com/devkesav/Drowsy-Sentry-System',
    cover: 'https://opengraph.githubassets.com/61d9f3c04d2e8c65f93946d9bdced34e6e14888a6979d368c792a3c717805d11/devkesav/Drowsy-Sentry-System',
    keywords: ['drowsy', 'yawn', 'media pipe', 'sentry'],
  },
  {
    name: 'KONE Elevator Project',
    repo: 'https://github.com/devkesav/KONE-Project',
    cover: 'https://opengraph.githubassets.com/c25967e8ae46fb205dde426aa637b0160556e0cc086c95725e07fe0ad0b45f34/devkesav/KONE-Project',
    keywords: ['elevator', 'ev experiment', 'ev ', 'pmsm', 'kone'],
  },
  {
    name: 'NIT Internship Report',
    repo: 'https://github.com/devkesav/NIT-Intenship-Report',
    cover: 'https://opengraph.githubassets.com/a0433f7c651c7e8f6db71d1f067561ce312ef2d956ed2d2f90d6c3da3389be2d/devkesav/NIT-Intenship-Report',
    keywords: ['nit karaikal', 'nit karaikal internship', 'internship', 'pondicherry'],
  },
  {
    name: 'PID Power Factor Correction',
    repo: 'https://github.com/devkesav/PID-Control-Design-for-Power-Factor-Correction',
    cover: 'https://opengraph.githubassets.com/8d094b5ca263fb70d8a3cc11112fdd55e3a87686a2354bcb91802cc242139b43/devkesav/PID-Control-Design-for-Power-Factor-Correction',
    keywords: ['pid', 'power factor', 'pfc', 'converter', 'filter'],
  },
  {
    name: 'Vehicle Number Plate Detection',
    repo: 'https://github.com/devkesav/Vehicle-number-plate-detection-on-MATLAB',
    cover: 'https://opengraph.githubassets.com/c71f931746dd4fff97e515824e15a23df2135e20f471474ba06a3ec857a56b1a/devkesav/Vehicle-number-plate-detection-on-MATLAB',
    keywords: ['vehicle', 'plate', 'ocr', 'matlab'],
  },
];

const findRepoForPost = (post) => {
  const haystack = `${post.title || ''} ${post.categories?.join(' ') || ''} ${stripHtml(post.description)}`.toLowerCase();
  return GITHUB_REPOS.find((repo) =>
    repo.keywords.some((keyword) => haystack.includes(keyword.toLowerCase()))
  );
};

const stripHtml = (html = '') => {
  const template = document.createElement('template');
  template.innerHTML = html;
  return (template.content.textContent || '').replace(/\s+/g, ' ').trim();
};

const getMediumCover = (post) => {
  const html = post.content || post.description || '';
  const template = document.createElement('template');
  template.innerHTML = html;
  const images = [...template.content.querySelectorAll('img')]
    .map((image) => image.getAttribute('src'))
    .filter((src) => src && !src.includes('medium.com/_/stat'));

  return images.find((src) => src.includes('cdn-images') || src.includes('miro.medium'))
    || images[0]
    || post.thumbnail
    || '';
};

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    fetch(
      `${MEDIUM_FEED}?rss_url=${encodeURIComponent('https://medium.com/feed/@devkesav')}&count=6`,
      { signal: controller.signal }
    )
      .then((response) => {
        if (!response.ok) throw new Error('Could not load Medium posts');
        return response.json();
      })
      .then((data) => {
        if (!active) return;
        if (data.status !== 'ok') throw new Error(data.message || 'Could not load Medium posts');
        setPosts(data.items || []);
        setStatus('ready');
      })
      .catch((error) => {
        if (!active || error.name === 'AbortError') return;
        setStatus('error');
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  return (
    <section id="blogs" className="border-b border-line py-12 md:py-16">
      <div className="shell">
        <SectionHeading
          index="06"
          kicker="writing"
          title="Notes from the field."
          description="Engineering notes, internship logs, and ideas I am learning in public."
        />

        {status === 'loading' ? (
          <p className="border-y border-line py-5 text-[13px] text-muted">$ reading medium.feed</p>
        ) : null}

        {status === 'error' ? (
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-line py-5">
            <p className="text-[13px] text-muted">$ medium.feed offline</p>
            <a
              href={MEDIUM_PROFILE}
              target="_blank"
              rel="noreferrer"
              className="border border-line px-4 py-2 text-xs text-neutral-300 transition-colors hover:border-white hover:text-white"
            >
              read on medium ↗
            </a>
          </div>
        ) : null}

        {status === 'ready' ? (
          <>
            <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => {
                const excerpt = stripHtml(post.description).slice(0, 170);
                const githubRepo = findRepoForPost(post);
                const cover = getMediumCover(post);
                const date = post.pubDate
                  ? new Date(post.pubDate).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : '';

                return (
                  <RevealItem key={post.guid || post.link} delay={index * 120}>
                    <article className="blog-card group h-full p-5 transition-colors md:p-6">
                      {cover ? (
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mb-5 block overflow-hidden border border-line"
                        >
                          <img
                            src={cover}
                            alt=""
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="h-40 w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                          />
                        </a>
                      ) : null}
                      <p className="text-[10px] tracking-widest text-muted">
                        {date} / {post.categories?.[0] || 'notes'}
                      </p>
                      <h3 className="mt-3 text-[16px] leading-6 text-white">
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                        >
                          {post.title}
                        </a>
                      </h3>
                      {excerpt ? (
                        <p className="mt-3 text-[13px] leading-6 text-neutral-400">
                          {excerpt}{excerpt.length === 170 ? '...' : ''}
                        </p>
                      ) : null}
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-block text-xs text-muted transition-colors group-hover:text-white"
                      >
                        read article ↗
                      </a>
                      {githubRepo ? (
                        <a
                          href={githubRepo.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 ml-4 inline-block text-xs text-muted transition-colors hover:text-white"
                        >
                          github repo ↗
                        </a>
                      ) : null}
                    </article>
                  </RevealItem>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <a
                href={MEDIUM_PROFILE}
                target="_blank"
                rel="noreferrer"
                className="border border-white bg-white px-5 py-2 text-xs font-medium text-black transition-colors hover:bg-black hover:text-white"
              >
                read all on medium ↗
              </a>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default Blogs;
