module.exports = function(eleventyConfig) {
  // Passthrough File Copy
  eleventyConfig
    .addPassthroughCopy('./src/*.{ico,txt}')
    .addPassthroughCopy('./src/addressfield.min.json')
    .addPassthroughCopy('./src/assets')
    .addPassthroughCopy('./src/images');

  return {
    dir: {
      input: './src'
    }
  };
};
