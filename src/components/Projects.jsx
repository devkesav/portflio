import React from 'react';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const Projects = ({ onProjectClick }) => {
  const [featuredProject, ...otherProjects] = projects;

  return (
    <section id="work" className="scroll-mt-14 border-b border-line py-12 md:py-16">
      <div className="shell">
        <SectionHeading
          index="02"
          kicker="work"
          title="Three projects, three different problems."
          description="Each one started with a physical constraint and ended somewhere in software."
        />

        <div>
          {featuredProject ? (
            <ProjectCard
              project={featuredProject}
              index={1}
              onClick={onProjectClick}
              featured
            />
          ) : null}
          {otherProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index + 2}
              onClick={onProjectClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
