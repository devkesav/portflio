import React, { useEffect, useRef, useState } from 'react';

const COOKIE_NAME = 'stories-interest';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
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

const readSavedChoice = () => {
  const entry = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${COOKIE_NAME}=`));
  const value = entry?.slice(COOKIE_NAME.length + 1);
  return value === 'in' || value === 'out' ? value : null;
};

const Stories = ({ onClose, onNavigate, storyOpened, onOpenStory, onBackToCover }) => {
  const [savedChoice, setSavedChoice] = useState(readSavedChoice);
  const storiesOverlayRef = useRef(null);
  const consentRequired = savedChoice === null;
  const storiesAccepted = savedChoice === 'in';

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !consentRequired) onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [consentRequired, onClose]);

  useEffect(() => {
    storiesOverlayRef.current?.scrollTo({ top: 0 });
  }, [storyOpened]);

  const saveChoice = (choice) => {
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${COOKIE_NAME}=${choice}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
    setSavedChoice(choice);
    if (choice === 'out') {
      onNavigate('/');
    }
  };

  return (
    <div
      ref={storiesOverlayRef}
      className={`stories-overlay${storiesAccepted ? ' stories-overlay-page' : ''}`}
    >
      {consentRequired ? (
        <section
          className="stories-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="stories-title"
        >
          <p className="text-[12px] text-muted">$ cd stories</p>
          <h1 id="stories-title" className="mt-4 text-3xl text-white sm:text-4xl">
            Stories
          </h1>

          <div className="mt-8 max-w-xl">
            <p className="text-sm leading-7 text-neutral-300">
              Stories are from my personal side. Would you like to explore?
            </p>

            <fieldset className="mt-6 grid gap-3 sm:grid-cols-2">
              <legend className="sr-only">Choose whether you are interested in Stories</legend>
              {[
                { value: 'in', label: "I'm interested" },
                { value: 'out', label: 'Not interested' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className="stories-choice"
                  onClick={() => saveChoice(option.value)}
                >
                  <span>{option.label}</span>
                </button>
              ))}
            </fieldset>
          </div>
        </section>
      ) : storiesAccepted ? (
        <main className="stories-page" aria-label="Stories">
          {storyOpened ? (
            <>
              <button
                type="button"
                className="stories-back"
                onClick={onBackToCover}
              >
                &lt; Back to cover
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
          ) : (
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
          )}
        </main>
      ) : (
        <button
          type="button"
          className="stories-close"
          onClick={onClose}
          aria-label="Close Stories"
        >
          [ close ]
        </button>
      )}
    </div>
  );
};

export default Stories;
