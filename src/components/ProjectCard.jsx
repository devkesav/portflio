import React from 'react';
import { RevealWords } from './RevealText';

const ProjectCard = ({ project, index, onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick(project.id)}
      className="group grid w-full grid-cols-[2rem_minmax(0,1fr)] gap-4 border-b border-line px-1 py-6 text-left transition-colors last:border-b-0 hover:bg-surface md:grid-cols-[2rem_minmax(0,1fr)_220px] md:gap-8"
    >
      <span className="pt-0.5 text-xs text-muted">{String(index).padStart(2, '0')}</span>

      <div>
        <h3 className="text-[15px] text-white group-hover:underline md:text-base">
          {project.name}
        </h3>
        <p className="mt-2 max-w-3xl text-[13px] leading-6 text-neutral-400 md:text-sm">
          <RevealWords delay={180}>{project.shortDescription}</RevealWords>
        </p>

        {/* Mobile meta */}
        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 md:hidden">
          <span className="text-[11px] tracking-wide text-muted">
            {project.techStack.join(' · ')}
          </span>
          <span className="text-xs text-muted">open ↗</span>
        </div>
      </div>

      {/* Desktop meta column keeps the right edge occupied */}
      <div className="hidden flex-col items-end justify-between md:flex">
        <span className="max-w-[220px] text-right text-[11px] leading-5 tracking-wide text-muted">
          {project.techStack.join(' · ')}
        </span>
        <span className="text-xs text-muted transition-colors group-hover:text-white">
          open ↗
        </span>
      </div>
    </button>
  );
};

export default ProjectCard;
