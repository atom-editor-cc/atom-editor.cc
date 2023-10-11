module.exports = function(eleventyConfig) {
  // Collections
  eleventyConfig.addCollection('allPostsByYear', collection => {
    const allPostsByYear = {};
    const posts = collection.getFilteredByGlob('./src/_posts/**/*.md');

    for (const post of posts) {
      const year = post.date.getFullYear();

      if (!allPostsByYear[year]) {
        allPostsByYear[year] = [];
      }

      allPostsByYear[year].push(post);
    }

    return allPostsByYear;
  });

  // Data
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!--more-->'
  });

  // Passthrough File Copy
  eleventyConfig
    .addPassthroughCopy('./src/*.{ico,txt}')
    .addPassthroughCopy('./src/assets/images')
    .addPassthroughCopy('./src/assets/javascripts')
    .addPassthroughCopy('./src/assets/videos')
    .addPassthroughCopy({
      './node_modules/octicons/octicons/octicons.{eot,svg,ttf,woff}': 'assets/fonts'
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
