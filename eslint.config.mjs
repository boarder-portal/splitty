import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';

const eslintConfig = defineConfig([
  ...nextVitals,
  prettier,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      import: importPlugin,
    },
    linterOptions: {
      // Нужно для того, чтобы eslint --fix не удалял директивы о выключении react-hooks/todo в файле.
      // Даже если директива бесполезна, она может говорить, что в файле нельзя убирать useMemo/useCallback по другой причине,
      // например, если в файле нарушены правила хуков и react-compiler не будет оптимзировать файл по этой причине.
      reportUnusedDisableDirectives: false,
    },
  },
  {
    rules: {
      'prefer-const': 'warn',

      'react/jsx-no-undef': 'off',

      'react-hooks/refs': 'warn',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
      // https://github.com/facebook/react/blob/3640f38/compiler/packages/babel-plugin-react-compiler/src/CompilerError.ts#L807-L1111
      'react-hooks/todo': 'error',

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: ['return', 'block', 'block-like', 'break', 'continue'],
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: ['return', 'block', 'block-like', 'break', 'continue'],
        },
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'],
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: ['const', 'let', 'var'],
        },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        {
          blankLine: 'any',
          prev: 'case',
          next: ['case', 'default'],
        },
        {
          blankLine: 'always',
          prev: 'import',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'import',
        },
        {
          blankLine: 'any',
          prev: 'import',
          next: 'import',
        },
      ],
    },
  },
  globalIgnores(['.next/**', 'next-env.d.ts', 'src/generated/**']),
]);

export default eslintConfig;
