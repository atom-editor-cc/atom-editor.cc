module.exports = function(eleventyConfig) {
  // Passthrough File Copy
  eleventyConfig
    .addPassthroughCopy('./src/*.{ico,txt}')
    .addPassthroughCopy('./src/assets/images')
    .addPassthroughCopy('./src/assets/javascripts')
    .addPassthroughCopy('./src/assets/octicons')
    .addPassthroughCopy('./src/assets/videos');

  // Plugins
  eleventyConfig.addPlugin(require('./lib/plugins/sass.js'));

  return {
    dir: {
      input: './src'
    }
  };
};
