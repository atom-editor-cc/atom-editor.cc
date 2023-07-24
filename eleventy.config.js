module.exports = function(eleventyConfig) {
  // Passthrough File Copy
  eleventyConfig
    .addPassthroughCopy('./src/*.{ico,txt}')
    .addPassthroughCopy('./src/addressfield.min.json')
    .addPassthroughCopy('./src/assets')
    .addPassthroughCopy('./src/images')
    .addPassthroughCopy('./src/videos');

  return {
    dir: {
      input: './src'
    }
  };
};
