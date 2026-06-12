// Root component of the CSD Museum app.
//
// Responsibilities:
//   1. Defines the `timeline` data array — the single source of truth for all
//      machines, CPUs, OSes and storage devices shown on the home page.
//   2. Exports `allMachines` (a flat list derived from timeline) so MachinePage
//      can look up specs by machine id without duplicating data.
//   3. Renders the loading screen once on first load, then hands off to the router.
//   4. Declares all client-side routes.
//
// Route map:
//   /                    → HomePage (scrollable horizontal timeline)
//   /machine/:id         → MachinePage (detail for a specific computer/cpu/os card)
//   /storage/:id         → StoragePage (detail for a storage device)
//   /internet            → InternetPage (internet history + people section)
//   /vax                 → VAXPage     (dedicated VAX machine showcase)
//   /storage_history     → StorageHistoryPage (all storage devices overview)
//   /cpu_history         → CPUHistoryPage (all CPUs overview)
//   /unix                → UnixPage    (UNIX operating systems overview)

import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import { useState } from 'react'
import MachinePage from './pages/MachinePage'
import StoragePage from './pages/StoragePage'
import Sidebar from './components/Sidebar'
import InternetPage from './pages/InternetPage'
import VAXPage from './pages/VAXPage'
import StorageHistoryPage from './pages/StorageHistoryPage'
import CPUHistoryPage from './pages/CPUHistoryPage'
import UnixPage from './pages/UnixPage'


// Each entry in `timeline` represents one year column on the homepage.
// `machines` holds the three cards per column (computer, CPU, OS).
// `storage` is optional — only years that introduced notable storage hardware have it.
// The empty `year: ""` entries are placeholder columns used for visual spacing on the timeline.
const timeline = [
  { year: "1978", machines: [
    { id: "1", name: "VAX 11-780", type: "computer",
      specs: { cpu: "KA780 32-bit", memory: "512KB - 8MB", os: "UNIX BSD 4.2", year: "1978", speed: "1 MIPS" }},
    { id: "2", name: "VAX KA780 32-bit", type: "cpu" },
    { id: "3", name: "UNIX BSD 4.2", type: "os" },
  ],
  storage: [{ id: "s1", name: "IBM Direct Access Storage Devices" }]},

  { year: "1980", machines: [
    { id: "4", name: "VAX 11-750", type: "computer",
      specs: { cpu: "KA750 32-bit", memory: "256KB - 4MB", os: "UNIX BSD 4.1", year: "1980", speed: "0.5 MIPS" }},
    { id: "5", name: "VAX KA750 32-bit", type: "cpu" },
    { id: "6", name: "VMS V2.0", type: "os" },
  ]},

  { year: "1981", machines: [
    { id: "7", name: "Vicom DIP", type: "computer",
      specs: { cpu: "Motorola 68000 16-bit", memory: "4M pixels RAM", os: "Custom OS", year: "1981", speed: "Real-time" }},
    { id: "8", name: "Pipeline Image Processor", type: "cpu" },
    { id: "9", name: "Custom OS", type: "os" },
  ]},

  // Plexus P/40 shares the 1981 era but gets its own column for layout reasons
  { year: "", machines: [
    { id: "10", name: "Plexus P/40", type: "computer",
      specs: { cpu: "Zilog Z8000 16-bit", memory: "512KB - 4MB", os: "AT&T Unix III", year: "1981", speed: "—" }},
    { id: "11", name: "Zilog Z8000 16-bit", type: "cpu" },
    { id: "12", name: "AT&T Unix III", type: "os" },
  ]},

  { year: "1982", machines: [],
    storage: [{ id: "s2", name: "DEC Digital Storage Architecture" }]},

  { year: "1984", machines: [
    { id: "13", name: "VAX 8600", type: "computer",
      specs: { cpu: "KA86 32-bit / 12.5MHz", memory: "16MB - 512MB", os: "Ultrix / VMS V4.0", year: "1984", speed: "4 MIPS" }},
    { id: "14", name: "VAX KA86 32-bit", type: "cpu" },
    { id: "15", name: "Ultrix or VMS V4.0", type: "os" },
  ]},

  { year: "1985", machines: [
    { id: "16", name: "MicroVAX II", type: "computer",
      specs: { cpu: "KA630-AA / 5MHz", memory: "1MB - 16MB", os: "VAX/VMS, ULTRIX, BSD Unix", year: "1985", speed: "0.9 MIPS" }},
    { id: "17", name: "VAX KA630 32-bit", type: "cpu" },
    { id: "18", name: "Ultrix or MicroVMS V4.0", type: "os" },
  ]},

  { year: "1987", machines: [
    { id: "19", name: "Sun 3/280", type: "computer",
      specs: { cpu: "Motorola 68020 / 25MHz", memory: "up to 32MB", os: "SunOS 3.0-4.1.1", year: "1987", speed: "2.5 MIPS" }},
    { id: "20", name: "Motorola 68020 32-bit", type: "cpu" },
    { id: "21", name: "SunOS 3.0-4.1.1", type: "os" },
  ]},

  { year: "1990", machines: [
    { id: "22", name: "Convex C-120", type: "computer",
      specs: { cpu: "Scalar + Vector / CMOS VLSI", memory: "32MB+", os: "Convex UNIX 6.2", year: "1990", speed: "20-40 Mflops" }},
    { id: "23", name: "Motorola 68000", type: "cpu" },
    { id: "24", name: "Convex UNIX 6.2", type: "os" },
  ]},
]


// Flat list of all machines exported so MachinePage can find specs by id
// without needing to re-import or re-define the timeline.
export const allMachines = timeline.flatMap(e => e.machines)

function App() {
  // `loading` controls whether the splash screen is shown.
  // Once LoadingScreen calls onFinish(), the loading screen unmounts and the app is visible.
  const [loading, setLoading] = useState(true)
  return (
    <>
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/machine/:id" element={<MachinePage />} />
        <Route path="/storage/:id" element={<StoragePage />} />
        <Route path="/internet" element={<InternetPage />} />
        <Route path="/vax" element={<VAXPage />} />
        <Route path="/storage_history" element={<StorageHistoryPage />} />
        <Route path="/cpu_history" element={<CPUHistoryPage />} />
        <Route path="/unix" element={<UnixPage />} />
      </Routes>
    </>
  )
}


// HomePage renders three horizontal scrollable rows:
//   Row 1 — machine cards (computer / cpu / os) above the timeline line
//   Line  — the purple horizontal bar
//   Row 2 — year labels aligned under each column
//   Row 3 — storage device cards below the year labels
//
// All three rows share the same column widths and gap so they stay visually aligned.
// Clicking any card navigates to /machine/:id or /storage/:id.
function HomePage() {
  const navigate = useNavigate()

  return (
<div>
   <Sidebar />
    {/* Τίτλος */}
    <div className='title-container'>
      <h1 className="title">CSD Museum</h1>
    </div>


      <div className="timeline-container">
      <div className="timeline-wrapper">

        {/* Fixed labels on the left identify which row is Computer / CPU / OS */}
        <div className="category-labels">
          <div className="category-label">Computer</div>
          <div className="category-label">CPU</div>
          <div className="category-label">OS</div>
        </div>
      {/* Row 1: machine cards */}
        <div className="timeline-scroll">

          {timeline.map((entry) => (
            <div className="year-column" key={entry.year}>
              <div className="machines">
                {entry.machines.map((machine) => (
                  <div
                    key={machine.id}
                    className={`machine-card${machine.type !== 'computer' ? ' machine-card-sub' : ''}`}
                    onClick={() => navigate(`/machine/${machine.id}`)}
                  >
                    {machine.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Κεντρικό timeline — the purple horizontal bar separating machines from years */}
        <div className="timeline-line" ></div>
      </div>

        {/* Row 2: year labels */}
        <div className="timeline-scroll">
          {timeline.map((entry) => (
            // data-year is used by CSS to apply a positional offset for the 1981 column
            <div className="year-column" key={entry.year} data-year={entry.year}>
              <div className="year-label">{entry.year}</div>
            </div>
          ))}
        </div>
        {/* Row 3: storage cards — only rendered when the timeline entry has a `storage` field */}
      <div className="timeline-scroll">
        {timeline.map((entry) => (
          <div className="year-column" key={entry.year}>
            {entry.storage ? (
              <div
                className="machine-card"
                onClick={() => navigate(`/storage/${entry.storage[0].id}`)}

              >
                {entry.storage[0].name}
              </div>
            ) : null}
          </div>
        ))}
      </div>

  </div>

</div>
  )
}

export default App
