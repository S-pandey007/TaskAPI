import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization'; // Correct import for Expo
import en from './locales/en.json';
import hi from './locales/hi.json';
import mr from './locales/mr.json';

// Detect device language
const languageDetector = Localization.locale.split('-')[0]; // Extracts "en", "hi", "mr"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      mr: { translation: mr },
    },
    lng: languageDetector || 'en', // Use detected language or fallback to English
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React Native handles escaping
    },
  });

export default i18n;
