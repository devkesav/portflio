import React from 'react';
import SectionHeading from './SectionHeading';
import { RevealItem, RevealWords } from './RevealText';
import { experience } from '../data/experience';

const Experience = () => {
  return (
    <section id="experience" className="scroll-mt-14 py-12 md:py-16">
      <div className="shell">
        <SectionHeading index="03" kicker="experience" title="Where I've spent my time." />

        <ol className="relative ml-1 border-l border-line">
          {experience.map((entry, index) => (
            <RevealItem
              key={entry.id}
              as="li"
              delay={index * 180}
              className="relative grid gap-2 py-5 pl-6 md:grid-cols-[240px_minmax(0,1fr)] md:gap-10 md:py-6"
            >
              <span className="absolute -left-[4px] top-[1.8rem] h-2 w-2 bg-neutral-400" aria-hidden="true" />
              <div>
                <p className="text-[11px] tracking-wide text-muted">
                  {entry.duration} <span className="px-1 text-neutral-600">/</span> {entry.type}
                </p>
                <h3 className="mt-1.5 text-[15px] leading-6 text-white md:text-base">{entry.title}</h3>
                <p className="mt-1 font-sans text-[13px] text-neutral-300">{entry.organization}</p>
              </div>
              <p className="max-w-4xl font-sans text-[13px] leading-6 text-neutral-400 md:text-sm">
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
