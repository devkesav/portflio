import React from 'react';
import AsciiPortrait from './AsciiPortrait';
import { RevealWords, TypewriterText } from './RevealText';
import { useLanguage } from '../context/LanguageContext';
import { routeHref } from '../routes';

const Hero = ({ onNavigate }) => {
  const { language } = useLanguage();
  const isTamil = language === 'ta';
  const [isNameHovered, setIsNameHovered] = React.useState(false);
  const [isNameFocused, setIsNameFocused] = React.useState(false);
  const showFullName = isNameHovered || isNameFocused;
  const nameClass =
    language === 'ta'
      ? 'hero-name hero-name--tamil'
      : language === 'ja'
        ? 'hero-name hero-name--japanese'
        : 'hero-name';
  const copy =
    language === 'ta'
      ? {
          name: 'கேசவராஜ் கி',
          fullNameBeforeD: 'கேசவ ',
          fullNameAfterD: ' ராஜ்',
          role: 'மின் மற்றும் உட்பொதிக்கப்பட்ட அமைப்புகள் பொறியாளர்',
          command: '$ cat பற்றி.txt',
          intro: 'கே.பி.ஆர். பொறியியல் மற்றும் தொழில்நுட்பக் கல்லூரியில் மின் மற்றும் மின்னணு பொறியியல் படிக்கிறேன். உட்பொதிக்கப்பட்ட வன்பொருள், கட்டுப்பாட்டு அமைப்புகள், புத்திசாலி மென்பொருள் ஆகியவற்றை இணைத்து உருவாக்குகிறேன்.',
          work: './தொழில்கள்',
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
            name: 'ケサヴァラジ・K',
            fullNameBeforeD: 'ケサヴァ・',
            fullNameAfterD: '・ラージ',
            role: '電気電子エンジニア',
            command: '$ cat about.txt',
            intro: 'KPR工科大学で電気電子工学を学び、組込みハードウェア、制御システム、インテリジェントソフトウェアを組み合わせたものづくりに取り組んでいます。',
            work: './仕事',
            blogs: './記事',
            focus: 'パワーエレクトロニクス、RL制御',
            year: 'B.E. 電気工学、2024–2028',
            location: 'ティルップール、タミル・ナードゥ州',
            currentProject: 'ポートフォリオ & 安全なRLエレベータプロジェクト',
            open: 'インターンシップ募集',
            footer: '$ echo "創造性を持って、CLIに着想を得て構築しました。"',
          }
        : {
            name: 'Kesavaraj K',
            fullNameBeforeD: 'Kesava ',
            fullNameAfterD: ' Raj',
            role: 'Electrical and Electronics Engineer',
            command: '$ cat about.txt',
            intro: 'I study electrical and electronics engineering at KPR Institute, building at the intersection of embedded hardware, control systems, and intelligent software.',
            work: './work',
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
      className="flex min-h-[calc(100vh-3.5625rem)] flex-col border-b border-line"
    >
      <div className="shell flex flex-1 flex-col py-4 md:py-5">
        <p className="text-[13px] text-muted">
          <span className="text-white">kesavaraj@portfolio</span>:~$ whoami
          <span className="blink text-muted">_</span>
        </p>

        <div className="flex flex-1 items-center pt-3 md:pt-4">
          <div className="hero-content-grid grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 xl:gap-12">
            {/* Left column: every block shares the same max-w-xl measure. */}
            <div className="w-full max-w-xl">
              <h1 className="min-h-[1.02em] text-5xl font-medium leading-[1.02] tracking-tight text-white sm:text-6xl md:text-[56px] xl:text-[72px]">
                <span
                  aria-label={
                    showFullName
                      ? `${copy.fullNameBeforeD}D${copy.fullNameAfterD}`
                      : copy.name
                  }
                  className={`${nameClass}${showFullName ? ' is-revealed' : ''}`}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== 'touch') setIsNameHovered(true);
                  }}
                  onPointerLeave={() => setIsNameHovered(false)}
                  onFocus={() => setIsNameFocused(true)}
                  onBlur={() => setIsNameFocused(false)}
                  tabIndex={0}
                >
                  <span className="hero-name-current">
                    <TypewriterText text={copy.name} speed={55} />
                  </span>
                  <span className="hero-name-full" aria-hidden="true">
                    {copy.fullNameBeforeD}
                    <span className="hero-name-d">D</span>
                    {copy.fullNameAfterD}
                  </span>
                </span>
              </h1>

              <p className="hero-role mt-4 text-lg text-neutral-300 md:text-xl">
                <TypewriterText text={copy.role} speed={24} delay={650} />
              </p>

              <div className="hero-intro mt-7 space-y-2.5 text-[15px] leading-7 text-neutral-400">
                <p className="text-muted">{copy.command}</p>
                <p>
                  <RevealWords>{copy.intro}</RevealWords>
                </p>
              </div>

              <div
                className={`hero-actions mt-6 flex items-center ${
                  isTamil
                    ? 'max-w-full flex-nowrap gap-2 overflow-x-auto'
                    : 'flex-wrap gap-3'
                }`}
              >
                <a
                  href={routeHref('/work')}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate('/work');
                  }}
                  className={`hero-action-link border border-line py-2 text-[13px] text-neutral-300 transition-colors ${
                    isTamil ? 'shrink-0 whitespace-nowrap px-3' : 'px-3'
                  }`}
                >
                  {copy.work}
                </a>
                <a
                  href="https://www.linkedin.com/in/devkesav"
                  target="_blank"
                  rel="noreferrer"
                  className={`hero-action-link border border-line py-2 text-[13px] text-neutral-300 transition-colors ${
                    isTamil ? 'shrink-0 whitespace-nowrap px-3' : 'px-3'
                  }`}
                >
                  linkedin ↗
                </a>
                <a
                  href={routeHref('/blogs')}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate('/blogs');
                  }}
                  className={`hero-action-link border border-line py-2 text-[13px] text-neutral-300 transition-colors ${
                    isTamil ? 'shrink-0 whitespace-nowrap px-3' : 'px-3'
                  }`}
                >
                  {copy.blogs}
                </a>
                <a
                  href={`${import.meta.env.BASE_URL}resume.pdf`}
                  download="Kesavaraj-K-Resume.pdf"
                  className={`hero-action-link border border-line py-2 text-[13px] text-neutral-300 transition-colors ${
                    isTamil ? 'shrink-0 whitespace-nowrap px-3' : 'px-3'
                  }`}
                >
                  resume.pdf ↓
                </a>
              </div>

              <aside className="hero-status mt-4 w-full border border-line bg-surface/50 p-3 text-xs">
                <p className="text-muted">$ cat status</p>
                <dl className="mt-2 space-y-1.5">
                  <div className="grid grid-cols-[6rem_minmax(0,1fr)] items-baseline gap-2 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-4">
                    <dt className="text-muted">focus</dt>
                    <dd className="text-right text-neutral-300">{copy.focus}</dd>
                  </div>
                  <div className="grid grid-cols-[6rem_minmax(0,1fr)] items-baseline gap-2 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-4">
                    <dt className="text-muted">year</dt>
                    <dd className="text-right text-neutral-300">{copy.year}</dd>
                  </div>
                  <div className="grid grid-cols-[6rem_minmax(0,1fr)] items-baseline gap-2 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-4">
                    <dt className="text-muted">location</dt>
                    <dd className="text-right text-neutral-300">{copy.location}</dd>
                  </div>
                  <div className="grid grid-cols-[6rem_minmax(0,1fr)] items-baseline gap-2 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-4">
                    <dt className="text-muted">current_project</dt>
                    <dd className="text-right leading-4 text-neutral-300">
                      {copy.currentProject}
                    </dd>
                  </div>
                  <div className="grid grid-cols-[6rem_minmax(0,1fr)] items-baseline gap-2 border-t border-line pt-1.5 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-4">
                    <dt className="text-muted">open</dt>
                    <dd className="ml-auto flex items-center justify-end gap-2 text-right text-neutral-300">
                      <span className="inline-block h-1.5 w-1.5 bg-white" />
                      <span>{copy.open}</span>
                    </dd>
                  </div>
                </dl>
              </aside>
              <p className="hero-footer mt-3 text-xs leading-5 text-muted">
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
