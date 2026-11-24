import React from 'react';
import SectionHeading from './SectionHeading';
import { RevealItem } from './RevealText';
import { skillGroups } from '../data/skills';

const Skills = () => {
  return (
    <section id="skills" className="scroll-mt-14 border-b border-line py-12 md:py-16">
      <div className="shell">
        <SectionHeading
          index="04"
          kicker="skills"
          title="Tools I actually reach for."
          description="Grouped by the kind of work, not by how impressive the logo looks."
        />

        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {skillGroups.map((group, index) => (
            <RevealItem key={group.title} delay={index * 160}>
            <div>
              <h3 className="mb-3 text-[11px] tracking-widest text-muted">{group.title}</h3>
              <ul className="border-t border-line">
                {group.items.map((item, itemIndex) => (
                  <RevealItem
                    key={item}
                    delay={index * 160 + itemIndex * 55}
                    className="border-b border-line"
                  >
                    <li className="flex items-center gap-3 py-2 text-[13px] text-neutral-300">
                      <span className="text-muted">›</span>
                      {item}
                    </li>
                  </RevealItem>
                ))}
              </ul>
            </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
