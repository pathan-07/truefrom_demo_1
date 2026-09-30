# Trueform Digital — Frontend Architecture

Scope: architecture plan only — no implementation yet. Sources: `docs/research.md`, `docs/sitemap.md`, `design.md`, `docs/decisions.md`, `docs/backend.md`, `docs/qa.md`. Nothing below introduces facts beyond those documents; site content is data-driven from one config file so unverified claims cannot leak in.

## 1. Rendering Strategy

- **Everything is static.** 5 routes, no async data, no CMS, no auth (per `docs/backend.md` scope). Default static prerendering at build time; no ISR, no revalidation, no edge runtime, no middleware.
- **Server Components by default everywhere.** Client boundaries are limited to the contact form and the small React Bits `BlurText` hero enhancement. The pricing toggle and mobile nav are CSS-only (decisions D4, design.md §5.1), so they add zero client JS.
- Target: a production build where the initial JS payload is essentially Next.js runtime + form code only.

## 2. Route & Page Organization

Mirrors `docs/sitemap.md` exactly — 5 routes, no route groups, no dynamic segments, no parallel/intercepting routes (nothing here needs them).

```
app/
├── layout.tsx          # root layout: <html lang="en">, header, footer
├── globals.css         # the ONE stylesheet (tokens + components)
├── page.tsx            # /
├── not-found.tsx       # 404
├── error.tsx           # root error boundary (client, per Next requirement)
├── services/page.tsx   # /services
├── packages/page.tsx   # /packages
├── about/page.tsx      # /about
├── contact/page.tsx    # /contact
├── sitemap.ts          # static sitemap from route list
├── robots.ts           # allow all in production
└── icon/logo assets referenced from /public
```

No `(marketing)` group — a single shared layout serves all 5 routes. No `template.tsx` (no per-navigation work, no animation requiring remount). No `app/api/*` — the form integration boundary is defined in §13 and only materializes if a provider is chosen.

## 3. Layout Structure

Single root layout (`app/layout.tsx`), Server Component:

- `<html lang="en">` + system font stack on `<body>` (no `next/font` — design.md §3 forbids a webfont).
- Skip-to-content link → `<main id="main">`.
- `<Header />` (sticky, 4rem, `--ink-soft` @ 90% + `backdrop-filter: blur(8px)`).
- `{children}` inside `<main>`.
- `<Footer />` (brand + tagline, nav, contact links, pricing small-print).
- Static `metadata` export with `title.template: '%s | Trueform Digital'`; pages override title/description.

No page-level layouts — all 5 pages share the same chrome; adding nested layouts would be unrequested structure.

## 4. Component Architecture

Complete component set = design.md §5 (9 patterns), nothing beyond it. All are Server Components unless noted.

```
components/
├── header.tsx        # logo (next/image) + wordmark, nav, WhatsApp CTA, CSS-only mobile menu
├── footer.tsx
├── hero.tsx
├── service-card.tsx  # icon (inline SVG, --cyan) + H3 + body
├── package-card.tsx  # name, ₹ + $ ranges (both rendered, CSS-toggled), inclusions, CTA
├── process-steps.tsx # 6 numbered steps from data
├── cta-button.tsx    # renders <a>; variant: primary (gradient) | secondary (outline)
├── cta-bar.tsx       # repeated pre-footer band on every page
├── contact-form.tsx  # 'use client' — form validation/submission state
├── react-bits/
│   └── blur-text.tsx # 'use client' — restrained hero reveal adapted from React Bits
└── whatsapp-link.tsx # thin wrapper around lib/contact builder w/ aria-label
```

Rules:

- **Content lives in `lib/content.ts`** (typed constants: packages with both currency ranges, process steps, services, contact details). Pages and components render from it — verified facts exist in exactly one place; the content accuracy review (qa.md) diffs one file against `docs/research.md`.
- Inline SVGs only (checkmarks, icons, WhatsApp glyph). No icon library — a handful of SVGs doesn't justify a dependency.
- No props-drilling helpers, no context, no providers. There is no global client state to share.

## 5. Server vs Client Components

| Piece | Type | Why |
|---|---|---|
| All 5 pages, layout, header, footer, cards, process, CTA bar | Server | Static content; zero JS |
| Currency toggle | Server-rendered markup | Real `<fieldset>` + radios; `:checked ~` sibling selectors swap ₹/$ text (D4). No JS. |
| Mobile nav | Server-rendered markup | `<details>`/checkbox + CSS slide-down (design.md §5.1). No JS. |
| Contact form | Client (`'use client'`) | Needs validation feedback + submission state. Leaf boundary — the `/contact` page itself stays a Server Component and renders `<ContactForm />` as a child. |
| Hero `BlurText` | Client (`'use client'`) | React Bits copy-paste enhancement for the tagline reveal; reduced-motion aware and isolated to the hero. |

No `Suspense` islands — no async work. `next build` output should list every route as static (`○`).

## 6. CSS Custom Property Strategy

One stylesheet, `app/globals.css`, imported once by the root layout (D3 — no Tailwind, no CSS-in-JS, no CSS modules; single shared namespace is fine at ~9 components, and cascade layers aren't needed either).

Structure, in order:

1. `:root` — every token from design.md §2–§4 as custom properties (colors, type scale clamp values, spacing scale, radius, header height). Nothing hard-coded elsewhere; any raw hex/px in component CSS is a review failure.
2. Minimal reset + element defaults (`body`, headings, `a`, `img`, `form` controls).
3. Layout primitives (`.container` 72rem max, section rhythm `clamp()` padding, auto-fit card grid) as small reusable classes.
4. Component classes (`.header`, `.card`, `.package-card`, …), BEM-lite naming, flat selectors.

At build time the CSS is hand-written; PostCSS/autoprefixer comes free with Next — no extra pipeline.

## 7. Trueform Color Tokens

Transcribed verbatim from design.md §2 into `:root`:

```css
--ink: #0B0E14;        /* page bg, footer */
--ink-soft: #151A24;   /* cards, header, form fields */
--paper: #F5F7FB;      /* primary text */
--text-dim: #A9B4C7;   /* secondary text (AA on --ink) */
--cyan: #19B7F1;       /* links, icons, active states */
--blue: #1678F2;       /* primary actions */
--indigo: #4E5DF2;     /* gradient midpoint only */
--violet: #743CF0;     /* gradient end only */
--line: #2B3445;       /* borders */
--gradient: linear-gradient(135deg, var(--cyan), var(--blue), var(--violet));
--success: #3ECF8E;
--error: #F0644D;
```

Dark-only theme (D1): no `prefers-color-scheme` fork, no theme toggle, no `data-theme` attribute. Gradient usage is restricted to primary CTAs and the hero accent span — enforced by review, not by code.

## 8. Typography & Responsive Strategy

- **Fonts:** system stack only (design.md §3, D2). No `next/font`, no font loading, zero CLS from fonts.
- **React Bits:** use only the adapted `BlurText` component in `components/react-bits/`; do not add the full React Bits catalog or WebGL backgrounds. The `motion` dependency is intentional and limited to this hero reveal.
- **Scale:** the 5-step fluid scale from design.md §3 as custom properties (`--text-display` … `--text-small`), applied to `h1`/`h2`/`h1`-class elements; body min `1rem`; paragraphs `max-width: 65ch`.
- **Responsive:** mobile-first; exactly two media queries (`48rem`, `64rem`) per design.md §4. Card grids use `repeat(auto-fit, minmax(18rem, 1fr))` and need no breakpoints at all. Container queries: skip — `auto-fit/minmax` already covers the card rows and support is not yet universal enough to rely on.
- Mobile behaviors: nav collapses below 48rem into the CSS dropdown; hero CTAs stack full-width; package cards stack; maintenance card spans full width; all targets stay ≥ 44×44px (qa.md matrix 320→1440px).

## 9. Image & Asset Handling

- `next/image` for every content image (qa.md: never plain `<img>`). Explicit `width`/`height` from the source files — no layout shift, stable dimensions.
- Assets live under `public/`: `logo` (from `assets/logo.jpeg` — re-export as compressed WebP/AVIF at build prep; dimensions fixed in `lib/content.ts`). Header logo is small and fixed-size (32–40px tall).
- The two brochures (`indian_brochure.jpeg`, `international_brochure.jpeg`) are **not planned as page imagery** — their content is unverified (research.md §Working Assets) and the pricing data is already rendered as text. Do not embed them until visually confirmed against the package tables.
- Hero decorative block: pure CSS (`--ink-soft` + `--line` border) per design.md §5.2 — no mockup image needed.
- Favicon/app-icon from the logo via `app/icon.png` conventions.

## 10. Metadata & SEO Structure

- Root layout: `metadata` export — `metadataBase` from `NEXT_PUBLIC_SITE_URL`, title template, verified description ("Trueform Digital — professional website development. Design that works, results that last."), Open Graph using the approved logo asset only.
- Each page: static `metadata` export (no `generateMetadata` — no dynamic data; static export is strictly simpler and statically typed). Titles/descriptions use only verified keyword themes (research.md SEO Observations): website development, responsive design, custom UI, basic SEO, CMS integration, maintenance, India + international.
- `app/sitemap.ts`: the 5 routes, hardcoded from the same route list. `app/robots.ts`: allow all, point at sitemap.
- **No JSON-LD structured data.** Every rich-result type (Organization with awards, AggregateRating, Review…) would require facts that are UNKNOWN per research.md. Plain metadata is the honest ceiling. `<!-- ponytail: no structured data — add LocalBusiness/Organization schema only if real verifiable facts exist -->`
- Canonical URLs derive from `metadataBase` automatically.

## 11. WhatsApp & Email CTA Architecture

Per `docs/backend.md` §Required Contact Paths — generated from config, never scattered:

- `lib/contact.ts` (server-safe, no secrets):
  - Reads `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits `919328731251`) and `NEXT_PUBLIC_CONTACT_EMAIL`, falling back to the verified literals so the site builds with no `.env` (backend.md acceptance criteria).
  - `whatsappUrl(message?)` → `https://wa.me/${number}?text=${encodeURIComponent(msg)}`; `mailtoUrl()` → `mailto:` link. Two message presets: general enquiry ("Hi, I'm interested in a website for my business") and package-specific ("Hi, I'd like a quotation for the {Package} package" — design.md §8 /packages).
- `<WhatsAppLink>` / `<CTAButton>` consume the builder. WhatsApp links carry `aria-label` with full number + context (design.md §6). Email appears as `mailto:` in footer and `/contact`.
- CTA placement per design.md: header, hero, end-of-page CTA bar (every page, shared component), footer — never more than one scroll from contact.

## 12. India / International Pricing Toggle

D4, CSS-only, no JS:

- `/packages` renders a `<fieldset>` with two real `<input type="radio" name="currency">` (India ₹ checked by default) above the pricing grid.
- Each price renders **both** values as sibling `<span class="price-inr">` / `<span class="price-usd">`; the radios are hoisted so `:checked ~` sibling selectors show one set and hide the other. Hidden set uses `display:none` (also removes it from the accessibility tree — correct, since it's redundant text).
- Data shape in `lib/content.ts`: `{ name, inr: '₹13,000–₹20,000', usd: '$350–$400', includes: [...] }` — one source object per package; card component renders both spans. Maintenance is a separate wide card with the same pattern.
- Standing honesty note (ranges, per-quotation, in writing) renders once below the grid — not per card.
- Keyboard/screen-reader complete because they're real radios in a fieldset with legend + labels (qa.md §Packages).

## 13. Contact Form Integration Boundary

Per `docs/backend.md` — the form is a **planned seam, not built infrastructure**:

1. **Component:** `<ContactForm />` on `/contact`, the sole Client Component. Client-side validation: `required`, `type="email"`, `maxLength`, native constraint validation + visible error text styled with `--error`. Server Action (`app/contact/actions.ts`, `'use server'`) with progressive enhancement so the form works with JS disabled.
2. **Server validation:** same rules re-checked in the action; length-limited, no HTML injection (React escapes by default; never `dangerouslySetInnerHTML` on submitted text).
3. **Delivery provider:** env-configured (`CONTACT_FORM_ENDPOINT`, `CONTACT_FORM_SECRET`), server-only, never in the client bundle. **Until a provider is approved, the action returns the "email us directly" state** — the form still renders, and email/WhatsApp links sit directly beneath it (backend.md: "The site still builds and renders if no form provider is configured"). Success/failure states are generic; nothing provider-specific leaks.
4. **Fields (exactly the verified sales workflow):** name, business name, email or phone/WhatsApp, requirements, budget range (select with package ranges), timeline. Labels always visible, max-width 36rem, single column (design.md §5.8).
5. No response-time promises, no CAPTCHA until spam demands one, no analytics.

## 14. Accessibility Requirements

Mapping design.md §6 + qa.md §Accessibility into architecture (all verifiable in review/axe):

- One `<h1>` per page; `<main>`, `<nav>`, `<section>+h2` semantics; skip-to-content link in root layout.
- `:focus-visible` outline (2px `--cyan`, 2px offset) on every interactive element, defined once in globals — never overridden.
- Currency toggle and budget select are real form controls; mobile nav is keyboard-operable (`<details>` natively is).
- Tap targets ≥ 44×44px with ≥ 8px gaps; CTA button min-height 44px is in the shared class.
- Motion: all three allowed effects hover/reveal/nav-slide wrapped under `prefers-reduced-motion: no-preference`; `reduce` gets zero animation (D6). Section reveal uses `animation-timeline: view()` inside `@supports`, static fallback — no IntersectionObserver, no JS.
- Color: only the verified AA pairs from design.md §6; white text on gradient limited to ≥ 1rem semibold CTA labels.
- `alt` on meaningful images (logo: "Trueform Digital"), `alt=""` on anything decorative.

## 15. Loading & Error Boundaries

There is no async work to wait on — so:

- **No `loading.tsx` anywhere.** Static routes render instantly; a spinner would be decoration. (The skill's MUST-DO targets segments "that perform async data fetching" — none exist.)
- `app/error.tsx` (root): one Client Component — mandated by Next, generic message + `reset()` button + direct contact links (failure must never strand a lead). No per-route error boundaries; a route-level failure is not more recoverable than root-level here.
- `app/not-found.tsx`: Server Component, message + links home and to `/contact`.
- Form failure is handled in-form (generic error state, §13), not via error boundaries.
- `<!-- ponytail: single root error boundary — add route-level boundaries only if a future route gains async work -->`

## 16. Deployment & Build Validation

- **Stack:** Next.js 14+ App Router, TypeScript `strict`, ESLint `next/core-web-vitals`, and `motion` for the isolated React Bits `BlurText` enhancement. Anything else needs justification against this doc.
- **Env:** `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_WHATSAPP_NUMBER` (public by design); `CONTACT_FORM_ENDPOINT`/`CONTACT_FORM_SECRET` server-only and **absent until a provider is approved**. `.env*` gitignored; nothing real committed.
- **Validation before release** (maps to qa.md §Release Gate):
  1. `npm run build` — zero type errors, zero warnings; all 5 routes show as static.
  2. `npm run lint`.
  3. Responsive pass at 320/375/768/1024/1440 — no horizontal scroll, toggle + nav + form usable.
  4. Keyboard-only walkthrough of all routes + axe scan, zero high-severity findings.
  5. Lighthouse mobile + desktop; check LCP/CLS/INP with real assets; confirm the currency toggle and nav ship no client JS (inspect build output).
  6. Content accuracy review: diff `lib/content.ts` and all copy against `docs/research.md` VERIFIED facts; reject anything in the UNKNOWN list.
  7. Link check: header/footer/CTA hrefs resolve; `wa.me` URLs decode to the verified number and messages.
- **Deploy target:** Vercel (or any static-capable Node host) — no special config in `next.config.js` expected beyond defaults; keep it near-empty.

## 17. Deliberately Not Built

- No CMS, database, auth, blog, portfolio, testimonials, FAQ page, social links, map (research.md UNKNOWN list / backend.md non-requirements).
- No Tailwind, icon library, broad component library, WebGL background, state library, theme system, or analytics. React Bits `BlurText` plus `motion` is the single approved animation exception.
- No route groups, dynamic routes, parallel routes, templates, middleware, route handlers (until form provider), `loading.tsx`, `next/font`, `generateMetadata`, JSON-LD.

Add any of the above only when a new verified requirement names it.
