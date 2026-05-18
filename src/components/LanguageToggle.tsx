// LanguageToggle — a small fixed button pair (ΕΛ | EN) in the top-right corner.
// It reads the current language from i18next and highlights the active one.
// Clicking a button calls i18n.changeLanguage(), which triggers a re-render of
// every component that uses the useTranslation hook.
// The active language is persisted to localStorage by the LanguageDetector plugin
// configured in src/i18n.ts.

import { useTranslation } from 'react-i18next'
import './LanguageToggle.css'

function LanguageToggle() {
  const { i18n } = useTranslation()
  // Normalize to base locale ('el-GR' → 'el') so startsWith('el') always works
  const current = i18n.language?.startsWith('el') ? 'el' : 'en'

  return (
    <div className="lang-toggle">
      <button
        className={`lang-btn ${current === 'el' ? 'active' : ''}`}
        onClick={() => i18n.changeLanguage('el')}
      >
        ΕΛ
      </button>
      <span className="lang-sep">|</span>
      <button
        className={`lang-btn ${current === 'en' ? 'active' : ''}`}
        onClick={() => i18n.changeLanguage('en')}
      >
        EN
      </button>
    </div>
  )
}

export default LanguageToggle
