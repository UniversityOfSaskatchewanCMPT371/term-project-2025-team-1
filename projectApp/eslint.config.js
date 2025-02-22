import js from '@eslint/js'
import eslint from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [eslint.configs.recommended, 
      tseslint.configs.recommendedTypeChecked,{
        languageOptions: {
          parserOptions: {
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
          }
        }
      },
      tseslint.configs.strictTypeChecked, 
      tseslint.configs.stylisticTypeChecked
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        XRSession: 'readonly',
        navigator: 'readonly',
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-explicit-any" : "off",
      "@typescript-eslint/no-unused-vars" : "warn",
      "@typescript-eslint/no-floating-promises" : "warn",
      "@typescript-eslint/no-unsafe-member-access" : "warn",
      "@typescript-eslint/prefer-reduce-type-parameter": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-misused-promises": "warn",
      "@typescript-eslint/no-base-to-string": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/restrict-template-expressions": "warn",
    },
  },
)
