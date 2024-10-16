export default {
  layout: "layouts/post.liquid",
  permalink: `blog/{{ page.date | date: "%Y/%m/%d" }}/{{ page.fileSlug }}/`,
  tags: ["post"],
};
