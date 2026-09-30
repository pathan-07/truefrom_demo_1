# Design Decisions

## D1 — Dark-only theme (2026-09-29)
Logo and both brochures are dark (`#0B0E14` ink family). Dark-only matches brand assets, halves token/testing surface, and reads premium for a development agency. No `prefers-color-scheme` fork. Revisit only if a client/brand need forces light mode; tokens are swap-ready.

## D2 — System font stack, no webfont (2026-09-29)
Brand tone is "clear, documented, no surprises." A webfont adds a render-blocking dependency for zero credibility gain. The logo image carries the wordmark identity. Revisit only if brand identity work introduces a required display face.

## D3 — Plain CSS over Tailwind (2026-09-29)
5 routes, ~9 components, one theme, static site. Tailwind's build step and utility sprawl cost more than they save at this size. Custom properties keep every token swappable.

## D4 — Currency toggle via CSS radio hack, not JS (2026-09-29)
India/International pricing is two sets of static text. `<input type="radio">` + `:checked` sibling selectors swap ₹/$ with zero JavaScript, stays keyboard/screen-reader accessible as a real fieldset. Default: India (₹) — primary audience.

## D5 — Pricing as ranges + "confirmed in writing" framing (2026-09-29)
Source docs forbid fixed prices (per-quotation model) and delivery guarantees. All prices render as ranges with a standing disclaimer; timelines use "typically/aim to." This honesty is positioned as the trust differentiator, per research.md redesign opportunities.

## D6 — Reveal animation: ship static if `animation-timeline` unsupported (2026-09-29)
Only three motion effects allowed (hover transitions, section reveal, mobile nav slide). Reveal uses CSS `animation-timeline: view()` where supported with a static fallback — no JS scroll observers. Reduced-motion kills all three unconditionally.

## D9 — React Bits hero enhancement (2026-09-29)
The implementation uses the official React Bits `BlurText` pattern, adapted into `components/react-bits/blur-text.tsx`, for the hero tagline only. The `motion` dependency is intentionally limited to this client boundary. No WebGL backgrounds or broad React Bits catalog are included; reduced-motion users receive the static tagline.

## D7 — Contact form uses a Server Action, not a Route Handler (2026-09-29)
One submission mechanism only: `app/contact/actions.ts` with progressive enhancement so the form works without JS. With no approved provider configured, the action stores nothing and fakes nothing — it returns the direct-contact (email/WhatsApp) state. A Route Handler would be a second path to the same job; rejected.

## D8 — No structured data / JSON-LD (2026-09-29)
Every schema type with ranking value (reviews, ratings, awards, organization details) requires facts research.md classifies as UNKNOWN. Shipping markup built on invented facts is worse than none. Metadata API + sitemap/robots only. Revisit when real verifiable facts exist.
