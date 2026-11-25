import React, { useEffect, useState } from 'react';
import { fetchMediumPosts, MEDIUM_PROFILE, hasMediumTag } from '../data/medium';
import { routeHref, STORY_ROUTES } from '../routes';
import IdealsNoteContent from './IdealsNoteContent';

const storyAsset = (path) => `${import.meta.env.BASE_URL}images/stories/${path}`;
const inspirationAsset = (path) =>
  `${import.meta.env.BASE_URL}images/inspirations/${path}`;
const idealsAsset = (path) => `${import.meta.env.BASE_URL}images/ideals/${path}`;
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
    category: 'SCIENCE / PUBLIC SERVICE',
    image: {
      src: inspirationAsset('abdul-kalam.jpg'),
      alt: 'Portrait of A.P.J. Abdul Kalam',
      credit: 'Government of India',
      source: 'https://commons.wikimedia.org/wiki/File:A._P._J._Abdul_Kalam.jpg',
      license: 'GODL-India',
      licenseUrl: 'https://data.gov.in/sites/default/files/Gazette_Notification_OGDL.pdf',
    },
    story:
      'Kalam’s path from aerospace science to public service keeps research, education, and people connected. His curiosity and humility remind me that engineering should be useful beyond the lab.',
    quote: 'Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.',
    quoteSource: {
      label: 'CNBC TV18',
      href: 'https://news.google.com/rss/articles/CBMivgFBVV95cUxPV0JhX3lZaU5Xam56OU1oMEZHcWtLS3dkdDNvWk9ZaWJGcWdYSkFDaGdqN3VHbW9TLURMMi1nVmZUX2ZDZTRGalVsbEo3V0praDJ5V2c2cTE4MUxEcEl5YW95bm01aFVyeGtoV25rakp1a05OVFFBOUZpeFhoR25Xb3VLMGpqRXRUR1pGQXdPZUVQeHJFU19vdXJOV3N3Z0hTZFFfYkx4TFlMblQ5UUJfQVJ6WjVn0gHDAUFVX3lxTE44bzFESVpVckx0d2paTDBIbDlkaUVDZ205dmZGRTFpekkzT3QwODNfRzBtTnRsWTFaenp0c1JsdmJsUTJnZVZuRi1KT3NYNmprY0NfTEF1amJWYTFSdWZRT2cyU200QUZ5ZDE5dUt4TS1vazZMWXQwTlRqYWNCUWhWd2hnV3hCTzhtdVBFcFY5MFNwMnJGdEN4VGZjcGVXTWZGNVpJWjRkbG5HSjk0LTB5QWpMX1NidDZyOW5ZT3loT2JxTQ?oc=5',
    },
  },
  {
    name: 'Jensen Huang',
    category: 'COMPUTING / NVIDIA',
    image: {
      src: inspirationAsset('jensen-huang.jpg'),
      alt: 'Portrait of NVIDIA CEO Jensen Huang',
      credit: 'Prime Minister’s Office, India',
      source: 'https://commons.wikimedia.org/wiki/File:Jensen_Huang_(cropped).jpg',
      license: 'GODL-India',
      licenseUrl: 'https://data.gov.in/sites/default/files/Gazette_Notification_OGDL.pdf',
    },
    story:
      'I’m drawn to Huang’s long view of computing. The CPU/GPU relationship in this line is a reminder that powerful systems depend on their parts working together—an idea that resonates with my interest in embedded hardware and AI. NVIDIA is a company I hope to join one day.',
    quote: 'The GPU won’t destroy the CPU. Without the CPU, there’s no computer.',
    quoteSource: {
      label: 'TechRadar',
      href: 'https://www.techradar.com/pro/quote-of-the-day-by-nvidia-co-founder-jensen-huang-the-gpu-wont-destroy-the-cpu-without-the-cpu-theres-no-computer-reflecting-on-the-symbiosis-of-modern-computing',
    },
  },
  {
    name: 'Subhas Chandra Bose',
    category: 'HISTORY / LEADERSHIP',
    image: {
      src: inspirationAsset('subhas-bose.jpg'),
      alt: 'Archival portrait of Subhas Chandra Bose',
      credit: 'Unknown author',
      source: 'https://commons.wikimedia.org/wiki/File:Netaji_Subhas_Chandra_Bose.jpg',
      license: 'Public domain',
    },
    story:
      'Bose’s leadership in India’s independence movement stands out for its courage and conviction. I admire the commitment to a cause larger than oneself.',
    quote: 'Give me blood, and I shall give you freedom!',
    quoteSource: {
      label: 'Encyclopaedia Britannica',
      href: 'https://www.britannica.com/biography/Subhas-Chandra-Bose',
    },
  },
  {
    name: 'Vijay (Thalapathy)',
    category: 'CINEMA / CULTURE',
    image: {
      src: inspirationAsset('vijay.jpg'),
      alt: 'Vijay at a U.S. Consulate General Chennai event',
      credit: 'U.S. Consulate General Chennai',
      source:
        'https://commons.wikimedia.org/wiki/File:Tamil_Film_actor_Vijay_Celebrating_World_Environment_Day_at_the_U.S._Consulate_Chennai_4_(cropped).jpg',
      license: 'Public domain',
    },
    story:
      'His creative work and connection with audiences inspire me. In an older speech he credited his parents with giving him freedom to choose; that respect for an independent path resonates with how I want to keep learning and building.',
    quote: 'My parents never restricted me.',
    quoteSource: {
      label: 'The Times of India',
      href: 'https://news.google.com/rss/articles/CBMimAJBVV95cUxNdzlSRGdhb3pPMkZjbU82d3hVdGFBMWdwWkhyT2hNVVdPZ2dvUWNpalRJcjdCb254Tk0yOXFBc2p0M0pxN3h1eERESVV3R0xiR2psZDZMTXVNZUtVdjZtWjh0UkFpWGd2RVU5bnVtQ2FjRDJyaUxTYnNKa082V3RWMWJ3RjRTRm5lNWgtdFMtQmhuRER6M1A2NFc4eTZVZVhrZkdwZFliU0ppd3dTZVA3WkppRzM2bEZsZk5mOVV6QmJoNUhVYVdIYzdPTTU1LURVQV91c3BHQUxmcXZzRWNCbWppSlRlOUVtUjZoWnlTU0VIcF8zOWY5Z3JGT3JtQTh4ZmRhZmVmZnZaTU9FRjVCVThuY0U2MHJL0gGeAkFVX3lxTFBNby05emc2R1VpVmQ4bXZKOUFrMHFEWW1zU2xjMkhfQ1JhMkd2WG5aVnUyVmVueXdtRjVlbC0xeWRON2xvR2NUdnRJVlo0Ujg2c3pXVGhPVW0zSk5GS0EtSjBrNVNsSU1fSkNZbUNyNG1KQTdlVXdaMlVmdTlYMzdSd0RSRTIwSnROTFo3SzZjYl9WU2x5WllFTGdnR1lLbFg4cjZBVmw3cTBXd2hONGwxVkJGY1dvcWs2SXZ5QWRBNDRLOHQzMzFNUkxYcjFFQnREbVIwREY0WjFnNkNPOFNiVkNSSFV5UVp1Y1ZXd0I4OUJWLUhOUUhWVVZXTkxic2h1NWNIaHZOM3lQVGpqMktkcFdVMWFCS1JlLXN5anc?oc=5',
    },
  },
  {
    name: 'Vladimir Putin',
    category: 'WORLD AFFAIRS / LEADERSHIP',
    image: {
      src: inspirationAsset('vladimir-putin.jpg'),
      alt: 'Official portrait of Vladimir Putin',
      credit: 'Пресс-служба Президента России',
      source:
        'https://commons.wikimedia.org/wiki/File:Vladimir_Putin_official_photo_08.jpg',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    story:
      'I keep this as a statement to examine, not a principle to adopt. It reflects how leaders frame history and is part of what draws me to Russian leadership and global affairs.',
    quote: 'The collapse of the Soviet Union was the greatest geopolitical catastrophe of the century.',
    quoteSource: {
      label: 'PolitiFact',
      href: 'https://news.google.com/rss/articles/CBMirgFBVV95cUxQNkpiRjBxVGV2WExodkZvVmZJWmRHWWQzSXZHeVdfeFNnMEdrVmNDdEJuU3o5d0cxVllqYWFza3ZTZTdOYnpkVHNHR2hFd2hKdDZTaDY2Y2I0LVZPTDdZQTQzUFdQckNFUlJrc0dPTHRETENNTk5MdG5reEJfVkdsSHpqcW5oT1FUOHZUOU9UYUlSZXh4TV9JLXlEQWlxLWdmNk5pckVGOHhoYVRPTHc?oc=5',
    },
  },
  {
    name: 'Elon Musk',
    category: 'ENGINEERING / INDUSTRY',
    image: {
      src: inspirationAsset('elon-musk.jpg'),
      alt: 'Elon Musk at the U.S. Air Force Academy in 2022',
      credit: 'U.S. Air Force photo by Justin R. Pacheco',
      source:
        'https://commons.wikimedia.org/wiki/File:USAFA_Hosts_Elon_Musk_(Image_1_of_17)_(cropped).jpg',
      license: 'Public domain',
    },
    story:
      'His ventures across electric vehicles, launch systems, and software make ambitious engineering challenges visible. I’m interested in the teams and iteration that turn difficult ideas into working products.',
    quote: 'If things are not failing, you are not innovating enough.',
    quoteSource: {
      label: 'CleanTechnica',
      href: 'https://news.google.com/rss/articles/CBMiwwFBVV95cUxNTXpJOWdiSHIzTTNTOFJSUjd3V0NsZDhDbXFzcEtXWkNTN0tVZjlQUGhISzRlMzZyRXZaR0xsN1pzRjA1U1NTTUlBTHN0ZXlkZnpLS1ZfRzdQRjhGbzV4YlNKbHpxMkVTbjNCbUZGSFRHVXJHY21MR2daZllkZEs5LXZWbHcyTGZJMjRMa0ltdUhoMXVWbUJiaVIzVzZSNXFBUWRQWUhEb1dVMy1UVlhEZE9HVWMzRGZhOG5QSmE4MFk5Vmc?oc=5',
    },
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
  const isIdealsWriteup = path === STORY_ROUTES.idealsWriteup;
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
        ) : isIdealsWriteup ? (
          <>
            <button type="button" className="stories-back" onClick={onBackToStories}>
              &larr; Back to stories
            </button>
            <article className="stories-post">
              <div className="stories-post-meta">
                <span>PERSONAL</span>
                <span aria-hidden="true">/</span>
                <span>MY IDEALS</span>
              </div>
              <h2 className="stories-post-title">Built to be useful, not finished</h2>
              <p className="stories-post-copy">
                A working note on what this site, and the work behind it, is meant to be.
              </p>
              <IdealsNoteContent onNavigate={onNavigate} />
              <div className="ideals-figures">
                <figure>
                  <img
                    src={idealsAsset('terminal.webp')}
                    alt="A code editor open on a laptop screen"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>
                    The working notebook: small experiments, notes, and code. Image:{' '}
                    <a
                      href="https://commons.wikimedia.org/wiki/File:Coder_screen_shot.webp"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Coder screen shot
                    </a>{' '}
                    / Wikideas1 / Wikimedia Commons (CC0).
                  </figcaption>
                </figure>
                <figure>
                  <img
                    src={idealsAsset('oscilloscope.webp')}
                    alt="A digital oscilloscope on a workbench"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>
                    The lab side: waveforms, power electronics, and embedded systems. Image:{' '}
                    <a
                      href="https://commons.wikimedia.org/wiki/File:Hameg_Oscilloscope_HMO3004_Series.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Hameg oscilloscope
                    </a>{' '}
                    / Ordercrazy / Wikimedia Commons (CC0).
                  </figcaption>
                </figure>
              </div>
            </article>
          </>
        ) : isIdealsAndHobbies ? (
          <>
            <button type="button" className="stories-back" onClick={onBackToStories}>
              &larr; Back to stories
            </button>
            <article className="stories-post ideals-page">
              <header className="ideals-masthead">
                <div className="ideals-masthead-meta">
                  <span className="stories-moment-index">PERSONAL / FIELD NOTES</span>
                  <span className="ideals-masthead-count">ENTRIES 01 &ndash; 03</span>
                </div>
                <h1 className="ideals-masthead-title">My ideals &amp; hobby projects</h1>
                <p className="ideals-masthead-lede">
                  A working notebook of the projects, questions, and half-formed ideas that
                  shape how I think about engineering. Not a finished showcase &mdash; a record
                  of the work in progress, and of the people and ideas that keep it moving.
                </p>
              </header>

              <section className="ideals-cover" aria-labelledby="ideals-cover-title">
                <div className="ideals-cover-head">
                  <div className="ideals-cover-heading">
                    <p className="stories-moment-index">FIELD NOTES / 001</p>
                    <h2 id="ideals-cover-title" className="ideals-cover-title">
                      Why this portfolio exists
                    </h2>
                  </div>
                  <p className="ideals-cover-intro">
                    This portfolio is a working notebook: a place for the projects, questions,
                    and half-formed ideas that shape how I think about engineering. It is not a
                    finished showcase. It is a record of the work in progress.
                  </p>
                </div>
                <figure className="ideals-cover-figure">
                  <img
                    src={idealsAsset('circuit.webp')}
                    alt="Close-up of copper traces on a hand-etched circuit board"
                    loading="eager"
                    decoding="async"
                  />
                  <figcaption>
                    <span className="ideals-cover-credit-label">COVER</span>
                    Cover image:{' '}
                    <a
                      href="https://commons.wikimedia.org/wiki/File:Circuit_board_after_manual_etching.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Circuit board after manual etching
                    </a>{' '}
                    / Tinux / Wikimedia Commons (CC0).
                  </figcaption>
                </figure>
              </section>

              <a
                href={routeHref(STORY_ROUTES.idealsWriteup)}
                onClick={(event) => navigate(event, STORY_ROUTES.idealsWriteup)}
                className="hero-action-link ideals-note-link"
              >
                <span className="ideals-note-link-body">
                  <span className="stories-moment-index">MY IDEALS / FULL NOTE</span>
                  <span className="ideals-note-title">Built to be useful, not finished</span>
                  <span className="ideals-note-copy">
                    What I want this portfolio to be, the standards I try to keep, and the
                    people and ideas that shape them.
                  </span>
                </span>
                <span className="ideals-note-cta">
                  Read the note <span aria-hidden="true">&rarr;</span>
                </span>
              </a>

              {hobbyPosts.length > 0 ? (
                <section className="ideals-projects" aria-labelledby="ideals-projects-title">
                  <div className="ideals-section-head">
                    <p className="stories-moment-index">MEDIUM / HOBBY PROJECTS</p>
                    <h2 id="ideals-projects-title" className="ideals-section-title">
                      Hobby projects
                    </h2>
                    <p className="ideals-section-lede">
                      Smaller experiments and notes, published on Medium under the
                      &ldquo;Hobby Projects&rdquo; tag.
                    </p>
                  </div>
                  <div className="ideals-feed-grid">
                    {hobbyPosts.map((post) => (
                      <article key={post.guid || post.link} className="ideals-feed-card">
                        <p className="ideals-feed-meta">
                          {post.pubDate
                            ? `${new Date(post.pubDate).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })} / `
                            : ''}
                          Hobby Projects
                        </p>
                        <h3 className="ideals-feed-title">
                          <a
                            href={post.link}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline"
                          >
                            {post.title}
                          </a>
                        </h3>
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noreferrer"
                          className="ideals-feed-link"
                        >
                          read on medium &rarr;
                        </a>
                      </article>
                    ))}
                  </div>
                  <a
                    href={MEDIUM_PROFILE}
                    target="_blank"
                    rel="noreferrer"
                    className="ideals-profile-link"
                  >
                    visit my Medium profile &rarr;
                  </a>
                </section>
              ) : (
                <p className="ideals-medium-only" aria-busy={blogStatus === 'loading'}>
                  <a
                    href={MEDIUM_PROFILE}
                    target="_blank"
                    rel="noreferrer"
                    className="ideals-profile-link"
                  >
                    visit my Medium profile &rarr;
                  </a>
                </p>
              )}
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
              <div className="stories-inspiration-list">
                {inspirations.map((person, index) => (
                  <article className="stories-inspiration-entry" key={person.name}>
                    <figure className="stories-inspiration-figure">
                      <div className="stories-inspiration-frame">
                        <img
                          src={person.image.src}
                          alt={person.image.alt}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <figcaption className="stories-inspiration-credit">
                        <span>PHOTO / </span>
                        <a
                          href={person.image.source}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {person.image.credit}
                        </a>
                        <span aria-hidden="true"> / </span>
                        {person.image.licenseUrl ? (
                          <a
                            href={person.image.licenseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {person.image.license}
                          </a>
                        ) : (
                          <span>{person.image.license}</span>
                        )}
                      </figcaption>
                    </figure>
                    <div className="stories-inspiration-content">
                      <p className="stories-inspiration-meta">
                        <span>PERSON / {String(index + 1).padStart(2, '0')}</span>
                        <span>{person.category}</span>
                      </p>
                      <h3 className="stories-inspiration-name">{person.name}</h3>
                      <p className="stories-inspiration-story">{person.story}</p>
                      <blockquote className="stories-inspiration-quote">
                        <p>“{person.quote}”</p>
                        <cite>
                          — {person.name} ·{' '}
                          <a
                            href={person.quoteSource.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            source: {person.quoteSource.label}
                          </a>
                        </cite>
                      </blockquote>
                    </div>
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
