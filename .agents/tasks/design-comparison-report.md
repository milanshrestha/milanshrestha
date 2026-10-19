# Design vs. Implementation Comparison Report

**Repo:** `milanshrestha` personal portfolio (Eleventy v3 + TypeScript)
**Design doc:** `.github/docs/DESIGN.md`
**Build/test:** `npm run build` (prebuild transpiles `eleventy.config.ts` → `eleventy.config.js` via esbuild); `npm run typecheck` (`tsc --noEmit`); deploy via `.github/workflows/pages.yml` to GitHub Pages, artifact path `public`.
**Method:** Read DESIGN.md in full, then read every page template, layout, component, data file, stylesheet, collection file, the Eleventy config, README, AGENTS.md, and the CI workflow; grepped for features the design specifies.

---

## 1. Summary (answer first)

The implementation covers the *bones* of the design — a tokenized design system, Eleventy collections for articles/projects, the six primary nav pages, reusable header/footer/card components, a mobile menu, skip link, dark mode, and a working client-side search page. **But it diverges from DESIGN.md in three systematic ways:**

1. **The design-token layer does not match the spec.** Token *names* (`--bgColor-default`, `--fgColor-default`, `--accent`, `--muted`, `--border`, `--surface`) and *values* (a cool Tailwind-gray palette) differ from the design's specified names (`--color-background`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-primary`, `--color-border`, `--color-focus`) and its warm "stone" values (`#FAFAF9` / `#1C1917` / `#57534E` / `#E7E5E4`). The background/surface semantics are also inverted (design: warm off-white bg + white cards; impl: white bg + light-gray cards). The entire typography type-scale (`--text-hero` … `--text-caption` in px) is **not implemented** at all.
2. **Several design-specified features are absent entirely:** blog sidebar, breadcrumbs, pagination/load-more, category/tag filter UI and listing pages, reading time, and prev/next article navigation. The "related articles" logic is naive (first 3 non-self articles, not matched by category/tag).
3. **A set of styling classes are referenced in templates but undefined in CSS**, so those elements render with browser defaults: `.hero__avatar`, `.hero__content`, `.hero__subtitle`, `.hero__actions`, `.btn--primary`, `.page-lead`, `.job__meta`, `.job__role`, `.job__current`. Most visibly, the homepage avatar image (`<img class="hero__avatar">`) never receives the circular-avatar rule (the CSS targets `.hero .avatar`), and both homepage CTAs render as the same accent-blue button because `.btn--primary` is undefined and base `.btn` is already accent.

The implementation also **goes beyond** DESIGN.md in a few places: dark mode via `prefers-color-scheme` (design left it optional), a "What I'm Working On" homepage section, print styles, and client-side search — all reasonable, but the hero is built as a centered single column rather than the design's two-column (image left, intro right) layout.

---

## 2. What DESIGN.md specifies (condensed)

- **Philosophy:** clean editorial aesthetic, neutral backgrounds, single accent, generous whitespace, subtle borders over shadows, accessibility-first. (§1)
- **Structure/nav:** Home, About, Blog, Projects, Contact, Search; collapse to a mobile menu on small screens. (§2)
- **Page templates:** Homepage (hero + 3 articles + 2–3 projects + summary + contact CTA, no empty sections); Blog collection (two-column desktop with sidebar: search, categories, recent articles; 6–12 per page; pagination or load-more); Single post (650–760px text column, breadcrumb, date/update, byline, related, prev/next, hide/move sidebar on mobile); About; Projects (cards with cover, title, description, role, status, link). (§3)
- **Shared components:** Header (four-column desktop, logo+site title+optional tagline+nav+search, static by default, focus indicator, mobile menu control); Hero (two-column, image left, intro right, one primary + optional secondary CTA, stack on mobile); Article card (thumbnail, category, title, excerpt, date, optional reading time); Project card (cover, title, description, role, status, link); Sidebar (search → categories → recent → optional promo); Footer (three-column: logo+desc, nav, get-in-touch; dynamic copyright year). (§4)
- **Color tokens** (`--color-*`, warm stone scale): background `#FAFAF9`, surface `#FFFFFF`, text `#1C1917`, text-muted `#57534E`, primary `#2563EB`, primary-hover `#1D4ED8`, border `#E7E5E4`, focus `#2563EB`. Accent reserved for links/buttons/interactive states. (§5)
- **Typography tokens** (`--text-*` in px): hero 48, h1 40, h2 30, h3 22, h4 18, body 17, small 14, caption 13; weights 400/500/600/700; line-heights; `--font-sans` starting with `system-ui`. (§6)
- **Spacing/layout tokens** (`--space-1`…`--space-24` in px); max container ~1200px; reading column 650–760px; sidebar 240–300px; gaps; radii 6/10/12px; subtle borders over shadows. (§7)
- **Responsive breakpoints:** mobile <640, tablet 640–1023, desktop ≥1024, wide ≥1280. (§8)
- **Accessibility:** semantic landmarks (`header/nav/main/article/aside/footer`), heading hierarchy, alt text, keyboard operability, visible focus, icon accessible names, no color-only status, reduced-motion, contrast, form labels, mobile-menu state exposure. (§9)
- **Performance/content:** image optimization, modern formats, reserve image space, lazy-load below-fold (not above-fold hero), minimal scripts, descriptive URLs/titles, useful empty states, preserve search/filter state, pagination. (§10)
- **Acceptance criteria:** defined layouts, consistent components, tokenized colors/type/spacing, homepage prioritizes identity/articles/projects, comfortable reading, unobtrusive sidebar, responsive, keyboard nav, sized images with alt, no placeholder content, performance/contrast checked. (§12)

---

## 3. What is actually implemented (grounded)

- **Stack:** Eleventy v3, TypeScript config (`eleventy.config.ts`) transpiled to `eleventy.config.js` via esbuild (`prebuild`/`predev`); `npm run build`, `npm run dev --serve`, `npm run typecheck`. (`package.json`)
- **Config:** passthrough copy `images → images` and `src/styles → styles`; a `date` filter; `articles` collection = `./src/articles/*.md` with `status === "published"`; `projects` collection = `./src/projects/*.md` with `sortOrder != null`; `dir.input: src`, `dir.output: public`. (`eleventy.config.ts`)
- **Pages:** `index.njk` (home), `about.njk`, `blog.njk`, `projects.njk`, `contact.njk`, `search.njk`, `404.njk`. (`src/`)
- **Layouts:** `base.njk` (html shell, skip link, header, `<main id="content">`, footer, scripts), `page.njk` (extends base), `article.njk` (single post + related), `project.njk` (single project + role/tech/links). (`src/_includes/layouts/`)
- **Components:** `header.njk` (sticky header, logo "M.", hamburger `nav-toggle` with `aria-expanded`, nav list from `navigation.json`, `aria-current` on active), `footer.njk` (single centered line with dynamic year), `article-card.njk`, `project-card.njk`. (`src/_includes/components/`)
- **Data:** `profile.json` (name, professionalTitle, introduction, philosophy, aboutContent, profileImage, professionalLinks, workingOn, skills, experience, learning, goals), `navigation.json` (6 nav items). (`src/_data/`)
- **Styles:** `tokens.css` (color/font/spacing/radius/transition tokens + dark mode + `.sr-only`, `.skip-link`, `.btn`, `.btn--secondary`), `global.css` (layout, hero, cards, article/project single, search, 404, print styles), `scripts.js` (mobile-nav toggle, dynamic year). (`src/styles/`)
- **Content:** 2 published articles (`example-article.md`, `thinking-in-systems.md`) + 1 draft (`draft-note.md`, `permalink: false`, `status: draft`); 3 projects (`khaancho`, `kamana-code`, `squarespace-web-designer`). Front matter includes `categories`, `tags`, `publishedAt`, `status`, `coverImage` (unset on all), `technologies`, `role`, `sortOrder`, `repositoryUrl`/`liveUrl` (empty strings). (`src/articles/`, `src/projects/`)
- **Beyond-design features present:** dark mode via `prefers-color-scheme` (`tokens.css`), "What I'm Working On" homepage section (`index.njk`), `@media print` styles (`global.css`), a full client-side search page with `aria-live` results (`search.njk`).

---

## 4. Alignment (where impl matches design)

- Six-item primary nav with a mobile menu collapse and `aria-expanded` state — matches §2/§4.1/§9. (`header.njk`, `navigation.json`, `scripts.js`)
- Reusable header/footer/article-card/project-card components — matches §4. (`src/_includes/components/`)
- Single accent color (`#2563eb`) reserved for links/CTAs/interactive states — matches §5 usage rules. (`tokens.css`)
- Homepage guards empty sections (`{% if collections.articles | length > 0 %}`) — matches §3.1 "no empty sections/placeholder cards." (`index.njk`)
- Article collection filters drafts by `status === "published"`; `draft-note.md` has `permalink: false` and never appears — matches §12 "no placeholder content in production." (`eleventy.config.ts`, `draft-note.md`)
- Empty states on blog, projects, and search — matches §10. (`blog.njk`, `projects.njk`, `search.njk`)
- Semantic landmarks `header/nav/main/article/footer`, skip link, `aria-current`, `aria-live` search, `alt` text (empty for decorative contact icons) — matches most of §9.
- Reading column ~38–48rem (608–768px) is *close* to the 650–760px spec; container `72rem` (1152px) is *close* to ~1200px. (`global.css`)
- Eleventy collections, permalinks `blog/{{ slug }}/index.html` and `projects/{{ slug }}/index.html`, descriptive page titles — matches §10. (`articles.json`, `projects.json`)

---

## 5. Gaps and divergences (evidence)

### 5.1 Design tokens — names, values, and semantics all differ (biggest gap)

| Design token (§5/§6/§7)        | Design value        | Implemented as            | Impl value        | Note |
|--------------------------------|---------------------|---------------------------|------------------|------|
| `--color-background`           | `#FAFAF9` (warm)    | `--bgColor-default`       | `#ffffff`        | inverted: bg is pure white |
| `--color-surface`              | `#FFFFFF` (cards)  | `--surface`               | `#f9fafb`        | inverted: cards are light gray, not white |
| `--color-text`                 | `#1C1917` (warm)    | `--fgColor-default`       | `#111827`        | cool gray, not warm stone |
| `--color-text-muted`           | `#57534E` (warm)    | `--muted`                 | `#6b7280`        | cool gray |
| `--color-primary`              | `#2563EB`           | `--accent`               | `#2563eb`        | value matches |
| `--color-primary-hover`        | `#1D4ED8`           | *(not tokenized)*        | `#1d4ed8` hardcoded in `.btn:hover` | value matches, but not a token |
| `--color-border`               | `#E7E5E4` (warm)    | `--border`               | `#e5e7eb`        | cool gray |
| `--color-focus`                | `#2563EB`           | *(not tokenized)*        | uses `--accent` in `outline` | value effectively matches |
| `--font-sans` (starts `system-ui`) | —             | `--font-family-base`     | starts `-apple-system`, no `system-ui`; adds Roboto/Helvetica/Arial | family differs |
| `--text-hero`…`--text-caption` (8 px sizes) | 48…13 px | *(none implemented)* | ad-hoc `clamp()` on h1/h2, fixed rem elsewhere | **entire type scale missing** |
| `--space-1`…`--space-24` (px)   | 4…96 px             | `--space-0`…`--space-10` (rem) | 0.25…4 rem (~4…64px) | scale exists in rem; **no 96px token**; naming differs |
| Radii 6/10/12px                | control/card/large | `--radius-sm/md/lg` 4/8/12px + cards use `.75rem`=12px | 4/8/12px | cards 12px ≠ design 10px; control 4px ≠ 6px |

Net: the implemented system is a self-consistent *cool gray* (Tailwind) theme, not the warm *stone* theme DESIGN.md specifies, and it omits the entire typography scale and the `--color-*`/`--text-*` naming contract. Evidence: `src/styles/tokens.css` (the `:root` block).

### 5.2 Template classes used but never defined in CSS (concrete bugs)

Grepping `src/styles/*.css` for these classes returns **no matches**, yet the templates reference them:
- `src/index.njk`: `.hero__avatar`, `.hero__content`, `.hero__subtitle`, `.hero__actions`, `.btn--primary`
- `src/about.njk`: `.page-lead`, `.job__meta`, `.job__role`, `.job__current`
- `src/blog.njk`, `src/projects.njk`, `src/contact.njk`: `.page-lead`

Consequences:
- **Homepage avatar:** `<img class="hero__avatar">` never matches the avatar rule (`.hero .avatar` in `global.css`), so the circular portrait styling (120px, border, object-fit cover) is not applied — the image renders as a plain inline image.
- **Homepage CTAs:** both "Explore My Work" (`btn btn--primary`) and "Read My Writing" (`btn`) render identically as accent-blue buttons because `.btn--primary` is undefined and base `.btn` is already accent. Design wants a distinct primary + optional secondary; `.btn--secondary` *is* defined but unused on the homepage.
- **About page:** the `.job__meta`/`.job__role`/`.job__current` markers have no styling, so the role/current badge layout degrades to default flow. `.page-lead` (lead paragraph on about/blog/projects/contact) is unstyled beyond default `p`.

### 5.3 Hero layout diverges

Design §4.2: two-column desktop (profile image left, introduction right), stack on mobile, one primary + optional secondary CTA.
Impl `index.njk` + `.hero` (text-align center) in `global.css`: **centered single column**, avatar on top, name/subtitle/intro/blockquote below, two CTAs. Adds a `blockquote` (philosophy) not specified for the hero. The avatar image is unstyled due to §5.2.

### 5.4 Missing design-specified features

Grepping `src/**` for `aside|sidebar|breadcrumb|pagination|readingTime|prev|next|load-more` returns **no matching implementation** (only false positives in Khaancho prose). Specifically absent:
- **Blog sidebar** (§3.2, §4.5): no `<aside>`, no two-column blog layout, no search/categories/recent-articles sidebar.
- **Category/tag filters and listing pages** (§3.2, §4.5): categories/tags exist in front matter and render as static labels, but there is no filter UI, no `/blog/categories/…` or `/tags/…` pages. (AGENTS.md also expects "category and tag filtering for articles.")
- **Pagination / load-more** (§3.2, §10): blog lists *all* articles with no pagination.
- **Breadcrumb** on single posts (§3.3).
- **Reading time** on article cards (§4.3).
- **Prev/next article navigation** (§3.3); only "related" is implemented.
- **Related-articles logic is naive:** `article.njk` builds `related` as the first 3 articles whose slug ≠ current slug — not matched by shared category/tag — so "related" is effectively "other articles," not truly related.

### 5.5 Component divergences

- **Header (§4.1):** design wants a four-column layout with logo + site title + optional tagline + nav + search, default static. Impl `header.njk` is `position: sticky` (a deliberate choice the design allows), shows only a "M." logo (no site-title text, no tagline), and Search is a nav link rather than a dedicated header slot/search input.
- **Footer (§4.6):** design wants three columns (logo+desc | nav | get-in-touch) with social links and dynamic year. Impl `footer.njk` is a single centered line: "© [year] Milan Shrestha. Built with care from Nepal." No nav column, no social/get-in-touch column (social links live only on the Contact page).
- **Article card (§4.3):** has cover image (optional), category (first), title, excerpt, date — but **no reading time** and cover images are never set in front matter, so no article card currently shows an image.
- **Project card (§4.4):** has title, summary, status, technologies — but **no cover image, no role/contribution** on the card (role exists only on the single-project page), even though the design lists role/contribution as a card element.
- **Single project (§3.4):** role/tech/links are present and reasonable, but all projects have empty `repositoryUrl`/`liveUrl`, so the "View Source"/"Visit Project" buttons render nothing useful (only "Back to Projects" always shows).

### 5.6 Accessibility gaps

- **No `aside` landmark** (because there is no sidebar) — design §9 lists `aside` among required landmarks.
- **No reduced-motion handling:** `global.css`/`tokens.css` set `scroll-behavior: smooth` and several `transition` rules but have **no `@media (prefers-reduced-motion)`** override, violating §9 "Respect reduced-motion preferences."
- Focus is visible (`.btn:focus`, search input `:focus` use `outline: 2px solid var(--accent)`) — good — but no dedicated `--color-focus` token and no global `:focus-visible` policy for links/interactive elements.

### 5.7 Performance/content gaps (§10)

- **No `width`/`height` on `<img>`** anywhere (avatar, covers, contact icons) → layout-shift risk; design wants image space reserved.
- **No lazy-loading on below-fold images:** contact icons use `loading="lazy"` (good), but article/project cover images and the hero avatar have no `loading` attribute; no below-fold lazy-load strategy.
- **No image optimization pipeline:** images are passthrough-copied only (`eleventy.config.ts`); no modern-format/responsive-image handling, no sizing to displayed dimensions.
- **No search/filter state preservation** (§10): the search page re-renders on each keystroke but does not persist the query in the URL.

### 5.8 Responsive breakpoints differ (§8)

Design specifies four breakpoints: mobile <640, tablet 640–1023, desktop ≥1024, wide ≥1280.
Impl `global.css` effectively uses **one breakpoint at 768px** (`48rem`) for nav-flex, article-single width, and mobile padding; grids use fluid `auto-fit/minmax`. The design's 1024/1280 behavior (centered max container at wide, desktop multi-column) is only approximated by the single `72rem` container.

### 5.9 Minor: hero avatar fallback rule is contradictory

`.hero .avatar` in `global.css` sets both `object-fit: cover` (image behavior) **and** `display:flex; align-items:center; justify-content:center; font-size:3rem; font-weight:700` (initials-fallback behavior). It cannot be both; and since the template uses `.hero__avatar` (unmatched), neither applies.

---

## 6. Build / output notes (not design, but flagged)

- `eleventy.config.ts` sets `dir.output: "public"`; `.github/workflows/pages.yml` uploads artifact from `path: public` — **consistent**. A stale `_site/` directory exists on disk (gitignored) containing `primer.css`, `sitemap.xml`, `search.json`, and a `content/` dir that the current config does **not** generate. This is leftover from an older build and is not part of the current pipeline — worth deleting to avoid confusion, but not a design divergence.
- `.github/AGENTS.md` says "Host on Cloudflare Pages," but the actual CI (`.github/workflows/pages.yml`) deploys to **GitHub Pages** — a docs/infra mismatch outside DESIGN.md scope.
- `eleventy.config.js` is a committed build artifact (esbuild output of `eleventy.config.ts`) and is modified in the working tree alongside the `.ts` source; both should stay in sync via `npm run build:config`.

---

## 7. Conclusions

The site is a functional, accessible-enough Eleventy portfolio that realizes DESIGN.md's *structure and component intent* but not its *visual specification*. The two most consequential gaps are (a) the design-token layer — wrong palette family (cool gray vs warm stone), inverted background/surface semantics, non-matching token names, and a completely missing typography scale — and (b) a cluster of undefined CSS classes that leave real page elements (hero avatar, hero buttons, about-page job metadata, lead paragraphs) under-styled. Beyond that, several design-mandated features (sidebar, breadcrumbs, pagination, category/tag filtering and listing pages, reading time, prev/next, true related-content matching, reduced-motion support, image width/height and lazy-loading) are simply not built yet.

---

## 8. Recommendations (no implementation)

1. **Align the token layer to DESIGN.md.** Rename `tokens.css` tokens to the design's `--color-*` / `--text-*` / `--space-*` / `--font-sans` names and adopt the specified warm-stone values; invert `--color-background`/`--color-surface` so the page is warm off-white and cards are white; add the missing `--color-focus` and `--color-primary-hover` tokens; implement the full `--text-hero`…`--text-caption` px scale; reconcile the radius scale to 6/10/12px with cards at 10px.
2. **Define the orphaned classes** (`hero__avatar`, `hero__content`, `hero__subtitle`, `hero__actions`, `btn--primary`, `page-lead`, `job__meta`, `job__role`, `job__current`) — or rename the templates to match the existing `.hero .avatar` / `.btn--secondary` rules. Make the homepage secondary CTA use `btn--secondary` so primary/secondary are visually distinct.
3. **Rebuild the hero as a two-column layout** (image left, intro right) per §4.2, stacking on mobile; drop the unspec'd philosophy blockquote from the hero (or keep it explicitly as a decision).
4. **Add the missing blog features:** two-column blog layout with an `<aside>` sidebar (search, categories, recent articles), pagination or load-more (6–12 per page), and category/tag listing pages + filter UI.
5. **Add single-post features:** breadcrumb, optional author byline, prev/next navigation, reading time on cards/posts, and related-by-shared-category/tag logic instead of "first 3 others."
6. **Bring components to spec:** header four-column with site title + tagline + search slot; footer three-column with nav + get-in-touch/social; project cards with cover image + role/contribution.
7. **Accessibility:** add `@media (prefers-reduced-motion: reduce)` to disable smooth-scroll/transitions; add a global `:focus-visible` style using the `--color-focus` token; ensure an `aside` landmark exists once a sidebar is added.
8. **Performance:** add explicit `width`/`height` (or aspect-ratio) to all images; lazy-load below-fold article/project cover images; consider an image-optimization/responsive-image pipeline; persist search query in the URL for state preservation.
9. **Responsive:** introduce the design's 640/1024/1280 breakpoints instead of the single 768px switch, with a centered max-width container at ≥1280px.
10. **Housekeeping:** delete the stale `_site/` directory; reconcile AGENTS.md's "Cloudflare Pages" wording with the GitHub Pages CI; keep `eleventy.config.js` regenerated from `.ts` on every build (already handled by `prebuild`).
