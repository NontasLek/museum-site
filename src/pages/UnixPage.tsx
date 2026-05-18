// UnixPage — an overview of the UNIX operating systems used in the department.
//
// Follows the same static-data + translation pattern as CPUHistoryPage:
//   - `osBaseData` holds non-translatable fields (id, name, machine, year).
//   - Text content is loaded from the translation file under `unixPage.oss.<id>.*`.
//   - The conclusion section renders a mini timeline from `unixPage.timeline`.
//
// Note: the page is named "Unix" but covers all flavours of UNIX/BSD that ran on
// department machines, including Ultrix, SunOS, and Convex UNIX.

import { useTranslation } from 'react-i18next'
import './UnixPage.css'
import Sidebar from '../components/Sidebar'

// Static metadata — ids must match translation keys under unixPage.oss.*
const osBaseData = [
  { id: "bsd41",      name: "BSD 4.1",          machine: "VAX 11/750",                      year: "1980" },
  { id: "unixiii",    name: "UNIX System III",   machine: "Plexus P/40",                     year: "1982" },
  { id: "bsd42",      name: "BSD 4.2",           machine: "VAX 11/780 «ARIADNE»",            year: "1983" },
  { id: "ultrix",     name: "Ultrix",            machine: "VAX 8600 «TALOS» & MicroVAX II",  year: "1984" },
  { id: "sunos",      name: "SunOS",             machine: "Sun 3/280",                       year: "1985" },
  { id: "convexunix", name: "Convex UNIX 6.2",   machine: "Convex C-120",                    year: "~1990" },
]

function UnixPage() {
  const { t } = useTranslation()

  // Merge static base data with translated text fields
  const oss = osBaseData.map((os) => ({
    ...os,
    intro:        t(`unixPage.oss.${os.id}.intro`),
    description:  t(`unixPage.oss.${os.id}.description`),
    achievements: t(`unixPage.oss.${os.id}.achievements`, { returnObjects: true }) as string[],
    specs:        t(`unixPage.oss.${os.id}.specs`,        { returnObjects: true }) as { label: string; value: string }[],
    highlight:    t(`unixPage.oss.${os.id}.highlight`),
  }))

  // Mini timeline for the conclusion section
  const timelineItems = t('unixPage.timeline', { returnObjects: true }) as { year: string; event: string }[]

  return (
    <div className="unix-page">
      <Sidebar />

      {/* Intro */}
      <div className="unix-intro">
        <h1 className="unix-title">{t('unixPage.title')}</h1>
        <p className="unix-intro-text">{t('unixPage.introText')}</p>
      </div>

      {/* One section per OS */}
      <div className="unix-systems">
        {oss.map((os) => (
          <div key={os.id} className="unix-section">

            {/* Year badge — absolutely positioned to the left on desktop, inline on mobile */}
            <div>
              <div className="unix-year-badge">{os.year}</div>
            </div>

            <div className="unix-content">
              <div className="unix-name-row">
                <h2 className="unix-name">{os.name}</h2>
                {/* Badge showing which machine(s) ran this OS */}
                <span className="unix-machine-badge">{os.machine}</span>
              </div>

              <p className="unix-intro-label">{os.intro}</p>
              <p className="unix-description">{os.description}</p>

              {/* Specs */}
              <div className="unix-specs">
                {os.specs.map((spec, i) => (
                  <div key={i} className="unix-spec-item">
                    <span className="unix-spec-label">{spec.label}</span>
                    <span className="unix-spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div className="unix-achievements">
                <p className="unix-achievements-title">{t('unixPage.achievementsTitle')}</p>
                {os.achievements.map((a, i) => (
                  <p key={i} className="unix-achievement">- {a}</p>
                ))}
              </div>

              {/* Highlight — accent quote box */}
              <div className="unix-highlight">
                <p>{os.highlight}</p>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Conclusion with mini timeline */}
      <div className="unix-conclusion">
        <h2 className="unix-conclusion-title">{t('unixPage.conclusionTitle')}</h2>
        <p className="unix-conclusion-text">{t('unixPage.conclusionText')}</p>
        <div className="unix-timeline-summary">
          {timelineItems.map((item, i) => (
            <div key={i} className="unix-timeline-item">
              <span className="unix-timeline-year">{item.year}</span>
              <span className="unix-timeline-event">{item.event}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default UnixPage
