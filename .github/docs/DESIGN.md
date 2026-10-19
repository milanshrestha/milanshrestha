# DESIGN.md — Layout, Color & Typography

## 1. Design Philosophy

The website is a personal and professional portfolio site that brings together identity, skills, ideas, and practical work.

### Design principles

* **Identity:** Make it immediately clear who the website represents.
* **Clarity:** Use simple navigation, meaningful headings, and an uncluttered layout.
* **Content first:** Make articles and projects easy to discover and read.
* **Professionalism:** Prefer a restrained, consistent visual language over decorative effects.
* **Consistency:** Reuse the same design tokens and components across every page.
* **Accessibility:** Support readable text, sufficient contrast, keyboard navigation, and responsive layouts.

### Visual direction

Adopt a clean, editorial aesthetic inspired by modern personal websites and independent publications.

Use generous white-space, neutral backgrounds, strong typography, subtle borders, and a single primary accent color. Avoid unnecessary gradients, excessive shadows, distracting animations, and decorative elements that compete with the content.

***

## 2. Site Structure

### Primary navigation

* Home
* About
* Blog
* Projects
* Contact
* Search

The navigation should remain concise. On smaller screens, collapse it into an accessible mobile menu.

### Page templates

1. **Homepage:** Personal introduction, featured articles, selected projects, and a contact call to action.
2. **Blog collection:** Article grid, category filters, search, and pagination.
3. **Single post:** Article title, metadata, featured image, article body, and related content.
4. **About:** Professional background, interests, experience, and current direction.
5. **Projects:** Selected projects, case studies, experiments, and contributions.
6. **Contact:** Contact information and relevant professional links.

The About, Projects, and Contact pages can share common components and should be implemented as needed.

***

## 3. Page Layout Design

### 3.1 Homepage

```
┌─────────────────────────────────────────────────────┐
│ HEADER                                              │
│ Logo / Site Title       Navigation        Search    │
├─────────────────────────────────────────────────────┤
│ HERO                                                │
│                                                     │
│ Profile Image           Name                        │
│                         Professional Introduction   │
│                         Primary Call to Action      │
├─────────────────────────────────────────────────────┤
│ SELECTED ARTICLES                                   │
│ Section Heading                    View All Articles│
│                                                     │
│ Article Card       Article Card       Article Card  │
├─────────────────────────────────────────────────────┤
│ SELECTED PROJECTS                                   │
│ Section Heading                    View All Projects│
│                                                     │
│ Project Card       Project Card       Project Card  │
├─────────────────────────────────────────────────────┤
│ ABOUT / PROFESSIONAL SUMMARY                        │
│ Short Introduction                 Learn More       │
├─────────────────────────────────────────────────────┤
│ CONTACT CALL TO ACTION                              │
├─────────────────────────────────────────────────────┤
│ FOOTER                                              │
└─────────────────────────────────────────────────────┘
```

**Layout requirements**

* Place the hero immediately below the header.
* Introduce the person through a short, clear statement.
* Feature three recent or selected articles.
* Feature two or three projects when suitable content exists.
* Include a concise professional summary and a clear contact link.
* Do not display empty sections or placeholder cards when content is unavailable.
* Keep the homepage focused rather than reproducing the entire blog or portfolio.

### 3.2 Blog collection page

```
┌─────────────────────────────────────────────────────┐
│ HEADER                                              │
├─────────────────────────────────────────────────────┤
│ PAGE TITLE: Blog                                    │
│ Short Introduction                                  │
│ Search Articles                  Category Filter    │
├───────────────────────────────────┬─────────────────┤
│ ARTICLE COLLECTION                │ SIDEBAR         │
│                                   │                 │
│ Article Card   Article Card       │ Search          │
│ Article Card   Article Card       │ Categories      │
│ Article Card   Article Card       │ Recent Articles │
│ Article Card   Article Card       │                 │
│                                   │ Optional        │
│ Pagination / Load More            │ Promotion       │
├───────────────────────────────────┴─────────────────┤
│ FOOTER                                              │
└─────────────────────────────────────────────────────┘
```

**Layout requirements**

* Use a two-column desktop layout with the article collection as the dominant column.
* Use a two-column card grid on desktop and a single-column card list on mobile.
* Show approximately 6–12 articles per page, depending on card density.
* Use pagination or a Load More control for additional articles.
* Display five to ten recent articles in the sidebar rather than all articles.
* Keep categories and tags distinct: categories represent broad topics, while tags identify more specific subjects.
* Make the sidebar optional and remove it when it does not provide meaningful value.

### 3.3 Single post page

```
┌─────────────────────────────────────────────────────┐
│ HEADER                                              │
├─────────────────────────────────────────────────────┤
│ BREADCRUMB                                          │
├───────────────────────────────────┬─────────────────┤
│ ARTICLE                           │ SIDEBAR         │
│                                   │                 │
│ Category / Publication Date       │ Search          │
│ Article Title                     │ Categories      │
│ Short Introduction (Optional)     │ Related Posts   │
│                                   │                 │
│ Featured Image                    │                 │
│                                   │                 │
│ Article Body                      │                 │
│                                   │                 │
│ Article Body                      │                 │
│                                   │                 │
│ Tags / Author / Sharing           │                 │
├───────────────────────────────────┴─────────────────┤
│ RELATED ARTICLES                                    │
├─────────────────────────────────────────────────────┤
│ FOOTER                                              │
└─────────────────────────────────────────────────────┘
```

**Layout requirements**

* Prioritize the article title, featured image, and body.
* Keep the article text column approximately 650–760 CSS pixels wide on desktop.
* Use a wider overall content container when including a sidebar.
* Display publication date and update date when relevant.
* Include an author byline when appropriate.
* Provide related articles and previous/next navigation when useful.
* Hide the sidebar on smaller screens or move it below the article.
* Preserve a comfortable reading width regardless of screen size.

### 3.4 Projects page

Use the same visual language as the blog, but adapt the cards to communicate outcomes and capabilities.

Each project card may include:

* Project title
* Short description
* Cover image or screenshot
* Project category or status
* Key contribution or role
* Link to a case study, live project, or repository

Do not force every project into the same information structure if some are experiments, some are ongoing work, and others are completed products.

***

## 4. Shared Component Design

### 4.1 Header

```
┌──────────────────────────────────────────────────────────────────┐
│ Logo | Site Title    | Home Blog Projects About Contact | Search │
│      | Short Tagline |                                  |        │
└──────────────────────────────────────────────────────────────────┘
```

* Use a four-column layout on desktop.
* Align the logo and site identity as a single visual group.
* Treat the tagline as optional secondary text.
* Use consistent horizontal padding.
* Keep navigation links visually simple.
* Use a visible keyboard-focus indicator.
* Specify whether the header is static or sticky; default to static unless sticky navigation offers a clear benefit.
* On mobile, display the logo or title alongside a menu control.

### 4.2 Hero

* Use a two-column layout on desktop.
* Place the profile image on the left and the introduction on the right.
* Use a portrait image with consistent cropping and appropriate alternative text.
* Limit the introduction to a few sentences.
* Provide one primary action, such as “Explore My Work,” and an optional secondary action, such as “Read My Writing.”
* Stack the image and text on mobile.
* Avoid full-screen hero sections unless the content genuinely benefits from them.

### 4.3 Article card

Each article card should support:

* Optional thumbnail image
* Category label
* Article title
* Short excerpt
* Publication date
* Optional reading time

Make the title or card an accessible link to the article. Maintain consistent image ratios and card spacing.

### 4.4 Project card

Each project card should support:

* Optional cover image
* Project title
* Short description
* Role or contribution
* Status or category, when relevant
* Link to project details

Project cards should communicate the work itself rather than rely on decorative graphics.

### 4.5 Sidebar

Recommended order:

1. Search
2. Categories
3. Recent or related articles
4. Optional promotional content

Do not reserve permanent space for advertisements. If promotional content is introduced, ensure that it does not overwhelm the editorial content.

### 4.6 Footer

```
┌─────────────────────────────────────────────────────┐
│ Logo               | Navigation   |  Get in Touch   │
│ Short Description  | About        |  Email / Links  │
│ Short Description  | Blog         |  Social Links   │
│                    | Projects     |                 │
├─────────────────────────────────────────────────────┤
│ Copyright © [Year] [Site Name]                      │
└─────────────────────────────────────────────────────┘
```

* Keep the footer consistent across pages.
* Use three columns on desktop and a stacked layout on mobile.
* Include relevant professional and social links.
* Generate the copyright year dynamically where supported.
* Avoid repeating unnecessary navigation or contact details.

***

## 5. Color System

Use a restrained, neutral palette with a single primary accent. The following values are the proposed starting point.

| Token                   | Color     | Purpose                      |
| ----------------------- | --------- | ---------------------------- |
| `--color-background`    | `#FAFAF9` | Main page background         |
| `--color-surface`       | `#FFFFFF` | Cards and content surfaces   |
| `--color-text`          | `#1C1917` | Primary text                 |
| `--color-text-muted`    | `#57534E` | Secondary text and metadata  |
| `--color-primary`       | `#2563EB` | Links and primary actions    |
| `--color-primary-hover` | `#1D4ED8` | Hover state                  |
| `--color-border`        | `#E7E5E4` | Dividers and subtle outlines |
| `--color-focus`         | `#2563EB` | Keyboard focus indicator     |

### Color usage rules

* Use the background color for the overall page.
* Use white surfaces to distinguish cards and content blocks.
* Use the primary text color for headings and body text.
* Use muted text sparingly for metadata and secondary information.
* Reserve the accent color for links, buttons, and meaningful interactive states.
* Avoid using the accent color for every heading, icon, or decorative element.
* Ensure text and controls have sufficient contrast.
* Define corresponding colors for dark mode only if dark mode is supported intentionally.

These values establish a visual direction; contrast should be tested for actual component combinations before release.

***

## 6. Typography System

Use a clear sans-serif typeface for headings, navigation, and body text. A system font stack is a practical default because it loads quickly and reduces external dependencies.

### Font family

```
--font-sans: system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", sans-serif;
```

An optional editorial serif font may be introduced for article headings or quotations, but only if it strengthens the site's identity and remains consistent.

### Type scale

| Token            | Desktop size | Intended use                   |
| ---------------- | ------------ | ------------------------------ |
| `--text-hero`    | 48px         | Hero name or primary statement |
| `--text-h1`      | 40px         | Main page heading              |
| `--text-h2`      | 30px         | Major section heading          |
| `--text-h3`      | 22px         | Subsection heading             |
| `--text-h4`      | 18px         | Card title and smaller heading |
| `--text-body`    | 17px         | Article body                   |
| `--text-small`   | 14px         | Supporting text                |
| `--text-caption` | 13px         | Metadata and captions          |

### Font weights

* Regular (400): body text and descriptions.
* Medium (500): navigation, metadata emphasis, and controls.
* Semibold (600): headings, card titles, and buttons.
* Bold (700): occasional strong emphasis.

### Line heights

* Headings: 1.15–1.3.
* Body text: 1.6–1.8.
* Navigation and buttons: 1.4–1.5.
* Metadata: 1.4–1.6.

### Typography rules

* Use a consistent heading hierarchy.
* Avoid long passages in uppercase.
* Keep paragraph widths comfortable for reading.
* Use responsive font sizing for large headings.
* Avoid excessive font-weight and font-size variations.
* Preserve readable body text on small screens.

***

## 7. Spacing and Layout Tokens

Use a consistent spacing scale instead of arbitrary margins.

| Token        | Value |
| ------------ | ----- |
| `--space-1`  | 4px   |
| `--space-2`  | 8px   |
| `--space-3`  | 12px  |
| `--space-4`  | 16px  |
| `--space-6`  | 24px  |
| `--space-8`  | 32px  |
| `--space-12` | 48px  |
| `--space-16` | 64px  |
| `--space-24` | 96px  |

### Layout widths

* Maximum page container: approximately 1200px.
* Standard reading column: 650–760px.
* Sidebar: approximately 240–300px.
* Desktop article/sidebar gap: 32–48px.
* Desktop grid gap: 24px.
* Mobile page padding: 20px, with 16px as a compact minimum.
* Desktop page padding: 32px, adjusted for available viewport width.

Use a centered container with flexible width and consistent side padding.

### Shape and elevation

* Small control radius: 6px.
* Card radius: 10px.
* Larger image or hero radius: 12px, where appropriate.
* Prefer subtle borders over heavy shadows.
* Use shadows only when they improve the visual hierarchy.

***

## 8. Responsive Design

Use content-driven breakpoints as starting points:

| Breakpoint   | Width            | Layout behavior                               |
| ------------ | ---------------- | --------------------------------------------- |
| Mobile       | Below 640px      | Single-column layout and collapsed navigation |
| Tablet       | 640–1023px       | Flexible grids and optional sidebar           |
| Desktop      | 1024px and above | Full navigation and multi-column layouts      |
| Wide desktop | 1280px and above | Centered maximum-width container              |

### Mobile requirements

* Collapse the main navigation into an accessible menu.
* Stack the hero image and introduction.
* Display article and project cards in one column.
* Move the sidebar below the primary content or hide it where redundant.
* Reduce large heading sizes without making body text too small.
* Keep buttons and interactive targets comfortably touchable.
* Prevent horizontal scrolling.
* Scale images proportionally and preserve their focal points.

### Tablet requirements

* Use two-column article and project grids when space allows.
* Keep the hero compact.
* Reduce sidebar width or move it below the content if necessary.
* Prevent the article text column from becoming too narrow.

### Desktop requirements

* Use a multi-column grid where it benefits discovery.
* Preserve the reading column width on article pages.
* Keep the main content visually dominant over the sidebar.
* Avoid stretching text and cards across the entire viewport.

***

## 9. Accessibility and Interaction

* Use semantic page landmarks: `header`, `nav`, `main`, `article`, `aside`, and `footer`.
* Maintain a logical heading hierarchy.
* Provide descriptive alternative text for meaningful images.
* Use empty alternative text for purely decorative images.
* Ensure every interactive control works with a keyboard.
* Make focus states visible.
* Provide accessible names for icon-only controls.
* Do not rely on color alone to communicate status.
* Respect reduced-motion preferences.
* Use sufficient contrast for text, controls, and focus indicators.
* Give form fields persistent labels and clear error messages.
* Ensure the mobile menu exposes its expanded or collapsed state.

***

## 10. Performance and Content Behavior

* Optimize images for their displayed dimensions.
* Use modern image formats when supported.
* Reserve image space to minimize layout shifts.
* Lazy-load below-the-fold images.
* Avoid lazy-loading the primary above-the-fold image when it would delay its appearance.
* Keep decorative animations and third-party scripts to a minimum.
* Use descriptive URLs and meaningful page titles.
* Provide a useful empty state when no articles or projects match a filter.
* Preserve search terms and filter state where practical.
* Use pagination or incremental loading for large article collections.

***

## 11. Implementation Guidance

Before implementing the design:

1. Establish the shared design tokens.
2. Build the header, navigation, footer, and container.
3. Create reusable article and project cards.
4. Implement the homepage.
5. Implement the blog collection and single-post templates.
6. Add About, Projects, and Contact pages as needed.
7. Apply responsive behavior and accessibility requirements.
8. Test across mobile, tablet, and desktop widths.

Keep visual styling separate from page-specific content. Avoid duplicating component styles across templates.

If the website already has an established framework or CSS architecture, adapt the tokens and component structure to it rather than introducing an unnecessary new styling system.

***

## 12. Acceptance Criteria

The design is ready for implementation when:

* All page templates have clearly defined layouts.
* Shared components behave consistently across pages.
* Colors, typography, and spacing use defined tokens.
* Homepage content prioritizes identity, articles, and projects.
* Article pages provide a comfortable reading experience.
* The sidebar remains useful and unobtrusive.
* Navigation and grids work on mobile, tablet, and desktop.
* Interactive elements support keyboard navigation.
* Images have appropriate sizing and alternative text.
* No placeholder content or empty sections appear in production.
* Performance and contrast have been checked before release.

***

## Design Summary

The website should feel like a thoughtfully designed personal portfolio and publication: professional without being corporate, expressive without being decorative, and structured without feeling rigid.

**Identity establishes context. Articles communicate thinking. Projects demonstrate capability.**

Every layout and visual decision should support one or more of those three purposes.