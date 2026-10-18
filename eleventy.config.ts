// TypeScript Eleventy configuration
// This replaces the legacy .eleventy.js CommonJS configuration.
// The build pipeline transpiles TS to JS before Eleventy loads it.
import type { UserConfig } from "@11ty/eleventy";

export default function (eleventyConfig: import("@11ty/eleventy").EleventyConfig): UserConfig {
  // Copy static assets to the output directory
  eleventyConfig.addPassthroughCopy({
    images: "images",
    "src/styles": "styles",
  });

  // Custom filter to format article dates (publishedAt → date)
  const MONTHS = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  eleventyConfig.addFilter("date", (value: string | Date, format?: string) => {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return String(value);
    return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  });

  // Register custom 11ty collection for published articles & projects
  eleventyConfig.addCollection("articles", (collection) => {
    return collection
      .getFilteredByGlob("./src/articles/*.md")
      .filter((article) => article.data.status === "published");
  });

  eleventyConfig.addCollection("projects", (collection) => {
    return collection
      .getFilteredByGlob("./src/projects/*.md")
      .filter((p) => p.data.sortOrder != null);
  });

  // Configure the input and output directories
  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
}
