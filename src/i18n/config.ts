import { use } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import * as en from './locales/en';
import * as es from './locales/es';
import * as pt from './locales/pt';

const resources = {
  en: {
    translation: {
      login: en.Login,
    },
  },
  es: {
    tranlation: {
      login: es.Login,
    },
  },
  pt: {
    translation: {
      login: pt.Login,
    },
  },
};

const options = {
  order: ['querystring', 'navigator'],
  lookupQuerystring: 'lng',
};

use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: options,
    resources,
    fallbackLng: 'pt',
    supportedLngs: ['en', 'pt', 'es'],
    interpolation: {
      escapeValue: false,
    },
  });
