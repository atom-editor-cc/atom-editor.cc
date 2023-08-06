module.exports = function(eleventyConfig) {
  // Passthrough File Copy
  eleventyConfig
    .addPassthroughCopy('./src/*.{ico,txt}')
    .addPassthroughCopy('./src/assets/images')
    .addPassthroughCopy('./src/assets/javascripts')
    .addPassthroughCopy('./src/assets/videos')
    .addPassthroughCopy({
      './node_modules/octicons/octicons/octicons.{eot,svg,ttf,woff}': 'assets/fonts'
    });

  // Data
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!--more-->'
  });

  // Libraries
  eleventyConfig.setLibrary('md', require('./lib/libraries/markdown.js'));
  eleventyConfig.setLiquidOptions(require('./lib/libraries/liquid.js'));

  // Filters
  eleventyConfig.addFilter('markdown', require('./lib/filters/markdown.js'));

  // Plugins
  eleventyConfig.addPlugin(require('./lib/plugins/sass.js'));

  return {
    dir: {
      input: './src'
    }
  };
};
