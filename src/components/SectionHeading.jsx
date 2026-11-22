import React from 'react';
import { RevealWords } from './RevealText';
import { useLanguage } from '../context/LanguageContext';

const SectionHeading = ({ index, kicker, title, description }) => {
  const { language } = useLanguage();
  const translated =
    language === 'ta'
      ? {
          'A short readme.': 'ஒரு குறுகிய அறிமுகம்.',
          'Three projects, three different problems.': 'மூன்று தொழில்கள், மூன்று வெவ்வேறு சிக்கல்கள்.',
          "Where I've spent my time.": 'என் நேரத்தைச் செலவிட்ட இடங்கள்.',
          'Tools I actually reach for.': 'நான் உண்மையில் பயன்படுத்தும் கருவிகள்.',
          'A few things worth mentioning.': 'குறிப்பிடத்தக்க சில சாதனைகள்.',
          'Notes from the field.': 'துறை அனுபவக் குறிப்புகள்.',
          "Let's build something.": 'ஒரு புதியதை உருவாக்கலாம்.',
          about: 'என்னைப்பற்றி',
          work: 'தொழில்கள்',
          experience: 'அனுபவம்',
          skills: 'திறன்கள்',
          writing: 'எழுத்துகள்',
          milestones: 'சாதனைகள்',
          contact: 'தொடர்பு',
        }
      : language === 'ja'
        ? {
            'A short readme.': '簡単な紹介',
            'Three projects, three different problems.': '3つのプロジェクト、3つの異なる課題。',
            "Where I've spent my time.": 'これまで取り組んだ経験',
            'Tools I actually reach for.': '実際に使うツール',
            'A few things worth mentioning.': 'いくつかの成果',
            'Notes from the field.': '現場からのメモ',
            "Let's build something.": '一緒に何かを作りましょう。',
            about: '自己紹介',
            work: '仕事',
            experience: '経験',
            skills: 'スキル',
            writing: '記事',
            milestones: '実績',
            contact: '連絡',
          }
        : null;
  const localTitle = translated?.[title] || title;
  const localKicker = translated?.[kicker] || kicker;
  const localDescription = translated?.[description] || description;

  return (
    <div className="mb-10 max-w-2xl">
      <p className="text-xs tracking-widest text-muted">
        [{index}] {localKicker}
      </p>
      <h2 className="mt-2 text-2xl text-white md:text-3xl">
        <RevealWords delay={120}>{localTitle}</RevealWords>
      </h2>
      {localDescription ? (
        <p className="mt-2.5 text-[13px] leading-6 text-neutral-400">
          <RevealWords delay={260}>{localDescription}</RevealWords>
        </p>
      ) : null}
    </div>
  );
};

export default SectionHeading;
