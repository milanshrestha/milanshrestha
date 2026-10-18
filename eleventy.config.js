// eleventy.config.ts
function eleventy_config_default(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    images: "images",
    "src/styles": "styles"
  });
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  eleventyConfig.addFilter("date", (value, format) => {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return String(value);
    return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  });
  eleventyConfig.addCollection("articles", (collection) => {
    return collection.getFilteredByGlob("./src/articles/*.md").filter((article) => article.data.status === "published");
  });
  eleventyConfig.addCollection("projects", (collection) => {
    return collection.getFilteredByGlob("./src/projects/*.md").filter((p) => p.data.sortOrder != null);
  });
  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
}
export {
  eleventy_config_default as default
};
