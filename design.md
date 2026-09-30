# Trueform Digital — Design System

Single source of truth for all implementation. If a visual question isn't answered here, the answer is "simpler." Colors are grounded in `assets/logo.jpeg` (near-black canvas, blue accents) and harmonized with the programmatically extracted base `#0f1015` / accent `#3d91ff`.

## 1. Design Principles

1. **Clarity over cleverness** — every page answers "what is this, who is it for, what does it cost, what do I do next."
2. **Honest confidence** — only verified claims. Ranges not fixed prices, "targets" not guarantees, no testimonials/portfolio/metrics. Transparency IS the design differentiator.
3. **Conversion-aware** — WhatsApp CTA visible in header, end of every page, and footer; never more than one scroll from a contact path.
4. **Premium restraint** — dark canvas, generous whitespace, one gradient reserved for primary CTAs. Accents are seasoning, not wallpaper.
5. **Plain CSS implementable** — no component library, no JS for anything CSS can do.

**AVOID (hard rules):**
- Generic agency-template UI (hero blob, 3 glowing feature cards, marquee logos)
- Vague marketing language ("solutions that empower synergy")
- Excessive rounded cards (one radius scale, max 2px–12px, no pill-everything)
- Random gradients (only the defined brand gradient, only on primary CTAs and logo-adjacent moments — never body text, never every card)
- Visual clutter (max 2 font sizes and 1 accent per viewport region)
- Unnecessary animation (see §7 — 3 allowed effects, that's all)
- Unverified promises: no testimonials, no portfolio, no metrics, no client counts, no fixed prices, no delivery guarantees
- Future services (video editing, AI chatbots, automation) presented as current

## 2. Color Tokens

Dark theme is PRIMARY and ONLY — see decision below.

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0B0E14` | Page background, footer |
| `--ink-soft` | `#151A24` | Elevated surfaces: cards, header, form fields |
| `--paper` | `#F5F7FB` | Primary text on dark |
| `--text-dim` | `#A9B4C7` | Secondary text (AA on `--ink`) |
| `--cyan` | `#19B7F1` | Links, icons, active states, highlights |
| `--blue` | `#1678F2` | Primary actions, key emphasis |
| `--indigo` | `#4E5DF2` | Gradient midpoint only (rarely standalone) |
| `--violet` | `#743CF0` | Gradient end only |
| `--line` | `#2B3445` | Borders, dividers |
| `--gradient` | `#19B7F1 → #1678F2 → #743CF0` | Primary CTA buttons, hero headline accent, focus moments only |

**States:**
- Hover (buttons): darken 10% or shift `--blue` → `--cyan` gradient end; `transition: 150ms ease`
- Hover (cards/links): border-color `--line` → `--cyan`, no scale/shadow theatrics
- Focus-visible: `outline: 2px solid var(--cyan); outline-offset: 2px` — on every interactive element, no exceptions, never removed
- Success (form): `#3ECF8E` · Error: `#F0644D` — both AA against `--ink-soft`

**Dark/light decision: DARK-ONLY.** The logo and both brochures are dark; dark matches brand assets, one theme halves token/testing work, and agencies pricing premium packages read credibly on dark. No `prefers-color-scheme` fork. If a light mode is ever demanded, it's a token swap, not a redesign — but do not build it now.

## 3. Typography

**System font stack, no webfont** (performance + zero dependency):
```css
font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```
The brand tone is "clear, documented, no surprises" — a system stack is the honest match. Revisit only if brand identity genuinely requires a display face for the wordmark (it doesn't today; the logo image covers that).

**Type scale (5 steps, fluid):**

| Step | Size (clamp) | Weight | Line-height | Use |
|---|---|---|---|---|
| Display | `clamp(2.25rem, 1.6rem + 3vw, 3.5rem)` | 700 | 1.1 | Hero headline only |
| H2 | `clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem)` | 700 | 1.2 | Section titles |
| H3 | `clamp(1.15rem, 1rem + 0.6vw, 1.4rem)` | 600 | 1.3 | Card/package titles |
| Body | `1rem` (base) | 400 | 1.6 | Paragraphs, forms |
| Small | `0.875rem` | 400 | 1.5 | Captions, notes, pricing disclaimers |

Body text minimum `1rem`; small only for notes/legal-ish disclaimers. Mono for prices is unnecessary — tabular figures come free with system-ui. Max paragraph width: `65ch`.

## 4. Spacing & Layout

- **Spacing scale (rem):** `0.5, 1, 1.5, 2, 3, 4, 6, 8` — nothing outside the scale.
- **Max content width:** `72rem` (1152px); text blocks capped at `65ch`.
- **Section rhythm:** vertical padding `clamp(3rem, 2rem + 4vw, 6rem)` between sections; internal card padding `1.5rem` (mobile) → `2rem` (desktop).
- **Grid:** CSS Grid `repeat(auto-fit, minmax(18rem, 1fr))` for card rows (3 packages → 3-up desktop, stacked mobile). No 12-column framework.
- **Breakpoints — CSS-native where possible:** design mobile-first; use container queries for card grids if supported, else `@media (min-width: 48rem)` (tablet) and `@media (min-width: 64rem)` (desktop). Only two breakpoints exist in this design.
- **Header height:** `4rem` sticky, `--ink-soft` at 90% opacity with `backdrop-filter: blur(8px)`.

## 5. Components (complete set — nothing beyond this)

1. **Header** — Sticky, left: logo image + wordmark; center/right: 5 nav links; right: WhatsApp CTA button. Mobile: logo + hamburger (a pure CSS checkbox hack or minimal `<details>` is acceptable — no JS framework). Nav collapses below `48rem` into a full-width dropdown panel. Active page: `--cyan` underline.
2. **Hero** — Two-block: Display headline with tagline "Design that works, results that last." (gradient on "results that last" only — the one logo-adjacent gradient moment); subline = founder positioning one-liner; two buttons: WhatsApp (gradient, primary) + "View packages" (outline). Optional right-side: logo card or abstract device mock using `--ink-soft` + `--line` border. Mobile: headline → subline → CTA, stacked, CTA full-width.
3. **Service cards** — `--ink-soft` surface, `1px solid --line` border, radius `12px`, icon (inline SVG, `--cyan`), H3 + 2 lines body. Grid §4. No hover shadow; hover = border shift only.
4. **Package/pricing cards** — Three cards; middle (Business) gets `2px --cyan` border + "Most popular" chip. Contents: name, price range (Body-large), inclusion list (checkmark SVGs), CTA. **Currency:** radio-button toggle "India (₹) / International ($)" above the grid — two `<input type="radio">` + CSS `:checked` sibling selectors swap price text; no JS. Default: India (₹) — primary audience. Maintenance shown as a fourth wide card below, not a 4th column. Mobile: cards stack, toggle stays above.
5. **Process steps** — 6 steps as a numbered vertical list (desktop: 2×3 or 3×2 grid; mobile: single column). Number in `--cyan`, step name bold, one-line description. Timeline targets stated inline with "typically / aim to" wording. No connecting-line graphic — the numbers carry it.
6. **CTA button styles** — Primary: gradient background, white text (large/bold ≥ `1rem`, passes AA against mid-gradient), radius `8px`, padding `0.75rem 1.5rem`, min-height `44px`. Secondary: transparent, `1px --line` border, `--paper` text, same metrics. WhatsApp primary CTA always links to `wa.me/919328731251` with prefilled message.
7. **CTA bar** — Full-width section before footer: `--ink-soft` band, one line ("Tell me about your project — get a written quotation."), primary WhatsApp button + email link. Repeated on every page.
8. **Contact form** — Single column, max-width `36rem`. Fields: name, business name, email, phone/WhatsApp, requirements (textarea), budget range (select: package ranges), timeline note. Labels always visible above fields (no placeholder-as-label). Inputs: `--ink` field bg, `1px --line` border, radius `8px`, `44px` min height; focus = `--cyan` border + focus-visible outline. Submit = primary gradient button. Below form: email + WhatsApp as plain links, and a "What happens next" 3-line list.
9. **Footer** — `--ink` background, `--line` top border. Columns: brand + tagline; nav links; contact (email, phone/WhatsApp as `mailto:`/`wa.me` links). Small-print line: "Prices are ranges; final quotation depends on your requirements." No social icons (none exist).

## 6. Accessibility (non-negotiable)

- **Contrust:** WCAG 2.2 AA minimum. Verified pairs: `--paper`/`--ink` 15:1; `--text-dim`/`--ink` ≥ 4.5:1; white on `--blue` 4.6:1; `--cyan` used for text only at ≥ `1rem` semibold on `--ink` (4.6:1). Never white-on-gradient-midpoint text under `1rem`.
- **Focus:** visible `focus-visible` outline (§2) on every link, button, input, toggle. Keyboard order matches visual order. Skip-to-content link.
- **Motion:** all animation wrapped in `prefers-reduced-motion: reduce` → `transition: none; animation: none`.
- **Semantics:** one `<h1>` per page; sections use `<section>` + `<h2>`; toggle is a real `<fieldset>` with radio inputs; form inputs have `<label for>`; nav is `<nav>`; contact links are real `<a href>`.
- **Tap targets:** all interactive elements ≥ `44×44px`; adjacent targets ≥ `8px` apart.
- **Language:** `lang="en"`; WhatsApp links carry `aria-label` with full number.

## 7. Motion Policy

Three effects, total. CSS handles layout and navigation; React Bits `BlurText`
handles only the hero tagline reveal.

1. **Hover transitions** — color/border/background only, `150ms ease`. No transforms, no scale.
2. **Hero tagline reveal** — the adapted React Bits `BlurText` component reveals the tagline by word with a short blur/opacity transition. It is a single client boundary and must respect `prefers-reduced-motion`.
3. **Mobile nav panel** — slide-down `200ms ease`, GPU-cheap, no bounce.

Everything else is static. No parallax, no counters, no spinners on content, no scroll-hijacking, and no WebGL background effects.

## 8. Page-by-Page Layout

**`/` Home** — Hero (tagline headline, founder one-liner, WhatsApp + "View packages" CTAs) → Services summary (4-6 service cards: responsive design, custom UI, basic SEO, prototypes, CMS integration, maintenance) → Packages teaser (three price ranges, both currencies implied, link to `/packages`) → Process teaser (6 step names only) → timeline targets note ("prototype typically ~2 days, delivery typically 5–6 days — depending on scope") → CTA bar → Footer. Must stand alone for a skim-reader.

**`/services`** — H1 + intro → service scope cards (same components, fuller copy) → 6-step process with per-step detail → timeline targets ("aim to", "depending on scope, feedback, and materials") → domain & hosting policy note (customer owns accounts, pays third-party costs directly) → payment terms note (50% upfront / 50% on delivery, confirmed in writing) → CTA bar → Footer.

**`/packages`** — H1 + one-line framing ("Transparent starting ranges — final quotation after I understand your requirements") → currency toggle → 3 package cards (₹/$ ranges per §5.4) → maintenance wide card → pricing honesty note (ranges, per-quotation, in writing) → payment terms line → CTA bar → Footer. This is the strongest conversion page; the WhatsApp CTA here should prefill "Hi, I'd like a quotation for the [package] package."

**`/about`** — H1 → founder intro (Manan Sharma, first person, founder-led tone per sales scripts) → vision (trusted long-term relationships, quality/clarity/attention to detail) → current focus: website development → future services framed explicitly as future ("as we grow") or omitted → CTA bar → Footer. Short page is fine; honesty is the trust play.

**`/contact`** — H1 → contact form (§5.8) → direct links (email, WhatsApp) → "What happens next" (written proposal with package/features/price/timeline → approval → prototype) → Footer. No address, no map, no social.

## 9. Pricing Presentation

- **Ranges, never fixed prices.** Every price renders as a range (e.g., "₹30,000–₹40,000") with a standing note: "Starting ranges. Your final quotation depends on pages, design complexity, functionality, and scope — confirmed in writing before any work begins." (Per customer guide §5.)
- **Currency toggle** (§5.4): India (₹) default, International ($) secondary — matches the two brochures. International prices carry "starting guidelines for discussion" framing (team plan §6).
- **Maintenance** always shown as separate, optional, monthly (₹2,000–₹5,000 / $50–$100), never bundled into package prices.
- **Timeline as targets:** exact wording pattern "typically ~2 days for a prototype once your materials are ready" / "full delivery typically 5–6 days, depending on scope, feedback, and content." The words "guarantee/guaranteed" never appear near a number.
- **Payment terms** (50/50, in writing) appear on `/packages` and `/services` as a trust signal, not fine print.

## Implementation Recommendation

**Plain CSS (one stylesheet, custom properties above).** Tailwind would add a build step and utility-class sprawl for a 5-page static site with ~9 components and one theme — it does not reduce work here. Use CSS custom properties for every token so a future theme is a swap.
