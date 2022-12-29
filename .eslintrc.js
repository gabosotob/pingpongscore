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
    'no-unused-expressions': [
      'error',
      { allowTernary: true, allowShortCircuit: true },
    ],
    'no-param-reassign': ['error', { props: false }],
    'arrow-parens': ['error', 'as-needed'],
    'no-plusplus': 'off',
    'linebreak-style': ['error', 'windows'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
  },
};
