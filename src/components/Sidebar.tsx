// Sidebar — a slide-out navigation panel with a hamburger button trigger.
//
// Behaviour:
//   - The hamburger button is always visible in the top-left corner.
//   - Clicking it toggles `isOpen`, which slides the sidebar in via CSS transition.
//   - A semi-transparent overlay covers the rest of the page while the sidebar is open;
//     clicking the overlay closes the sidebar without navigating.
//   - The active link is highlighted based on the current URL (useLocation).
//     The home route uses an exact match; all others use startsWith() so sub-pages
//     (e.g. /machine/1) keep the correct nav item highlighted.
//   - LanguageToggle is placed here so it's always visible regardless of sidebar state.
//   - All link labels come from i18next translations (sidebar.* keys).

import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageToggle from './LanguageToggle'
import './Sidebar.css'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  // Returns true when the given path matches the current location.
  // Home ('/') uses exact match to avoid highlighting for every route.
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Hamburger button — three bars animate to an X when open */}
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
      </button>

      {/* Language toggle — always visible in the top-right corner */}
      <LanguageToggle />

      {/* Dark overlay — clicking it closes the sidebar */}
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}

      {/* Sidebar panel — slides in from the left via CSS `left` transition */}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header"></div>

        <nav className="sidebar-nav">
          {/* Each link navigates and closes the sidebar in one click */}
          <div className={`sidebar-link ${isActive('/') ? 'active' : ''}`} onClick={() => { navigate('/'); setIsOpen(false) }}>
            {t('sidebar.home')}
          </div>
          <div className={`sidebar-link ${isActive('/vax') ? 'active' : ''}`} onClick={() => { navigate('/vax'); setIsOpen(false) }}>
            {t('sidebar.vax')}
          </div>
          <div className={`sidebar-link ${isActive('/cpu_history') ? 'active' : ''}`} onClick={() => { navigate('/cpu_history'); setIsOpen(false) }}>
            {t('sidebar.cpu')}
          </div>
          <div className={`sidebar-link ${isActive('/storage_history') ? 'active' : ''}`} onClick={() => { navigate('/storage_history'); setIsOpen(false) }}>
            {t('sidebar.storage')}
          </div>
          <div className={`sidebar-link ${isActive('/unix') ? 'active' : ''}`} onClick={() => { navigate('/unix'); setIsOpen(false) }}>
            {t('sidebar.unix')}
          </div>
          <div className={`sidebar-link ${isActive('/internet') ? 'active' : ''}`} onClick={() => { navigate('/internet'); setIsOpen(false) }}>
            {t('sidebar.internet')}
          </div>


        </nav>
      </div>
    </>
  )
}

export default Sidebar
