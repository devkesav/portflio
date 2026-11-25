import React, { useEffect, useLayoutEffect, useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';
import Stories from './components/Stories';
import {
  getCurrentRoutePath,
  normalizeRoutePath,
  routeHref,
  STORY_ROUTES,
} from './routes';

const SECTION_IDS = {
  '/': 'hero',
  '/about': 'about',
  '/work': 'work',
  '/experience': 'experience',
  '/skills': 'skills',
  '/achievements': 'achievements',
  '/blogs': 'blogs',
  '/contact': 'contact',
};
const STORY_PATHS = new Set(Object.values(STORY_ROUTES));

const App = () => {
  const [currentPath, setCurrentPath] = useState(getCurrentRoutePath);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const storiesOpen = STORY_PATHS.has(currentPath);
  const activeProjectId = currentPath.startsWith('/work/')
    ? currentPath.slice('/work/'.length)
    : null;

  const scrollToRoute = (path) => {
    const sectionId = SECTION_IDS[path];
    if (!sectionId) {
      window.scrollTo(0, 0);
      return;
    }

    const section = document.getElementById(sectionId);
    if (!section) return;

    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    section.scrollIntoView({ block: 'start', behavior: 'instant' });
  };

  const navigateTo = (path, { replace = false } = {}) => {
    const nextPath = normalizeRoutePath(path);
    const nextUrl = routeHref(nextPath);

    if (
      window.location.pathname !== nextUrl ||
      window.location.search ||
      window.location.hash
    ) {
      window.history[replace ? 'replaceState' : 'pushState']({}, '', nextUrl);
    }

    setCurrentPath(nextPath);
    if (nextPath === currentPath) scrollToRoute(nextPath);
  };

  const openStories = () => navigateTo(STORY_ROUTES.hub);

  const openStoryPost = () => navigateTo(STORY_ROUTES.memoryPost);
  const backToStoryCover = () => navigateTo(STORY_ROUTES.memories, { replace: true });
  const backToStories = () => navigateTo(STORY_ROUTES.hub, { replace: true });

  useLayoutEffect(() => {
    scrollToRoute(currentPath);
  }, [currentPath]);

  useEffect(() => {
    const syncPath = () => {
      const path = getCurrentRoutePath();
      const canonicalUrl = routeHref(path);
      if (window.location.pathname !== canonicalUrl) {
        window.history.replaceState({}, '', canonicalUrl);
      }
      setCurrentPath(path);
    };

    window.addEventListener('popstate', syncPath);
    syncPath();
    return () => window.removeEventListener('popstate', syncPath);
  }, []);

  useEffect(() => {
    const syncScroll = () => setShowBackToTop(window.scrollY > 400);
    syncScroll();
    window.addEventListener('scroll', syncScroll, { passive: true });
    return () => window.removeEventListener('scroll', syncScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Nav
        storiesOpen={storiesOpen}
        onStoriesClick={openStories}
        onNavigate={navigateTo}
      />

      <main className="flex flex-1 flex-col">
        {activeProjectId ? (
          <ProjectDetail
            projectId={activeProjectId}
            onBack={() => navigateTo('/work', { replace: true })}
          />
        ) : STORY_PATHS.has(currentPath) ? (
          <Stories
            path={currentPath}
            onNavigate={navigateTo}
            onOpenStory={openStoryPost}
            onBackToCover={backToStoryCover}
            onBackToStories={backToStories}
          />
        ) : !SECTION_IDS[currentPath] ? (
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <p className="text-xs text-muted">error: 404 — page not found</p>
            <a
              href={routeHref('/')}
              onClick={(event) => {
                event.preventDefault();
                navigateTo('/');
              }}
              className="mt-8 inline-block text-xs text-neutral-300 hover:text-white"
            >
              ← return home
            </a>
          </div>
        ) : (
          <>
            <Hero onNavigate={navigateTo} />
            <About />
            <Projects onProjectClick={(projectId) => navigateTo(`/work/${projectId}`)} />
            <Experience />
            <Skills />
            <Achievements />
            <Blogs />
            <Contact />
          </>
        )}
      </main>

      <button
        type="button"
        className={`hero-action-link back-to-top${showBackToTop ? ' is-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
      >
        &uarr;
      </button>

      <footer className="site-footer border-t border-line py-8">
        <div className="shell flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p>kesavaraj@portfolio:~$ exit 0</p>
          <div className="flex items-center gap-5">
            <a href="https://github.com/devkesav" target="_blank" rel="noreferrer">
              github
            </a>
            <a href="https://www.linkedin.com/in/devkesav" target="_blank" rel="noreferrer">
              linkedin
            </a>
            <a href="mailto:k.kesavaraj86@gmail.com">
              email
            </a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
