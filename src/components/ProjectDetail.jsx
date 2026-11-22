import React from 'react';
import { projects } from '../data/projects';
import { RevealItem, RevealWords } from './RevealText';

const ProjectDetail = ({ projectId, onBack }) => {
  const project = projects.find((entry) => entry.id === projectId);

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-xs text-muted">error: 404 — project not found</p>
        <h2 className="mt-3 text-2xl text-white">That link is out of date.</h2>
        <button
          type="button"
          onClick={onBack}
          className="mt-8 border border-line px-4 py-2 text-xs text-neutral-300 transition-colors hover:border-white hover:text-white"
        >
          ← cd ../work
        </button>
      </div>
    );
  }

  return (
    <article className="shell py-16 md:py-20">
      <RevealItem delay={0}>
        <button
          type="button"
          onClick={onBack}
          className="mb-8 text-xs text-muted transition-colors hover:text-white"
        >
          ← cd ../work
        </button>
      </RevealItem>

      <p className="text-[11px] tracking-widest text-muted">
        <RevealWords delay={80}>case study</RevealWords>
      </p>
      <h1 className="mt-2.5 text-2xl leading-snug text-white md:text-3xl">
        <RevealWords delay={140}>{project.name}</RevealWords>
      </h1>

      <p className="mt-3 text-[11px] tracking-wide text-neutral-500">
        <RevealWords delay={260}>{project.techStack.join(' · ')}</RevealWords>
      </p>

      <RevealItem delay={320} className="mt-8 overflow-hidden border border-line">
        <img
          src={project.coverUrl || project.imageUrl}
          alt={project.name}
          className="max-h-[520px] w-full object-cover grayscale transition-[filter] duration-500 hover:grayscale-0"
        />
      </RevealItem>

      <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_320px] md:gap-12">
        <div className="max-w-3xl">
          <h2 className="text-[13px] text-white">## problem</h2>
          <p className="mt-2 text-[13px] leading-6 text-neutral-400 md:text-sm">
            <RevealWords delay={520}>{project.shortDescription}</RevealWords>
          </p>

          <h2 className="mt-7 text-[13px] text-white">## implementation</h2>
          <p className="mt-2 text-[13px] leading-6 text-neutral-400 md:text-sm">
            <RevealWords delay={700}>{project.detailDescription}</RevealWords>
          </p>

          {project.repositoryUrl ? (
            <div className="mt-7">
              <h2 className="text-[13px] text-white">## repository</h2>
              <RevealItem delay={900}>
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-[13px] text-neutral-300 underline decoration-neutral-600 underline-offset-4 hover:text-white"
                >
                  {project.repositoryName} ↗
                </a>
              </RevealItem>
            </div>
          ) : null}
        </div>

        <RevealItem delay={620}>
          <aside className="h-fit border border-line p-4">
            <p className="text-[10px] tracking-widest text-muted">stack</p>
            <ul className="mt-2.5 space-y-1.5 text-xs text-neutral-300">
              {project.techStack.map((tech, index) => (
                <RevealItem
                  key={tech}
                  as="li"
                  delay={760 + index * 90}
                  className="flex gap-2"
                >
                  <span className="text-muted">›</span>
                  {tech}
                </RevealItem>
              ))}
            </ul>
            <p className="mt-5 text-[10px] tracking-widest text-muted">status</p>
            <p className="mt-2 text-xs text-neutral-300">
              {project.repositoryUrl ? 'source available on GitHub' : 'documented in portfolio'}
            </p>
          </aside>
        </RevealItem>
      </div>
    </article>
  );
};

export default ProjectDetail;
