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
          'கே.பி.ஆர். பொறியியல் மற்றும் தொழில்நுட்பக் கல்லூரியில் மின் மற்றும் மின்னணு பொறியியல் இளங்கலை மாணவராகப் பயில்கிறேன். மின்சக்தி மின்னணுவியல் — மாற்றிகள், இயக்கிகள் மற்றும் அதன் பின்னணி இயற்பியல் — எனது ஆர்வத்தைத் தொடங்கியது.',
          'மீளுருவாக்க லிப்ட் இயக்கத்தை சிமுலிங்கில் மாதிரியாகவும், அதன் எரிசக்தி நிர்வாகத்திற்குப் பாதுகாப்புடன் கூடிய reinforcement learning நிரலாகவும் உருவாக்கியுள்ளேன். குறைந்த திறன் கொண்ட வன்பொருளிலும் embedded vision அமைப்புகளை உருவாக்கியுள்ளேன்.',
          'பயிற்சி வெளியிலும் IEEE IMS செயல்பாடுகளை வழிநடத்தி, ஒரு சிறிய குழுவுடன் community-matching தளத்தை உருவாக்கி, ESP32 வழியில் debugging செய்துள்ளேன்.',
        ]
      : language === 'ja'
        ? [
            'KPR工科大学で電気電子工学を学んでいます。パワーエレクトロニクス、コンバータ、ドライブ、その背後にある物理から興味が始まりました。',
            'Simulinkで回生エレベータ駆動をモデル化し、安全監督付き強化学習エージェントでエネルギー管理を行いました。手頃なハードウェアで組込みビジョンシステムも開発しています。',
            'コース外ではIEEE IMSの活動を率い、小規模チームでコミュニティマッチングを構築し、ESP32のデバッグを行ってきました。',
          ]
        : null;
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
    <section id="about" className="border-b border-line py-12 md:py-16">
      <div className="shell">
        <SectionHeading index="01" kicker="about" title="A short readme." />

        <div className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:gap-16">
          {/* Two balanced text columns instead of one narrow column with dead space */}
          <div className="text-[14px] leading-7 text-neutral-400 md:columns-2 md:gap-10 md:text-[15px] [&>p]:mb-4">
            <p className="text-muted">
              <RevealWords>$ cat about.md</RevealWords>
            </p>
            {paragraphs ? paragraphs.map((paragraph, index) => (
              <p key={index}><RevealWords delay={index * 700}>{paragraph}</RevealWords></p>
            )) : (
              <>
                <p><RevealWords>I&rsquo;m an Electrical and Electronics Engineering undergraduate at KPR Institute of Engineering and Technology. My interest started with power electronics — converters, drives, and the physics behind them — and gradually pulled me toward the software that makes those systems behave intelligently.</RevealWords></p>
                <p><RevealWords delay={700}>That has meant modelling a regenerative elevator drive in Simulink, writing a safety-supervised reinforcement learning agent for its energy management, and building embedded vision systems that run on modest hardware. I care about systems that can be measured, benchmarked, and explained.</RevealWords></p>
                <p><RevealWords delay={1400}>Outside coursework I&rsquo;ve led IEEE IMS activities at college, shipped a community-matching platform with a small team, and spent a lot of evenings debugging things on an ESP32.</RevealWords></p>
              </>
            )}
          </div>

          <dl className="h-fit border-t border-line text-[13px]">
            {localizedFacts.map(([label, value], index) => (
              <RevealItem
                key={label}
                delay={index * 120}
                className="border-b border-line"
              >
                <dl className="flex items-baseline justify-between gap-6 py-2.5">
                  <dt className="text-muted">{label}</dt>
                  <dd className="text-right text-neutral-300">{value}</dd>
                </dl>
              </RevealItem>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;
