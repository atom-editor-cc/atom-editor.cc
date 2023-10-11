const config = require('@jgarber/eslint-config');

module.exports = [
  ...config,
  {
    ignores: ['_site/*']
  },
  {
    files: ['src/assets/javascripts/*.js'],
    languageOptions: {
      globals: {
        document: 'readonly'
      }
    }
  }
];
