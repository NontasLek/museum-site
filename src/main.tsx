// Entry point for the React app.
// Wraps the entire app in StrictMode (catches potential issues in development)
// and BrowserRouter (enables client-side routing via react-router-dom).
// i18n is imported here so the translation system initialises before any component renders.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './i18n'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
