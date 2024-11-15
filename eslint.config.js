import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  {
    ignores: ['dist', 'node_modules'], // Ignorar los directorios de dist y node_modules
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: '18.3' }, // Usar React 18
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // Reglas personalizadas
      'react/jsx-no-target-blank': 'off', // Desactivar la regla sobre enlaces sin target
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // Permitir exportaciones constantes
      ],
      'react/prop-types': 'off', // Desactivar la validación de prop-types (si usas TypeScript no es necesario)
      'no-unused-vars': 'warn', // Advertencia sobre variables no utilizadas
      'react/jsx-pascal-case': ['error', { allowAllCaps: true }], // Usar PascalCase para componentes
      'react/jsx-no-undef': 'error', // Asegurarse de que no hay variables no definidas en JSX
      'react/forbid-prop-types': ['warn', { forbid: ['any'] }], // Evitar el uso del tipo 'any' en los props
      'react/jsx-curly-brace-presence': ['error', { props: 'always', children: 'never' }], // Usar siempre llaves en las propiedades de JSX
    },
  },
]
