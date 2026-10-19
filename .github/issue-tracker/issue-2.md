Fixes : Design vs. Implementation Gaps (per DESIGN.md comparison)

Fix 1 - Design token layer mismatch (MISALIGNED)  | Status = Open
	- Docs (DESIGN.md §5/§6/§7) specify a warm stone palette with `--color-*` names: `--color-background` `#FAFAF9`, `--color-surface` `#FFFFFF`, `--color-text` `#1C1917`, `--color-text-muted` `#57534E`, `--color-primary` `#2563EB`, `--color-primary-hover` `#1D4ED8`, `--color-border` `#E7E5E4`, `--color-focus` `#2563EB`; an 8-step typography scale `--text-hero`…`--text-caption` (48…13px); and `--space-1`…`--space-24` (4…96px).
	- Codebase (`src/styles/tokens.css`): uses a cool Tailwind-gray palette with different names — `--bgColor-default` `#ffffff`, `--surface` `#f9fafb`, `--fgColor-default` `#111827`, `--muted` `#6b7280`, `--accent` `#2563eb`, `--border` `#e5e7eb`. Background/surface semantics are inverted (white bg + light-gray cards vs warm off-white bg + white cards). `--color-primary-hover` and `--color-focus` are not tokenized (primary-hover is hardcoded in `.btn:hover`). The entire `--text-*` typography scale is not implemented — only ad-hoc `clamp()` on h1/h2 and fixed rem elsewhere. `--font-sans` differs (starts `-apple-system`, no `system-ui`). Radius scale is 4/8/12px vs design's 6/10/12px; cards at 12px vs design's 10px.
	- Rename tokens to the design's `--color-*` / `--text-*` / `--space-*` / `--font-sans` names; adopt the warm-stone values; invert background/surface so the page is warm off-white and cards are white; add the missing `--color-focus` and `--color-primary-hover` tokens; implement the full `--text-hero`…`--text-caption` px scale; reconcile the radius scale to 6/10/12px with cards at 10px.

Fix 2 - Undefined CSS classes referenced in templates (UNDEFINED)  | Status = Open
	- Docs (DESIGN.md §3/§4) describe hero, button, lead-paragraph, and job-metadata styling.
	- Codebase: templates reference classes that have no CSS definitions — `src/index.njk` uses `.hero__avatar`, `.hero__content`, `.hero__subtitle`, `.hero__actions`, `.btn--primary`; `src/about.njk` uses `.page-lead`, `.job__meta`, `.job__role`, `.job__current`; `src/blog.njk`, `src/projects.njk`, `src/contact.njk` use `.page-lead`. Consequences: the homepage `<img class="hero__avatar">` never matches the avatar rule (`.hero .avatar` in `global.css`), so the circular portrait styling is not applied and the image renders as a plain inline image; both homepage CTAs render identically as accent-blue buttons because `.btn--primary` is undefined and base `.btn` is already accent (`.btn--secondary` exists but is unused on the homepage); the about-page job metadata and lead paragraphs degrade to default flow.
	- Define the orphaned classes, or rename the templates to match the existing `.hero .avatar` / `.btn--secondary` rules. Make the homepage secondary CTA use `.btn--secondary` so primary/secondary are visually distinct.

Fix 3 - Hero layout diverges from two-column spec (DIVERGENT)  | Status = Open
	- Docs (DESIGN.md §4.2): two-column desktop hero — profile image left, introduction right, one primary + optional secondary CTA, stack on mobile.
	- Codebase (`src/index.njk` + `.hero` in `global.css`): centered single-column hero — avatar on top, name/subtitle/intro/blockquote below, two CTAs. Adds an unspec'd `blockquote` (philosophy) to the hero. The `.hero .avatar` rule is also contradictory — it sets both `object-fit: cover` (image behavior) and `display:flex; align-items:center; font-size:3rem; font-weight:700` (initials-fallback behavior), so it cannot be both.
	- Rebuild the hero as a two-column layout (image left, intro right) per §4.2, stacking on mobile; drop the unspec'd philosophy blockquote from the hero (or keep it explicitly as a decision); resolve the contradictory `.hero .avatar` rule so it is either an image style or an initials fallback, not both.

Fix 4 - Missing blog sidebar, pagination, and category/tag filtering (MISSING)  | Status = Open
	- Docs (DESIGN.md §3.2, §4.5, §10): blog is a two-column desktop layout with an `<aside>` sidebar (search, categories, recent articles), 6–12 articles per page with pagination or load-more, and category/tag listing pages + filter UI. AGENTS.md also expects "category and tag filtering for articles."
	- Codebase (`src/blog.njk`, `eleventy.config.ts`): blog lists all articles in a single column with no sidebar, no pagination, and no filter UI. Categories/tags exist in front matter and render as static labels, but there are no `/blog/categories/…` or `/tags/…` listing pages.
	- Add a two-column blog layout with an `<aside>` sidebar (search, categories, recent articles); add pagination or load-more (6–12 per page); add category/tag listing pages and a filter UI.

Fix 5 - Missing single-post features: breadcrumb, prev/next, reading time (MISSING)  | Status = Open
	- Docs (DESIGN.md §3.3, §4.3): single post has a 650–760px text column, breadcrumb, date/update, byline, reading time on cards/posts, related articles matched by shared category/tag, and prev/next navigation.
	- Codebase (`src/_includes/layouts/article.njk`, `article-card.njk`): no breadcrumb, no reading time, no prev/next. The "related" logic is naive — it picks the first 3 articles whose slug ≠ current slug, not matched by shared category/tag, so "related" is effectively "other articles."
	- Add breadcrumb, optional byline, prev/next navigation, and reading time on cards/posts; replace the related-articles logic with matching by shared category/tag.

Fix 6 - Component divergences: header, footer, cards (MISALIGNED)  | Status = Open
	- Docs (DESIGN.md §4.1, §4.3, §4.4, §4.6): header is a four-column desktop layout (logo + site title + optional tagline + nav + search), default static; footer is three-column (logo+desc | nav | get-in-touch) with social links and dynamic year; article card has cover image, category, title, excerpt, date, optional reading time; project card has cover, title, description, role/contribution, status, link.
	- Codebase: `header.njk` shows only a "M." logo (no site-title text, no tagline), is `position: sticky`, and Search is a nav link rather than a dedicated header slot/search input. `footer.njk` is a single centered line with no nav or get-in-touch/social column (social links live only on the Contact page). Article cards never show cover images (no `coverImage` set in front matter) and have no reading time. Project cards have no cover image and no role/contribution (role exists only on the single-project page). All projects have empty `repositoryUrl`/`liveUrl`, so "View Source"/"Visit Project" buttons render nothing useful.
	- Bring components to spec: header four-column with site title + tagline + search slot; footer three-column with nav + get-in-touch/social; article cards with cover images and reading time; project cards with cover image and role/contribution; populate project `repositoryUrl`/`liveUrl` or hide the buttons when empty.

Fix 7 - Accessibility gaps: reduced-motion and focus-visible (MISSING)  | Status = Open
	- Docs (DESIGN.md §9): semantic landmarks (`header/nav/main/article/aside/footer`), respect reduced-motion preferences, visible focus.
	- Codebase: no `aside` landmark (because there is no sidebar); no `@media (prefers-reduced-motion)` override despite `scroll-behavior: smooth` and several `transition` rules; no dedicated `--color-focus` token and no global `:focus-visible` policy for links/interactive elements (focus is visible on `.btn` and the search input but not globally).
	- Add `@media (prefers-reduced-motion: reduce)` to disable smooth-scroll/transitions; add a global `:focus-visible` style using the `--color-focus` token; ensure an `aside` landmark exists once a sidebar is added (Fix 4).

Fix 8 - Performance/content gaps: image sizing, lazy-load, search state (MISSING)  | Status = Open
	- Docs (DESIGN.md §10): reserve image space (explicit width/height), lazy-load below-fold images (not above-fold hero), image optimization pipeline, preserve search/filter state in the URL.
	- Codebase: no `width`/`height` on any `<img>` (avatar, covers, contact icons) — layout-shift risk; contact icons use `loading="lazy"` but article/project cover images and the hero avatar have no `loading` attribute; images are passthrough-copied only (`eleventy.config.ts`) with no modern-format/responsive-image handling; the search page re-renders on each keystroke but does not persist the query in the URL.
	- Add explicit `width`/`height` (or aspect-ratio) to all images; lazy-load below-fold article/project cover images; consider an image-optimization/responsive-image pipeline; persist the search query in the URL for state preservation.

Fix 9 - Responsive breakpoints differ from spec (MISALIGNED)  | Status = Open
	- Docs (DESIGN.md §8): four breakpoints — mobile <640, tablet 640–1023, desktop ≥1024, wide ≥1280 — with a centered max-width container at ≥1280px.
	- Codebase (`global.css`): effectively one breakpoint at 768px (`48rem`) for nav-flex, article-single width, and mobile padding; grids use fluid `auto-fit/minmax`. The design's 1024/1280 behavior is only approximated by the single `72rem` container.
	- Introduce the design's 640/1024/1280 breakpoints instead of the single 768px switch, with a centered max-width container at ≥1280px.

Fix 10 - Housekeeping: stale _site/ and docs/infra mismatch (UPDATED)  | Status = Open
	- Docs (AGENTS.md): "Host on Cloudflare Pages." CI (`.github/workflows/pages.yml`) deploys to GitHub Pages — a docs/infra mismatch outside DESIGN.md scope.
	- Codebase: a stale `_site/` directory exists on disk (gitignored) containing `primer.css`, `sitemap.xml`, `search.json`, and a `content/` dir that the current config does not generate — leftover from an older build. `eleventy.config.js` is a committed build artifact (esbuild output of `eleventy.config.ts`) modified in the working tree alongside the `.ts` source.
	- Delete the stale `_site/` directory; reconcile AGENTS.md's "Cloudflare Pages" wording with the GitHub Pages CI; keep `eleventy.config.js` regenerated from `.ts` on every build (already handled by `prebuild`).
