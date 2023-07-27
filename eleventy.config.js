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

  // Plugins
  eleventyConfig.addPlugin(require('./lib/plugins/sass.js'));

  return {
    dir: {
      input: './src'
    }
  };
};
