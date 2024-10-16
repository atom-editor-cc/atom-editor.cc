import eleventyPluginLiquid from "@jgarber/eleventy-plugin-liquid";
import eleventyPluginMarkdown from "@jgarber/eleventy-plugin-markdown";
import eleventyPluginSass from "@jgarber/eleventy-plugin-sass";

import markdownItAnchor from "markdown-it-anchor";
import markdownItAttrs from "markdown-it-attrs";

export default function(eleventyConfig) {
  // Collections
  eleventyConfig.addCollection("allPostsByYear", (collection) => {
    const allPostsByYear = {};
    const posts = collection.getFilteredByGlob("./src/_posts/**/*.md");

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
    excerpt_separator: "<!--more-->",
  });

  // Passthrough File Copy
  eleventyConfig
    .addPassthroughCopy("./src/*.{ico,txt}")
    .addPassthroughCopy("./src/assets/images")
    .addPassthroughCopy("./src/assets/javascripts")
    .addPassthroughCopy("./src/assets/videos")
    .addPassthroughCopy({
      "./node_modules/octicons/octicons/octicons.{eot,svg,ttf,woff}": "assets/fonts",
    });

  // Plugins
  eleventyConfig.addPlugin(eleventyPluginLiquid);

  eleventyConfig.addPlugin(eleventyPluginMarkdown, {
    plugins: [
      [markdownItAnchor, { tabIndex: false }],
      markdownItAttrs,
    ],
  });

  eleventyConfig.addPlugin(eleventyPluginSass, (sass) => {
    return {
      sassOptions: {
        functions: {
          "font-url($path)": (args) => {
            const path = args[0].assertString("path").text;

            return new sass.SassString(`url("/assets/fonts/${path}")`, {
              quotes: false,
            });
          },
        },
        style: "compressed",
      },
    };
  });
}

export const config = {
  dir: {
    input: "./src",
  },
};
