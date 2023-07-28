const config = require('@jgarber/eslint-config');
const globals = require('globals');

module.exports = [
  ...config,
  {
    ignores: ['_site/*']
  },
  {
    files: ['src/assets/javascripts/**/*.js'],
    languageOptions: {
      globals: globals.browser
    }
  }
];
