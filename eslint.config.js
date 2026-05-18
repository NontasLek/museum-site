// ESLint configuration using the flat config format (eslint v9+).
// Rules applied to all .ts and .tsx files:
//   - js.configs.recommended     — core JavaScript best practices
//   - tseslint.configs.recommended — TypeScript-specific rules
//   - reactHooks.configs.flat.recommended — enforces Rules of Hooks
//   - reactRefresh.configs.vite  — ensures only components are exported from modules
//                                   so Vite's Fast Refresh works correctly
// The `dist` folder is ignored so build output is never linted.

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
