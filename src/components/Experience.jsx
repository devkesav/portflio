import React from 'react';
import SectionHeading from './SectionHeading';
import { RevealItem, RevealWords } from './RevealText';
import { experience } from '../data/experience';

const Experience = () => {
  return (
    <section id="experience" className="scroll-mt-14 border-b border-line py-12 md:py-16">
      <div className="shell">
        <SectionHeading index="03" kicker="experience" title="Where I've spent my time." />

        <ol className="border-t border-line">
          {experience.map((entry, index) => (
            <RevealItem
              key={entry.id}
              as="li"
              delay={index * 180}
              className="grid gap-3 border-b border-line py-6 md:grid-cols-[260px_minmax(0,1fr)] md:gap-10"
            >
              <div>
                <p className="text-[11px] tracking-wide text-muted">{entry.duration}</p>
                <h3 className="mt-1.5 text-[15px] text-white md:text-base">{entry.title}</h3>
                <p className="mt-1 text-[13px] text-neutral-300">{entry.organization}</p>
              </div>
              <p className="max-w-4xl text-[13px] leading-6 text-neutral-400 md:text-sm">
                <RevealWords delay={180}>{entry.description}</RevealWords>
              </p>
            </RevealItem>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
