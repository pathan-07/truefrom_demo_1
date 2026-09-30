# Trueform Digital - Backend Requirements

## Scope

The first release is a content-first marketing website for Trueform Digital. It does not require a database, authentication, CMS, dashboard, payment processing, booking system, or custom CRM.

The backend surface should remain minimal and should not delay the public website.

## Required Contact Paths

### WhatsApp

- Primary contact path: WhatsApp link to `+91 9328731251`.
- Generate the URL from configuration rather than scattering the number through components. The single configuration location is `lib/contact.ts`, which reads `NEXT_PUBLIC_WHATSAPP_NUMBER` / `NEXT_PUBLIC_CONTACT_EMAIL` and falls back to the verified literals (`919328731251`, `trueform.digitals@gmail.com`) so the site builds and all CTAs work with no `.env` present.
- Use the international digits in the `wa.me` URL: `919328731251`.
- URL-encode prefilled messages.
- Support a general enquiry message and a package-specific message.
- Do not expose private credentials; the public business number itself is verified source content.

### Email

- Secondary contact path: `trueform.digitals@gmail.com`.
- Use a `mailto:` link where appropriate.
- Keep the address in one content/configuration location.

## Contact Form Decision

A contact form is planned for `/contact`, but it must not introduce custom infrastructure unless a concrete delivery provider is selected.

Preferred first implementation:

1. Validate fields in the browser for immediate feedback (native constraint validation in the single `<ContactForm />` client component).
2. Submit through a Server Action (`app/contact/actions.ts`, `'use server'`) with progressive enhancement so the form also works with JavaScript disabled. A Route Handler is NOT used — one mechanism only.
3. Validate all fields again inside the action (server-side, length-limited).
4. Send through an approved transactional email/form provider configured by environment variables. If no provider is configured, the action does not accept or store the submission (no database exists); it returns an honest "please contact us directly" state pointing at the email/WhatsApp links shown below the form. Never fake a success.
5. Return a generic success or error state without exposing provider details.

Required fields should be limited to the verified sales workflow:

- name
- business name
- email or phone/WhatsApp
- requirements
- budget range
- timeline/context

Do not promise a response time unless one is approved separately.

## Environment Configuration

Use server-only variables for provider credentials and private configuration. Suggested names:

```text
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_CONTACT_EMAIL
NEXT_PUBLIC_WHATSAPP_NUMBER
CONTACT_FORM_ENDPOINT
CONTACT_FORM_SECRET
```

Only values intentionally needed in browser links may use the `NEXT_PUBLIC_` prefix. Never commit real secrets or `.env` files.

## Explicit Non-Requirements

- No database or customer records in the first release.
- No user accounts or authentication.
- No Calendly, Cal.com, or custom appointment scheduler.
- No payment collection or checkout.
- No public portfolio or testimonial API.
- No analytics integration until a provider and consent approach are approved.

## Security and Privacy

- Validate and length-limit all submitted fields.
- Escape or safely render submitted text; never inject raw HTML.
- Add rate limiting or provider-side spam protection when a form endpoint is enabled.
- Do not log full visitor messages, phone numbers, or provider secrets.
- Use generic error responses so provider failures do not leak implementation details.
- Keep contact links accessible and use HTTPS in production.

## Backend Acceptance Criteria

- A visitor can start a WhatsApp enquiry from every planned CTA.
- Package-specific WhatsApp messages contain the selected package and are correctly encoded.
- Email links open the verified Trueform address.
- No private credentials appear in client bundles.
- The site still builds and renders if no form provider is configured, with direct WhatsApp/email contact available.
