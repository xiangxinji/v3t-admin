module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-mixed-operators' : 'off',
    '@typescript-eslint/ban-types' : 'off',
    'max-len' : [2 , 200] ,
    'no-useless-return' : 'off',
    '@typescript-eslint/explicit-module-boundary-types' : 'off',
    'import/prefer-default-export' : 'off',
    'no-param-reassign' : 'off',
    'no-plusplus' : 'off',
    '@typescript-eslint/no-explicit-any':'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
