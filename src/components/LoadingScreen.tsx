// LoadingScreen — a retro-themed splash screen shown once when the app first loads.
//
// Animation sequence (controlled by `phase` state):
//   Phase 0 — types the title "CSD Museum" one character at a time (200ms per char)
//   Phase 1 — waits 1000ms then starts CSS fade-out (opacity: 0 via `.loading-fadeout` class)
//   Phase 2 — waits another 800ms then calls `onFinish()` to unmount this component
//
// The progress bar animation is pure CSS (see LoadingScreen.css), running independently
// of the phase logic — it always fills to 100% in 2s.

import { useEffect, useState } from 'react'
import './LoadingScreen.css'

function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [text, setText] = useState('')
  const [phase, setPhase] = useState(0)
  const fullText = 'CSD Museum'

  useEffect(() => {
    // Phase 0: type one character at a time until the full title is displayed
    if (phase === 0) {
      if (text.length < fullText.length) {
        const timeout = setTimeout(() => {
          setText(fullText.slice(0, text.length + 1))
        },200)
        return () => clearTimeout(timeout)
      } else {
        // Title fully typed — pause briefly before fading out
        setTimeout(() => setPhase(1), 800)
      }
    }

    // Phase 1: trigger the CSS fade-out transition
    if (phase === 1) {
      setTimeout(() => {
        setPhase(2)
      }, 1000)
    }

    // Phase 2: once fade is complete, notify parent to unmount this component
    if (phase === 2) {
      setTimeout(() => onFinish(), 800)
    }
  }, [text, phase])

  return (
    // `.loading-fadeout` class is applied in phase 1+ to trigger the CSS opacity transition
    <div className={`loading-screen ${phase >= 1 ? 'loading-fadeout' : ''}`}>
      <div className="loading-content">
        {/* CRT scanline overlay for retro feel */}
        <div className="loading-scanline"></div>
        <p className="loading-label">INITIALIZING SYSTEM...</p>
        <h1 className="loading-title">
          {text}
          {/* Blinking cursor gives the typing animation a terminal look */}
          <span className="loading-cursor">|</span>
        </h1>
        <p className="loading-subtitle">
          Computer Science Department - University of Crete
        </p>
        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
