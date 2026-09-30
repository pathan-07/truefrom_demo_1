# Trueform Digital - QA Strategy

## Quality Baseline

Test the five planned routes: `/`, `/services`, `/packages`, `/about`, and `/contact`.

The site must be tested against:

- `docs/research.md` for verified business facts
- `docs/sitemap.md` for route and content scope
- `design.md` for visual, responsive, accessibility, and motion rules
- `docs/backend.md` for contact and configuration behavior

## Functional Tests

### Navigation

- All header and footer links resolve to the planned routes.
- Active navigation state is correct.
- Mobile navigation opens, closes, and remains keyboard accessible.
- Skip-to-content link works.
- No links point to unsupported portfolio, testimonial, blog, social, or map pages.
- An unknown URL renders the `not-found` page with working links to `/` and `/contact`.
- The root error boundary renders a generic failure message and keeps WhatsApp/email contact links reachable; it must not expose stack traces or configuration details.

### Calls to Action

- WhatsApp CTAs use the verified number `+91 9328731251`.
- WhatsApp links use international `wa.me` formatting.
- General and package-specific prefilled messages are URL-encoded.
- Email links use `trueform.digitals@gmail.com`.
- CTA text does not promise guaranteed delivery, results, or response times.
- Every route exposes a WhatsApp contact path in header, hero or CTA bar, and footer (never more than one scroll away).
- Code review: all WhatsApp/email links are generated from the single contact configuration (`lib/contact.ts`); the raw number and address do not appear hardcoded in page or component files.

### Packages and Pricing

- India is the default currency view.
- International pricing can be selected with real radio inputs.
- Both currency views show the correct verified ranges.
- Maintenance is shown as optional and separate from development pricing.
- Pricing copy says ranges/starting guidelines and explains that final quotation depends on scope.
- No internal discount rules appear publicly.
- The toggle is a real `<fieldset>` with legend and two radio inputs; India (₹) is checked by default in the server-rendered HTML.
- The inactive currency's prices are excluded from the accessibility tree when hidden (e.g., `display: none`), so screen readers do not announce duplicate prices.
- The toggle swaps prices without JavaScript; disabling JS in the browser must not break it.
- Code review: each package's ₹ and $ ranges come from the same data object in `lib/content.ts` — no page contains hand-typed prices.

### Contact Form

- Required fields have visible labels and useful validation messages.
- Invalid email, excessive input, and empty required fields are rejected.
- Success and failure states are understandable and non-sensitive.
- Validation errors are visible next to the offending field and programmatically associated with it (not color-only, not toast-only).
- The form submits through the Server Action with JavaScript disabled (progressive enhancement); server-side validation still rejects invalid input.
- With no form provider configured, submissions are not stored and success is never faked; the action returns the direct-contact state pointing at email/WhatsApp.
- Submitted text is never rendered back as raw HTML.
- Field set is exactly the six verified fields (name, business name, email or phone/WhatsApp, requirements, budget range, timeline); no extra data is collected.
- The form remains usable if no provider is configured; direct contact links remain available immediately below it.
- Visitor messages and provider credentials are not printed to the console or shown in error output.

## Responsive Test Matrix

Test at minimum:

- 320px mobile
- 375px mobile
- 768px tablet
- 1024px desktop
- 1440px wide desktop

Verify:

- no horizontal scrolling
- no text or button overflow
- CTA buttons remain at least 44px high
- package cards stack cleanly on mobile
- currency controls remain readable and keyboard usable
- form fields fit their container
- header and mobile navigation do not overlap content
- the logo preserves useful cropping (brochure imagery is excluded per `docs/architecture.md` §9 until visually verified — if ever used, check its cropping too)

## Accessibility Tests

- Run keyboard-only navigation through every route.
- Confirm visible `:focus-visible` states on links, buttons, inputs, and radios.
- Confirm one meaningful H1 per page and logical heading order.
- Confirm semantic `nav`, `main`, `section`, and form labels.
- Confirm image alt text describes meaningful images; decorative images use empty alt text.
- Confirm color contrast meets WCAG 2.2 AA, including gradient buttons and cyan text.
- Confirm reduced-motion users receive no animation or transition.
- Confirm only the permitted motion effects exist (hover transitions, React Bits hero tagline reveal, mobile nav slide); no parallax, counters, WebGL background, scroll-hijacking, or other animation is present.
- Confirm WhatsApp links have an accessible label containing the destination context.
- Confirm `lang="en"` on the document.
- Run axe or an equivalent automated accessibility scan.

## SEO and Rendering Tests

- Every route has a unique, appropriate title and description through the Metadata API, following the root `%s | Trueform Digital` title template.
- Titles and descriptions use only verified keyword themes from `docs/research.md` (website development, responsive design, custom UI, basic SEO, CMS integration, maintenance).
- Canonical URLs, sitemap, and robots behavior are correct for production; sitemap lists exactly the five routes.
- Open Graph metadata uses only the approved Trueform logo/branding assets.
- No unsupported claims appear in metadata.
- No JSON-LD or other structured data is present (intentional — no verified facts support any schema type; see `docs/architecture.md` §10).
- Server-rendered content is present before client hydration, including default ₹ pricing.
- No hydration mismatch or console errors occur.
- Images use `next/image` and have stable dimensions; the logo carries meaningful alt text and decorative imagery uses empty alt.

## Performance Tests

- Run a production `next build` before release; confirm all five routes are prerendered as static content in the build output, with zero type errors or warnings.
- Confirm the site builds and renders with no environment variables set (contact config falls back to the verified literals).
- Inspect the client bundle: JavaScript is limited to the Next.js runtime and the contact form; server-rendered content components ship zero JS. No secret or server-only env value appears in client chunks.
- Confirm no unplanned runtime dependencies exist (no Tailwind, icon library, broad component library, WebGL library, state library, or additional animation library beyond the approved `motion` dependency used by React Bits `BlurText`).
- Check Lighthouse or equivalent measurements on mobile and desktop.
- Check LCP, CLS, and INP after real assets are integrated.
- Confirm no unnecessary client-side JavaScript for static content, the currency toggle, or mobile navigation.
- Confirm images are compressed and do not block the main content.

## Content Accuracy Review

Before release, compare every public fact against the source extracts. All site facts should originate from the single content file (`lib/content.ts`); review that file plus page copy directly against `docs/research.md`:

- company name, founder, tagline, email, and phone
- current service scope
- India and international package ranges
- maintenance pricing
- 50/50 payment terms
- six-step process
- prototype and delivery timelines described as targets only ("typically" / "aim to"; the words "guarantee/guaranteed" never appear near a number)
- domain and hosting ownership/cost policy
- future services (video editing, AI chatbots, automation) either absent or framed explicitly as future, never as current offerings

Reject or remove unsupported portfolio work, testimonials, client counts, awards, certifications, physical address, social links, guarantees, and fixed prices.

## Release Gate

Release only when:

- all planned routes render successfully
- TypeScript and lint checks pass
- production build passes
- no high-severity accessibility or functional findings remain
- contact CTAs work in production configuration
- content accuracy review is complete
- the Lead confirms the final result matches `design.md`
