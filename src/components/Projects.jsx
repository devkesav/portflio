import React from 'react';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';
import { RevealItem } from './RevealText';
import { projects } from '../data/projects';

const Projects = ({ onProjectClick }) => {
  return (
    <section id="work" className="scroll-mt-14 border-b border-line py-12 md:py-16">
      <div className="shell">
        <SectionHeading
          index="02"
          kicker="work"
          title="Three projects, three different problems."
          description="Each one started with a physical constraint and ended somewhere in software."
        />

        <div className="border-y border-line">
          {projects.map((project, index) => (
            <RevealItem
              key={project.id}
              delay={index * 160}
              className="border-b border-line last:border-b-0"
            >
              <ProjectCard
                project={project}
                index={index + 1}
                onClick={onProjectClick}
              />
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
