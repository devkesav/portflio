import React from 'react';
import SectionHeading from './SectionHeading';
import { RevealItem } from './RevealText';
import { skillGroups } from '../data/skills';

const Skills = () => {
  return (
    <section id="skills" className="scroll-mt-14 py-12 md:py-16">
      <div className="shell">
        <SectionHeading
          index="04"
          kicker="skills"
          title="Tools I actually reach for."
          description="Grouped by the kind of work, not by how impressive the logo looks."
        />

        <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {skillGroups.map((group, index) => (
            <RevealItem key={group.title} delay={index * 100}>
              <section className="h-full border-t border-line pt-3">
                <h3 className="max-w-[14rem] text-[12px] leading-5 text-white">{group.title}</h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="font-sans text-[13px] leading-5 text-neutral-400">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
