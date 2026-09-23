module.exports = function (eleventyConfig) {
  // Static assets copied as-is into the built site
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");

  // Article collection, newest first
  eleventyConfig.addCollection("articles", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/articles/*.md").sort((a, b) => {
      return b.data.date - a.data.date;
    });
  });

  // Human-readable date, e.g. "23 September 2026"
  eleventyConfig.addFilter("readableDate", function (dateObj) {
    const d = new Date(dateObj);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  });

  // Today's date at build time, for the masthead dateline
  eleventyConfig.addGlobalData("buildDate", () => new Date());

  // Given the full articles collection, return { lead, secondaries }.
  // Lead = the article marked featured: true, or the most recent one.
  // Secondaries = the next 4 most recent, excluding the lead.
  eleventyConfig.addFilter("frontPage", function (arr) {
    const all = arr || [];
    const lead = all.find((item) => item.data && item.data.featured) || all[0] || null;
    const secondaries = all.filter((item) => !lead || item.url !== lead.url).slice(0, 3);
    return { lead, secondaries };
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
