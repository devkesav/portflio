import React, { useEffect, useState } from 'react';
import SectionHeading from './SectionHeading';
import { RevealItem } from './RevealText';
import { fetchMediumPosts, MEDIUM_PROFILE } from '../data/medium';

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

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [featuredPost, ...otherPosts] = posts;
  const featuredCover = featuredPost ? getMediumCover(featuredPost) : '';
  const featuredCategories =
    featuredPost && Array.isArray(featuredPost.categories)
      ? featuredPost.categories.filter(
          (category) => typeof category === 'string' && category.trim()
        )
      : [];
  const featuredExcerpt = featuredPost ? stripHtml(featuredPost.description) : '';

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    fetchMediumPosts(controller.signal)
      .then((items) => {
        if (!active) return;
        setPosts(items);
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
    <section id="blogs" className="scroll-mt-14 py-12 md:py-16">
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
            {featuredPost ? (
              <div
                className={`grid gap-10 lg:gap-14${
                  otherPosts.length > 0
                    ? ' lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]'
                    : ''
                }`}
              >
                  <RevealItem>
                    <article>
                      {featuredCover ? (
                        <a
                          href={featuredPost.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group mb-5 block overflow-hidden bg-surface"
                        >
                          <img
                            src={featuredCover}
                            alt=""
                            loading="eager"
                            referrerPolicy="no-referrer"
                            className="aspect-[16/9] w-full object-cover grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.02] group-hover:grayscale-0"
                          />
                        </a>
                      ) : null}
                      <p className="text-[10px] tracking-widest text-muted">
                        {formatDate(featuredPost.pubDate)}
                        {featuredCategories.length
                          ? ` / ${featuredCategories.join(' · ')}`
                          : ' / notes'}
                      </p>
                      <h3 className="mt-3 max-w-2xl text-xl leading-7 text-white md:text-2xl">
                        <a
                          href={featuredPost.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {featuredPost.title}
                        </a>
                      </h3>
                      {featuredExcerpt ? (
                        <p className="mt-3 max-w-2xl font-sans text-sm leading-7 text-neutral-400">
                          {featuredExcerpt.slice(0, 220)}
                          {featuredExcerpt.length > 220 ? '...' : ''}
                        </p>
                      ) : null}
                      <a
                        href={featuredPost.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-block text-xs text-neutral-300 underline decoration-neutral-600 underline-offset-4 hover:text-white"
                      >
                        read article ↗
                      </a>
                    </article>
                  </RevealItem>

                  {otherPosts.length > 0 ? (
                    <ol className="divide-y divide-line border-y border-line">
                      {otherPosts.map((post, index) => {
                        const postCover = getMediumCover(post);
                        const postExcerpt = stripHtml(post.description).slice(0, 105);

                        return (
                          <RevealItem key={post.guid || post.link} as="li" delay={index * 90}>
                            <article className="flex gap-4 py-4">
                              {postCover ? (
                                <a
                                  href={post.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="h-20 w-24 shrink-0 overflow-hidden bg-surface sm:h-24 sm:w-32"
                                >
                                  <img
                                    src={postCover}
                                    alt=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                    className="h-full w-full object-cover grayscale transition-[filter] duration-300 hover:grayscale-0"
                                  />
                                </a>
                              ) : null}
                              <div className="min-w-0">
                                <p className="text-[10px] text-muted">{formatDate(post.pubDate)}</p>
                                <h3 className="mt-1 text-sm leading-5 text-white">
                                  <a
                                    href={post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                  >
                                    {post.title}
                                  </a>
                                </h3>
                                {postExcerpt ? (
                                  <p className="mt-1.5 font-sans text-xs leading-5 text-neutral-500">
                                    {postExcerpt}{postExcerpt.length === 105 ? '...' : ''}
                                  </p>
                                ) : null}
                              </div>
                            </article>
                          </RevealItem>
                        );
                      })}
                    </ol>
                  ) : null}
              </div>
            ) : (
                <p className="border-y border-line py-5 text-sm text-muted">
                  No articles appeared in the feed.
                </p>
            )}

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
