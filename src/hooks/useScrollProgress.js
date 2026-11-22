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
    // Set initial height on mount
    const updateHeight = () => {
      setTotalHeight(document.documentElement.scrollHeight - window.innerHeight);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);

    // Update progress on scroll event
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (totalHeight > 0) {
        setProgress(scrollTop / totalHeight);
      } else if (scrollTop > 0) {
         // Fallback if height hasn't been calculated yet but scrolling has started
         setProgress(scrollTop / 1000); // Arbitrary large number fallback
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [totalHeight]);

  return [progress, totalHeight];
};