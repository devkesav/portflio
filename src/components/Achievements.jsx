import React from 'react';
import SectionHeading from './SectionHeading';
import { RevealItem, RevealWords } from './RevealText';

const items = [
  {
    year: '2026',
    title: 'Smart India Hackathon',
    detail: 'Shortlisted in the top 50 teams from KPRIET.',
  },
  {
    year: '2026',
    title: 'Atomberg AtomQuest',
    detail: 'Qualified for Round 2.',
  },
  {
    year: '2025',
    title: 'Drowsy Sentry System',
    detail: '1st prize (Deal-X) and 2nd prize (Protopitch) at NIT Calicut.',
  },
  {
    year: '2025',
    title: 'IEEE IMS, KPRIET',
    detail: 'Vice Chairman — ran technical sessions and organised PITCHXRAISE’26.',
  },
];

const Achievements = () => {
  return (
    <section id="achievements" className="scroll-mt-14 py-12 md:py-16">
      <div className="shell">
        <SectionHeading index="05" kicker="milestones" title="A few things worth mentioning." />

        <ul className="border-t border-line">
          {items.map((item, index) => (
            <RevealItem
              key={`${item.year}-${item.title}`}
              as="li"
              delay={index * 140}
              className="grid grid-cols-[3.25rem_1fr] gap-x-4 gap-y-1 border-b border-line py-3.5 sm:grid-cols-[4rem_1fr_1.3fr]"
            >
              <span className="text-[11px] text-muted">[{item.year}]</span>
              <span className="text-[13px] text-white">{item.title}</span>
              <span className="col-span-2 text-[13px] text-neutral-400 sm:col-span-1">
                <RevealWords>{item.detail}</RevealWords>
              </span>
            </RevealItem>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Achievements;
