// Vite build configuration.
// @vitejs/plugin-react enables Fast Refresh in development and Babel transforms for JSX.
// No custom aliases, proxy, or build overrides are needed — defaults handle everything.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/museum-site/',
  plugins: [react()],
})
