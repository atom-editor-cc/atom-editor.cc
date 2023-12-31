const path = require('node:path');
const sass = require('sass');

module.exports = function(eleventyConfig) {
  eleventyConfig.addTemplateFormats('scss');

  eleventyConfig.addExtension('scss', {
    outputFileExtension: 'css',

    compile: (inputContent, inputPath) => {
      const parsed = path.parse(inputPath);

      if (parsed.name.startsWith('_')) {
        return;
      }

      const result = sass.compileString(inputContent, {
        functions: {
          'font-url($path)': $path => {
            return new sass.SassString(`url("/assets/fonts/${$path[0].text}")`, {
              quotes: false
            });
          }
        },
        loadPaths: [
          parsed.dir || '.',
          'node_modules'
        ]
      });

      return () => result.css;
    }
  });
};
