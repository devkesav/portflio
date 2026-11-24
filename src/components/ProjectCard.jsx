import React from 'react';
import { routeHref } from '../routes';

const ProjectCard = ({ project, index, onClick, featured = false }) => {
  const detailHref = routeHref(`/work/${project.id}`);
  const navigateToDetail = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    onClick(project.id);
  };

  return (
    <article
      className={
        featured
          ? 'grid gap-6 border-y border-line py-6 lg:grid-cols-2 lg:items-center lg:gap-10 lg:py-8'
          : 'grid gap-5 border-b border-line py-6 last:border-b-0 lg:grid-cols-2 lg:items-center lg:gap-10'
      }
    >
      <a
        href={detailHref}
        onClick={navigateToDetail}
        aria-label={`View ${project.name} project details`}
        className="group block aspect-[16/9] overflow-hidden bg-surface"
      >
        <img
          src={project.imageUrl}
          alt=""
          loading={featured ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </a>

      <div>
        <p className="text-[10px] tracking-widest text-muted">
          PROJECT / {String(index).padStart(2, '0')}
        </p>
        <h3 className="mt-2 text-lg leading-7 text-white md:text-xl">
          <a href={detailHref} onClick={navigateToDetail} className="hover:underline">
            {project.name}
          </a>
        </h3>
        <p className="mt-3 max-w-2xl font-sans text-sm leading-7 text-neutral-400">
          {project.shortDescription}
        </p>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-muted">
          {project.techStack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs">
          <a
            href={detailHref}
            onClick={navigateToDetail}
            className="text-neutral-300 underline decoration-neutral-600 underline-offset-4 hover:text-white"
          >
            project notes ↗
          </a>
          {project.repositoryUrl ? (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted underline decoration-neutral-700 underline-offset-4 hover:text-white"
            >
              source code ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
