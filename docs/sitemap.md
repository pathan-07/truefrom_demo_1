# Trueform Digital — Proposed Sitemap

Minimal, conversion-focused, 5 routes. No portfolio/testimonials/blog/team pages — none are backed by source material. Every content section below is VERIFIED in `docs/source-customer-guide.txt` or `docs/source-team-plan.txt`.

## Routes

### 1. `/` — Home
**Purpose:** Hook, positioning, route to pricing and enquiry.
**Sections (all verified):**
- Tagline: "Design that works, results that last."
- Founder intro: Manan Sharma, founder — helps businesses establish a professional online presence through modern, responsive, user-friendly websites
- Current service summary: website development (responsive design, custom UI, basic SEO, prototypes, CMS integration per scope)
- Quick process teaser (6 steps, named only)
- Timeline targets: ~2-day prototype, ~5–6-day delivery ("typically", not guaranteed)
- Primary CTA (see recommendation below) + WhatsApp/email links
- Footer: email, phone/WhatsApp

**Priority: highest — must stand alone for a visitor who reads nothing else.**

### 2. `/services` — Services & Process
**Purpose:** Explain what is offered and how a project runs.
**Sections (all verified):**
- Website development scope: responsive design, custom UI, basic SEO setup, prototypes, CMS integration (depending on package and project scope)
- The 6-step process in detail: Discovery → Quotation & Agreement → Prototype → Development → Review & Delivery → Maintenance
- Timeline targets with explicit "depending on scope, feedback, and materials" wording
- Domain & hosting policy: assisted setup, costs paid directly by customer, accounts stay under customer ownership
- Payment terms: 50% upfront / 50% on delivery, confirmed in writing
- CTA repeat

**Priority: high.** Keep /services and /packages separate? Both are short — could merge, but packages deserve their own page for quoting/linking. Keeping 5 routes is still minimal.

### 3. `/packages` — Packages & Pricing
**Purpose:** Transparent pricing; the strongest conversion page.
**Sections (all verified):**
- India pricing (₹): Starter ₹13,000–₹20,000 (1–3 pages, clean professional design, basic setup) · Business ₹30,000–₹40,000 (4–7 pages, responsive, basic SEO) · Professional ₹40,000–₹70,000 (custom UI, animations, CMS per scope)
- International pricing (USD): Starter $350–$400 · Business $450–$600 · Professional $700–$1,000 (same inclusions)
- Maintenance: ₹2,000–₹5,000/month (India) or $50–$100/month (international); optional, separate from dev fee, scope defined per proposal
- Note: prices are ranges; final quotation after requirements are understood ("from" pricing)
- CTA repeat

**Priority: highest.** Present both currencies (toggle or side-by-side) — matches the two brochures in `assets/`.

### 4. `/contact` — Contact
**Purpose:** Enquiry and contact details.
**Sections (all verified):**
- Enquiry form (name, business name, email/phone, requirements, budget range, timeline — mirrors the guide's customer questions: business name, products/services, new site or redesign, pages needed, features, materials ready, package/budget)
- Email: trueform.digitals@gmail.com
- Mobile / WhatsApp: +91 9328731251
- What happens next: proposal with package, features, price, timeline, payment terms → approval → prototype (matches closing script)
- **No physical address, no social links, no map** — none exist in sources.

**Priority: high — the conversion endpoint.**

### 5. `/about` — About
**Purpose:** Build trust via the founder-led story.
**Sections (all verified):**
- Founder: Manan Sharma
- Company vision: trusted digital solutions company, long-term customer relationships, quality/clarity/attention to detail
- Current focus: website development; future plans may include video editing, AI chatbots, automation (clearly framed as future — or omit entirely; recommending mention as "coming as we grow" is safe since it's verified as planned)
- **No team bios, no portfolio, no testimonials, no awards** — none exist.

**Priority: low-medium.** Could be folded into Home; keeping it separate preserves a thin, honest trust page. Drop to 4 routes by merging into Home if desired.

## Primary Conversion Action — Recommendation

**WhatsApp (+91 9328731251)**, with the contact form as the secondary path.

Rationale (all from sources):
- The sales guide's entire workflow is conversational — discovery questions, package recommendation, negotiation, closing script. WhatsApp maps 1:1 onto how the founder actually sells.
- WhatsApp is the single contact channel both docs label "Mobile / WhatsApp" — the customer guide expects message-based enquiries.
- A 5–6-day target delivery + requirements-dependent pricing means the fastest route to a quotation is a live chat, not a form round-trip.
- The contact form still exists on `/contact` for visitors who prefer email; form submissions route to trueform.digitals@gmail.com.

Implementation note: a `wa.me/919328731251` link with a prefilled "Hi, I'm interested in a website for my business" message; placed in header, all CTAs, and footer.

## Explicitly NOT in the Sitemap (no source backing)

- Portfolio / case studies — no client work exists yet
- Testimonials — none exist; team plan says to request them only AFTER completed projects
- Blog — no content, no stated content strategy
- Team page — only the founder is verified; role categories in the team plan are internal, not public claims
- Careers — nothing in sources
- FAQ page — the guides contain internal negotiation tips and discount rules that must NOT be public; there isn't enough public-safe Q&A material to justify a page (fold the 2–3 safe answers — payment terms, timeline targets, domain/hosting — into `/services` and `/packages` as short notes)
- Physical address / map — unknown
- Social media links — none exist
