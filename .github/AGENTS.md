# AGENTS.md - Guides & Instructions

## Project Purpose

This document provides instructions for AI agents working on this personal portfolio website project.

## Project Context

This is a personal portfolio website. The `../README.md` file in this project directory contains the content source for the website.

## Implementation Approach

Follow the phased plan in `./docs/PLAN.md`:

1. **Documentation phase**: Review all project documents (`./docs/DESIGN.md`, `./docs/STRUCTURE.md`, `./docs/CONTENT.md`, `./docs/SPECS.md`, `./docs/PLAN.md`)
2. **Content phase**: Extract and prepare content from `../README.md`, create mock-up articles for the Blog section
3. **Build phase**: Implement using 11ty with TypeScript, following the technical specifications in `./docs/SPECS.md`
  - Eleventy Documentation - `https://www.11ty.dev/docs/`
  - TypeScript Documentation - `https://www.typescriptlang.org/docs/`
  - Github Pages Documentation - `https://docs.github.com/en/pages/`

## Web Content

- Use text content from `./docs/CONTENT.md` for structured content definitions
- Extract profile and project information from the `../README.md` file in this project directory
- Create mock-up articles for the Blog section since no published content exists yet
- Refer to `../images/` directory for images (create if not present)
- Support categories and tags for article classification
- Implement navigation items per `./docs/STRUCTURE.md`

## Web Design

- Follow the design principles in `./docs/DESIGN.md`:
  - Clean, editorial aesthetic
  - Generous white-space, neutral backgrounds, strong typography
  - Accessibility first (readable text, sufficient contrast, keyboard navigation, responsive layouts)
  - Single primary accent color
  - Mobile menu for responsive navigation
  - Search interface in navigation

## Technical Requirements

- Use 11ty with TypeScript (per `./docs/SPECS.md`)
- Static-first approach with pre-rendered pages
- Host on GitHub Pages with CI/CD workflow
- Search functionality in navigation
- Contact page with professional links only (no contact form)

## Deliverables

The website should include:
- Home page with personal introduction, featured content, and contact CTA
- About page with professional background and perspective
- Blog section with mock-up articles (no published content yet)
- Project showcase page with case studies
- Contact page (links only, no contact form)
- Search functionality in navigation & sidebar
- Category and tag filtering for articles

## Important Notes

- Do not invent facts or change the author's intended meaning
- Articles and Projects sections can be empty initially with placeholder content
- Categories and tags are optional - don't create empty ones merely to complete structure
- Contact page should only contain professional links, no form implementation
- Search must be lightweight and appropriate for a static-first website
- All five project documents must be followed: `./docs/DESIGN.md`, `./docs/STRUCTURE.md`, `./docs/CONTENT.md`, `./docs/SPECS.md`, `./docs/PLAN.md`
