// VAXPage — a dedicated showcase for the four VAX machines owned by the department.
//
// This page is structurally similar to StorageHistoryPage:
//   - Even-indexed sections → image left, text right (vax-section-normal).
//   - Odd-indexed sections  → image right, text left (vax-section-reverse).
//   - On mobile, the reverse class is cancelled so all sections stack vertically.
//
// The codename field (e.g. "ARIADNE", "TALOS") is the nickname given to the machine
// by the department. VAX 11/750 has "-" as its codename, so the badge is hidden for it.
//
// Data pattern is the same as CPUHistoryPage — static fields in `vaxBaseData`,
// translated text in `vaxPage.systems.<id>.*`.

import { useTranslation } from 'react-i18next'
import './VAXPage.css'
import Sidebar from '../components/Sidebar'

// Static metadata — ids must match translation keys under vaxPage.systems.*
const vaxBaseData = [
  { id: "ariadne", name: "VAX 11/780", codename: "ARIADNE", year: "1983", image: "/images/VAX 11780.jpg" },
  { id: "vax750",  name: "VAX 11/750", codename: "-",       year: "1980", image: "/images/VAX 11750.png" },
  { id: "talos",   name: "VAX 8600",   codename: "TALOS",   year: "1984", image: "/images/VAX 8600.png"  },
  { id: "minos",   name: "MicroVAX II",codename: "MINOS",   year: "1985", image: "/images/MicroVAX II.png" },
]

function VAXPage() {
  const { t } = useTranslation()

  // Merge static base data with translated text fields
  const vaxSystems = vaxBaseData.map((vax) => ({
    ...vax,
    intro:        t(`vaxPage.systems.${vax.id}.intro`),
    description:  t(`vaxPage.systems.${vax.id}.description`),
    achievements: t(`vaxPage.systems.${vax.id}.achievements`, { returnObjects: true }) as string[],
    specs:        t(`vaxPage.systems.${vax.id}.specs`,        { returnObjects: true }) as { label: string; value: string }[],
    highlight:    t(`vaxPage.systems.${vax.id}.highlight`),
  }))

  // Mini timeline items for the conclusion section
  const timelineItems = t('vaxPage.timeline', { returnObjects: true }) as { year: string; event: string }[]

  return (
    <div className="vax-page">
      <Sidebar />

      {/* Intro */}
      <div className="vax-intro">
        <h1 className="vax-title">{t('vaxPage.title')}</h1>
        <p className="vax-intro-text">{t('vaxPage.introText')}</p>
      </div>

      {/* One section per VAX machine — alternates image left/right */}
      <div className="vax-systems">
        {vaxSystems.map((vax, index) => (
          <div key={vax.id} className={`vax-section ${index % 2 === 0 ? 'vax-section-normal' : 'vax-section-reverse'}`}>

            {/* Image with year badge overlaid in the top-left corner */}
            <div className="vax-image-container">
              <img src={vax.image} alt={vax.name} className="vax-image" />
              <div className="vax-year-badge">{vax.year}</div>
            </div>

            {/* Content */}
            <div className="vax-content">
              <div className="vax-name-row">
                <h2 className="vax-name">{vax.name}</h2>
                {/* Codename badge is hidden for VAX 11/750 which has no codename ("-") */}
                {vax.codename !== "-" && (
                  <span className="vax-codename">{vax.codename}</span>
                )}
              </div>

              <p className="vax-intro-label">{vax.intro}</p>
              <p className="vax-description">{vax.description}</p>

              {/* Specs */}
              <div className="vax-specs">
                {vax.specs.map((spec, i) => (
                  <div key={i} className="vax-spec-item">
                    <span className="vax-spec-label">{spec.label}</span>
                    <span className="vax-spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div className="vax-achievements">
                <p className="vax-achievements-title">{t('vaxPage.achievementsTitle')}</p>
                {vax.achievements.map((a, i) => (
                  <p key={i} className="vax-achievement">- {a}</p>
                ))}
              </div>

              {/* Highlight — accent quote box */}
              <div className="vax-highlight">
                <p>{vax.highlight}</p>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Conclusion with mini timeline */}
      <div className="vax-conclusion">
        <h2 className="vax-conclusion-title">{t('vaxPage.conclusionTitle')}</h2>
        <p className="vax-conclusion-text">{t('vaxPage.conclusionText')}</p>
        <div className="vax-timeline-summary">
          {timelineItems.map((item, i) => (
            <div key={i} className="vax-timeline-item">
              <span className="vax-timeline-year">{item.year}</span>
              <span className="vax-timeline-event">{item.event}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default VAXPage
