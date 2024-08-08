import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  {
    ignores: ['/node_modules/*', '/dist/*', '/.next/*'],
    languageOptions: { globals: globals.node },
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
]
