import React, { useEffect, useState } from 'react';
import SectionHeading from './SectionHeading';
import { RevealItem } from './RevealText';

const MEDIUM_PROFILE = 'https://medium.com/@devkesav';
const MEDIUM_FEED = 'https://api.rss2json.com/v1/api.json';

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
