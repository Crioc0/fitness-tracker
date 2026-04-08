import pluginVitest from '@vitest/eslint-plugin'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import { globalIgnores } from 'eslint/config'
import skipFormatting from 'eslint-config-prettier/flat'
import pluginBoundaries from 'eslint-plugin-boundaries'
import importPlugin from 'eslint-plugin-import'
import pluginOxlint from 'eslint-plugin-oxlint'
import pluginPlaywright from 'eslint-plugin-playwright'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginSimpleSort from 'eslint-plugin-simple-import-sort'
import pluginVue from 'eslint-plugin-vue'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    ...pluginPlaywright.configs['flat/recommended'],
    files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  skipFormatting,

  {
    plugins: { 'simple-import-sort': pluginSimpleSort },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^node:'], // Node.js builtins
            ['^vue', '^@?\\w'], // external libs
            ['^@app', '^@pages', '^@widgets', '^@features', '^@entities'], // FSD layers
            ['^@shared'], // shared
            ['^\\.'], // relative
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  {
    plugins: { boundaries: pluginBoundaries },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/*' },
        { type: 'pages', pattern: 'src/pages/*' },
        { type: 'widgets', pattern: 'src/widgets/*' },
        { type: 'features', pattern: 'src/features/*' },
        { type: 'entities', pattern: 'src/entities/*' },
        { type: 'shared', pattern: 'src/shared/*' },
      ],
    },
    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'app', allow: ['pages', 'widgets', 'features', 'entities', 'shared'] },
            { from: 'pages', allow: ['widgets', 'features', 'entities', 'shared'] },
            { from: 'widgets', allow: ['features', 'entities', 'shared'] },
            { from: 'features', allow: ['entities', 'shared'] },
            { from: 'entities', allow: ['shared'] },
            { from: 'shared', allow: ['shared'] },
          ],
        },
      ],
    },
  },

  {
    plugins: { import: importPlugin },
    rules: {
      'import/no-internal-modules': [
        'error',
        {
          forbid: ['@entities/**/**', '@features/**/**', '@widgets/**/**'],
        },
      ],
    },
  },
  {
    plugins: { prettier: pluginPrettier },
    rules: {
      'prettier/prettier': 'error',
    },
  }
)
