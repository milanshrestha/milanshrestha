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

  eleventyConfig.addFilter("slugify", (str: string) => {
    if (!str) return "";
    return str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  });

  eleventyConfig.addCollection("categories", (collection) => {
    const categoriesSet = new Set<string>();
    collection.getFilteredByGlob("./src/articles/*.md").forEach((article: any) => {
      if (article.data.status === "published" && article.data.categories) {
        article.data.categories.forEach((cat: string) => categoriesSet.add(cat));
      }
    });
    return Array.from(categoriesSet);
  });

  eleventyConfig.addCollection("tags", (collection) => {
    const tagsSet = new Set<string>();
    collection.getFilteredByGlob("./src/articles/*.md").forEach((article: any) => {
      if (article.data.status === "published" && article.data.tags) {
        article.data.tags.forEach((tag: string) => tagsSet.add(tag));
      }
    });
    return Array.from(tagsSet);
  });

  eleventyConfig.addFilter("filterByCategory", (articles: any[], category: string) => {
    if (!articles) return [];
    return articles.filter((article) => 
      article.data.categories && article.data.categories.includes(category)
    );
  });

  eleventyConfig.addFilter("filterByTag", (articles: any[], tag: string) => {
    if (!articles) return [];
    return articles.filter((article) => 
      article.data.tags && article.data.tags.includes(tag)
    );
  });

  eleventyConfig.addFilter("readingTime", (text: string) => {
    if (!text) return "1 min read";
    const cleanText = text.replace(/<[^>]*>/g, "");
    const words = cleanText.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  });

  eleventyConfig.addFilter("relatedArticles", (allArticles: any[], currentArticle: any) => {
    if (!allArticles || !currentArticle) return [];
    const currentSlug = currentArticle.data.slug;
    const currentCategories = currentArticle.data.categories || [];
    const currentTags = currentArticle.data.tags || [];

    const others = allArticles.filter(a => a.data.slug !== currentSlug);
    
    const scored = others.map(a => {
      let score = 0;
      const aCats = a.data.categories || [];
      const aTags = a.data.tags || [];
      
      currentCategories.forEach(c => {
        if (aCats.includes(c)) score += 3;
      });
      currentTags.forEach(t => {
        if (aTags.includes(t)) score += 1;
      });
      
      return { article: a, score };
    });

    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.article.data.publishedAt || 0).getTime() - new Date(a.article.data.publishedAt || 0).getTime();
    });

    return scored.slice(0, 3).map(s => s.article);
  });

  eleventyConfig.addFilter("prevNextArticles", (allArticles: any[], currentSlug: string) => {
    if (!allArticles) return { prev: null, next: null };
    const sorted = [...allArticles].sort((a, b) => 
      new Date(a.data.publishedAt || 0).getTime() - new Date(b.data.publishedAt || 0).getTime()
    );
    const index = sorted.findIndex(a => a.data.slug === currentSlug);
    if (index === -1) return { prev: null, next: null };
    
    return {
      prev: index > 0 ? sorted[index - 1] : null,
      next: index < sorted.length - 1 ? sorted[index + 1] : null
    };
  });

  // Configure the input and output directories
  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
}
