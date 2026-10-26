# TranslateWala — international website

A working Next.js 16 App Router + TypeScript + PostgreSQL/Drizzle implementation for the proposed TranslateWala.com site. The existing TranslateWala.in property is not modified or redirected.

## Research and verified source material

All three supplied URLs were fetched and their underlying HTML/embedded service content inspected:

- https://www.translatewala.in/ — existing logo, red/blue wordmark, blue-led identity, human translation, Indian-language and GCC positioning.
- https://www.translatewala.in/web-design — responsive business and corporate sites, enquiry features, SEO foundations, e-commerce/custom projects. Its embedded package content was rechecked for this update. Published INR starting prices are now shown with explicit international-scope, currency, tax and third-party-cost confirmation; they are not presented as unconditional international offers.
- https://www.translatewala.in/social-media-handling — planning, post design, captions, platform management, reporting, Arabic content support and paid advertising. Organic and paid work are separated in the new content.

**Verified contacts:** `support@translatewala.in`; `+91 91673 00549` / `https://wa.me/919167300549`. The full number is repeated in the two service pages and telephone links. The home source also includes one malformed, shorter WhatsApp link; that inconsistent link is not used.

The original logo is retained under `public/images/translatewala-original.png`, with an optimized WebP derivative. Unverified ratings, review counts, customer quotes, project statistics, turnaround promises and blanket certification/embassy claims have not been carried over. Kannada and all language combinations are presented as enquiries subject to confirmation, not blanket availability claims.

## Information architecture: 27 pages

- `/` — international homepage
- `/translation-services`
- `/indian-language-translation`
- `/languages` — searchable/filterable language directory
- `/languages/malayalam`
- `/languages/tamil`
- `/languages/hindi`
- `/languages/telugu`
- `/languages/kannada`
- `/languages/bengali`
- `/languages/urdu`
- `/languages/punjabi`
- `/languages/marathi`
- `/arabic-translation`
- `/gcc-business-translation`
- `/industries`
- `/digital-solutions` — detailed digital-service overview
- `/packages` — website/social category tabs, eight packages and feature comparisons
- `/web-design`
- `/social-media-management`
- `/about`
- `/contact`
- `/request-a-quote`
- `/privacy-policy`
- `/terms-and-conditions`
- `/ar` — localized Arabic landing experience
- `/ar/request-a-quote` — Arabic form and confirmation

English and Arabic have separate root layouts, correct `html lang`, Arabic `dir=rtl`, logical-direction styles and self-hosted Arabic typography. Other service/detail pages are English-only; hreflang is emitted only for genuinely paired home and quote pages. Arabic copy is original draft localized content and still requires native-language/business approval before launch.

## Implemented functionality

- Responsive desktop, tablet and mobile layouts; original brand wordmark.
- Keyboard-accessible click navigation, mobile menu, locale switching, outside-click and Escape dismissal.
- Real image, self-hosted fonts for Indian scripts, optimized images and locally served assets.
- Language search and category filters, useful empty state, distinct language content.
- Six interactive GCC market tabs, including keyboard navigation; market and language enquiries open contextual WhatsApp conversations; optional brief URLs still support prefills.
- Direct WhatsApp-first header, hero, floating contact button, service, language, market and package CTAs. All use the verified number, with URL-encoded contextual drafts. No message is sent automatically.
- Eight separately described digital packages: four website and four social/advertising plans, based on verified source prices and inclusions. Paid campaign fees and media spend are explicitly separated.
- Expanded use cases, digital-service deliverables, distinct workflows, multilingual design guidance and service-specific FAQs.
- Native accessible FAQ and package-comparison disclosures; functional internal, phone, email and WhatsApp destinations.
- English and Arabic client-side AND server-side validation.
- `POST /api/inquiries`: JSON size/type/origin checks, honeypot, persistent email/network rate limiting, bounded field validation, explicit consent and UUID idempotency.
- Drizzle-backed PostgreSQL persistence with unique inquiry reference; no fake submission success.
- Duplicate retries return the same reference; no public inquiry-listing endpoint exists.
- The optional brief builder saves a real reference and prepares a WhatsApp handoff. Its success state explicitly says nothing has been sent automatically. A direct chat can bypass the form entirely; an email alternative is retained.
- The requested text-only, WhatsApp-first experience has no attachment fields, document-handling endpoint or disabled attachment notices. No customer files are written to storage.
- Unique metadata, canonical URLs, Open Graph image, semantic headings, breadcrumb structured data, Organization data using verified contacts, robots and a 27-page sitemap.
- Custom loading-failure and not-found experiences; security-related response headers.
- `/api/health` verifies the database connection.

## Local setup

1. Install dependencies using the environment's package installer or `npm install` outside this managed environment.
2. Set `DATABASE_URL` in `.env` to a PostgreSQL connection string. No client-exposed secret is required.
3. In a fresh managed sandbox, run the platform `build_and_start` tool first to bootstrap the environment; then apply `npx drizzle-kit push`.
4. Outside the managed sandbox, prepare PostgreSQL and apply the schema with Drizzle before accepting enquiries. Use reviewed migrations rather than ad-hoc schema push for production.
5. For ordinary local development, use `npm run dev`.
6. Validate with `npx next typegen`, `npm exec tsc -- --noEmit --pretty false`, and `npm run build`.

The managed preview is started with `build_and_start`, not by leaving a separate `next start` process running.

## Data model and operational boundaries

`src/db/schema.ts` defines `inquiries` and `inquiry_rate_limits`. Database interactions use `db` from `@/db` and Drizzle. Inquiry identifiers and references do not expose customer information. Consent version is `2026-01`.

Direct WhatsApp buttons work independently of the optional brief form. The brief builder stores project details, but does not notify staff automatically. The user reviews and sends the prepared message through WhatsApp. Database access is server-side; an optional CRM/admin integration can be added for an authorized operational workflow. No public admin screen or data export exists. Saving is never described as message delivery.

Rate limits are 15 valid attempts per reported network identifier per hour and 5 per email per hour. Confirm trusted proxy IP forwarding at deployment and add a reviewed CAPTCHA or equivalent abuse-control layer for a public launch. The implementation does not claim to provide a production WAF. Rate-limit records and inquiry records need an approved retention/deletion job; none is scheduled by this preview. No analytics or marketing cookies are installed.

## SEO research, not search-volume claims

Initial web research found business/workforce communication, personal documents, language-pair intent, and multilingual digital experience as relevant themes. Examples reviewed:

- https://www.globalizationpartners.com/2020/03/11/the-most-requested-languages-for-translation-in-the-gulf-region/ — qualitative Indian-language context only; not used as current population or volume evidence.
- https://quadrate.co.in/business-translation-dubai-arabic-global-language-experts/ — business-content search-intent examples, not copied or treated as verification of TranslateWala capabilities.
- https://linguidoor.com/arabic-website-localization-rtl-design-guide/ — RTL implementation considerations.
- https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

Candidate topics: Indian-language business translation in the UAE/Saudi Arabia; Malayalam and Tamil content for GCC audiences; Arabic–Malayalam, Arabic–Tamil and Arabic–Hindi language-pair enquiries; multilingual business websites; Arabic/English social content. No paid keyword-volume or competitive-difficulty tool was available. Validate these opportunities using Search Console, Keyword Planner or another approved tool by market and language. No thin city doorway pages were created. Official/legal search intent is treated separately and not used to imply credentials.

## Verified package reference

Website starting packages (INR): Basic ₹7,999; Business ₹14,999; Professional ₹24,999; E-commerce & Custom from ₹39,999. Social packages (INR/month): Basic Presence ₹1,999; Social Media Growth ₹4,999; Lead Generation ₹9,999; Enterprise custom proposal. Quantities and inclusions were rechecked in the two supplied service pages. No unverified delivery promise, free-trial offer, guaranteed reach or guaranteed leads is added.

WhatsApp click-to-chat follows the official documentation: https://faq.whatsapp.com/5913398998672934 . Buttons open a draft; the visitor must press Send.

## Asset credits

Hero photograph: Nithin Daison / Pexels, https://www.pexels.com/photo/dubai-skyline-with-iconic-burj-khalifa-at-sunset-34787060/ . The image is illustrative market photography, not a TranslateWala office or owned property.

Digital workspace photograph: Amina Filkins / Pexels, https://www.pexels.com/photo/crop-man-with-documents-and-laptop-at-table-5424636/ . This is illustrative editorial imagery, not a staff or client claim.

Brand wordmark: existing TranslateWala.in asset, preserved rather than replaced. Font files are self-hosted Google Fonts: Manrope and Noto Sans families for Arabic, Malayalam, Tamil, Devanagari, Telugu, Kannada, Bengali and Gurmukhi. Font license files are in `public/fonts/licenses`.

## Maintaining the new content

- `src/lib/packages.ts` owns the eight packages, verified starting prices, feature comparisons and package FAQs. Keep prices in INR unless the business explicitly approves another quote currency; do not imply an exchange-rate conversion.
- `src/lib/service-details.ts` contains the separate website and social-media guidance, workflows and FAQs.
- `src/components/expanded-content.tsx` provides the new translation use cases, digital package introduction, audience content and multilingual guidance.
- `src/lib/whatsapp.ts` centralizes properly encoded click-to-chat destinations; `WhatsAppLink` provides the shared button. Package/category choices are included in drafts, never sent automatically.
- `src/app/enhancements.css` contains the package, expanded-content and WhatsApp-first responsive design layer.
- The optional brief builder retains real database persistence and explicit consent. It is not necessary to use it before starting a WhatsApp chat.

## Repeatable quality checks

- `node scripts/qa.mjs` runs browser interaction, route, responsive layout, metadata and live inquiry/API checks against `http://localhost:3000`. Set `QA_BASE_URL` to test another same-origin deployment.
- `node scripts/a11y.mjs` runs axe-core WCAG A/AA checks across representative English/Arabic pages and mobile layouts.
- Browser binaries and OS libraries can be prepared with `npx playwright install chromium` and `npx playwright install-deps chromium` in a suitable test environment.
- QA creates explicitly marked `qa-* @example.com` inquiry records; remove only those test records after database verification. Screenshots and accessibility reports are written to `artifacts/`, not served publicly.
- Automated checks complement rather than replace manual keyboard, screen-reader, native Arabic and final device review.

## Required before production launch

- Confirm the registered operator/legal entity, address if legally required, applicable jurisdiction, privacy contact procedure, retention/deletion schedule and final legal notices. Review the current policy/terms drafts professionally.
- Confirm individual language-pair availability, specialist subjects, regional usage and any certified/official-translation credentials. Do not add claims without evidence.
- Approve English and Arabic copy with the business and a qualified native Arabic reviewer. Expand Arabic routes only when localized content is ready, then extend reciprocal hreflang.
- Approve final international quotes against the displayed INR starting packages, including domain/hosting terms, renewals, tax, language work, production, platform fees and any additional scope. No guaranteed ranking or advertising outcome is claimed.
- Optional: connect authenticated staff/CRM tooling or automatic email notifications if the business wants them. These are not required for the direct WhatsApp path. Use environment secrets and update privacy messaging before introducing additional processing.
- Configure the actual `.com` domain, DNS, TLS and hosting; nothing in this project deploys or redirects the `.in` website.
- Restrict database access, configure encrypted backups, production secrets, monitoring, trusted proxy settings, application security/CSP and abuse prevention.
- Run accessibility, browser/device, Core Web Vitals and end-to-end tests on the final hosting setup. Run a dependency audit and review inherited advisories before launch.
- Keep staging behind access control or deployment-level noindex rules. This project's canonical and sitemap target the intended public `.com` domain but do not indicate that DNS is connected.
- Add analytics or marketing services only after privacy/consent review. There are no invented testimonials, client logos, awards or office locations to remove.
