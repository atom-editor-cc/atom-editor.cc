const config = require('@jgarber/eslint-config');

module.exports = [
  ...config,
  {
    ignores: ['_site/*', 'src/assets/*']
  }
];