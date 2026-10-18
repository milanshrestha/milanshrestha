Fixes : Gaps and Misalignments

Fix 1 - TypeScript vs. existing CommonJS JavaScript code (MISALIGNED)  | Status = Fixed
	- Docs (SPECS.md §4, PLAN.md Phase 3) mentions language to use TypeScript
	- Current codebase package.json has "type": "commonjs" and no TypeScript — no tsconfig.json, no .ts files, and the config is module.exports JS in .eleventy.js.
	- The existing scaffold is plain JS/CommonJS, add tsconfig.json + TypeScript to the project.

Fix 2 - eleventy.config.js vs. existing .eleventy.js (MISALIGNED)  | Status = Fixed
	- Docs (SPECS.md §5) mentions eleventy.config.js.
	- Codebase: uses .eleventy.js (the default/legacy name). Eleventy v3 actually prefers eleventy.config.js
	- The existing config file should be renamed to eleventy.config.js to match the docs and Eleventy v3 conventions
	
Fix 3 - Directory layout: src/-based vs. existing flat site (MISALIGNED)  | Status = Fixed
	- Docs (SPECS.md §5) propose: src/_includes/, src/_data/, src/articles/, src/projects/, src/index.njk, eleventy.config.js, output public/.
	- Codebase (.eleventy.js): input = site, output = _site, with base.njk and index.njk. No src/, no _data/, no public/.
	- The documented structure is essentially a new, reorganized scaffold. The existing project uses a completely different input/output layout. Migrate site → src/ and reconfigure input/output dirs.
	
Fix 4 - Single-page vs. multi-page (MISALIGNED — expected, but worth noting)  | Status = Fixed
	- Docs: 9 routes (/, /about, /blog, /blog/[slug], /projects, /projects/[slug], /contact, /search, 404).
	- Current codebase: only index.njk → one index.html.
	- All other pages are not yet built. Scaffold fuller structure.
	
Fix 5 - Content model not present (MISALIGNED) | Status = Fixed
	- Docs (CONTENT.md, SPECS.md §7): Markdown-with-frontmatter articles/projects, _data/profile.json, _data/navigation.json, validation.
	- Codebase: none of these exist. All content is hardcoded inline in index.njk. No articles/, no projects/, no _data/.
	- Scaffold fuller model.
	
Fix 6 - Styling approach differs (MISALIGNED) | Status = Fixed
	- Docs (SPECS.md §5, DESIGN.md): src/styles/global.css + src/styles/tokens.css, clean editorial design with a single accent color.
	- Current codebase: uses GitHub Primer (primer.css) + inline dark-theme CSS variables in base.njk.
	- The Primer-based dark theme is a different foundation from the "clean editorial" direction in DESIGN.md. Reconcile the current codebase.
	
Fixed 7 - Project coexistence model (updated)
    - Docs (SPECS.md §2.2/§19, PLAN.md §2): the website is built within the existing GitHub profile repository, alongside the README.
    - Codebase: lives in the same milanshrestha repo as the profile README, with _site, site, and node_modules committed alongside it.
    - Docs have been updated to reflect that the website project coexists within the existing GitHub profile repository.