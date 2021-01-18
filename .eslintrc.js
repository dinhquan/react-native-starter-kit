module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'prettier/prettier': 'warn',
    'react-hooks/exhaustive-deps': 'off',
  },
};
