import React from 'react';
import { RevealWords } from './RevealText';

const SectionHeading = ({ index, kicker, title, description }) => {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="text-xs tracking-widest text-muted">
        [{index}] {kicker}
      </p>
      <h2 className="mt-2 text-2xl text-white md:text-3xl">
        <RevealWords delay={120}>{title}</RevealWords>
      </h2>
      {description ? (
        <p className="mt-2.5 text-[13px] leading-6 text-neutral-400">
          <RevealWords delay={260}>{description}</RevealWords>
        </p>
      ) : null}
    </div>
  );
};

export default SectionHeading;
