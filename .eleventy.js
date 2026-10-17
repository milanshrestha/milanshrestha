module.exports = function(eleventyConfig) {
  // Copy static assets to the output directory
  eleventyConfig.addPassthroughCopy("site/primer.css");
  eleventyConfig.addPassthroughCopy({ images: "images" });

  // Configure the input and output directories
  return {
    dir: {
      input: "site",
      output: "_site"
    }
  };
};
