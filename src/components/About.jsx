import React from 'react';
import SectionHeading from './SectionHeading';
import { RevealItem, RevealWords } from './RevealText';
import { useLanguage } from '../context/LanguageContext';

const facts = [
  { label: 'based_in', value: 'tiruppur, tamil nadu' },
  { label: 'degree', value: 'b.e. electrical and electronics engineering, 2024–2028' },
  { label: 'cgpa', value: '7.92 / 10' },
  { label: 'languages', value: 'tamil, english, japanese (n5)' },
  { label: 'leadership', value: 'ieee ims — vice chairman' },
];

const About = () => {
  const { language } = useLanguage();
  const paragraphs =
    language === 'ta'
      ? [
          'கே.பி.ஆர். பொறியியல் மற்றும் தொழில்நுட்பக் கல்லூரியில் மின் மற்றும் மின்னணு பொறியியல் இளங்கலை மாணவராகப் படிக்கிறேன். மின் பொறியியல், உட்பொதிக்கப்பட்ட அமைப்புகள் மற்றும் புத்திசாலி கணிப்பியல் துறைகள் சந்திக்கும் இடத்தில் ஆர்வத்தை வளர்த்துக் கொண்டிருக்கிறேன்.',
          'எனது முக்கிய ஆர்வங்கள் பவர் எலக்ட்ரானிக்ஸ், மின் இயந்திரங்கள், கட்டுப்பாட்டு அமைப்புகள் மற்றும் சுற்று பகுப்பாய்வு. MATLAB மற்றும் Simulink மூலம் இயற்பியல் அமைப்புகளை மாதிரியாக்குகிறேன்; Arduino மற்றும் ESP32 மூலம் கருத்துகளைச் செயல்படும் வன்பொருள் முன்மாதிரிகளாக மாற்றுகிறேன்.',
          'பொதுப் பாடத்திட்டத்துடன் சேர்ந்தே செயற்கை நுண்ணறிவு, கணினி பார்வை, உள்ளூர் மொழி மாதிரிகள், CUDA நிரலாக்கம் மற்றும் GPU கணிப்பை ஆராய்கிறேன். வன்பொருளையும் மென்பொருளையும் இணைத்து நடைமுறை சார் பொறியியல் தீர்வுகளை உருவாக்குவதே என் குறிக்கோள்.',
          'புதிய தொழில்நுட்பங்களைச் சோதித்து, முன்மாதிரிகளை உருவாக்கி, தொழில்நுட்பச் சிக்கல்களைத் தீர்க்கவும், வன்பொருள் செயல்பாட்டிலிருந்து மென்பொருள் logic வரை அமைப்புகளைப் புரிந்துகொள்ளவும் நான் விரும்புகிறேன்.',
        ]
      : language === 'ja'
        ? [
            'KPR工科大学で電気電子工学を学びながら、電気工学、組込みシステム、インテリジェントコンピューティングの交差点を探究しています。',
            '主な関心分野は、パワーエレクトロニクス、電気機械、制御システム、回路解析です。MATLABとSimulinkで物理システムをモデリングし、ArduinoやESP32でアイデアを実際のハードウェアプロトタイプにします。',
            'カリキュラムと並行して、人工知能、コンピュータービジョン、ローカル言語モデル、CUDA、GPUコンピューティングを学んでいます。ハードウェアとソフトウェアをつなぎ、実用的なエンジニアリングソリューションを開発することに興味があります。',
            '新しい技術を試し、プロトタイプを作り、問題を解決し、ハードウェアの挙動からソフトウェアのロジックまでシステムを理解することが好きです。',
          ]
        : [
            'I’m an Electrical and Electronics Engineering undergraduate at KPR Institute of Engineering and Technology, working at the intersection of electrical engineering, embedded systems, and intelligent computing.',
            'My core interests are power electronics, electrical machines, control systems, and circuit analysis. I use MATLAB and Simulink to model physical systems, and Arduino or ESP32 boards to turn those ideas into working hardware prototypes.',
            'Alongside my degree, I explore artificial intelligence, computer vision, local language models, CUDA programming, and GPU computing — especially where they connect hardware and software.',
            'I learn by building, debugging, and measuring. Whether it is an embedded prototype or a control model, I want to understand the system from hardware behaviour to software logic.',
          ];
  const editorialLabels =
    language === 'ta'
      ? { interests: 'தொழில்நுட்ப ஆர்வங்கள்', approach: 'என் பொறியியல் அணுகுமுறை', education: 'கல்வி' }
      : language === 'ja'
        ? { interests: '技術分野', approach: 'エンジニアリングの姿勢', education: '学歴' }
        : { interests: 'Technical interests', approach: 'How I work', education: 'Education' };
  const localizedFacts =
    language === 'ta'
      ? [
          ['வசிக்கும் இடம்', 'திருப்பூர், தமிழ்நாடு'],
          ['பட்டம்', 'பி.இ. மின் மற்றும் மின்னணு பொறியியல், 2024–2028'],
          ['சிஜிபிஏ', '7.92 / 10'],
          ['மொழிகள்', 'தமிழ், ஆங்கிலம், ஜப்பானியம் (N5)'],
          ['தலைமை', 'IEEE IMS — துணைத் தலைவர்'],
        ]
      : language === 'ja'
        ? [
            ['拠点', 'ティルップール、タミル・ナードゥ州'],
            ['学位', 'B.E. 電気工学、2024–2028'],
            ['CGPA', '7.92 / 10'],
            ['言語', 'タミル語、英語、日本語（N5）'],
            ['リーダーシップ', 'IEEE IMS — 副会長'],
          ]
        : facts.map((fact) => [fact.label, fact.value]);

  return (
    <section id="about" className="scroll-mt-14 py-12 md:py-16">
      <div className="shell">
        <SectionHeading index="01" kicker="about" title="A short readme." />

        <div className="grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(16rem,0.8fr)] md:gap-16">
          <div>
            <p className="mb-4 text-xs text-muted">$ cat about.md</p>
            <p className="max-w-3xl font-sans text-[15px] leading-7 text-neutral-300">
              <RevealWords>{paragraphs[0]}</RevealWords>
            </p>

            <div className="mt-8 grid gap-7 sm:grid-cols-2 sm:gap-9">
              <section>
                <h3 className="text-[11px] tracking-widest text-muted">
                  {editorialLabels.interests}
                </h3>
                <p className="mt-3 font-sans text-sm leading-7 text-neutral-400">
                  <RevealWords delay={300}>{paragraphs[1]}</RevealWords>
                </p>
                <p className="mt-3 font-sans text-sm leading-7 text-neutral-400">
                  <RevealWords delay={500}>{paragraphs[2]}</RevealWords>
                </p>
              </section>
              <section>
                <h3 className="text-[11px] tracking-widest text-muted">
                  {editorialLabels.approach}
                </h3>
                <p className="mt-3 font-sans text-sm leading-7 text-neutral-400">
                  <RevealWords delay={700}>{paragraphs[3]}</RevealWords>
                </p>
              </section>
            </div>
          </div>

          <aside>
            <h3 className="text-[11px] tracking-widest text-muted">{editorialLabels.education}</h3>
            <div className="mt-3 border-t border-line py-3">
              <p className="font-sans text-sm leading-6 text-white">
                {localizedFacts[1][1]}
              </p>
              <p className="mt-1 font-sans text-[13px] leading-6 text-neutral-400">
                KPR Institute of Engineering and Technology
              </p>
              <p className="mt-2 text-[11px] text-muted">{localizedFacts[2][1]}</p>
            </div>
            <dl className="border-t border-line text-[12px]">
              {localizedFacts
                .filter((_, index) => index !== 1 && index !== 2)
                .map(([label, value], index) => (
                  <RevealItem
                    key={label}
                    delay={index * 120}
                    className="border-b border-line"
                  >
                    <div className="flex items-baseline justify-between gap-4 py-2.5">
                      <dt className="shrink-0 text-muted">{label}</dt>
                      <dd className="text-right font-sans text-neutral-300">{value}</dd>
                    </div>
                  </RevealItem>
                ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default About;
