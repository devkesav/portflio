import React, { useEffect, useRef, useState } from 'react';

export const TypewriterText = ({ text, speed = 32, delay = 0, className = '' }) => {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(text.length);
      return undefined;
    }

    setVisible(0);
    let timer;
    const startTimer = window.setTimeout(() => {
      timer = window.setInterval(() => {
        setVisible((current) => {
          if (current >= text.length) {
            window.clearInterval(timer);
            return text.length;
          }
          return current + 1;
        });
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(timer);
    };
  }, [text, speed, delay]);

  return (
    <span className={`typewriter-text ${className}`}>
      {text.slice(0, visible)}
      {visible < text.length ? <span className="typewriter-cursor" aria-hidden="true" /> : null}
    </span>
  );
};

export const RevealWords = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(0);
  const text = typeof children === 'string' ? children : '';
  const words = text.split(/(\s+)/);

  useEffect(() => {
    if (!ref.current) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(words.length);
      return undefined;
    }

    let timer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        window.setTimeout(() => {
          timer = window.setInterval(() => {
            setVisible((current) => {
              if (current >= words.length) {
                window.clearInterval(timer);
                return words.length;
              }
              return current + 1;
            });
          }, 34);
        }, delay);
      },
      { threshold: 0.2 }
    );

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [text, delay]);

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={index < visible ? 'reveal-word is-visible' : 'reveal-word'}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

export const RevealItem = ({ children, className = '', delay = 0, as: Tag = 'div' }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        window.setTimeout(() => setVisible(true), delay);
      },
      { threshold: 0.15 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={`reveal-item${visible ? ' is-visible' : ''} ${className}`}>
      {children}
    </Tag>
  );
};
