module.exports = {
  // eslint 적용 최종루트. 모듈 내에서 Root : false 적용 시 상속개념으로 동작.
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    // parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', 'prettier'],
  // tsLint 무시할 폴더 지정
  ignorePatterns: ['dist', '**/lib/*.*'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
        trailingComma: 'none',
        printWidth: 80,
        bracketSpacing: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        // 화살표 함수 괄호 사용 방식
        /*
            "always" - Always include parens. Example: (x) => x
            "avoid" - Omit parens when possible. Example: x => x
          */
        arrowParens: 'avoid'
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-multiple-template-root': 0,
    // 세미콜론 허용여부
    semi: ['error', 'always'],
    // 세미콜론 빈공간 허용 여부 - https://eslint.org/docs/rules/semi-spacing
    'semi-spacing': ['error', { before: false, after: true }],
    // block 이전 빈공간
    'space-before-blocks': 'error',
    // indent는 2로 고정 (for prettier)
    indent: ['error', 2, { SwitchCase: 1 }],
    // vue html에 바인딩되는 vuejs 변수 this 허용여부
    'vue/this-in-template': ['error', 'never'],
    // 허용되는 빈 줄 개수
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    // 줄 끝 부분 빈 공간 허용 여부
    'no-trailing-spaces': 'error',
    // () 사이에 빈 공간 허용여부
    'space-in-parens': ['error', 'never'],
    // quote가 single / double 여부
    quotes: ['error', 'single'],
    // 미사용 변수 사용 시 에러 - https://github.com/typescript-eslint/typescript-eslint/blob/v2.34.0/packages/eslint-plugin/docs/rules/no-unused-vars.md
    // '@typescript-eslint/no-unused-vars': ['warn'],
    // '@typescript-eslint/camelcase': 'off',
    'no-unused-vars': 'off'
    // return any 허용여부
    // '@typescript-eslint/no-explicit-any': 'off',
    // param any 허용여부
    // '@typescript-eslint/explicit-module-boundary-types': 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/e2e/specs/**',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      excludedFiles: '*.test.js',
      env: {
        mocha: true
      }
    }
  ]
};
