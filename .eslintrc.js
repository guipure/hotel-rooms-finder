module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
    'plugin:fsd/all',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'import/no-cycle': 'off',
    'no-use-before-define': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'import/order': ['error', {
      groups: [['builtin', 'external'], 'internal', ['parent', 'sibling'], 'index'],
      'newlines-between': 'always',
    }],
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'no-undef': 'off',
    'no-param-reassign': 'off',
    'class-methods-use-this': 'off',
  },
  settings: {
    'import/resolver': {
      webpack,
    },
  },
};
