import React, { useState } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useTheme } from '../hooks/useTheme';

const links = [
  { href: '#about', label: 'about' },
  { href: '#projects', label: 'work' },
  { href: '#experience', label: 'experience' },
  { href: '#skills', label: 'skills' },
  { href: '#blogs', label: 'blogs' },
  { href: '#contact', label: 'contact' },
];

const Nav = () => {
  const [scrollProgress] = useScrollProgress();
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-black/90 backdrop-blur">
      <div className="shell flex h-14 items-center justify-between">
        <a href="#hero" className="text-[13px] text-white">
          kesavaraj@portfolio<span className="text-muted">:~$</span>
        </a>

        <nav className="hidden items-center gap-3 text-[13px] text-muted md:flex lg:gap-5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              ./{link.label}
            </a>
          ))}
          <a
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            download="Kesavaraj-K-Resume.pdf"
            className="text-white transition-colors hover:text-muted"
          >
            resume.pdf
          </a>
          <button
            type="button"
            onClick={(event) => toggle(event)}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="border border-line px-2 py-1 text-[11px] text-muted transition-colors hover:border-white hover:text-white"
          >
            {theme === 'dark' ? '[ light ]' : '[ dark ]'}
          </button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
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
        <nav className="border-t border-line bg-black px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-[13px] text-muted">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-white"
              >
                ./{link.label}
              </a>
            ))}
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download="Kesavaraj-K-Resume.pdf"
              className="text-white"
            >
              resume.pdf
            </a>
          </div>
        </nav>
      ) : null}

      <div
        className="absolute bottom-0 left-0 h-px bg-white/70 transition-[width] duration-150"
        style={{ width: `${Math.max(1, scrollProgress * 100)}%` }}
      />
    </header>
  );
};

export default Nav;
