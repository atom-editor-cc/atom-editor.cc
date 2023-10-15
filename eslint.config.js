const config = require('@jgarber/eslint-config');

module.exports = [
  {
    ignores: ['_site']
  },
  ...config,
  {
    files: ['src/assets/javascripts/*.js'],
    languageOptions: {
      globals: {
        document: 'readonly'
      }
    }
  }
];
