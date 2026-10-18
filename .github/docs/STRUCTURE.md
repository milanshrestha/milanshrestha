# STRUCTURE.md - Architecture & Navigation

## 1. Purpose

This document defines the website's information architecture, page hierarchy, navigation, and content organization.

The website is a personal and professional platform built around three connected themes:

* **Identity:** Who I am, my professional journey, and how I think.

* **Articles:** Ideas, experiences, reflections, and knowledge worth sharing.

* **Projects:** Practical work that demonstrates how I approach problems and turn ideas into solutions.

The website should communicate professional credibility without feeling like a conventional corporate portfolio.

The `README.md` file in this project directory is the starting point for personal and professional content. The website should organize and present that content more effectively without inventing biographical details, achievements, or project claims.

`DESIGN.md` defines the visual presentation. This document defines the structure and purpose of each page.

***

## 2. Primary Navigation

The primary navigation consists of:

* Home

* About

* Blog

* Projects

* Contact

* Search

### Navigation rules

* Keep the navigation simple and consistent across the website.

* Use the same destinations in the header and footer where appropriate.

* Make the current page or section identifiable.

* Provide a responsive mobile navigation menu.

* Search may be presented as an icon, navigation item, or dedicated interface.

* Do not add navigation items solely to fill available space.

***

## 3. Page Hierarchy

| Page           | Proposed URL                  | Purpose                                                 |
| -------------- | ----------------------------- | ------------------------------------------------------- |
| Home           | `/`                           | Introduce the person and highlight selected content     |
| About          | `/about`                      | Present professional identity, journey, and perspective |
| Blog           | `/blog`                       | Display published articles                              |
| Single Post    | `/blog/[slug]`                | Present an individual article                           |
| Projects       | `/projects`                   | Showcase selected projects and practical work           |
| Single Project | `/projects/[slug]`            | Explain an individual project or case study             |
| Contact        | `/contact`                    | Provide selected professional contact channels          |
| Search         | `/search` or search interface | Help visitors discover relevant content                 |
| Not Found      | Application-defined           | Handle unavailable pages and invalid URLs               |

These are proposed routes, not a requirement to replace existing routes. Existing application architecture and established URLs must be inspected before implementation.

***

## 4. Homepage

**Purpose:** Establish identity, communicate professional direction, and guide visitors toward articles and projects.

### Section order

1. Header and primary navigation

2. Hero and professional introduction

3. Selected articles

4. Selected projects

5. Professional summary or philosophy

6. Contact call to action

7. Footer

### 4.1 Hero

The hero should introduce the person behind the website.

Potential content drawn from the existing README:

* Name and professional title

* Short professional introduction

* Personal or professional philosophy

* Profile image, if available

* Links to relevant sections of the website

The existing professional positioning, "Technology Professional | Product Builder | Systems Thinker", may be used if it remains consistent with the source README.

The introduction should communicate the relationship between technology, practical problem-solving, and business without making unsupported claims.

### 4.2 Selected articles

* Display a small selection of recent or featured published articles.

* Include article titles and short descriptions where available.

* Link each card to its corresponding article.

* Provide a link to the complete Blog collection.

* Hide the section when no suitable articles are available.

### 4.3 Selected projects

* Feature relevant projects from the existing README and project documentation.

* Consider current professional work and relevant experiments where their descriptions and current status support inclusion.

* Display a concise description and a link to further details.

* Provide a link to the complete Projects collection.

* Do not imply that a project is finished, deployed, or publicly available unless confirmed.

### 4.4 Professional summary

Present a concise summary of professional experience, interests, and perspective.

The homepage should introduce these ideas rather than reproduce the entire About page.

### 4.5 Contact call to action

Provide a clear way to reach the Contact page or an appropriate professional profile.

Avoid adding a contact form unless its implementation is justified.

***

## 5. About Page

**URL:** `/about`

**Purpose:** Provide a fuller understanding of the person's background, professional direction, and approach to technology and work.

### Potential sections

1. Personal and professional introduction

2. Professional journey

3. Experience and responsibilities

4. Interests and areas of focus

5. Professional philosophy

6. Current learning and direction

7. Relevant external profiles

### Content principles

* Use the existing README as the primary source for established personal and professional information.

* Preserve the author's natural voice and intended meaning.

* Present professional experience accurately.

* Distinguish existing experience from future goals.

* Do not invent qualifications, job titles, achievements, or expertise.

* Avoid duplicating the entire homepage introduction.

* Include only sections supported by available source material.

The About page should explain the person's professional identity, not function as an exhaustive résumé.

***

## 6. Blog Collection

**URL:** `/blog`

**Purpose:** Provide a central place to discover and explore published writing.

### Required elements

* Page title and optional introduction

* Article collection

* Article titles

* Publication dates, where available

* Category labels, where applicable

* Pagination or incremental loading when needed

### Optional elements

* Search

* Category filters

* Tag filters

* Featured article

* Sidebar with categories and recent articles

### Article collection behavior

* Display published articles only.

* Link each article to its individual page.

* Support additional content without requiring a layout redesign.

* Use pagination or incremental loading for larger collections.

* Provide an appropriate empty state when no articles are available.

* Preserve relevant search and filter state where practical.

* Avoid displaying placeholder articles in production.

### Content distinction

The GitHub README provides source material for the website's identity and existing work. It should not automatically be divided into blog posts.

The Blog section is intended for individual articles that the author chooses to publish.

***

## 7. Single Post Page

**URL:** `/blog/[slug]`

**Purpose:** Present an individual article in a readable, focused format.

### Content hierarchy

1. Breadcrumb or return link

2. Category or topic, if applicable

3. Article title

4. Publication date and optional updated date

5. Optional excerpt or introduction

6. Featured image, if appropriate

7. Article body

8. Tags, if applicable

9. Author information, where useful

10. Related articles or previous/next navigation

### Content behavior

* Every article must have a unique, stable slug.

* Article metadata must be distinguishable from the article body.

* Images must have appropriate alternative text.

* Related articles must link to valid published content.

* Missing or unpublished articles must not appear as publicly accessible posts.

* Invalid article routes must use the application's not-found behavior.

### Reading experience

Follow the reading-width, typography, spacing, and responsive requirements in `DESIGN.md`.

The article body must remain the primary focus of the page. Optional sidebars must not compromise readability.

***

## 8. Projects Collection

**URL:** `/projects`

**Purpose:** Showcase selected work that demonstrates practical capabilities, problem-solving, and product thinking.

Projects may include software products, websites, technical implementations, experiments, case studies, or other relevant work.

### Project card information

Where applicable, a project card may contain:

* Project title

* Short description

* Image or screenshot

* Project category

* Role or contribution

* Current status

* Link to project details

* External repository or live-project link

Not every field is required for every project.

### Project selection

Use projects supported by the existing README, repositories, or other available project documentation.

Potential candidates include relevant full-stack development work, AI integration experiments, and implementations that demonstrate systems thinking.

Do not automatically include every tool, experiment, or repository. Prioritize relevance and substance.

***

## 9. Single Project Page

**URL:** `/projects/[slug]`

**Purpose:** Explain an individual project and the thinking or work behind it.

### Suggested content hierarchy

1. Project title

2. Short overview

3. Project image or screenshot, if available

4. Problem or objective

5. Approach and contribution

6. Relevant tools and technologies

7. Outcome or lessons learned

8. Current status

9. Related articles or resources

10. External repository or live-project link, if available

### Content principles

* Explain the project in terms of its purpose and practical value.

* Distinguish personal contributions from team contributions.

* Do not claim measurable results without supporting evidence.

* Represent project status accurately.

* Allow smaller experiments to use a shorter structure than substantial case studies.

* Omit unavailable information instead of displaying empty fields.

A project page should demonstrate how the work was approached, not merely list technologies used.

***

## 10. Contact Page

**URL:** `/contact`

**Purpose:** Provide appropriate professional contact options.

### Potential content

* Brief invitation to connect

* Professional email address, if intentionally published

* GitHub profile

* Relevant professional or social profiles

* Optional contact form

### Rules

* Publish only contact details intended for public use.

* Use direct links to verified external profiles.

* Do not expose private credentials or sensitive information.

* A contact form is optional and requires appropriate validation, submission handling, and privacy considerations.

* Do not create a form that appears functional but cannot deliver messages.

***

## 11. Shared Components

The following components may be reused across the website:

* Header

* Primary navigation

* Footer

* Page container

* Article card

* Project card

* Search interface

* Category and tag links

* Breadcrumbs

* Pagination

* Empty-state message

* Not-found page

### Component principles

* Reuse common components wherever appropriate.

* Keep shared navigation consistent across pages.

* Separate page-specific content from shared layout elements.

* Avoid duplicating the same component implementation unnecessarily.

* Follow the visual rules defined in `DESIGN.md`.

* Adapt component implementation to the existing project architecture.

***

## 12. Content Relationships

The website should support the following relationships:

* The homepage links to selected articles and projects.

* The About page provides context for the professional identity introduced on the homepage.

* The Blog page links to individual articles.

* The Projects page links to individual project pages.

* Categories group related articles.

* Tags may connect articles across different categories.

* Related articles link to relevant published content.

* Project pages may link to related articles or external resources.

* Contact options remain accessible through appropriate navigation or footer links.

Only introduce relationships that are useful for actual content. Do not create empty categories, tags, or related-content sections merely to complete the structure.

***

## 13. URL and Routing Rules

* Use descriptive, readable URLs.

* Use unique and stable slugs for articles and projects.

* Avoid duplicate public URLs for the same content.

* Preserve existing URLs when modifying an established website unless a migration is explicitly planned.

* Define appropriate behavior for missing pages and unavailable content.

* Ensure internal links point to valid destinations.

* Add redirects when approved URL changes would otherwise break existing links.

* Follow the routing conventions of the existing application.

***

## 14. Responsive Behavior

The logical page hierarchy must remain consistent across screen sizes.

### Desktop

* Display the full primary navigation.

* Use multi-column grids where appropriate.

* Display the sidebar when it adds meaningful value.

* Maintain comfortable article reading widths.

### Tablet

* Reduce grid density as needed.

* Preserve readable text widths.

* Move the sidebar when the main content becomes constrained.

### Mobile

* Use a compact, accessible navigation menu.

* Stack hero content and cards vertically.

* Move the sidebar below primary content or omit redundant elements.

* Keep important content and navigation accessible.

* Prevent horizontal scrolling.

Detailed responsive specifications are defined in `DESIGN.md`.

***

## 15. Future Expansion

The following features may be introduced if justified by the website's needs:

* Dedicated category pages

* Dedicated tag pages

* Search and advanced filtering

* RSS feed

* Sitemap

* Newsletter subscription

* Additional languages

* Project-specific filtering

These are optional extensions, not mandatory initial features.

Avoid introducing complexity before there is sufficient content or a clear use case.

***

## 16. Implementation Constraints

* Inspect the existing repository before changing its routing or component structure.

* Preserve working functionality unless a change is explicitly justified.

* Use the existing README and verified project documentation as content sources.

* Do not invent biography, project details, achievements, or technical claims.

* Keep content organization separate from visual design decisions.

* Follow `DESIGN.md` for presentation and responsive behavior.

* Defer detailed content fields and data relationships to `CONTENT_MODEL.md`.

* Defer technology choices and implementation decisions to `TECHNICAL_SPEC.md`.

This document defines intended website structure. It does not authorize a framework change, database migration, or unnecessary rewrite.

***

## 17. Acceptance Criteria

The site structure is ready for implementation when:

* Every planned page has a defined purpose.

* Each page has a proposed URL or routing pattern.

* Navigation destinations are consistent.

* Homepage sections support identity, articles, and projects.

* Article and project collections link to their individual pages.

* Content relationships are clear.

* Empty states and invalid routes have defined behavior.

* Responsive requirements preserve the intended hierarchy.

* Existing routes and functionality have been considered.

* Personal and professional content remains grounded in the source material.

***

## 18. Related Documentation

* `README.md` — Existing personal and professional source content.

* `DESIGN.md` — Layout, colors, typography, spacing, responsiveness, and accessibility.

* `CONTENT_MODEL.md` — To be defined after approval of this site structure.

* `TECHNICAL_SPEC.md` — Technology stack and implementation architecture.

* `IMPLEMENTATION_PLAN.md` — Development milestones and verification.

**Status:** Proposed site structure, awaiting review and approval before defining the content model.
