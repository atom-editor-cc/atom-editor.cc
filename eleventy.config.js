module.exports = function(eleventyConfig) {
  // Passthrough File Copy
  eleventyConfig
    .addPassthroughCopy('./src/*.{ico,txt}')
    .addPassthroughCopy('./src/addressfield.min.json')
    .addPassthroughCopy('./src/assets');

  return {
    dir: {
      input: './src'
    }
  };
};
