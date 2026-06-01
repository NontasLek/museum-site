// CPUHistoryPage — an overview of all CPUs used in the CSD department over the years.
//
// Data pattern used across this page (and VAXPage / UnixPage / StorageHistoryPage):
//   1. `cpuBaseData` holds static, non-translatable fields (id, name, machine, year).
//   2. All text content (intro, description, achievements, specs, highlight) lives in
//      the translation JSON files under the key `cpuHistoryPage.cpus.<id>.*`.
//   3. At render time, `cpuBaseData.map()` merges static fields with translated strings
//      so each cpu object is fully populated before being passed to JSX.
//   4. `achievements` and `specs` use `{ returnObjects: true }` because they are arrays
//      in the JSON — without this flag i18next would return a plain string.
//
// The conclusion section at the bottom renders a mini timeline of key CPU milestones,
// also sourced from the translation file (`cpuHistoryPage.timeline`).

import { useTranslation } from 'react-i18next'
import './CPUHistoryPage.css'
import Sidebar from '../components/Sidebar'

// Static metadata for each CPU — ids must match the keys in translation.json
const cpuBaseData = [
  { id: "ka780",   name: "VAX KA780",       machine: "VAX 11/780 «ARIADNE»", year: "1978" },
  { id: "ka750",   name: "VAX KA750",       machine: "VAX 11/750",            year: "1980" },
  { id: "m68000",  name: "Motorola 68000",  machine: "Vicom DIP",             year: "1981" },
  { id: "z8000",   name: "Zilog Z8000",     machine: "Plexus P/40",           year: "1981" },
  { id: "ka86",    name: "VAX KA86",        machine: "VAX 8600 «TALOS»",      year: "1984" },
  { id: "ka630",   name: "VAX KA630",       machine: "MicroVAX II «MINOS»",   year: "1985" },
  { id: "m68020",  name: "Motorola 68020",  machine: "Sun 3/280",             year: "1987" },
  { id: "convex",  name: "Convex CMOS VLSI","machine": "Convex C-120",        year: "1990" },
]

function CPUHistoryPage() {
  const { t } = useTranslation()

  // Merge static base data with translated text fields
  const cpus = cpuBaseData.map((cpu) => ({
    ...cpu,
    intro:        t(`cpuHistoryPage.cpus.${cpu.id}.intro`),
    description:  t(`cpuHistoryPage.cpus.${cpu.id}.description`),
    achievements: t(`cpuHistoryPage.cpus.${cpu.id}.achievements`, { returnObjects: true }) as string[],
    specs:        t(`cpuHistoryPage.cpus.${cpu.id}.specs`,        { returnObjects: true }) as { label: string; value: string }[],
    highlight:    t(`cpuHistoryPage.cpus.${cpu.id}.highlight`),
  }))

  // Timeline items for the conclusion section at the bottom of the page
  const timelineItems = t('cpuHistoryPage.timeline', { returnObjects: true }) as { year: string; event: string }[]

  return (
    <div className="cpu-page">
      <Sidebar />

      {/* Intro */}
      <div className="cpu-intro">
        <h1 className="cpu-title">{t('cpuHistoryPage.title')}</h1>
        <p className="cpu-intro-text">{t('cpuHistoryPage.introText')}</p>
      </div>

      {/* One section per CPU */}
      <div className="cpu-systems">
        {cpus.map((cpu) => (
          <div key={cpu.id} className="cpu-section">

            {/* Year badge positioned absolutely to the left of the section */}
            <div>
              <div className="cpu-year-badge">{cpu.year}</div>
            </div>

            {/* Content */}
            <div className="cpu-content">
              <div className="cpu-name-row">
                <h2 className="cpu-name">{cpu.name}</h2>
                {cpu.id === 'm68000' && <span className="cpu-intro-label">{t('cpuHistoryPage.cpus.m68000.label')}</span>}
                {/* Badge showing which machine this CPU belonged to */}
                <span className="cpu-machine-badge">{cpu.machine}</span>
              </div>
              <p className="cpu-intro-label">{cpu.intro}</p>
              <p className="cpu-description">{cpu.description}</p>

              {/* Specs */}
              <div className="cpu-specs">
                {cpu.specs.map((spec, i) => (
                  <div key={i} className="cpu-spec-item">
                    <span className="cpu-spec-label">{spec.label}</span>
                    <span className="cpu-spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div className="cpu-achievements">
                <p className="cpu-achievements-title">{t('cpuHistoryPage.achievementsTitle')}</p>
                {cpu.achievements.map((a, i) => (
                  <p key={i} className="cpu-achievement">- {a}</p>
                ))}
              </div>

              {/* Highlight — a notable quote or fact, displayed in an accent box */}
              <div className="cpu-highlight">
                <p>{cpu.highlight}</p>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Conclusion with mini timeline */}
      <div className="cpu-conclusion">
        <h2 className="cpu-conclusion-title">{t('cpuHistoryPage.conclusionTitle')}</h2>
        <p className="cpu-conclusion-text">{t('cpuHistoryPage.conclusionText')}</p>
        <div className="cpu-timeline-summary">
          {timelineItems.map((item, i) => (
            <div key={i} className="cpu-timeline-item">
              <span className="cpu-timeline-year">{item.year}</span>
              <span className="cpu-timeline-event">{item.event}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default CPUHistoryPage
