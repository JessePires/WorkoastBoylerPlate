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
      dashboard: en.Dashboard,
      basePage: en.BasePage,
    },
  },
  es: {
    tranlation: {
      login: es.Login,
      dashboard: es.Dashboard,
      basePage: es.BasePage,
    },
  },
  pt: {
    translation: {
      login: pt.Login,
      dashboard: pt.Dashboard,
      basePage: pt.BasePage,
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
