import React, { useEffect, useState } from 'react';
import { fetchMediumPosts, MEDIUM_PROFILE, hasMediumTag } from '../data/medium';
import { routeHref, STORY_ROUTES } from '../routes';

const storyAsset = (path) => `${import.meta.env.BASE_URL}images/stories/${path}`;
const storyMoments = [
  {
    name: 'Tamil Gaming',
    channelUrl: 'https://www.youtube.com/@tamilgaming',
    photos: [
      {
        src: storyAsset('tamil-gaming.webp'),
        alt: 'Photo with Tamil Gaming and other attendees at the NVIDIA event',
      },
    ],
    memory:
      "I appeared in Tamil Gaming's live video at 28:30 and talked about my Counter-Strike runner wishes. It is a moment I will always remember from the event.",
    reflection:
      'It encourages me to keep pursuing my interests and to value the people I meet along the way.',
    video: {
      href: 'https://youtu.be/41rucpn4hHI?si=HuWEKmzTlCE40MZy&t=1710',
      label: 'Watch my live-stream appearance (28:30)',
    },
  },
  {
    name: 'Shark Gaming',
    channelUrl: 'https://www.youtube.com/@SharpTamilGaming',
    photos: [
      {
        src: storyAsset('event-group.webp'),
        alt: 'A group photo with Shark Gaming at the NVIDIA event',
      },
    ],
    memory:
      'This moment with Shark Gaming is one of the memories I wanted to keep from the event. It was special to meet a creator in person and share a moment around a hobby we both enjoy.',
    reflection:
      'It reminded me that progress starts with passion, curiosity, and the courage to keep showing up.',
  },
  {
    name: 'Manguni Gamer',
    channelUrl: 'https://www.youtube.com/@ManguniMamay',
    photos: [
      {
        src: storyAsset('maguni-gamer.webp'),
        alt: 'Photo with Manguni Gamer at the NVIDIA event',
      },
    ],
    memory:
      'During a brief conversation with Manguni Gamer, he stepped off the stage and came over to talk with me. This moment is at 4:10 in the event video.',
    reflection:
      'It motivates me to stay consistent with my own goals, keep learning, and share what I enjoy with others.',
    video: {
      href: 'https://youtu.be/g4-D0dYUbRE?si=ArjuVi0z2RW4A5cT&t=250',
      label: 'Watch the conversation (4:10)',
    },
  },
  {
    name: 'IG',
    channelUrl: 'https://www.youtube.com/@MrIG',
    photos: [
      {
        src: storyAsset('community-selfie.webp'),
        alt: 'Photo with IG and other creators at the NVIDIA event',
      },
    ],
    memory:
      'This selfie with IG keeps another happy moment from the NVIDIA event close. Meeting another creator from the Tamil gaming community made the day even more memorable.',
    reflection:
      'It inspires me to stay open to new experiences, keep connecting with people, and continue pursuing my interests.',
  },
];
const coverStory = storyMoments.find((story) => story.name === 'Shark Gaming');
const coverPhoto = {
  src: storyAsset('shark-gaming.webp'),
  alt: 'Photo with Shark Gaming at the NVIDIA event',
};
const inspirations = [
  {
    name: 'A.P.J. Abdul Kalam',
    note: 'His curiosity, humility, and commitment to science and education.',
  },
  {
    name: 'Jensen Huang',
    note:
      'As NVIDIA’s CEO, his long-term vision in computing inspires me; NVIDIA is a company I aspire to join.',
  },
  {
    name: 'Subhas Chandra Bose',
    note: 'His courage and leadership in India’s independence movement.',
  },
  {
    name: 'Vijay (Thalapathy)',
    note: 'His creative work and connection with audiences inspire me.',
  },
  {
    name: 'Vladimir Putin',
    note: 'His career has made me curious about Russian leadership and global affairs.',
  },
  {
    name: 'Elon Musk',
    note: 'His ambition in building technology ventures and pursuing engineering challenges.',
  },
];
const Stories = ({
  path,
  onNavigate,
  onOpenStory,
  onBackToCover,
  onBackToStories,
}) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogStatus, setBlogStatus] = useState('loading');
  const hobbyPosts = blogPosts.filter((post) => hasMediumTag(post, 'Hobby Projects'));
  const isMemoriesCover = path === STORY_ROUTES.memories;
  const isMemoryPost = path === STORY_ROUTES.memoryPost;
  const isIdealsAndHobbies = path === STORY_ROUTES.idealsAndHobbies;
  const isInspirations = path === STORY_ROUTES.inspirations;

  useEffect(() => {
    if (path !== STORY_ROUTES.idealsAndHobbies) return undefined;

    let active = true;
    const controller = new AbortController();
    setBlogStatus('loading');

    fetchMediumPosts(controller.signal)
      .then((posts) => {
        if (!active) return;
        setBlogPosts(posts);
        setBlogStatus('ready');
      })
      .catch((error) => {
        if (!active || error.name === 'AbortError') return;
        setBlogStatus('error');
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [path]);

  const navigate = (event, route) => {
    event.preventDefault();
    onNavigate(route);
  };

  return (
    <section
      className={`stories-page flex flex-1 flex-col${path === STORY_ROUTES.hub ? ' stories-hub-page' : ''}`}
      aria-label="Stories"
    >
        {path === STORY_ROUTES.hub ? (
          <>
            <header className="mt-4 max-w-3xl">
              <p className="stories-post-meta">PERSONAL / COLLECTIONS</p>
              <h1 className="stories-post-title">Stories</h1>
              <p className="stories-post-copy">
                Happy memories, the projects I explore, and people who inspire me.
              </p>
            </header>

            <nav
              className="mt-5 mb-[7.5rem] grid flex-1 gap-3 md:grid-cols-3"
              aria-label="Story collections"
            >
              {[
                {
                  route: STORY_ROUTES.memories,
                  title: 'Happy memories',
                  description:
                    'Moments with the Tamil gaming community that I still remember fondly.',
                },
                {
                  route: STORY_ROUTES.idealsAndHobbies,
                  title: 'My ideals & hobby projects',
                  description: 'My guiding values and the personal projects I’m exploring.',
                },
                {
                  route: STORY_ROUTES.inspirations,
                  title: 'Inspirations',
                  description:
                    'People whose work and stories shape what I want to learn and build.',
                },
              ].map((option, index) => (
                <a
                  key={option.route}
                  href={routeHref(option.route)}
                  onClick={(event) => navigate(event, option.route)}
                  className="stories-option hero-action-link flex min-h-56 w-full flex-col border border-line p-5 text-[13px] text-neutral-300 transition-colors"
                >
                  <span className="text-[10px] tracking-widest opacity-60">
                    COLLECTION / {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex flex-1 flex-col items-center justify-center text-center">
                    <span className="text-lg font-medium">{option.title}</span>
                    <span className="mt-3 max-w-xs leading-6 opacity-75">
                      {option.description}
                    </span>
                  </span>
                  <span className="pt-6 text-xs opacity-70">
                    open collection <span aria-hidden="true">&rarr;</span>
                  </span>
                </a>
              ))}
            </nav>
          </>
        ) : isMemoryPost ? (
          <>
            <button type="button" className="stories-back" onClick={onBackToCover}>
              &larr; Back to happy memories
            </button>
            <article className="stories-post stories-inside-post">
              <div className="stories-post-meta">
                <span>COMMUNITY</span>
                <span aria-hidden="true">/</span>
                <span>GAMING</span>
                <span aria-hidden="true">/</span>
                <span>MEMORIES</span>
              </div>
              <h2 className="stories-post-title">
                Creator moments from the Tamil gaming community
              </h2>
              <p className="stories-post-copy">
                Each photo holds a small part of an unforgettable day at the NVIDIA event.
                These are the people and moments that made it special.
              </p>
              <div className="stories-moments">
                {storyMoments.map((story, index) => (
                  <section className="stories-moment" key={story.name}>
                    <div
                      className={`stories-moment-photos${story.photos.length > 1 ? ' has-multiple' : ''}`}
                    >
                      {story.photos.map((photo) => (
                        <img
                          className="stories-moment-image"
                          key={photo.src}
                          src={photo.src}
                          alt={photo.alt}
                          loading="eager"
                          decoding="async"
                        />
                      ))}
                    </div>
                    <div className="stories-moment-content">
                      <p className="stories-moment-index">
                        MEMORY&nbsp; {String(index + 1).padStart(2, '0')}
                      </p>
                      <h3 className="stories-moment-title">
                        <a
                          className="stories-moment-channel"
                          href={story.channelUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {story.name}
                        </a>
                      </h3>
                      <p className="stories-moment-copy">{story.memory}</p>
                      <p className="stories-moment-reflection">
                        <strong>What it inspired in me:</strong> {story.reflection}
                      </p>
                      {story.video ? (
                        <a
                          className="stories-moment-video"
                          href={story.video.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {story.video.label}
                        </a>
                      ) : null}
                    </div>
                  </section>
                ))}
              </div>
            </article>
          </>
        ) : isMemoriesCover ? (
          <>
            <button type="button" className="stories-back" onClick={onBackToStories}>
              &larr; Back to stories
            </button>
            <article
              className="stories-post stories-cover-post"
              role="button"
              tabIndex={0}
              aria-label="Open the story: A happy moment with the Tamil gaming community"
              onClick={onOpenStory}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onOpenStory();
                }
              }}
            >
              <div className="stories-post-meta">
                <span>COMMUNITY</span>
                <span aria-hidden="true">/</span>
                <span>GAMING</span>
              </div>
              <h2 className="stories-post-title">
                A happy moment with the Tamil gaming community
              </h2>
              <p className="stories-post-copy">
                One of my happiest memories is meeting Tamil gaming creators at an NVIDIA event.
                These photos bring back the excitement of being there, meeting people from the
                community, and sharing a moment around something we all enjoy.
              </p>
              <section className="stories-feature" aria-labelledby="stories-feature-title">
                <figure className="stories-feature-visual">
                  <img
                    className="stories-feature-image"
                    src={coverPhoto.src}
                    alt={coverPhoto.alt}
                    loading="eager"
                    decoding="async"
                  />
                  <figcaption>{coverStory.name} / NVIDIA EVENT</figcaption>
                </figure>
                <div className="stories-feature-content">
                  <p className="stories-feature-kicker">FEATURED COMMUNITY MOMENT</p>
                  <h3 id="stories-feature-title" className="stories-feature-title">
                    {coverStory.name}
                  </h3>
                  <p className="stories-feature-copy">{coverStory.memory}</p>
                  <p className="stories-feature-reflection">
                    <strong>What it inspired in me:</strong> {coverStory.reflection}
                  </p>
                </div>
              </section>
              <span className="stories-read-link" aria-hidden="true">
                Read the creator moments -&gt;
              </span>
              <p className="stories-post-index">MEMORY&nbsp; 01</p>
            </article>
          </>
        ) : isIdealsAndHobbies ? (
          <>
            <button type="button" className="stories-back" onClick={onBackToStories}>
              &larr; Back to stories
            </button>
            <article className="stories-post">
              <div className="stories-post-meta">
                <span>PERSONAL</span>
                <span aria-hidden="true">/</span>
                <span>HOBBY PROJECTS</span>
              </div>
              <h2 className="stories-post-title">My ideals &amp; hobby projects</h2>
              <section className="mt-8 border-t border-line pt-5">
                <p className="stories-moment-index">MY IDEALS</p>
                <p className="mt-3 text-[13px] leading-6 text-neutral-400">
                  This part is still taking shape. I’ll share more about the ideals and goals
                  guiding my work as they develop.
                </p>
              </section>
              <section className="mt-8 border-t border-line pt-5">
                <p className="stories-moment-index">MEDIUM / HOBBY PROJECTS</p>
                <h3 className="mt-2 text-lg text-white">Hobby projects</h3>
                <p className="mt-2 text-[13px] leading-6 text-neutral-400">
                  Articles tagged “Hobby Projects” on Medium will appear here.
                </p>
                {blogStatus === 'loading' ? (
                  <p className="mt-5 text-[13px] text-muted">$ checking medium.feed</p>
                ) : null}
                {blogStatus === 'error' ? (
                  <p className="mt-5 text-[13px] text-muted">
                    Medium is unavailable right now. Try again later.
                  </p>
                ) : null}
                {blogStatus === 'ready' && hobbyPosts.length === 0 ? (
                  <p className="mt-5 border-y border-line py-4 text-[13px] text-muted">
                    No posts tagged “Hobby Projects” yet. Add that tag to a Medium article and
                    it will show up here.
                  </p>
                ) : null}
                {hobbyPosts.length > 0 ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {hobbyPosts.map((post) => (
                      <article key={post.guid || post.link} className="border border-line p-4">
                        <p className="text-[10px] tracking-widest text-muted">
                          {post.pubDate
                            ? `${new Date(post.pubDate).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })} / `
                            : ''}
                          Hobby Projects
                        </p>
                        <h4 className="mt-3 text-[15px] leading-6 text-white">
                          <a
                            href={post.link}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline"
                          >
                            {post.title}
                          </a>
                        </h4>
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-block text-xs text-muted hover:text-white"
                        >
                          read on medium &rarr;
                        </a>
                      </article>
                    ))}
                  </div>
                ) : null}
                <a
                  href={MEDIUM_PROFILE}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block text-xs text-neutral-300 underline decoration-neutral-600 underline-offset-4 hover:text-white"
                >
                  visit my Medium profile &rarr;
                </a>
              </section>
            </article>
          </>
        ) : isInspirations ? (
          <>
            <button type="button" className="stories-back" onClick={onBackToStories}>
              &larr; Back to stories
            </button>
            <article className="stories-post">
              <div className="stories-post-meta">
                <span>PERSONAL</span>
                <span aria-hidden="true">/</span>
                <span>INSPIRATIONS</span>
              </div>
              <h2 className="stories-post-title">People who inspire me</h2>
              <p className="stories-post-copy">
                These people have influenced my interests in science, technology, history,
                creativity, and world affairs.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {inspirations.map((person) => (
                  <article key={person.name} className="border border-line p-4">
                    <h3 className="text-[15px] text-white">{person.name}</h3>
                    <p className="mt-2 text-[13px] leading-6 text-neutral-400">{person.note}</p>
                  </article>
                ))}
              </div>
            </article>
          </>
        ) : null}
    </section>
  );
};

export default Stories;
