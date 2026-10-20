# Contact & Projects Content Analysis & Migration Plan

## 1. Extracted Content (from https://milanshrestha.pages.dev/)

### Build Contact Section
* **Heading:** Build Contact
* **Subtext:** Have a project in mind or want to connect? I'd be happy to hear from you.
* **Call to Action (CTA):** Let's Connect (linking to contact page and professional profiles: GitHub, Facebook, Instagram, X).
* **SEO Keywords:** Milan Shrestha, IT Manager, Hospitality IT, Software Engineering, Product Builder, Systems Thinker, Contact, Collaboration.

### Site Links & Navigation
* **Heading:** Site Links
* **Links:** Home, About, Blog, Projects, Contact.

---

## 2. Plan Content with Mapping Placement or Replacement to Existing Content

| Extracted Live Content | Current Codebase Destination | Placement / Replacement Plan |
| :--- | :--- | :--- |
| **Build Contact CTA** | `src/_data/contactPage.json` & `src/contact.njk` | Placed on the dedicated Contact page (`/contact`) and featured via CTA banners on the home page (`src/index.njk`). |
| **Professional Profiles** | `src/_data/contactPage.json` (`professionalLinks`) | Rendered as high-visibility cards on the Contact page (`contact.njk`) with theme-aware SVG icons (`github.svg`, `facebook.svg`, `instagram.svg`, `x.svg`). |
| **Site Links Footer** | `src/_data/navigation.json` & `src/_data/footerData.json` | Populates the global header navigation and the 3-column footer component (`footer.njk`). |

### Content Writing & SEO Guidelines Applied:
1. **SEO Optimization:** Enhanced meta descriptions and page titles (`base.njk`) to ensure Google SERP previews and browser tabs render clean, professional titles without raw Nunjucks interpolation.
2. **Engagement & Call-to-Action:** Clear CTAs (*"Explore My Work"*, *"Read My Writing"*, *"Get in Touch"*) guide visitors smoothly across the portfolio.
3. **Sovereign Data Architecture:** Content remains 100% decoupled in independent JSON files, ensuring future updates require zero Nunjucks template edits.
