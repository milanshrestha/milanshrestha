# SPEC.md - Specifications

## 1. Purpose

This document defines the technical architecture, development standards, and operational requirements for a new personal website.

The website must follow the decisions documented in:

* `./DESIGN.md` — visual identity and design principles
* `./STRUCTURE.md` — pages, routes, navigation, and layout
* `./CONTENT.md` — content types, fields, and relationships
* `./PLAN.md` — phased implementation and milestones

The website is built within the current repository. The existing GitHub profile README is the content source for the website.

## 2. Project Boundaries

### 2.1 New website project

The website must be built within the project directory, source files, dependencies, version control configuration, and deployment setup as appropriate.

The implementation must exist within the GitHub profile repository.

### 2.2 README as a content source

The `README.md` file in this project directory will be used to extract and verify relevant professional and personal profile content.

Use the README to inform:

* Professional introduction and positioning

* Background and experience

* Skills and areas of interest

* Existing projects and their descriptions

* Relevant professional links

The README is not the website's source code, technical foundation, or deployment repository. README.md stays untouched and rendered on Github as a profile display.

### 2.3 Content integrity

Use only information supported by the README or subsequently verified by the user.

Do not invent qualifications, employment history, skills, project achievements, dates, or professional claims. Where information is missing, leave it optional or ask the user.

Content may be edited for clarity and adapted to the website's structure without changing its meaning.

## 3. Technical Principles

* **Static-first:** Prefer pre-rendered pages for performance and simplicity.

* **Content-driven:** Separate content from presentation.

* **Minimal dependencies:** Avoid unnecessary frameworks, packages, and external services.

* **Maintainable:** Use clear naming, reusable components, and a predictable structure.

* **Accessible:** Support semantic HTML, keyboard navigation, and readable contrast.

* **Searchable:** Provide appropriate metadata and search-engine-friendly pages.

* **Extensible:** Support future additions without requiring a complete rebuild.

* **Coexistence:** Build the website project within the same directory as the profile README.md repository.

## 4. Proposed Technology Stack

The following stack is proposed for the new website. Final decisions should be made before implementation.

| Area            | Proposed technology                            |
| --------------- | ---------------------------------------------- |
| Framework       | 11ty                                           |
| Language        | TypeScript                                     |
| Content         | Markdown with frontmatter                      |
| Styling         | CSS and design tokens                          |
| Package manager | npm                                            |
| Version control | Existing profile repository, if Git is used    |
| Hosting         | To be selected based on project needs          |
| Search          | Lightweight client-side search index           |

The stack is a proposal, not an existing technical requirement. Any changes must remain consistent with the approved design and content model.

## 5. Proposed Project Structure

```
personal-website/
├── public/
│   └── images/
│       ├── profile/
│       ├── articles/
│       └── projects/
├── src/
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk
│   │   │   └── article.njk
│   │   └── components/
│   │       ├── header.njk
│   │       ├── footer.njk
│   │       ├── article-card.njk
│   │       └── project-card.njk
│   ├── _data/
│   │   ├── profile.json
│   │   └── navigation.json
│   ├── articles/
│   │   ├── articles.json
│   │   └── example-article.md
│   ├── projects/
│   │   ├── projects.json
│   │   └── example-project.md
│   ├── styles/
│   │   ├── global.css
│   │   └── tokens.css
│   ├── index.njk
│   ├── about.njk
│   ├── contact.njk
│   ├── search.njk
│   ├── 404.njk
│   └── blog.njk
├── eleventy.config.js
├── package.json
├── .gitignore
└── README.md
```

This is the proposed structure for the new website. It can be refined during implementation, provided the approved architecture and content requirements are preserved.

## 6. Routing

The website should support these routes:

| Route              | Purpose                             |
| ------------------ | ----------------------------------- |
| `/`                | Homepage                            |
| `/about`           | Professional background and profile |
| `/blog`            | Article listing                     |
| `/blog/[slug]`     | Individual article                  |
| `/projects`        | Project listing                     |
| `/projects/[slug]` | Individual project                  |
| `/contact`         | Contact information and links       |
| `/search`          | Site search                         |
| Not found          | Custom 404 page                     |

All internal links must resolve correctly. Slugs must be unique and URL-safe.

## 7. Content Management

### 7.1 Profile

Store profile information separately from page components where appropriate.

The initial profile content should be derived from the existing GitHub README and verified information supplied by the user.

The website may reorganize the content for its own layout but must not rely on the original README being available at runtime.

### 7.2 Articles

Store articles as individual Markdown files with validated frontmatter.

Expected fields include:

* Title and slug

* Excerpt or summary

* Publication date and optional updated date

* Article body

* Categories and tags

* Featured status

* Optional cover image

* SEO title and description

Draft content must not be published unless explicitly configured.

### 7.3 Projects

Store project information as individual Markdown files or an equivalent structured content format.

Expected fields include:

* Name and slug

* Summary and detailed description

* Role and contribution

* Technologies used

* Project status

* Repository and live-project URLs, when available

* Start and completion dates, when known

* Featured status

* Optional images and SEO metadata

Existing projects may be introduced from the README, but descriptions, statuses, links, and claims must be verified before publication.

### 7.4 Validation

Validate required fields, duplicate slugs, malformed dates, and invalid content wherever the selected framework supports it.

Do not silently publish incomplete or invalid content.

## 8. Component Architecture

Use reusable components for recurring interface elements, including:

* Site header and navigation

* Footer

* Page layouts

* Article cards

* Project cards

* Metadata and tag lists

* Pagination, if needed

* Search interface

* Not-found page

Keep components focused and avoid unnecessary abstraction.

## 9. Styling and Responsive Design

* Follow `DESIGN.md` for visual rules and design tokens.

* Use shared CSS variables for recurring values.

* Support mobile, tablet, and desktop layouts.

* Prefer responsive sizing over fixed device-specific dimensions.

* Provide visible focus indicators and sufficient contrast.

* Respect reduced-motion preferences.

* Avoid unnecessary animation and layout shifts.

* Maintain consistency across listing pages and detail pages.

## 10. Search

Implement lightweight search appropriate for a static-first website.

The search index should include relevant published article and project information, such as titles, summaries, tags, and URLs.

Requirements:

* Results link to the correct pages.

* Empty queries and no-result states are handled clearly.

* Search works without a backend unless future requirements justify one.

* Search is keyboard-accessible.

* Unpublished or private content is not indexed.

## 11. SEO and Metadata

Every public page should have appropriate:

* Page title

* Meta description

* Canonical URL

* Open Graph metadata

* Social-sharing metadata where applicable

Additional requirements:

* Generate a sitemap.

* Configure `robots.txt` appropriately.

* Use semantic HTML and a logical heading hierarchy.

* Add structured data only where accurate and useful.

* Avoid indexing duplicate or unpublished content.

* Use descriptive image alternative text when images convey information.

## 12. Accessibility

Target WCAG 2.2 AA.

The implementation should include:

* Semantic HTML and landmarks

* Keyboard-operable navigation and controls

* Visible keyboard focus

* Sufficient text and interface contrast

* Meaningful link labels

* Appropriate alternative text

* Accessible form labels and error messages

* No interaction dependent solely on color or hover

Accessibility must be considered throughout development.

## 13. Performance

Prioritize fast loading and efficient delivery.

* Prefer static rendering for public content.

* Minimize client-side JavaScript.

* Optimize images and use suitable dimensions.

* Avoid unnecessary third-party scripts.

* Prevent avoidable layout shifts.

* Use caching and compression provided by the hosting platform.

* Verify performance using available browser tools or Lighthouse.

Performance targets must be assessed through testing rather than assumed.

## 14. Security and Privacy

* Do not commit credentials, API keys, tokens, or other secrets.

* Use environment variables for private configuration.

* Do not collect personal information without a defined purpose.

* Securely handle form submissions if a contact form is introduced.

* Avoid unnecessary tracking and third-party integrations.

* Review dependency security warnings.

* Do not expose private configuration or unpublished content in generated files.

## 15. Development Workflow

1. Set up the 11ty project structure within this repository.

2. Review `DESIGN.md`, `STRUCTURE.md`, `CONTENT.md`, `PLAN.md` and this document.

3. Retrieve and review the existing GitHub README strictly for content.

4. Extract and verify the relevant profile and project information.

5. Set up the selected framework and project structure.

6. Implement shared layouts and components.

7. Build the documented routes.

8. Add and validate profile, article, and project content.

9. Implement search, SEO, and accessibility requirements.

10. Run available formatting, type-checking, build, and validation commands.

11. Test navigation, routes, responsive layouts, and content rendering.

12. Configure hosting and deployment for this repository.

13. Verify the deployed website before reporting completion.

## 16. Testing and Acceptance Criteria

The website is ready for release when:

* All documented routes work.

* Navigation and internal links resolve correctly.

* Profile content is based on verified source material.

* Articles and projects render from the selected content source.

* Invalid or incomplete content is handled clearly.

* Search returns relevant published content.

* The layout works across common screen sizes.

* Essential accessibility checks pass.

* Page metadata and sitemap are generated correctly.

* No secrets are exposed.

* The production build completes successfully.

* Deployment is verified, if deployment is in scope.

* The profile README is untouched and continues to render correctly on GitHub and serves as the content source.

## 17. Hosting and Deployment

Select hosting based on the website's framework, build requirements, cost, and maintenance needs.

Cloudflare Pages is one possible option, not a fixed requirement.

The deployment setup must belong to this repository. Configure the build command, output directory, runtime requirements, environment variables, and domain settings as needed.

A successful build alone does not confirm successful deployment. Verify that the deployed website loads and its key routes function correctly.

## 18. Future Extensions

Potential future capabilities include:

* A content management interface

* Newsletter integration

* Privacy-conscious analytics

* Advanced search and filtering

* Expanded project documentation

* Multilingual content

* Automated content and link validation

These are optional and are not required for the initial release.

## 19. Implementation Rule

The 5 project documents collectively define the intended website.

The existing GitHub profile README serves only as source material for relevant content. The new website implementation, project structure, and deployment workflow must exist in the profile repository.

Technical decisions may be refined during development, but changes must remain consistent with the approved design, site structure, and content model. Update this document whenever a significant technical decision changes.
