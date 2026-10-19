# Fix 1 — Design Token Layer Mismatch (MISALIGNED): Implementation Plan

Scope: Implement ONLY "Fix 1" from `.github/issue-tracker/issue-2.md`. Rename the design-token layer in `src/styles/tokens.css` to the DESIGN.md `--color-*` / `--text-*` / `--space-*` / `--font-sans` names, adopt the warm-stone values, invert background/surface, add the missing `--color-focus` / `--color-primary-hover` tokens, implement the full `--text-*` scale, and reconcile the radius scale to 6/10/12px with cards at 10px. Fix 2–10 are NOT touched.

Source spec: `.github/docs/DESIGN.md` §5 (Color System), §6 (Typography System), §7 (Spacing & Layout). The issue's "old→new mapping" is confirmed against DESIGN.md verbatim below.

Affected source files (ONLY these two are edited; all other token references in the repo are docs, not source):
- `src/styles/tokens.css` (token definitions + `.skip-link` / `.btn` / `.btn--secondary` rules)
- `src/styles/global.css` (all component rules; note: it contains DUPLICATE base rule blocks — lines ~27-45 and ~113-128 both define h1/h2/h3/p/blockquote/ul/li; BOTH must be updated consistently)

CSS pipeline: static passthrough. `eleventy.config.ts` copies `src/styles → /styles`; `base.njk` links `/styles/tokens.css` then `/styles/global.css`. No CSS bundler/minifier — edits land in build output directly.

---

## 1. Audit table — EXACT design-spec token values from DESIGN.md §5/§6/§7

### 1a. Color tokens (DESIGN.md §5) — 8 tokens, confirmed verbatim

| Token | Value | Purpose |
| --- | --- | --- |
| `--color-background` | `#FAFAF9` | Main page background (warm off-white) |
| `--color-surface` | `#FFFFFF` | Cards and content surfaces (white) |
| `--color-text` | `#1C1917` | Primary text (warm stone) |
| `--color-text-muted` | `#57534E` | Secondary text and metadata (warm stone) |
| `--color-primary` | `#2563EB` | Links and primary actions |
| `--color-primary-hover` | `#1D4ED8` | Hover state |
| `--color-border` | `#E7E5E4` | Dividers and subtle outlines (warm stone) |
| `--color-focus` | `#2563EB` | Keyboard focus indicator |

No semantic state colors (success/warning/error) are defined in §5/§6/§7. DESIGN.md §5 notes dark-mode colors should only be defined "if dark mode is supported intentionally" — see §5 below for the dark-mode decision.

### 1b. Typography scale (DESIGN.md §6) — 8 steps, exact px + names

| Token | Desktop size | Intended use |
| --- | --- | --- |
| `--text-hero` | 48px | Hero name / primary statement |
| `--text-h1` | 40px | Main page heading |
| `--text-h2` | 30px | Major section heading |
| `--text-h3` | 22px | Subsection heading |
| `--text-h4` | 18px | Card title / smaller heading |
| `--text-body` | 17px | Article body |
| `--text-small` | 14px | Supporting text |
| `--text-caption` | 13px | Metadata and captions |

Font family (DESIGN.md §6, verbatim):
```
--font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```
Font weights (§6): 400 regular / 500 medium / 600 semibold / 700 bold. Line heights (§6): headings 1.15–1.3, body 1.6–1.8, nav/buttons 1.4–1.5, metadata 1.4–1.6. Typography rule (§6): "Use responsive font sizing for large headings" — so h1/h2 must KEEP `clamp()` (use tokens as the clamp bounds, not fixed values).

### 1c. Spacing scale (DESIGN.md §7) — 9 steps, exact px

| Token | Value |
| --- | --- |
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-24` | 96px |

Note: design has NO `--space-0`, `--space-5`, or `--space-10`. Current code defines those three but they are UNUSED (grep confirmed `var(--space-0/5/6/8/10/12/16/24)` all = 0 usages; only `--space-2/3/4` are referenced, and their values already match the design). Safe to drop the unused ones and add the missing larger steps.

### 1d. Radius scale (DESIGN.md §7 "Shape and elevation") — semantic descriptions, not named

| Design description | Value | Token name (decision) |
| --- | --- | --- |
| Small control radius | 6px | `--radius-sm` |
| Card radius | 10px | `--radius-md` |
| Larger image / hero radius | 12px | `--radius-lg` |

DESIGN.md §7 does NOT name these tokens (it gives prose: "Small control radius: 6px / Card radius: 10px / Larger image or hero radius: 12px"). Decision: keep the existing `--radius-sm/md/lg` names and revalue them to 6/10/12px. The sm/md/lg naming maps naturally onto the small/card/larger descriptions and is the least invasive choice. §7 also says "Prefer subtle borders over heavy shadows. Use shadows only when they improve the visual hierarchy" — no shadow tokens are defined anywhere; none to add.

### 1e. Other §7 layout values (informational — not tokenized by Fix 1)

Max page container ~1200px; reading column 650–760px; sidebar ~240–300px; desktop article/sidebar gap 32–48px; desktop grid gap 24px; mobile page padding 20px (16px compact); desktop page padding 32px. These are prose guidelines, not named tokens; current code uses hardcoded rem (`max-width: 72rem` etc.). OUT OF Fix 1 scope — PRESERVE.

---

## 2. Currently-defined tokens in `src/styles/tokens.css` (full inventory)

```
--bgColor-default: #ffffff;
--fgColor-default: #111827;
--accent: #2563eb;
--muted: #6b7280;
--border: #e5e7eb;
--surface: #f9fafb;
--bgColor-default-dark: #111827;
--fgColor-default-dark: #f9fafb;
--border-dark: #374151;
--surface-dark: #1f2937;
--font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
--font-family-mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
--space-0: 0; --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem; --space-4: 1rem;
--space-5: 1.5rem; --space-6: 2rem; --space-8: 3rem; --space-10: 4rem;
--radius-sm: 0.25rem; --radius-md: 0.5rem; --radius-lg: 0.75rem;
--transition-fast: 150ms ease-in-out;
--transition-medium: 200ms ease-in-out;
```
Plus rules in tokens.css: `.sr-only`, `.skip-link`, `.btn`, `.btn:hover { background: #1d4ed8; }`, `.btn:focus { outline: 2px solid var(--accent); outline-offset: 2px; }`, `.btn--secondary`, `.btn--secondary:hover`.

---

## 3. Old → new name mapping table (confirmed against DESIGN.md)

| Old token | New token | New value | Notes |
| --- | --- | --- | --- |
| `--bgColor-default` | `--color-background` | `#FAFAF9` | page background (warm off-white) |
| `--surface` | `--color-surface` | `#FFFFFF` | cards/surfaces (white) |
| `--fgColor-default` | `--color-text` | `#1C1917` | primary text |
| `--muted` | `--color-text-muted` | `#57534E` | secondary text |
| `--accent` | `--color-primary` | `#2563EB` | links/primary actions |
| `--border` | `--color-border` | `#E7E5E4` | dividers |
| hardcoded `#1d4ed8` (`.btn:hover`) | `var(--color-primary-hover)` | `#1D4ED8` | new token `--color-primary-hover` |
| `var(--accent)` in `:focus` outlines | `var(--color-focus)` | `#2563EB` | new token `--color-focus`; see §5 |
| `--font-family-base` | `--font-sans` | `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | add `system-ui`, drop Roboto/Helvetica/Arial per DESIGN.md |
| `--radius-sm` (4px) | `--radius-sm` | `0.375rem` (6px) | revalue, keep name |
| `--radius-md` (8px) | `--radius-md` | `0.625rem` (10px) | revalue, keep name |
| `--radius-lg` (12px) | `--radius-lg` | `0.75rem` (12px) | value unchanged, keep name |
| spacing scale | spacing scale | 9-step design scale | see §1c; drop `--space-0/5/10`, add `--space-12/16/24` |
| *(none)* | `--text-hero` … `--text-caption` | 48…13px | new 8-token scale; see §6 |

Dark-mode variant renames (keep existing cool-gray VALUES; see §5):
| Old | New | Value (kept) |
| --- | --- | --- |
| `--bgColor-default-dark` | `--color-background-dark` | `#111827` |
| `--fgColor-default-dark` | `--color-text-dark` | `#f9fafb` |
| `--border-dark` | `--color-border-dark` | `#374151` |
| `--surface-dark` | `--color-surface-dark` | `#1f2937` |

---

## 4. Grep before-counts per old token name (source files only: *.css/*.njk/*.ts/*.js/*.html; excludes node_modules, _site, .agents, .github docs)

| Old token | Source ref count | Files |
| --- | --- | --- |
| `--bgColor-default` | 9 | tokens.css (6: decl + dark decl + dark override + .skip-link color + .btn color + dark decl), global.css (3: body bg line 18, .article-card__status? no — input bg line 625, .project-card__status color line 500, .project-status color line 750) |
| `--surface` | 24 | tokens.css (5: decl, dark decl, dark override, .btn--secondary bg, *(.btn uses accent not surface)*), global.css (19: card/surface backgrounds) |
| `--fgColor-default` | 20 | tokens.css (3: decl, dark decl, dark override), global.css (17: text colors) |
| `--muted` | 19 | tokens.css (1: decl), global.css (18: secondary text colors) |
| `--accent` | 22 | tokens.css (4: decl, .skip-link bg, .btn bg, .btn:focus outline), global.css (18) |
| `--border` | 28 | tokens.css (3: decl, dark decl, dark override + .btn--secondary border + .btn--secondary:hover bg), global.css (25: borders + 1 bg) |
| `#2563eb` (hardcoded) | 1 | tokens.css:5 (`--accent` declaration only — no other hardcoded usage) |
| `#1d4ed8` (hardcoded) | 1 | tokens.css:88 (`.btn:hover`) |
| `--font-family-base` | 2 | tokens.css (decl), global.css:19 (`font-family: var(--font-family-base)`) |
| `--font-family-mono` | 1 | tokens.css (decl only — UNUSED; no `var(--font-family-mono)` anywhere) |
| `--radius-md` | 2 | tokens.css (decl + `.btn { border-radius: var(--radius-md) }`) |
| `--radius-sm` / `--radius-lg` | 1 each | tokens.css (decl only — UNUSED in rules) |
| `var(--space-*)` usages | only `--space-2`, `--space-3`, `--space-4` are used (global.css lines 447–507); `--space-0/5/6/8/10/12/16/24` have 0 usages | — |

Only TWO source files reference any old token: `src/styles/tokens.css` and `src/styles/global.css`. No `.njk`, `.ts`, or `.js` source file references these tokens (CSS is consumed via `<link>` in `src/_includes/layouts/base.njk`).

---

## 5. The `--accent` → `--color-primary` vs `--color-focus` split (judgment)

The spec says use judgment: hardcoded `#2563eb` focus styling → `var(--color-focus)`, but "do not blindly replace every primary blue." There is only ONE hardcoded `#2563eb` (the `--accent` declaration itself, which becomes `--color-primary`). All focus styling uses `var(--accent)`, not hardcoded hex. So the focus split applies to `var(--accent)` in `:focus` contexts only:

→ `var(--color-focus)` (focus indicators, 2 occurrences):
- `src/styles/tokens.css:89` — `.btn:focus { outline: 2px solid var(--accent); outline-offset: 2px; }`
- `src/styles/global.css:754` — `.search-panel input:focus { outline: 2px solid var(--accent); outline-offset: 0; }`

→ `var(--color-primary)` (all other `--accent`, 19 occurrences): every link/accent color, border-left accent, `.skip-link`/`.btn` background, `.logo span`, hero subtitle, `.skill-category h3`, `.job .org`, `.article-card__category`/`.article-category`/`.search-type` text, `.project-card__status`/`.project-status` background, etc.

The new `--color-focus` and `--color-primary-hover` tokens are ADDED to the `:root` block in tokens.css (they do not exist yet).

---

## 6. Background/surface inversion fix

Current (inverted): page bg = `--bgColor-default` (#ffffff white); cards = `--surface` (#f9fafb light gray). Design wants page bg warm off-white (#FAFAF9) and cards white (#FFFFFF).

The rename + value adoption INVERTS this correctly with NO structural change, because the page already uses the "background" token and cards already use the "surface" token — only the token VALUES swap which is white vs off-white:
- `body` (`global.css:18`): `background-color: var(--bgColor-default)` → `var(--color-background)` = #FAFAF9. Page becomes warm off-white. ✓
- All card/surface rules use `var(--surface)` → `var(--color-surface)` = #FFFFFF. Cards become white. ✓

Locations of the page background (the one rule that must end up `--color-background`):
- `src/styles/global.css:18` — `body { background-color: var(--bgColor-default); }`

Locations of card/surface backgrounds that must end up `--color-surface` (all currently `var(--surface)`, mechanical rename): `global.css` lines 70, 145, 180, 207, 231, 257, 278, 314, 330, 386, 430, 442, 477, 513, 530, 600, 692, 706, 740, 777; plus `tokens.css:91` (`.btn--secondary`). All are surfaces/cards — correct to become white.

JUDGMENT CALL — `.search-panel input` (`global.css:625`): currently `background: var(--bgColor-default)` (white input on a white card). A mechanical rename would make it `var(--color-background)` = #FAFAF9 (off-white input on a white card), a subtle but unnecessary visual regression. Decision: route this one to `var(--color-surface)` so the input stays white (it is a contained field/surface, not the page background). This is the single non-mechanical `--bgColor-default` substitution. All other `--bgColor-default` usages (button/skip-link/status text on accent backgrounds — `tokens.css:69,80`, `global.css:500,750`) become `var(--color-background)` (#FAFAF9 light text on blue), which is correct and high-contrast.

Other background-related items PRESERVE / OUT OF SCOPE:
- `header { background: rgba(255,255,255,0.9) }` and its dark-mode `rgba(17,24,39,0.9)` (`global.css:54-60`) — hardcoded translucent header, not a token. PRESERVE (out of Fix 1 scope).
- `nav ul li a:hover { background: var(--surface) }` (`global.css:73`) → becomes `var(--color-surface)` = white (was light gray). Minor acceptable change (hover surface); keep mechanical rename. Note: header is translucent white, so a pure-white hover is subtly brighter than the header — acceptable, not a regression warranting scope expansion.
- `@media print { body { background: white } }` (`global.css` ~800) — hardcoded print style. PRESERVE.

---

## 7. `.btn:hover` hardcoded primary-hover location

- `src/styles/tokens.css:88` — `.btn:hover { background: #1d4ed8; }` → `.btn:hover { background: var(--color-primary-hover); }`
- New token `--color-primary-hover: #1D4ED8;` added to `:root`.

No other hardcoded primary-hover (`#1d4ed8`/`#1D4ED8`) exists in source (grep confirmed exactly 1 occurrence). No other `:hover` hardcodes a primary blue; secondary hovers use `var(--border)`/`var(--surface)` which are renamed mechanically.

---

## 8. Tokens to PRESERVE (not changed by Fix 1)

| Token / item | Value | Why preserved |
| --- | --- | --- |
| `--transition-fast` | `150ms ease-in-out` | DESIGN.md §5/§6/§7 define no transition tokens; out of Fix 1 scope. Used by `.skip-link`/`.btn`. |
| `--transition-medium` | `200ms ease-in-out` | Same as above. Used by `.btn`. |
| `--font-family-mono` | `"SFMono-Regular", Consolas, …` | DESIGN.md §6 defines only `--font-sans`; mono stack is separate and UNUSED (no `var(--font-family-mono)` reference). Keep name and value as-is. |
| Dark-mode VALUES (`#111827`/`#f9fafb`/`#374151`/`#1f2937`) | kept | DESIGN.md §5 says define dark colors "only if dark mode is supported intentionally"; it does not specify warm-stone dark values. Fix 1 is the LIGHT token-layer fix. Decision: RENAME the dark tokens to the new `--color-*-dark` names (so dark mode keeps working) but PRESERVE the existing cool-gray dark values. Reconciling the dark palette is a separate issue, not Fix 1. |
| `.sr-only` rule | — | Accessibility utility, unrelated to tokens. |
| `html { font-size: 16px }` | 16px | Root size; rem base. Keep (needed for rem math; design gives px which we express in rem at 16px base). |
| Hardcoded ad-hoc radii `0.5rem`/`0.25rem`/`1rem`/`50%`/partial corners in global.css | — | These are small-control/badge/pill/circle radii, NOT cards and NOT the radius-scale tokens. Fix 1 names only "cards at 10px" as a component outcome. Changing every small radius to 6px is a broader visual change not required by the issue. PRESERVE. |
| §8 breakpoints, container widths, shadows | — | Not named tokens in DESIGN.md; out of scope. |

---

## 9. Radius reconciliation (component outcome: cards at 10px)

Token layer (in tokens.css `:root`):
- `--radius-sm: 0.375rem;` (6px — was 0.25rem/4px)
- `--radius-md: 0.625rem;` (10px — was 0.5rem/8px)
- `--radius-lg: 0.75rem;` (12px — unchanged)

Component layer — card/surface containers currently hardcode `border-radius: 0.75rem` (12px) and must become 10px. Replace each with `var(--radius-md)` (now 10px), which both fixes "cards at 10px" and introduces token usage (token-layer aligned). The 7 occurrences in `global.css`:
- line 259 `.working-on li`
- line 280 `.skill-category`
- line 316 `.learning-item`
- line 332 `.project-card` (first definition, padding:1.5rem)
- line 432 `.article-card`
- line 479 `.project-card` (second/flex definition)
- line 741 `.search-panel`

(All `border-radius: 0.75rem` in global.css are card/surface containers — none are "larger image/hero" elements, so none should stay 12px. The hero avatar uses `border-radius: 50%` (circle); article/project covers set no radius. `--radius-lg`/12px therefore becomes defined-but-currently-unused, which is fine — it completes the 6/10/12 scale for future larger images.)

`.btn` uses `var(--radius-md)` (tokens.css:82). With the revalue it becomes 10px (was 8px). DESIGN.md §7 calls buttons "small controls" (6px), but Fix 1 does not name button radius as an outcome and the design's 6px-for-controls is a guideline. Decision: leave `.btn` on `--radius-md` (becomes 10px) — the side effect of the scale revalue is acceptable and re-tokenizing buttons is out of the named scope.

All other hardcoded radii in global.css (`0.5rem` controls at 140/385/710/748 and partial 71/208; `0.25rem` badges at 446/503/533/628/781; `1rem` pills at 347/515/602/694; `50%` circle at 224) are PRESERVED (§8) — not cards, not the radius-scale tokens.

---

## 10. Typography scale implementation (decision)

The 8 `--text-*` tokens do not exist yet. "Implement the full `--text-hero`…`--text-caption` px scale" means define the tokens AND make the heading/body rules consume them — a scale nothing references is not "implemented." DECISION (with rationale):

(a) Add to `tokens.css :root` (express px as rem at 16px base to match existing rem convention):
```
--text-hero: 3rem;      /* 48px */
--text-h1: 2.5rem;      /* 40px */
--text-h2: 1.875rem;    /* 30px */
--text-h3: 1.375rem;    /* 22px */
--text-h4: 1.125rem;    /* 18px */
--text-body: 1.0625rem; /* 17px */
--text-small: 0.875rem; /* 14px */
--text-caption: 0.8125rem; /* 13px */
```
(Use the px values from DESIGN.md §1b; rem is the codebase's existing unit. Either px or rem is acceptable; rem keeps consistency with the rest of tokens.css. Add the `/* Npx */` comments for auditability.)

(b) Apply the scale to the heading hierarchy and body in global.css, preserving responsive `clamp()` for the large headings (DESIGN.md §6: "Use responsive font sizing for large headings") by using tokens as the clamp bounds. Update BOTH duplicate base blocks (lines ~27-45 and ~113-128):
- `body` — add `font-size: var(--text-body);` (17px; was inherited 16px)
- `h1` — `font-size: clamp(var(--text-h1), 5vw, var(--text-hero));` (40px→48px responsive; was `clamp(2rem,5vw,3rem)` = 32px→48px)
- `h2` — `font-size: clamp(var(--text-h3), 4vw, var(--text-h2));` (22px→30px responsive; was `clamp(1.5rem,4vw,2rem)` = 24px→32px)
- `h3` — `font-size: var(--text-h3);` (22px; was 1.25rem/20px)
- `h4` — add `font-size: var(--text-h4);` (18px; h4 currently inherits, no explicit size)
- `.hero h1` (`global.css:236`) — set `font-size: var(--text-hero);` (48px) so the hero name uses the hero step (overrides the responsive h1 for the hero).

Rationale: this is the faithful reading of "implement the full scale" — each design step maps to its named element (h1→--text-h1, h2→--text-h2, h3→--text-h3, h4→--text-h4, body→--text-body, hero→--text-hero), and `clamp()` is retained for h1/h2 to honor §6's responsive-sizing rule. Expected rendered deltas (intended, not regressions): body 16→17px, h3 20→22px, h1 lower-bound 32→40px, h2 bounds 24-32 → 22-30px. `--text-small`/`--text-caption` are defined for use by metadata/captions in later fixes; Fix 1 defines them as part of the complete scale (no existing rule is forced onto them — leaving existing fixed rem on metadata is acceptable; converting every metadata font-size is out of scope).

---

## 11. Build / verification commands

From `package.json`:
- Build: `npm run build` → runs `prebuild` (`npm run build:config` → esbuild bundles `eleventy.config.ts` → `eleventy.config.js`) then `eleventy`. Output dir: `public` (per `eleventy.config.ts`). CSS is copied via `addPassthroughCopy({ "src/styles": "styles" })`.
- Typecheck: `npm run typecheck` → `tsc --noEmit`.
- There is NO test script and no test framework installed. Verification is build + typecheck + a static check that the built CSS contains the new tokens and no old token names remain.

Verification commands (run from WSL path `/home/milanshrestha/Sandbox/site/milanshrestha`):
1. `npm run typecheck` — must pass with no TS errors (confirms no accidental breakage; CSS isn't type-checked but the config build is).
2. `npm run build` — must complete, writing `public/styles/tokens.css` and `public/styles/global.css`.
3. After-build static checks (the real proof the rename is complete):
   - `grep -rn "var(--bgColor-default)\|var(--surface)\|var(--fgColor-default)\|var(--muted)\|var(--accent)\|var(--border)\|var(--font-family-base)\|#1d4ed8" src/styles public/styles` → must return ZERO matches (all old names + the hardcoded hover hex gone from source AND build output).
   - `grep -rn "var(--color-background)\|var(--color-surface)\|var(--color-text)\|var(--color-text-muted)\|var(--color-primary)\|var(--color-primary-hover)\|var(--color-border)\|var(--color-focus)\|var(--font-sans)\|var(--text-hero)\|var(--radius-md)" src/styles public/styles` → must return matches (new tokens present in source and build output).
   - `grep -n "border-radius: 0.75rem" src/styles/global.css` → must return ZERO matches (cards no longer 12px); `grep -n "var(--radius-md)" src/styles/global.css` → must show the 7 card rules now using the token.
   - `grep -n "background-color: var(--color-background)" src/styles/global.css` → the `body` rule (warm off-white page). `grep -n "background: var(--color-surface)" src/styles/global.css` → card rules (white cards).
   - `grep -n "color: var(--color-focus)" src/styles/tokens.css src/styles/global.css` → `.btn:focus` + `.search-panel input:focus`. `grep -n "var(--color-primary-hover)" src/styles/tokens.css` → `.btn:hover`.

(Per repo guidance, grep alone is not "verification" — but here there is no test runner, CSS has no type system, and the build is a static copy. The combination of a clean `npm run build` + the targeted greps proving old names are gone and new names/values are present in the BUILT output is the strongest available verification for a pure CSS token rename. Optionally run `npm run dev` and visually confirm the page is warm off-white with white cards, but that is not required for CI.)

---

## 12. Ordered implementation steps

- [ ] 1. Rewrite the `:root` token block in `src/styles/tokens.css`: replace the 6 old color tokens with the 8 `--color-*` tokens (warm-stone values); add `--color-primary-hover` (#1D4ED8) and `--color-focus` (#2563EB); rename the 4 `--*-dark` tokens to `--color-*-dark` (keep cool-gray values); rename `--font-family-base` → `--font-sans` with the DESIGN.md stack; revalue `--radius-sm/md/lg` to 0.375rem/0.625rem/0.75rem; replace the spacing block with the 9-step design scale (drop `--space-0/5/10`, add `--space-12/16/24`); add the 8 `--text-*` tokens. PRESERVE `--font-family-mono`, `--transition-fast`, `--transition-medium`, `.sr-only`.
      Files: src/styles/tokens.css
      Verify: `npm run build` succeeds; `public/styles/tokens.css` contains `--color-background: #FAFAF9`, `--color-primary-hover`, `--color-focus`, `--text-hero`, `--font-sans: system-ui`, `--radius-md: 0.625rem`, `--space-24`.

- [ ] 2. Update the `@media (prefers-color-scheme: dark)` block in `src/styles/tokens.css` to reference the renamed `--color-*-dark` tokens (keep the cool-gray values). Update the `.skip-link`/`.btn`/`.btn--secondary` rules: `var(--accent)`→`var(--color-primary)` (except `.btn:focus` outline → `var(--color-focus)`); `.btn:hover { background: #1d4ed8 }` → `var(--color-primary-hover)`; `var(--bgColor-default)`→`var(--color-background)` (skip-link/btn text); `var(--surface)`→`var(--color-surface)`, `var(--border)`→`var(--color-border)`, `var(--fgColor-default)`→`var(--color-text)`.
      Files: src/styles/tokens.css
      Verify: `grep -n "var(--accent)\|var(--bgColor-default)\|var(--surface)\|var(--border)\|var(--fgColor-default)\|var(--muted)\|#1d4ed8" src/styles/tokens.css` → ZERO matches; `grep -n "var(--color-focus)" src/styles/tokens.css` → `.btn:focus` only.

- [ ] 3. In `src/styles/global.css`, mechanically rename every token reference across the whole file (BOTH duplicate base blocks at ~27-45 and ~113-128): `var(--bgColor-default)`→`var(--color-background)`, `var(--surface)`→`var(--color-surface)`, `var(--fgColor-default)`→`var(--color-text)`, `var(--muted)`→`var(--color-text-muted)`, `var(--border)`→`var(--color-border)`, `var(--accent)`→`var(--color-primary)` (then fix the 2 focus outlines below), `var(--font-family-base)`→`var(--font-sans)`. This is one find/replace pass per old name.
      Files: src/styles/global.css
      Verify: `npm run build` succeeds; `grep -n "var(--bgColor-default)\|var(--surface)\|var(--fgColor-default)\|var(--muted)\|var(--accent)\|var(--border)\|var(--font-family-base)" src/styles/global.css` → ZERO matches.

- [ ] 4. Apply the two judgment edits in `src/styles/global.css`: (a) `.search-panel input` background `var(--color-background)`→`var(--color-surface)` (white input, §6 decision); (b) `.search-panel input:focus` outline `var(--color-primary)`→`var(--color-focus)` (§5 focus split). Confirm `.btn:focus` in tokens.css is already `var(--color-focus)` from step 2.
      Files: src/styles/global.css
      Verify: `grep -n "var(--color-focus)" src/styles/global.css` → `.search-panel input:focus` only; `grep -n "background: var(--color-surface)" src/styles/global.css | grep -A1 "search-panel input"` shows the input is white.

- [ ] 5. Reconcile card radii in `src/styles/global.css`: change the 7 `border-radius: 0.75rem;` occurrences (lines 259, 280, 316, 332, 432, 479, 741) to `border-radius: var(--radius-md);` (now 10px). Leave all `0.5rem`/`0.25rem`/`1rem`/`50%`/partial-corner radii untouched (PRESERVE, §8/§9).
      Files: src/styles/global.css
      Verify: `grep -n "border-radius: 0.75rem" src/styles/global.css` → ZERO matches; `grep -cn "var(--radius-md)" src/styles/global.css` → 7.

- [ ] 6. Apply the `--text-*` scale in `src/styles/global.css` (both base blocks): add `body { font-size: var(--text-body); }`; h1 `font-size: clamp(var(--text-h1), 5vw, var(--text-hero));`; h2 `font-size: clamp(var(--text-h3), 4vw, var(--text-h2));`; h3 `font-size: var(--text-h3);`; add `h4 { font-size: var(--text-h4); }`; `.hero h1 { font-size: var(--text-hero); }`. (§10.)
      Files: src/styles/global.css
      Verify: `npm run build` succeeds; `grep -n "var(--text-" src/styles/global.css` → shows h1/h2/h3/h4/body/hero using tokens.

- [ ] 7. Final verification (all of §11): `npm run typecheck` passes; `npm run build` writes `public/styles/*.css`; the old-name grep over `src/styles public/styles` returns ZERO; the new-name/radius/body/card greps confirm the inversion and card-10px outcomes in the BUILT output.
      Files: (no edits)
      Verify: see §11 commands; all must pass.

---

## Decisions summary (recorded for the implementer)

1. Radius token NAMES: keep `--radius-sm/md/lg`, revalue to 6/10/12px (DESIGN.md §7 gives prose, not names; sm/md/lg maps naturally). Cards → `var(--radius-md)` (10px). Small-control/badge ad-hoc radii left untouched (only "cards at 10px" is a named outcome).
2. Typography: define all 8 `--text-*` tokens AND apply to h1–h4 + body + hero, keeping `clamp()` for h1/h2 (DESIGN.md §6 requires responsive large headings). Express px as rem at the 16px root.
3. Spacing: adopt the 9-step design scale; drop unused `--space-0/5/10`, add `--space-12/16/24`. Only `--space-2/3/4` are used and their values are unchanged.
4. `--accent` split: 2 `:focus` outlines → `--color-focus`; all other 19 → `--color-primary`. Only 1 hardcoded `#1d4ed8` (`.btn:hover`) → `--color-primary-hover`; no other hardcoded primary blues exist.
5. Background/surface inversion is fixed purely by the rename + value adoption (page uses background token, cards use surface token). One judgment edit: `.search-panel input` background → `--color-surface` (white) instead of mechanical `--color-background` to avoid an off-white input on a white card.
6. Dark mode: RENAME dark tokens to `--color-*-dark`, PRESERVE existing cool-gray dark values (DESIGN.md specifies no dark warm-stone palette; dark reconciliation is a separate issue).
7. `--font-sans`: adopt DESIGN.md's exact shorter stack (adds `system-ui`, drops Roboto/Helvetica/Arial).
8. PRESERVE: `--transition-fast/medium`, `--font-family-mono` (unused), `.sr-only`, `html{font-size:16px}`, hardcoded translucent header/print styles, §8 breakpoints/container widths.

---

## Out of scope (Fix 2–10 and beyond) — do NOT touch

- Hardcoded `rgba` translucent header backgrounds and dark-mode header block (`global.css:54-60`).
- Print styles, `.sr-only`, all non-token hardcoded layout widths (`max-width: 72rem` etc.), breakpoints.
- Reconciling the dark-mode color VALUES to warm stone.
- Converting every metadata/caption fixed-rem font-size to `--text-small`/`--text-caption` (tokens are defined; mass conversion is a later pass).
- Re-tokenizing small-control/badge radii (`0.5rem`/`0.25rem`) to 6px.
- Anything listed under Fix 2–10 in `.github/issue-tracker/issue-2.md`.

---

Plan file: `.agents/tasks/fix-1-plan.md`
Source-code edits made during planning: NONE (investigation and planning only; no source file was modified).
