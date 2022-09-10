import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translations.json';
import translationSLO from './locales/slo/translations.json';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: translationEN,
      },
      slo: {
        translation: translationSLO,
      },
    },
  });
