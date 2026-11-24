import React, { useState } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../context/LanguageContext';
import { routeHref } from '../routes';

const links = [
  { path: '/about', label: 'about' },
  { path: '/work', label: 'work' },
  { path: '/experience', label: 'experience' },
  { path: '/skills', label: 'skills' },
  { path: '/blogs', label: 'blogs' },
  { path: '/stories', label: 'stories', special: true },
  { path: '/contact', label: 'contact' },
];

const Nav = ({ onStoriesClick, onNavigate, storiesOpen }) => {
  const [scrollProgress] = useScrollProgress();
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { language, setLanguage } = useLanguage();

  const labels =
    language === 'ta'
      ? ['என்னைப்பற்றி', 'தொழில்கள்', 'அனுபவம்', 'திறன்கள்', 'எழுத்துகள்', 'கதைகள்', 'தொடர்பு']
      : language === 'ja'
        ? ['自己紹介', '仕事', '経験', 'スキル', '記事', 'ストーリー', '連絡']
        : ['about', 'work', 'experience', 'skills', 'blogs', 'stories', 'contact'];
  const localizedLinks = links.map((link, index) => ({ ...link, label: labels[index] }));
  const navigate = (event, path) => {
    event.preventDefault();
    onNavigate(path);
  };

  return (
    <header
      className="sticky top-0 z-40 border-b border-line bg-black/90 backdrop-blur"
      style={storiesOpen ? { zIndex: 80 } : undefined}
    >
      <div className="shell flex h-14 items-center justify-between">
        <a
          href={routeHref('/')}
          onClick={(event) => navigate(event, '/')}
          className="text-[13px] text-white"
        >
          kesavaraj<span className="hidden sm:inline">@portfolio</span><span className="text-muted">:~$</span>
        </a>

        <nav className="hidden items-center gap-3 text-[13px] text-muted lg:flex xl:gap-5">
          {localizedLinks.map((link) => (
            link.special ? (
              <button
                key={link.path}
                type="button"
                onClick={onStoriesClick}
                className="stories-link transition-colors hover:text-white"
              >
                ./{link.label}
              </button>
            ) : (
              <a
                key={link.path}
                href={routeHref(link.path)}
                onClick={(event) => navigate(event, link.path)}
                className="transition-colors hover:text-white"
              >
                ./{link.label}
              </a>
            )
          ))}
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            aria-label="Select language"
            className="border border-line bg-transparent px-2 py-1 text-[11px] text-muted outline-none"
          >
            <option value="en">English</option>
            <option value="ta">தமிழ்</option>
            <option value="ja">日本語</option>
          </select>
          <button
            type="button"
            onClick={(event) => toggle(event)}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="border border-line px-2 py-1 text-[11px] text-muted transition-colors hover:border-white hover:text-white"
          >
            {theme === 'dark' ? '[ light ]' : '[ dark ]'}
          </button>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            aria-label="Select language"
            className="border border-line bg-transparent px-2 py-1 text-[11px] text-muted outline-none"
          >
            <option value="en">EN</option>
            <option value="ta">தமிழ்</option>
            <option value="ja">日本語</option>
          </select>
          <button
            type="button"
            onClick={(event) => toggle(event)}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="border border-line px-2 py-1 text-[11px] text-muted"
          >
            {theme === 'dark' ? '[ light ]' : '[ dark ]'}
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="border border-line px-2 py-1 text-xs text-muted"
          >
            {open ? '[x]' : '[=]'}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-line bg-black px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-3 text-[13px] text-muted">
            {localizedLinks.map((link) => (
              link.special ? (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onStoriesClick();
                  }}
                  className="stories-link w-fit transition-colors hover:text-white"
                >
                  ./{link.label}
                </button>
              ) : (
                <a
                  key={link.path}
                  href={routeHref(link.path)}
                  onClick={(event) => {
                    event.preventDefault();
                    setOpen(false);
                    onNavigate(link.path);
                  }}
                  className="hover:text-white"
                >
                  ./{link.label}
                </a>
              )
            ))}
          </div>
        </nav>
      ) : null}

      <div
        className="absolute bottom-0 left-0 h-px bg-white/70 transition-[width] duration-150"
        style={{ width: `${scrollProgress * 100}%` }}
        aria-hidden="true"
      />
    </header>
  );
};

export default Nav;
