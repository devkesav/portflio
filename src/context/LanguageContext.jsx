import React, { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
});

const readLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  return window.localStorage.getItem('language') || 'en';
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(readLanguage);

  useEffect(() => {
    document.documentElement.lang = language === 'ta' ? 'ta' : language === 'ja' ? 'ja' : 'en';
    window.localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
