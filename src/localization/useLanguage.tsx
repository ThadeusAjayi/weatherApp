import React, {useEffect, useState} from 'react';
import {createContext} from 'react';
import {LanguageType} from './i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

export type DirectionType = 'ltr' | 'rtl';

interface languageContext {
  language: LanguageType;
  setLanguage: (language: LanguageType) => any;
  ltrRlt: DirectionType;
}

const LanguageContext = createContext<languageContext | undefined>(undefined);

export const useLanguageContext = () => {
  const context = React.useContext(LanguageContext);
  if (context === undefined) {
    throw new Error(
      'useLanguageContext must be used within a LanguageContext.Provider',
    );
  }
  return context;
};

export const LanguageProvider = ({children}: {children: React.ReactNode}) => {
  const [language, setLanguage] = useState<LanguageType>('ar');
  const [ltrRlt, setLtrRtl] = useState<DirectionType>('rtl');
  const {i18n} = useTranslation();

  useEffect(() => {
    AsyncStorage.getItem('language').then(res => {
      const storedLanguage = (res as LanguageType) ?? 'en';
      setLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
      setLtrRtl(storedLanguage === 'ar' ? 'rtl' : 'ltr');
    });
  }, [i18n]);

  useEffect(() => {
    setLanguage(language);
    i18n.changeLanguage(language);
    setLtrRtl(language === 'ar' ? 'rtl' : 'ltr');
    AsyncStorage.setItem('language', language);
  }, [i18n, language]);

  return (
    <LanguageContext.Provider value={{language, setLanguage, ltrRlt}}>
      {children}
    </LanguageContext.Provider>
  );
};
