// StorageHistoryPage — an overview of all storage hardware used in the department.
//
// Follows the same static-data + translation pattern as CPUHistoryPage:
//   - `storageBaseData` holds non-translatable fields (id, name, category, year, capacity, image).
//   - Text content is loaded from the translation file under `storageHistoryPage.systems.<id>.*`.
//
// Visual layout:
//   - Even-indexed sections have image on the left, text on the right.
//   - Odd-indexed sections are reversed (`storage-history-section-reverse`) for visual variety.
//   - On mobile, the reverse class is overridden back to column layout (see CSS).
//
// `categoryColors` maps disk/tape to specific background colours used on both the year badge
// and the category badge overlay on each image.

import { useTranslation } from 'react-i18next'
import './StorageHistoryPage.css'
import Sidebar from '../components/Sidebar'

// Static metadata — ids must match translation keys under storageHistoryPage.systems.*
const storageBaseData = [
  { id: "ibm3370",  name: "IBM 3370",   category: "disk", year: "1979", capacity: "571MB",        image: import.meta.env.BASE_URL + 'images/IBM 3370.jpg'    },
  { id: "rl02",     name: "RL02",       category: "disk", year: "1978", capacity: "10MB",         image: import.meta.env.BASE_URL + 'images/RL02.jpg'        },
  { id: "ra60",     name: "RA60",       category: "disk", year: "1982", capacity: "205MB",        image: import.meta.env.BASE_URL + 'images/RA60.jpg'        },
  { id: "ra80",     name: "RA80",       category: "disk", year: "1982", capacity: "121MB",        image: import.meta.env.BASE_URL + 'images/RA80.jpg'        },
  { id: "ra81",     name: "RA81",       category: "disk", year: "1982", capacity: "456MB",        image: import.meta.env.BASE_URL + 'images/RA81.jpg'        },
  { id: "ts05",     name: "TS05",       category: "tape", year: "1982", capacity: "9-track",      image: import.meta.env.BASE_URL + 'images/TS05.jpg'        },
  { id: "tu80",     name: "TU80",       category: "tape", year: "1983", capacity: "1600 bpi",     image: import.meta.env.BASE_URL + 'images/TU80.jpg'        },
  { id: "tu81plus", name: "TU81 Plus",  category: "tape", year: "1986", capacity: "High Density", image: import.meta.env.BASE_URL + 'images/TU81_Plus.png'   },
]

// Badge background colours differentiate disk (dark green) from tape (dark yellow)
const categoryColors: Record<string, string> = {
  disk: "#0d2b1a",
  tape: "#7a6000",
}

function StorageHistoryPage() {
  const { t } = useTranslation()

  // Translated labels for the category badges (e.g. "Disk" / "Tape" or "Δίσκος" / "Ταινία")
  const categoryLabels = t('storageHistoryPage.categoryLabels', { returnObjects: true }) as Record<string, string>

  // Merge static base data with translated text fields
  const storageSystems = storageBaseData.map((s) => ({
    ...s,
    intro:        t(`storageHistoryPage.systems.${s.id}.intro`),
    description:  t(`storageHistoryPage.systems.${s.id}.description`),
    achievements: t(`storageHistoryPage.systems.${s.id}.achievements`, { returnObjects: true }) as string[],
    specs:        t(`storageHistoryPage.systems.${s.id}.specs`,        { returnObjects: true }) as { label: string; value: string }[],
    highlight:    t(`storageHistoryPage.systems.${s.id}.highlight`),
  }))

  // Timeline items for the conclusion section
  const conclusionTimeline = t('storageHistoryPage.conclusionTimeline', { returnObjects: true }) as { year: string; event: string }[]

  return (
    <div className="storage-history-page">
      <Sidebar />

      {/* Intro */}
      <div className="storage-history-intro">
        <h1 className="storage-history-title">{t('storageHistoryPage.title')}</h1>
        <p className="storage-history-intro-text">{t('storageHistoryPage.introText')}</p>
      </div>

      {/* One section per storage device — alternates image left/right */}
      <div className="storage-history-systems">
        {storageSystems.map((storage, index) => (
          <div
            key={storage.id}
            className={`storage-history-section ${index % 2 === 0 ? '' : 'storage-history-section-reverse'}`}
          >
            {/* Image with year and category badges overlaid */}
            <div className="storage-history-image-container">
              <img src={storage.image} alt={storage.id} className="storage-history-image" />
              <div className="storage-history-year-badge" style={{ backgroundColor: categoryColors[storage.category] }}>
                {storage.year}
              </div>
              <div className="storage-history-category-badge" style={{ backgroundColor: categoryColors[storage.category] }}>
                {categoryLabels[storage.category]}
              </div>
            </div>

            {/* Content */}
            <div className="storage-history-content">
              <div className="storage-history-name-row">
                <h2 className="storage-history-name">{storage.name}</h2>
                <span className="storage-history-capacity">{storage.capacity}</span>
              </div>

              <p className="storage-history-intro-label">{storage.intro}</p>
              <p className="storage-history-description">{storage.description}</p>

              {/* Specs */}
              <div className="storage-history-specs">
                {storage.specs.map((spec, i) => (
                  <div key={i} className="storage-history-spec-item">
                    <span className="storage-history-spec-label">{spec.label}</span>
                    <span className="storage-history-spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div className="storage-history-achievements">
                <p className="storage-history-achievements-title">{t('storageHistoryPage.achievementsTitle')}</p>
                {storage.achievements.map((a, i) => (
                  <p key={i} className="storage-history-achievement">- {a}</p>
                ))}
              </div>

              {/* Highlight — accent quote box */}
              <div className="storage-history-highlight">
                <p>{storage.highlight}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Conclusion with mini timeline */}
      <div className="storage-history-conclusion">
        <h2 className="storage-history-conclusion-title">{t('storageHistoryPage.conclusionTitle')}</h2>
        <p className="storage-history-conclusion-text">{t('storageHistoryPage.conclusionText')}</p>
        <div className="storage-history-timeline">
          {conclusionTimeline.map((item, i) => (
            <div key={i} className="storage-history-timeline-item">
              <span className="storage-history-timeline-year">{item.year}</span>
              <span className="storage-history-timeline-event">{item.event}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default StorageHistoryPage
