import React from 'react';
import SectionHeading from './SectionHeading';
import { RevealItem, RevealWords } from './RevealText';

const facts = [
  { label: 'based_in', value: 'tiruppur, tamil nadu' },
  { label: 'degree', value: 'b.e. eee, 2024–2028' },
  { label: 'cgpa', value: '7.92 / 10' },
  { label: 'languages', value: 'tamil, english, japanese (n5)' },
  { label: 'leadership', value: 'ieee ims — vice chairman' },
];

const About = () => {
  return (
    <section id="about" className="border-b border-line py-12 md:py-16">
      <div className="shell">
        <SectionHeading index="01" kicker="about" title="A short readme." />

        <div className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:gap-16">
          {/* Two balanced text columns instead of one narrow column with dead space */}
          <div className="text-[14px] leading-7 text-neutral-400 md:columns-2 md:gap-10 md:text-[15px] [&>p]:mb-4">
            <p className="text-muted">
              <RevealWords>$ cat about.md</RevealWords>
            </p>
            <p>
              <RevealWords>
                I&rsquo;m an Electrical and Electronics Engineering undergraduate at KPR Institute of Engineering and Technology. My interest started with power electronics — converters, drives, and the physics behind them — and gradually pulled me toward the software that makes those systems behave intelligently.
              </RevealWords>
            </p>
            <p>
              <RevealWords delay={700}>
                That has meant modelling a regenerative elevator drive in Simulink, writing a safety-supervised reinforcement learning agent for its energy management, and building embedded vision systems that run on modest hardware. I care about systems that can be measured, benchmarked, and explained.
              </RevealWords>
            </p>
            <p>
              <RevealWords delay={1400}>
                Outside coursework I&rsquo;ve led IEEE IMS activities at college, shipped a community-matching platform with a small team, and spent a lot of evenings debugging things on an ESP32.
              </RevealWords>
            </p>
          </div>

          <dl className="h-fit border-t border-line text-[13px]">
            {facts.map((fact, index) => (
              <RevealItem
                key={fact.label}
                delay={index * 120}
                className="border-b border-line"
              >
                <dl className="flex items-baseline justify-between gap-6 py-2.5">
                  <dt className="text-muted">{fact.label}</dt>
                  <dd className="text-right text-neutral-300">{fact.value}</dd>
                </dl>
              </RevealItem>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;
