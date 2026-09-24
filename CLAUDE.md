# Al Dhaid Commercial Village — قرية الذيد التجارية

Marketing website for a commercial village (shops, restaurants, cafés, services) in Al Dhaid, Sharjah, UAE.

## Stack & architecture (performance target: Lighthouse 100 on mobile, LCP < 1.5s, CLS 0, INP < 100ms)
- Latest stable Next.js (App Router) + TypeScript (strict) + Tailwind CSS (latest). pnpm.
- Arabic-first, RTL: `<html lang="ar" dir="rtl">`. Use Tailwind logical utilities (`ms-/me-/ps-/pe-/start-/end-`), never left/right. Structure i18n-ready (`/[locale]` later) but ship Arabic only now.
- **Static by default**: every page is prerendered (SSG). No database. Content lives in typed TS data files in `src/content/` (stores, categories, gallery, site config), so stores can be added without touching components.
- **Server Components by default.** Only these are client components, each kept tiny: mobile menu toggle, hero slideshow, destinations filter, form widgets. No UI libraries, no animation libraries, no jQuery/moment/lodash.
- **Images**: `next/image` everywhere, AVIF/WebP, explicit `sizes`, hero image `priority` + `fetchPriority="high"`, everything else lazy. Resize/compress originals from `materials/` before copying into `public/images` (see Decisions; sharp script once the project is scaffolded), max ~2560px wide.
- **Fonts**: `next/font` (self-hosted, `display: swap`, only the weights and subsets used: arabic + latin). Take the font family from Figma.
- **Hero slideshow**: preload only the first slide; lazy-load the rest; CSS opacity crossfade; pause when tab hidden (`visibilitychange`) and respect `prefers-reduced-motion`.
- **Destinations filter**: pre-group stores by category once at build time (`Record<Category, Store[]>`), so switching a chip is an O(1) lookup, no re-filtering. Keep the active filter in the URL (`?type=cafe`) so it's shareable.
- **Scroll animations**: one shared `IntersectionObserver` + CSS transitions; no scroll listeners.
- **Forms** (join/tenant + booking): Server Actions with `zod` validation on server and client, honeypot field + rate limit against spam; send via Resend (email) with the destination address from env vars. Success/error states in Arabic. Date/time pickers: native `<input type="date/time">` styled, no picker libraries.
- **Floating WhatsApp** button: plain `<a href="https://wa.me/...">`, no widget script.
- **SEO**: Metadata API, Open Graph image, `sitemap.ts`, `robots.ts`, JSON-LD `ShoppingCenter` schema, canonical URLs from `siteConfig.url`.
- **Accessibility**: semantic landmarks, one `h1`, visible focus styles, labels on all inputs, AA contrast, alt text in Arabic.
- **Quality gates**: ESLint + Prettier, `next build` with zero warnings, bundle analyzer check (first-load JS per route as small as possible), Lighthouse run on mobile before calling anything done.
- **Hosting**: Vercel (static assets on CDN, Server Actions for forms). Security headers (CSP, HSTS, X-Content-Type-Options) in `next.config`.

## Sources of truth (use in this order)
1. **Figma design** (layout, spacing, colors, fonts, components). File key `zIBEzJ7d2dk2i4jNpFSiTX`, page `37:2`:
   https://www.figma.com/design/zIBEzJ7d2dk2i4jNpFSiTX/?node-id=37-2
   Frames on the `website` page (node IDs for the Figma MCP):
   - Web / desktop (1280px): `38:3` -> https://www.figma.com/design/zIBEzJ7d2dk2i4jNpFSiTX/?node-id=38-3
   - Mobile ("app", 403px): `59:7` -> https://www.figma.com/design/zIBEzJ7d2dk2i4jNpFSiTX/?node-id=59-7
   - Hero background slideshow, 7 desktop variants (component set): `38:513`
   - Hero background slideshow, mobile variants: `59:462`
   - Floating link/button component, 2 variants (likely the floating WhatsApp/CTA button): `38:567`
   There is NO separate iPad frame: build tablet as a responsive layout between the desktop and mobile designs.
   Ignore `Page 1` (it is an old slide presentation, not the website).
   Sections in order: Hero (header + nav: خطط لزيارتك / الوجهات / عن القرية / انضم إلينا) -> للزوار (4 category cards) -> لماذا تزور قرية الذيد؟ -> اكتشف وجهاتنا (filter chips + store cards) -> خطط لزيارتك (location, hours, parking + buttons) -> عن القرية -> لأصحاب المشاريع (join/tenant form) -> تحدث مع فريقنا (booking form with date + time) -> اكتشف أجواء قرية الذيد (gallery) -> Footer.
   Known Figma mistake: both Date Picker fields show the placeholder "البريد الإلكتروني". Use "التاريخ" and "الوقت" instead.
   Store cards (روستو، بيت القهوة، مَرايا) are sample data: put them in a data file so real stores can replace them.
   Use the Figma MCP (`get_design_context` per frame / per section). Reuse components across breakpoints; do not build three separate sites.
2. **Content**: `materials/content/site-content-final.pdf` (final approved version, 9 pages). Use its Arabic copy exactly; read the PDF directly. If Figma text differs from the PDF, the PDF wins for wording and Figma wins for layout.
3. **Photos**: `materials/figma-assets/design-images/` first (the exact images placed in the Figma design), then `materials/drive-photos/` (127 originals from the client's Google Drive, source material only). Only images the site actually uses go into `public/images/`, resized and compressed. Use `next/image`.

## Business requirements (from the client, not all shown in Figma)
- Present the village primarily as a **shopping destination for visitors** (shops, restaurants, cafés, services, events), with a **separate section for partners/tenants** ("انضم إلى قرية الذيد"). Do not make leasing the main focus.
- **Floating WhatsApp button** on every page.
- **Contact form** (name, phone, email, message) and a **book a visit/meeting** action for prospective tenants.
- Domain not purchased yet: keep site URL and contact details in one config file (`src/config/site.ts`), no hard-coded domains.

## Optional (partners/tenants section only, only if the Figma has a place for it)
- `materials/leasing/booth-sizes-1-to-39.pdf`, `materials/leasing/shops-prices.pdf`, `materials/leasing/site-plan-1.jpg`
- Do NOT publish prices unless the Figma shows them.

## Placeholders (not provided yet; use clearly marked TODOs in `src/config/site.ts`)
- ~~Logo~~ — done: official logo is `materials/figma-assets/logo/logo-1933.png` (no SVG exists); optimized copies live in `public/logo/` and `public/favicon/` (see Decisions)
- WhatsApp number, phone, email, address, Google Maps link, opening hours
- Contact form destination (email / WhatsApp)

## Workflow
1. Read this file, the content PDF and the Figma frames before writing code.
2. Propose the page/section structure and component list; wait for approval.
3. Build section by section, desktop first, then tablet and mobile breakpoints; compare each against the Figma screenshot.
4. Run `pnpm build`, `pnpm lint`, `pnpm typecheck` and `pnpm format:check` with no errors before saying a section is done.

## Tooling (Apple Silicon note: this machine's Node is x64 under Rosetta; start Chrome from the shell so it runs natively)
- Start Chrome once: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --remote-debugging-port=9333 --user-data-dir=/tmp/chrome-native about:blank &`
- Full-page screenshot at an exact CSS width (no deps): `node scripts/screenshot.mjs http://localhost:3001/ 403 review/mobile-403.png --mobile --port=9333` (also 768 / 1024 / 1280). Plain headless `--screenshot` cannot go below ~500px wide.
- Lighthouse (mobile): `pnpm build && pnpm start -p 3001`, then `node scripts/lighthouse.mjs http://localhost:3001/ review/lighthouse-mobile 9333 [simulate|devtools]`. The CLI refuses to launch Chrome from x64 Node, hence the API runner attached to the port above. `review/` is git-ignored.
- `next dev` runs on :3000; production checks use `next start -p 3001` (security headers, CSP, `next/image` qualities are production-only behaviours).

## Decisions (approved 2026-09-24 by Sultan, the client's contact — these persist across sessions)
**Rule:** Sultan approved the Figma design, so **Figma wins for structure**; the PDF is used **only for wording where the same element exists in Figma**.
- **Nav**: Figma's 4 links only (خطط لزيارتك / الوجهات / عن القرية / انضم إلينا). No extra header buttons.
- **"لماذا تزور قرية الذيد؟"**: Figma's 4 items. Skip the PDF's 5th item (وجهة للعائلة والمجتمع).
- **Skip** the PDF's "لماذا تنضم إلى قرية الذيد؟" benefits list and the separate "تواصل معنا" section; the floating WhatsApp button + footer cover them.
- **Join form**: Figma's 6 fields (الاسم الكامل، رقم الهاتف، البريد الإلكتروني، نوع النشاط، اسم المشروع / العلامة التجارية، نبذة عن المشروع) **plus one "رقم واتساب" field**. No file upload, no optional extras.
- **Booking form**: as Figma (الاسم، رقم الهاتف، البريد الإلكتروني، سبب الموعد، date, time) with placeholders **"التاريخ"** and **"الوقت"**. "سبب الموعد" options from the PDF: زيارة القرية، الاستفسار عن مشروع، التأجير، أخرى.
- **Gallery**: Figma's 4 chips (القرية، تسوق، مقهى، مطعم).
- **Category cards**: each "اعرف المزيد" links to `#destinations` with that category pre-selected (`?type=…`).
- **Opening hours** are not confirmed (PDF placeholder). Put Figma's "يوميًا، 10 صباحًا – 11 مساءً" in `src/config/site.ts` marked `TODO`.
- **Store cards** (روستو، بيت القهوة، مَرايا) stay as sample data in a data file (`src/content/stores.ts`).
- **Logo**: `materials/figma-assets/logo/logo-1933.png` is the official logo (transparent PNG, no SVG). Generated with Pillow, no padding, transparent: `public/logo/logo.{png,webp}` (1024, for OG image / JSON-LD), `public/logo/logo-header.{png,webp}` (144 = 48px @3x), `public/logo/logo-footer.{png,webp}` (120 = 40px @3x); `public/favicon/favicon-16.png`, `favicon-32.png`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` (180, white background) and `public/favicon.ico` (16/32/48).
- **Photo sources**: `materials/drive-photos/` = the 127 Google Drive originals (source only, never referenced by the site). `materials/figma-assets/design-images/` = the exact images placed in Figma (first source). `public/images/` = only what the site uses, JPEG q85 progressive, max 2560px wide (currently 1122×1402, the largest available; wide hero viewports will upscale slightly).
- **Image map** (Figma layer → `public/images/`): hero slides in Figma order (`38:513` Default→Variant7, mobile `59:462` uses the same photos): 1 `village-facade-sunset.jpg` (large-03), 2 `shoppers-arcade.jpg` (large-02), 3 `cafe-interior-family.jpg` (large-06), 4 `arrival-car-entrance.jpg` (large-05), 5 `egypt-pavilion.jpg` (large-04), 6 `friends-selfie.jpg` (large-01), 7 `toy-shop-family.jpg` (large-08). Gallery: مساحة تجارية عصرية = `village-facade-sunset.jpg`, أجواء مقهى = `couple-walkway.jpg` (large-07), جلسات المقهى = `cafe-interior-family.jpg`, تجربة تسوق = `arrival-car-entrance.jpg`. Store cards: روستو = `storefront-boutique.jpg` (large-10), بيت القهوة = `cafe-corner-night.jpg` (large-09), مَرايا = `cafe-interior-family.jpg` (desktop frame; the mobile frame swaps روستو/مَرايا images — sample data, ignore).
- **Unused Figma exports**: `design-images/small-*.png` are thumbnails of `large-*.png` (small-01=large-07, 02=05, 03=04, 04=02, 05=03, 06=10, 07=09, 08=01, 09=08, 10=06) and `design-images/photo-*.jpg` are stock photos (coffee cups, egg dish, french press, clothing rack) not placed in the web/mobile frames. Do not use either.
- **Destinations chips** derive from the categories present in the stores data, plus "الكل". A category card whose category has no stores links to `#destinations` unfiltered.
- **"عرض جميع الوجهات"** resets the filter to "الكل". No `/destinations` page for now.
- **About** keeps 2 paragraphs (Figma structure); the PDF's 3rd paragraph is dropped.
- **Fonts**: body/UI = Alexandria; H1/H2 display headings = Noto Kufi Arabic (both from Figma). DM Mono (Figma eyebrows and "01–04" numbers) is dropped; use Alexandria with letter-spacing instead.
- **Floating WhatsApp** is hidden over the hero and fades in after ~400px of scroll (CSS scroll-driven animation) so it never covers the hero CTAs or the "لأصحاب المشاريع" link. Position: bottom start edge, as in Figma.
- **Repo hygiene**: `materials/drive-photos/` and `materials/figma-assets/design-images/` are git-ignored. `next dev` agent-rules generation is disabled (`agentRules: false`) so it cannot rewrite this file.
- **Build notes (2026-09-24, all sections built)**:
  - Desktop keeps Figma's left-to-right order for the category cards and store cards (`dir="ltr"` on those rows); remove that attribute if an RTL-first order is preferred. The gallery mosaic order follows the RTL flow and already matches Figma.
  - Join form: the Figma eyebrow "لأصحاب المشاريع" was coral on coral (invisible); rendered at 75% white. Field rows: الاسم الكامل | رقم الهاتف, رقم واتساب | البريد الإلكتروني, نوع النشاط | اسم المشروع, then نبذة. "نوع النشاط" options come from the PDF sentence (متجر، مطعم، مقهى، خدمة، مفهوم تجاري جديد، أخرى).
  - Category card "مطاعم ومقاهي" pre-selects مطعم in `#destinations` (one card covers two categories); خدمات / فعاليات link unfiltered until stores of those types exist.
  - Gallery chips are static labels (mobile shows the Figma caption line): only four photos, so filtering would show empty states.
  - Date/time fields: native inputs with an overlay label ("التاريخ" / "الوقت") while empty; value at the physical left and icon at the right, as drawn in Figma.
  - Hero: `min-h` 820px on mobile / 800px on desktop (Figma 760) because the PDF paragraph is longer, and the photo layer starts 1px below the section edge. Both keep the first slide as the LCP element (Chrome ignores full-viewport images and would otherwise pick a later slide) and keep the hero from resizing when fonts arrive.
  - Validation uses `zod/mini` with `z.config({ jitless: true })`: classic zod added ~90 KB gzip to the client and its `new Function` parser violated the CSP.
  - Forms without `RESEND_API_KEY` / `CONTACT_TO_EMAIL` log the submission on the server and still show the success state. Rate limit: 5 submissions per 10 minutes per IP per form (in-memory, per instance). Honeypot field name: `website`.
  - Lighthouse mobile on the LIVE Vercel deployment (https://al-dhaid-commercial-village.vercel.app): 99 / 100 / 100 / 100 in the default "simulate" mode (LCP 2.3 s) and 97 / 100 / 100 / 100 with real "devtools" throttling (LCP 2.0 s, CLS 0). Against a local `next start` the simulated performance reads 88: without HTTP/2 and a CDN, Lantern charges the Arabic web fonts (182 KB) and the Next runtime to the LCP. Judge performance on the deployed URL, not on localhost.
  - Deployment: Vercel project `al-dhaid-commercial-village` (team "Mohammed Ghally's projects") deploys `main` from GitHub `mghally999/al-dhaid-commercial-village`. `NEXT_PUBLIC_SITE_URL` may be left empty until the domain exists; `siteConfig.url` then resolves to Vercel's production URL. Email starts working once `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set (they exist as empty variables today).
