import stylistic from '@stylistic/eslint-plugin'
import pluginJs from '@eslint/js'
import parserTs from '@typescript-eslint/parser'
import globals from 'globals'

export default [
  /* Browser environment */
  {
    languageOptions: {
      globals: globals.browser,
    },
  },

  /* Default recommendations */
  pluginJs.configs.recommended,

  /* Stylistic flat config factory */
  {
    ...stylistic.configs.customize({
      flat: true,
      indent: 2,
      semi: false,
      quotes: 'single',
      arrowParens: true,
      braceStyle: '1tbs',
      jsx: true,
    }),
    languageOptions: {
      parser: parserTs,
    },
    files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
  },

  /* Stylistic overrides */
  {
    plugins: { '@stylistic': stylistic },
    languageOptions: {
      parser: parserTs,
    },
    files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
    rules: {
      '@stylistic/jsx-closing-bracket-location': 'off', // makes writing with clsx cleaner
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'comma',
            requireLast: true,
          },
          singleline: {
            delimiter: 'comma',
            requireLast: false,
          },
          multilineDetection: 'brackets',
        },
      ],
    },
  },
]
