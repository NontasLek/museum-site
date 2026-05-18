// MachinePage — the detail page for a single machine, CPU, or OS entry.
// Reached by clicking any card on the homepage timeline (/machine/:id).
//
// Data flow:
//   - `id` comes from the URL parameter (e.g. /machine/7 → id = "7").
//   - `machineBaseData` holds static display info (image path, type, hasFunFact flag).
//   - `allMachines` (imported from App.tsx) holds the specs for computer-type entries.
//     CPU and OS entries have no specs panel.
//   - All text content (history, funFact) is loaded from the translation file
//     under `machinePage.machines.<id>.*`.
//   - `hasFunFact` is a flag in the base data — only set to true for main computers,
//     not for CPU or OS cards. This avoids making a failed t() call for missing keys.
//
// If the id doesn't match any entry (e.g. invalid URL), the user is redirected to home.

import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './MachinePage.css'
import { allMachines } from '../App'

// Static per-machine data — ids must match both the timeline in App.tsx and translation keys.
// `image` is undefined for CPU and OS entries which have no photo to display.
// `hasFunFact` controls whether the fun fact box is shown at the bottom of the page.
const machineBaseData = [
  { id: "1",  name: "VAX 11-780 - ARIADNE",      year: "1978", image: "/images/VAX 11780.jpg",    type: "machine", hasFunFact: true  },
  { id: "2",  name: "VAX KA780 32-bit",            year: "1978", image: undefined,                  type: "cpu",     hasFunFact: false },
  { id: "3",  name: "UNIX BSD 4.2",                year: "1978", image: undefined,                  type: "os",      hasFunFact: false },
  { id: "4",  name: "VAX 11-750",                  year: "1980", image: "/images/VAX 11750.png",    type: "machine", hasFunFact: false },
  { id: "5",  name: "VAX KA750 32-bit",            year: "1980", image: undefined,                  type: "cpu",     hasFunFact: false },
  { id: "6",  name: "VMS V2.0",                    year: "1980", image: undefined,                  type: "os",      hasFunFact: false },
  { id: "7",  name: "Vicom DIP",                   year: "1981", image: "/images/VICOM.png",        type: "machine", hasFunFact: true  },
  { id: "8",  name: "Pipeline Image Processor",    year: "1981", image: undefined,                  type: "cpu",     hasFunFact: false },
  { id: "10", name: "Plexus P/40",                 year: "1981", image: "/images/Plexus P40.jpg",   type: "machine", hasFunFact: true  },
  { id: "11", name: "Zilog Z8000 16-bit",          year: "1981", image: undefined,                  type: "cpu",     hasFunFact: false },
  { id: "12", name: "AT&T Unix III",               year: "1981", image: undefined,                  type: "os",      hasFunFact: false },
  { id: "13", name: "VAX 8600 - TALOS",            year: "1984", image: "/images/VAX 8600.png",     type: "machine", hasFunFact: true  },
  { id: "14", name: "VAX KA86 32-bit",             year: "1984", image: undefined,                  type: "cpu",     hasFunFact: false },
  { id: "15", name: "Ultrix or VMS V4.0",          year: "1984", image: undefined,                  type: "os",      hasFunFact: false },
  { id: "16", name: "MicroVAX II - MINOS",         year: "1985", image: "/images/MicroVAX II.png",  type: "machine", hasFunFact: true  },
  { id: "17", name: "VAX KA630 32-bit",            year: "1985", image: undefined,                  type: "cpu",     hasFunFact: false },
  { id: "18", name: "Ultrix or MicroVMS V4.0",     year: "1985", image: undefined,                  type: "os",      hasFunFact: false },
  { id: "19", name: "Sun 3/280",                   year: "1987", image: "/images/Sun 3280.jpg",     type: "machine", hasFunFact: true  },
  { id: "20", name: "Motorola 68020 32-bit",       year: "1987", image: undefined,                  type: "cpu",     hasFunFact: false },
  { id: "21", name: "SunOS 3.0-4.1.1",            year: "1987", image: undefined,                  type: "os",      hasFunFact: false },
  { id: "22", name: "Convex C-120 - CANDIA",       year: "1990", image: "/images/Convex-C120.jpg",  type: "machine", hasFunFact: true  },
  { id: "23", name: "Motorola 68000",              year: "1990", image: undefined,                  type: "cpu",     hasFunFact: false },
  { id: "24", name: "Convex UNIX 6.2",             year: "1990", image: undefined,                  type: "os",      hasFunFact: false },
]

function MachinePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()

  // Look up display data from the static list
  const machine = machineBaseData.find((m) => m.id === id)
  // Look up specs from the timeline data exported by App.tsx (only computers have specs)
  const specs = allMachines.find((m) => m.id === id)?.specs

  // Redirect to home if the id is unknown (e.g. someone manually typed a bad URL)
  useEffect(() => {
    if (!machine) {
      navigate('/')
    }
  }, [machine, navigate])

  // Render nothing during the redirect frame to avoid a flash of broken content
  if (!machine) return null

  const history = t(`machinePage.machines.${id}.history`)
  // Only fetch the fun fact translation if this machine has one, to avoid key-not-found warnings
  const funFact = machine.hasFunFact ? t(`machinePage.machines.${id}.fun_fact`) : ''

  return (
    <div className="machine-page">

      {/* Back button — fixed so it's always reachable while scrolling */}
      <button className="machine-back-btn" onClick={() => navigate('/')}>
        {t('machinePage.back')}
      </button>

      <div className="machine-layout">

        {/* Left: main content — image, history text, optional fun fact */}
        <div className="machine-main">
          <div className="machine-header">
            <div>
              {/* Only render the image for physical machines that have a photo */}
              {machine.type === 'machine' && machine.image && (
                <img src={machine.image} className="machine-image" />
              )}
            </div>
            <div className="machine-title-section">
              <div className="machine-name">{machine.name}</div>
              <div className="machine-year">{machine.year}</div>
            </div>
          </div>

          <div className="machine-divider"></div>
          <p className="machine-history">{history}</p>

          {/* Fun fact box — shown only for main computers with `hasFunFact: true` */}
          {funFact && (
            <div className="machine-funfact">
              <div className="machine-funfact-title">{t('machinePage.funFactTitle')}</div>
              <div className="machine-funfact-text">{funFact}</div>
            </div>
          )}
        </div>

        {/* Right: sticky specs panel — only shown for computers that have specs in timeline */}
        {specs && (
          <div className="machine-specs-panel">
            <h3 className="machine-specs-title">{t('machinePage.specsTitle')}</h3>
            <div className="machine-specs-list">
              <div className="machine-spec-item">
                <span className="machine-spec-label">{t('machinePage.yearLabel')}</span>
                <span className="machine-spec-value">{specs.year}</span>
              </div>
              <div className="machine-spec-item">
                <span className="machine-spec-label">CPU</span>
                <span className="machine-spec-value">{specs.cpu}</span>
              </div>
              <div className="machine-spec-item">
                <span className="machine-spec-label">{t('machinePage.memoryLabel')}</span>
                <span className="machine-spec-value">{specs.memory}</span>
              </div>
              <div className="machine-spec-item">
                <span className="machine-spec-label">{t('machinePage.osLabel')}</span>
                <span className="machine-spec-value">{specs.os}</span>
              </div>
              <div className="machine-spec-item">
                <span className="machine-spec-label">{t('machinePage.speedLabel')}</span>
                <span className="machine-spec-value">{specs.speed}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default MachinePage
