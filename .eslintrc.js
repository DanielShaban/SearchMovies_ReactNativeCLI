module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    // 'eslint-plugin-prettie'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    // 'eslint-plugin-prettier',
    // 'plugin:prettier/recommended',
    // 'react'
    // 'prettier',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-use-before-define': ['error', { functions: true, classes: true, variables: false }],
    'react/prop-types': 'off',
    'object-curly-newline': 'off',
    // 'prettier/prettier': 'error',
    // 'prettier/prettier': ['error'],
  },
};
