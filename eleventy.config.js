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
  eleventyConfig.setLiquidOptions(require('./lib/libraries/liquid.js'));

  // Plugins
  eleventyConfig.addPlugin(require('@jgarber/eleventy-plugin-markdown'), {
    plugins: [
      [require('markdown-it-anchor'), { tabIndex: false }],
      require('markdown-it-attrs')
    ]
  });

  eleventyConfig.addPlugin(require('@jgarber/eleventy-plugin-sass'), sass => {
    return {
      sassOptions: {
        functions: {
          'font-url($path)': arguments_ => {
            const path = arguments_[0].assertString('path').text;

            return new sass.SassString(`url("/assets/fonts/${path}")`, {
              quotes: false
            });
          }
        },
        style: 'compressed'
      }
    };
  });

  return {
    dir: {
      input: './src'
    }
  };
};
