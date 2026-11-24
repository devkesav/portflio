// src/hooks/useScrollProgress.js
import { useState, useEffect } from 'react';

/**
 * Hook to track the scroll position of the window and normalize it to a 0-1 scale.
 * @returns {[number, number]} [progress (0 to 1), totalHeight]
 */
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);

  useEffect(() => {
    let animationFrame = null;
    const updateProgress = () => {
      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        const documentHeight = Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight
        );
        const scrollableHeight = Math.max(0, documentHeight - window.innerHeight);
        const scrollTop = Math.max(0, window.scrollY);

        setTotalHeight(scrollableHeight);
        setProgress(
          scrollableHeight === 0 ? 0 : Math.min(scrollTop, scrollableHeight) / scrollableHeight
        );
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    const resizeObserver =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateProgress);
    resizeObserver?.observe(document.documentElement);
    resizeObserver?.observe(document.body);

    return () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateProgress);
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return [progress, totalHeight];
};