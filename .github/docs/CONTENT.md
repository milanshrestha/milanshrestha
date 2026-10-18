# CONTENT.md — Content, Types & Data Structure

## 1. Purpose

This document defines the content types, fields, relationships, and publishing rules for the personal website.

The website contains three primary content areas:

1. Personal and professional identity
2. Articles and writing
3. Projects and practical work

The existing `./README.md` is the initial source of personal and professional content. The website should organize this information without inventing facts or changing the author's intended meaning.

The content model must support future growth while remaining simple enough for a personal website.

## 2. Content Principles

* Keep content separate from its visual presentation.
* Use structured fields for information that needs to be displayed consistently.
* Preserve the author's voice and original meaning.
* Distinguish published content from drafts.
* Do not require optional information when it is unavailable.
* Avoid duplicating information unnecessarily.
* Keep content portable across frameworks and storage systems.
* Do not assume that a database or content management system is required.

## 3. Content Types Overview

| Content type            | Purpose                                       | Required         |
| ----------------------- | --------------------------------------------- | ---------------- |
| Site Profile            | Name, professional identity, and introduction | Yes              |
| Professional Experience | Work history and responsibilities             | As applicable    |
| Article                 | Individual published writing                  | Optional         |
| Project                 | Selected work or experiment                   | Optional         |
| Category                | Broad classification for articles             | Optional         |
| Tag                     | More specific content classification          | Optional         |
| Navigation Item         | Link and label for site navigation            | Yes              |
| Site Settings           | Global metadata and presentation content      | Yes              |

Not every content type needs to become a separate database entity. The implementation may represent some of these as configuration, static files, or structured objects.

## 4. Site Profile

**Purpose:** Store the information used to introduce the person throughout the website.

### Fields

| Field               | Type                  | Required | Description                                           |
| ------------------- | --------------------- | -------- | ----------------------------------------------------- |
| `name`              | String                | Yes      | Publicly displayed name                               |
| `professionalTitle` | String                | Yes      | Professional positioning                              |
| `introduction`      | Text                  | Yes      | Short introduction                                    |
| `philosophy`        | Text                  | Optional | Professional perspective or principles                |
| `profileImage`      | Image path or URL     | Optional | Profile image                                         |
| `aboutContent`      | Rich text or Markdown | Optional | Extended biography                                    |
| `githubUrl`         | URL                   | Optional | GitHub profile                                        |
| `professionalLinks` | Collection of links   | Optional | Relevant public profiles                              |
| `contactUrl`        | URL                   | Optional | Internal contact page or approved contact destination |

### Rules

* Use the existing `./README.md` as the source for initial values.
* Do not invent or automatically expand biographical details.
* Avoid maintaining duplicate copies of the same introduction across multiple pages.
* Allow the homepage and About page to present different portions of the same source content.

## 5. Professional Experience

**Purpose:** Represent relevant work history and professional responsibilities when the About page needs structured experience entries.

### Fields

| Field          | Type         | Required | Description                  |
| -------------- | ------------ | -------- | ---------------------------- |
| `id`           | String       | Yes      | Stable entry identifier      |
| `organization` | String       | Yes      | Organization or employer     |
| `role`         | String       | Yes      | Role or position             |
| `description`  | Text         | Optional | Responsibilities and context |
| `startDate`    | Date or year | Optional | Start date                   |
| `endDate`      | Date or year | Optional | End date                     |
| `isCurrent`    | Boolean      | Optional | Whether the role is current  |
| `sortOrder`    | Number       | Optional | Display order                |

### Rules

* Include only verified experience.
* Use dates only when available and sufficiently reliable.
* Do not imply current employment when the status is unknown.
* Keep experience entries concise and relevant to the website's purpose.

This structure is optional if the existing biography works better as a continuous narrative.

## 6. Article

**Purpose:** Store an individual article published in the Blog section.

### Fields

| Field            | Type                      | Required    | Description                                    |
| ---------------- | ------------------------- | ----------- | ---------------------------------------------- |
| `id`             | String                    | Yes         | Stable internal identifier                     |
| `title`          | String                    | Yes         | Article title                                  |
| `slug`           | String                    | Yes         | Unique URL identifier                          |
| `excerpt`        | Text                      | Recommended | Short summary                                  |
| `body`           | Markdown or rich text     | Yes         | Article content                                |
| `coverImage`     | Image path or URL         | Optional    | Featured image                                 |
| `coverImageAlt`  | String                    | Conditional | Alternative text when an image conveys meaning |
| `publishedAt`    | Date/time                 | Conditional | Publication date                               |
| `updatedAt`      | Date/time                 | Optional    | Last substantive update                        |
| `status`         | Enum                      | Yes         | Draft, published, or archived                  |
| `categoryIds`    | Collection of identifiers | Optional    | Associated categories                          |
| `tagIds`         | Collection of identifiers | Optional    | Associated tags                                |
| `featured`       | Boolean                   | Optional    | Whether to feature the article                 |
| `readingTime`    | Number                    | Derived     | Estimated reading time                         |
| `seoTitle`       | String                    | Optional    | Search-result title override                   |
| `seoDescription` | String                    | Optional    | Search-result description override             |

### Article rules

* Every article must have a unique slug.
* Only published articles may appear in public collections.
* Draft and archived articles must not be publicly exposed accidentally.
* A published article must have a title and body.
* Published dates must be valid when used for ordering.
* Reading time should be calculated from the content rather than manually maintained.
* The article body must support headings, paragraphs, lists, links, quotations, and images where appropriate.
* Featured status must not imply publication status.
* SEO fields should have sensible defaults based on the title and excerpt when appropriate.

### Publication behavior

* The Blog page displays published articles.
* The homepage displays selected published articles.
* Single-post pages use the article slug.
* Related articles must refer to other eligible published articles.

### Initial article content

The website starts with an empty Blog section. Mock-up articles can be created to demonstrate the blog structure when no published content exists yet.

## 7. Project

**Purpose:** Represent software products, websites, implementations, experiments, and other selected work.

### Fields

| Field            | Type                  | Required    | Description                                  |
| ---------------- | --------------------- | ----------- | -------------------------------------------- |
| `id`             | String                | Yes         | Stable internal identifier                   |
| `title`          | String                | Yes         | Project name                                 |
| `slug`           | String                | Yes         | Unique URL identifier                        |
| `summary`        | Text                  | Yes         | Short project description                    |
| `description`    | Markdown or rich text | Optional    | Extended project narrative                   |
| `coverImage`     | Image path or URL     | Optional    | Project image or screenshot                  |
| `coverImageAlt`  | String                | Conditional | Alternative text for meaningful images       |
| `role`           | String                | Optional    | Personal contribution or responsibility      |
| `technologies`   | Collection of strings | Optional    | Relevant technologies                        |
| `status`         | Enum                  | Yes         | Planned, in progress, completed, or archived |
| `category`       | String or identifier  | Optional    | Project classification                       |
| `repositoryUrl`  | URL                   | Optional    | Source repository                            |
| `liveUrl`        | URL                   | Optional    | Publicly accessible project                  |
| `startedAt`      | Date or year          | Optional    | Start date                                   |
| `completedAt`    | Date or year          | Optional    | Completion date                              |
| `featured`       | Boolean               | Optional    | Whether to feature the project               |
| `sortOrder`      | Number                | Optional    | Display order                                |
| `seoTitle`       | String                | Optional    | Search-result title override                 |
| `seoDescription` | String                | Optional    | Search-result description override           |

### Project rules

* Every project must have a unique slug.
* A title and short summary are required.
* Project status must reflect verified information.
* Repository and live links must be accurate and intentionally public.
* Technologies must describe actual project work rather than aspirational skills.
* Outcomes and measurable results must not be fabricated.
* Projects may link to related articles where useful.
* Optional fields should be omitted when information is unavailable.

### Initial project content

The project selection in `PLAN.md` describes which projects may be included. Projects mentioned in the README may be considered for inclusion after reviewing their descriptions and available evidence.

Do not automatically assume every mentioned project is complete, deployed, open source, or suitable for public display.

## 8. Category

**Purpose:** Organize articles under broad topics.

### Fields

| Field         | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `id`          | String | Yes      | Stable identifier           |
| `name`        | String | Yes      | Display name                |
| `slug`        | String | Yes      | URL-friendly identifier     |
| `description` | Text   | Optional | Explanation of the category |

### Rules

* Categories should represent meaningful, broad topics.
* Every category must have a unique slug.
* Avoid creating categories that contain no relevant content.
* Category filtering may be omitted if the article collection is small.
* Dedicated category pages are optional.

## 9. Tag

**Purpose:** Identify specific subjects that may cross multiple categories.

### Fields

| Field  | Type   | Required | Description             |
| ------ | ------ | -------- | ----------------------- |
| `id`   | String | Yes      | Stable identifier       |
| `name` | String | Yes      | Display name            |
| `slug` | String | Yes      | URL-friendly identifier |

### Rules

* Tags are optional.
* Use tags only when they improve content discovery.
* Avoid near-duplicate tags with different spelling or capitalization.
* Do not require every article to have tags.

## 10. Navigation Item

**Purpose:** Represent an item in the site's primary or secondary navigation.

### Fields

| Field       | Type    | Required | Description                                  |
| ----------- | ------- | -------- | -------------------------------------------- |
| `label`     | String  | Yes      | Visible link text                            |
| `href`      | String  | Yes      | Internal path or approved external URL       |
| `location`  | Enum    | Yes      | Header, footer, or another defined placement |
| `sortOrder` | Number  | Optional | Display order                                |
| `external`  | Boolean | Optional | Whether the destination is external          |

### Rules

* Keep navigation labels concise.
* Verify that internal destinations exist.
* Mark external links appropriately.
* Avoid exposing unpublished pages through public navigation.

Navigation may remain a simple configuration file instead of a separate content collection.

## 11. Site Settings

**Purpose:** Store shared website metadata and global configuration.

### Fields

* Site name

* Default site description

* Default SEO title

* Default SEO description

* Default social-sharing image, if available

* Public social and professional links

* Copyright display configuration

### Rules

* Avoid duplicating profile content unnecessarily.

* Keep private credentials and API secrets outside public content and client-side configuration.

* Use page-specific SEO metadata where appropriate.

* Use verified public links only.

* Generate the current copyright year dynamically where supported.

## 12. Content Relationships

The following relationships should be supported:

* One profile supplies identity information to the homepage and About page.

* An article may belong to multiple categories if required by the implementation.

* An article may have multiple tags.

* A category may contain multiple articles.

* A tag may be associated with multiple articles.

* Projects may reference related articles.

* Articles may reference related projects.

* Homepage featured content references existing published articles and selected projects.

Use stable identifiers or references rather than copying full article and project content into multiple locations.

## 13. Content Storage and Source of Truth

The content model is independent of any specific storage technology.

Depending on the existing project, content may be stored in:

* Markdown or MDX files

* Structured JSON or YAML files

* A content management system

* A database

The choice must be made in `SPECS.md` after inspecting the existing codebase.

### README relationship

* The existing README is the initial source for personal and professional content.

* The README should not automatically become a runtime dependency for every page.

* Content can be adapted into structured profile and project entries when needed.

* Preserve the original README and repository documentation unless a separate change is requested.

* Avoid maintaining multiple conflicting versions of the same information.

## 14. Validation and Integrity

Before content is published:

* Required fields must be present.

* Slugs must be unique.

* URLs must use valid formats.

* Publication dates must be valid when provided.

* Published articles must contain a title and body.

* Projects must contain a title and summary.

* Referenced categories, tags, articles, and projects must exist.

* Internal links must point to valid destinations.

* Missing optional content must not break the layout.

* Draft or archived content must not leak into public collections.

Validation should match the storage system and existing project architecture.

## 15. Content Model Scope

This document defines the logical content structure, not the implementation.

It does not require:

* A database

* A content management system

* A specific frontend framework

* A particular file format

* User accounts or authentication

* A publishing dashboard

* Automatic synchronization with GitHub

Those decisions belong in the technical specification and should be based on actual requirements.

## 16. Acceptance Criteria

The content model is ready for technical planning when:

* Every primary content type has a clear purpose.

* Required and optional fields are defined.

* Articles and projects support individual pages.

* Categories and tags have clear, distinct roles.

* Content relationships are explicit.

* Publication and visibility rules are defined.

* The existing README can supply initial profile content.

* Content remains separate from presentation.

* The model does not force unnecessary infrastructure.

* Validation rules protect content integrity.

## 17. Related Documentation

* `README.md` — Existing personal and professional source content.

* `DESIGN.md` — Layout, colors, typography, responsive behavior, and accessibility.

* `STRUCTURE.md` — Page hierarchy, navigation, and information architecture.

* `CONTENT.md` — Content types, fields, and relationships.

* `SPEC.md` — Technology stack, architecture, routing, and storage decisions.

* `PLAN.md` — Development milestones and verification.

**Status:** Proposed content model, ready for review before technical implementation.
