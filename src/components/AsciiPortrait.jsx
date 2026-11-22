import React, { useEffect, useMemo, useState } from 'react';
import { asciiPortraits, asciiSize } from '../data/asciiPortrait';

const SCRAMBLE = " .'`^,:;il!~+*ox%#@&";
const REVEAL_MS = 1500;

// Deterministic noise so the scramble looks hand-tuned, never truly random.
const seededRandom = (seed) => {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;
  return () => {
    state = (state * 16807) % 2147483647;
    return state / 2147483647;
  };
};

const readTheme = () =>
  typeof document === 'undefined' || document.documentElement.dataset.theme !== 'light'
    ? 'dark'
    : 'light';

const usePortraitTheme = () => {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  return theme;
};

const AsciiPortrait = () => {
  const theme = usePortraitTheme();
  const asciiText = asciiPortraits[theme];
  const frameRef = React.useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const handleMove = (event) => {
      const bounds = frame.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.hypot(dx, dy);
      const influence = Math.max(0, 1 - distance / 650);

      if (influence === 0) {
        reset();
        return;
      }

      const x = dx / 650;
      const y = dy / 650;
      const eased = influence * influence * (3 - 2 * influence);

      frame.style.setProperty('--tilt-x', `${(-y * 8 * eased).toFixed(2)}deg`);
      frame.style.setProperty('--tilt-y', `${(x * 10 * eased).toFixed(2)}deg`);
      frame.style.setProperty('--glow-x', `${Math.max(0, Math.min(100, 50 + x * 65 * eased)).toFixed(1)}%`);
      frame.style.setProperty('--glow-y', `${Math.max(0, Math.min(100, 50 + y * 65 * eased)).toFixed(1)}%`);
    };

    const reset = () => {
      frame.style.setProperty('--tilt-x', '0deg');
      frame.style.setProperty('--tilt-y', '0deg');
      frame.style.setProperty('--glow-x', '50%');
      frame.style.setProperty('--glow-y', '50%');
    };

    frame.addEventListener('pointermove', handleMove);
    frame.addEventListener('pointerleave', reset);
    reset();

    return () => {
      frame.removeEventListener('pointermove', handleMove);
      frame.removeEventListener('pointerleave', reset);
    };
  }, []);

  const cells = useMemo(() => {
    const random = seededRandom(42);
    const lines = asciiText.split('\n');
    const list = [];

    lines.forEach((line, row) => {
      [...line].forEach((char, col) => {
        list.push({
          char,
          newline: col === asciiSize.cols - 1 && row < lines.length - 1,
          threshold: (row / lines.length) * 0.55 + random() * 0.45,
        });
      });
    });

    return list;
  }, [asciiText]);

  const noiseFrames = useMemo(() => {
    const random = seededRandom(9137);
    return Array.from({ length: 5 }, () =>
      cells.map(() => SCRAMBLE[Math.floor(random() * SCRAMBLE.length)])
    );
  }, [cells]);

  const [progress, setProgress] = useState(0);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setProgress(1);
      return undefined;
    }

    const start = performance.now();
    let done = false;

    const progressTimer = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const raw = Math.min(1, elapsed / REVEAL_MS);
      setProgress(raw * raw * (3 - 2 * raw));
      if (raw === 1) {
        done = true;
        window.clearInterval(progressTimer);
        window.clearInterval(noiseTimer);
      }
    }, 34);

    const noiseTimer = window.setInterval(() => {
      if (!done) setFrame((value) => (value + 1) % noiseFrames.length);
    }, 70);

    return () => {
      window.clearInterval(progressTimer);
      window.clearInterval(noiseTimer);
    };
  }, [noiseFrames.length]);

  const output = useMemo(() => {
    const noise = noiseFrames[frame];
    let text = '';

    cells.forEach((cell, index) => {
      text += progress >= cell.threshold ? cell.char : noise[index];
      if (cell.newline) text += '\n';
    });

    return text;
  }, [cells, frame, noiseFrames, progress]);

  return (
    <div className="hidden w-full justify-self-end md:flex md:flex-col md:items-end" aria-hidden="false">
      <div ref={frameRef} className="ascii-frame border border-line bg-surface/40 p-2">
        <div className="mb-1 flex items-center justify-between text-[10px] leading-3 text-muted">
          <span>$ cat portrait.ascii</span>
          <span>
            {asciiSize.cols}x{asciiSize.rows}
          </span>
        </div>

        <div className="ascii-art overflow-hidden">
          <pre
            className="ascii-art-text"
            role="img"
            aria-label={`ASCII art portrait of Kesavaraj K (${theme} ink)`}
          >
            {output}
          </pre>
          <span className="ascii-scan" />
        </div>
      </div>
      <blockquote className="portrait-quote">
        <p>
          &ldquo;You can&rsquo;t connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future.&rdquo;
        </p>
        <cite>&mdash; Steve Jobs, Stanford Commencement Speech (2005)</cite>
      </blockquote>
    </div>
  );
};

export default AsciiPortrait;
