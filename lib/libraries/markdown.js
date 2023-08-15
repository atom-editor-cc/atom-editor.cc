const markdown = require('markdown-it');

module.exports = (() => {
  const options = {
    breaks: true,
    html: true,
    typographer: true
  };

  const parser = markdown(options);

  parser
    .use(require('markdown-it-anchor'), {
      tabIndex: false
    })
    .use(require('markdown-it-attrs'));

  return parser;
})();
