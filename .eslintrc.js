module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-unused-expressions': ['error', { allowTernary: true }],
    'arrow-parens': ['error', 'as-needed'],
    'linebreak-style': ['error', 'windows'],
  },
};
