// Initialises react-i18next for Greek/English bilingual support.
// - LanguageDetector checks localStorage first, then the browser's language setting.
// - The detected language is cached in localStorage so the user's choice persists across visits.
// - fallbackLng is 'el' (Greek).
// - escapeValue: false is safe here because React already escapes JSX content.
//
// Translation JSON files live at:
//   src/locales/el/translation.json  (Greek)
//   src/locales/en/translation.json  (English)

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import el from './locales/el/translation.json'
import en from './locales/en/translation.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      el: { translation: el },
      en: { translation: en },
    },
    fallbackLng: 'el',
    supportedLngs: ['el', 'en'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  })

export default i18n
