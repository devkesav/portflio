import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';

const App = () => {
  const [activeProjectId, setActiveProjectId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeProjectId]);

  return (
    <div className="min-h-screen bg-black">
      <Nav />

      <main>
        {activeProjectId ? (
          <ProjectDetail projectId={activeProjectId} onBack={() => setActiveProjectId(null)} />
        ) : (
          <>
            <Hero />
            <About />
            <Projects onProjectClick={setActiveProjectId} />
            <Experience />
            <Skills />
            <Achievements />
            <Blogs />
            <Contact />
          </>
        )}
      </main>

      <footer className="border-t border-line py-8">
        <div className="shell flex flex-col items-start justify-between gap-3 text-xs text-neutral-500 sm:flex-row sm:items-center">
          <p>kesavaraj@portfolio:~$ exit 0</p>
          <div className="flex items-center gap-5">
            <a href="https://github.com/devkesav" target="_blank" rel="noreferrer" className="hover:text-neutral-300">
              github
            </a>
            <a href="https://www.linkedin.com/in/devkesav" target="_blank" rel="noreferrer" className="hover:text-neutral-300">
              linkedin
            </a>
            <a href="mailto:k.kesavaraj86@gmail.com" className="hover:text-neutral-300">
              email
            </a>
            <a href="#hero" className="hover:text-neutral-300">
              top
            </a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
