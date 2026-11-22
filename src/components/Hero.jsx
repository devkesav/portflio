import React from 'react';
import AsciiPortrait from './AsciiPortrait';
import { RevealWords, TypewriterText } from './RevealText';

const Hero = () => {
  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

  return (
    <section
      id="hero"
      className="flex min-h-[calc(100vh-3.5rem)] flex-col border-b border-line md:h-[calc(100vh-3.5rem)] md:min-h-0"
    >
      <div className="shell flex flex-1 flex-col py-4 md:py-5">
        <p className="text-[13px] text-muted">
          <span className="text-white">kesavaraj@portfolio</span>:~$ whoami
          <span className="blink text-muted">_</span>
        </p>

        <div className="flex flex-1 items-center pt-3 md:pt-4">
          <div className="grid w-full items-center gap-8 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:gap-12 xl:gap-16">
            {/* Left column: every block shares the same max-w-xl measure. */}
            <div className="w-full max-w-xl">
              <h1 className="min-h-[1.02em] text-5xl font-medium leading-[1.02] tracking-tight text-white sm:text-6xl md:text-[56px] xl:text-[72px]">
                <TypewriterText text="Kesavaraj K" speed={55} />
              </h1>

              <p className="mt-4 text-lg text-neutral-300 md:text-xl">
                <TypewriterText text="Electrical & Embedded Systems Engineer" speed={24} delay={650} />
              </p>

              <div className="mt-7 space-y-2.5 text-[15px] leading-8 text-neutral-400">
                <p className="text-muted">$ cat about.txt</p>
                <p>
                  <RevealWords>
                    EEE undergraduate at KPR Institute of Engineering and Technology, working across power electronics, control, and applied machine learning — from regenerative elevator drives to embedded vision systems.
                  </RevealWords>
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="border border-white bg-white px-5 py-2 text-[13px] font-medium text-black transition-colors hover:bg-black hover:text-white"
                >
                  ./projects
                </a>
                <a
                  href="https://www.linkedin.com/in/devkesav"
                  target="_blank"
                  rel="noreferrer"
                  className="border border-line px-5 py-2 text-[13px] text-neutral-300 transition-colors hover:border-white hover:text-white"
                >
                  linkedin ↗
                </a>
                <a
                  href="#blogs"
                  className="border border-line px-5 py-2 text-[13px] text-neutral-300 transition-colors hover:border-white hover:text-white"
                >
                  ./blogs
                </a>
                <a
                  href={resumeUrl}
                  download="Kesavaraj-K-Resume.pdf"
                  className="border border-line px-5 py-2 text-[13px] text-neutral-300 transition-colors hover:border-white hover:text-white"
                >
                  resume.pdf ↓
                </a>
              </div>

              <aside className="mt-5 w-full border border-line bg-surface/50 p-4 text-xs">
                <p className="text-muted">$ cat status</p>
                <dl className="mt-3 space-y-2">
                  <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-baseline gap-4">
                    <dt className="text-muted">focus</dt>
                    <dd className="text-right text-neutral-300">power electronics, rl control</dd>
                  </div>
                  <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-baseline gap-4">
                    <dt className="text-muted">year</dt>
                    <dd className="text-right text-neutral-300">b.e. eee, 2024–2028</dd>
                  </div>
                  <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-baseline gap-4">
                    <dt className="text-muted">location</dt>
                    <dd className="text-right text-neutral-300">tiruppur, tamil nadu</dd>
                  </div>
                  <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-baseline gap-4">
                    <dt className="text-muted">current_project</dt>
                    <dd className="text-right leading-5 text-neutral-300">
                      portfolio &amp; Safe RL Energy Management for PMSM Drive
                    </dd>
                  </div>
                  <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-baseline gap-4 border-t border-line pt-2">
                    <dt className="text-muted">open</dt>
                    <dd className="ml-auto flex items-center justify-end gap-2 text-right text-neutral-300">
                      <span className="inline-block h-1.5 w-1.5 bg-white" />
                      <span>internships</span>
                    </dd>
                  </div>
                </dl>
              </aside>
              <p className="mt-3 text-[11px] leading-5 text-muted">
                $ echo &quot;Built with creativity, inspired by the CLI.&quot;
              </p>
            </div>

            {/* Right column: animated ASCII portrait. */}
            <AsciiPortrait />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
