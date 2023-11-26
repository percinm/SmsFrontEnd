import React, { createContext, useContext, useState } from 'react';
import tr from '../Dictionary/tr.json';
import en from '../Dictionary/en.json';
import es from '../Dictionary/es.json';
import jp from '../Dictionary/jp.json';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(tr);

  const changeLanguage = (language) => {
    switch (language) {
      case 'tr':
        setLang(tr);
        break;
      case 'gb':
        setLang(en);
        break;
      case 'es':
        setLang(es);
        break;
      case 'jp':
        setLang(jp);
        break;
      default:
        setLang(tr);
    }
    localStorage.setItem("language", language);
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
