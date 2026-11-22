import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const readTheme = () => {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
};

export const useTheme = () => {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      // localStorage can be unavailable in private modes; ignore.
    }
  }, [theme]);

  const toggle = useCallback(
    (event) => {
      const next = theme === 'dark' ? 'light' : 'dark';

      const apply = () => {
        // Set the attribute synchronously so the View Transition snapshot
        // captures the finished theme, then let React state catch up.
        document.documentElement.dataset.theme = next;
        document.documentElement.dataset.themeTransition = next;
        flushSync(() => setTheme(next));
      };

      const supportsTransitions =
        typeof document !== 'undefined' &&
        typeof document.startViewTransition === 'function' &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!supportsTransitions) {
        apply();
        return;
      }

      const x = event?.clientX ?? window.innerWidth / 2;
      const y = event?.clientY ?? 0;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(apply);
      transition.ready
        .then(() => {
          const animation = document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 650,
              easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
              pseudoElement: '::view-transition-new(root)',
            }
          );

          animation.finished
            .finally(() => {
              delete document.documentElement.dataset.themeTransition;
            })
            .catch(() => {
              delete document.documentElement.dataset.themeTransition;
            });
        })
        .catch(() => {
          // The transition may be skipped if the tab is hidden; theme still applied.
        });
    },
    [theme]
  );

  return { theme, toggle };
};
