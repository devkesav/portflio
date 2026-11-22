import React from 'react';
import AsciiPortrait from './AsciiPortrait';
import { RevealWords, TypewriterText } from './RevealText';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { language } = useLanguage();
  const copy =
    language === 'ta'
      ? {
          role: 'மின் மற்றும் உட்பொதிக்கப்பட்ட அமைப்புகள் பொறியாளர்',
          command: '$ cat பற்றி.txt',
          intro: 'கே.பி.ஆர். பொறியியல் மற்றும் தொழில்நுட்பக் கல்லூரியில் மின் மற்றும் மின்னணு பொறியியல் இளங்கலை மாணவராகப் படிக்கிறேன். பவர் எலக்ட்ரானிக்ஸ், கட்டுப்பாட்டு அமைப்புகள், உட்பொதிக்கப்பட்ட வன்பொருள் மற்றும் பயன்பாட்டு எந்திரக் கற்றல் துறைகளை ஆராய்கிறேன் — MATLAB/Simulink மாதிரியாக்கம் மற்றும் Arduino/ESP32 முன்மாதிரிகள் தொடங்கி புத்திசாலி மென்பொருள் அமைப்புகள் வரை.',
          projects: './தொழில்கள்',
          blogs: './எழுத்துகள்',
          focus: 'மின் மின்னணுவியல், rl கட்டுப்பாடு',
          year: 'பி.இ. மின் மின்னணுவியல், 2024–2028',
          location: 'திருப்பூர், தமிழ்நாடு',
          currentProject: 'portfolio & பாதுகாப்பான rl லிப்ட் எரிசக்தி நிர்வாகம்',
          open: 'பயிற்சி வாய்ப்பு',
          footer: '$ echo "திறன் மற்றும் கலை அரங்கேற்றம், CLI வழிகாட்டியது."',
        }
      : language === 'ja'
        ? {
            role: '電気電子エンジニア',
            command: '$ cat about.txt',
            intro: 'KPR工科大学で電気電子工学を学びながら、パワーエレクトロニクス、制御システム、組込みハードウェア、応用機械学習を探究しています。MATLAB/SimulinkのモデリングやArduino/ESP32のプロトタイプから、インテリジェントなソフトウェアシステムまで幅広く取り組んでいます。',
            projects: './仕事',
            blogs: './記事',
            focus: 'パワーエレクトロニクス、RL制御',
            year: 'B.E. 電気工学、2024–2028',
            location: 'ティルップール、タミル・ナードゥ州',
            currentProject: 'ポートフォリオ & 安全なRLエレベータプロジェクト',
            open: 'インターンシップ募集',
            footer: '$ echo "創造性を持って、CLIに着想を得て構築しました。"',
          }
        : {
            role: 'Electrical and Electronics Engineer',
            command: '$ cat about.txt',
            intro: 'Electrical and Electronics Engineering undergraduate at KPR Institute of Engineering and Technology, exploring power electronics, control systems, embedded hardware, and applied machine learning — from MATLAB/Simulink models and Arduino/ESP32 prototypes to intelligent software systems.',
            projects: './projects',
            blogs: './blogs',
            focus: 'power electronics, rl control',
            year: 'b.e. electrical and electronics engineering, 2024–2028',
            location: 'tiruppur, tamil nadu',
            currentProject: 'portfolio & Safe RL Energy Management for PMSM Drive',
            open: 'internships',
            footer: '$ echo "Built with creativity, inspired by the CLI."',
          };

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
                <TypewriterText text={copy.role} speed={24} delay={650} />
              </p>

              <div className="mt-7 space-y-2.5 text-[15px] leading-8 text-neutral-400">
                <p className="text-muted">{copy.command}</p>
                <p>
                  <RevealWords>{copy.intro}</RevealWords>
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="border border-white bg-white px-5 py-2 text-[13px] font-medium text-black transition-colors hover:bg-black hover:text-white"
                >
                  {copy.projects}
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
                  {copy.blogs}
                </a>
                <a
                  href={`${import.meta.env.BASE_URL}resume.pdf`}
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
                    <dd className="text-right text-neutral-300">{copy.focus}</dd>
                  </div>
                  <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-baseline gap-4">
                    <dt className="text-muted">year</dt>
                    <dd className="text-right text-neutral-300">{copy.year}</dd>
                  </div>
                  <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-baseline gap-4">
                    <dt className="text-muted">location</dt>
                    <dd className="text-right text-neutral-300">{copy.location}</dd>
                  </div>
                  <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-baseline gap-4">
                    <dt className="text-muted">current_project</dt>
                    <dd className="text-right leading-5 text-neutral-300">
                      {copy.currentProject}
                    </dd>
                  </div>
                  <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-baseline gap-4 border-t border-line pt-2">
                    <dt className="text-muted">open</dt>
                    <dd className="ml-auto flex items-center justify-end gap-2 text-right text-neutral-300">
                      <span className="inline-block h-1.5 w-1.5 bg-white" />
                      <span>{copy.open}</span>
                    </dd>
                  </div>
                </dl>
              </aside>
              <p className="mt-3 text-[11px] leading-5 text-muted">
                {copy.footer}
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
