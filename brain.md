# AdCool Website Structure

Quick project map for future work. This is a static HTML/CSS/JavaScript website; read the relevant page and shared files before changing behavior.

## Project layout

```text
/
├── worker.js                            Cloudflare Worker and branded error responses
├── wrangler.jsonc                       Worker entrypoint and static asset configuration
├── public/
│   ├── index.html                      Homepage
│   ├── about.html, contact.html, ...   Legacy redirect pages
│   ├── about/index.html                About page
│   ├── contact/index.html              Contact details and enquiry form
│   ├── panel-air-conditioner/index.html Panel AC product page
│   ├── chiller/index.html              Industrial chiller product page
│   ├── hvac-amc-services/index.html    Panel AC and Chiller AMC page
│   ├── thank-you/, privacy-policy/, terms/ Pages and legal content
│   ├── 404.html                         Static not-found fallback
│   ├── assets/                          Images, logo and fonts
│   ├── styles.css, app.js               Shared styles and behavior
│   └── robots.txt, sitemap.xml           Search-engine discovery
├── .gitignore
└── brain.md, README.md, DEPLOYMENT_GUIDE.md
```

## Pages and content

- **Home (`public/index.html`)**: hero with tilted 3D-style Panel AC and chiller product cards, company introduction, the two product cards, AMC overview, differentiators, application sectors, quote CTA, FAQ and footer.
- **Products**:
-  - `public/panel-air-conditioner/index.html`: cooling for electrical panels and enclosures.
  - `public/chiller/index.html`: application-led industrial chiller overview and quotation guidance.
- **AMC (`public/hvac-amc-services/index.html`)**: maintenance contract scope and an enquiry form.
- **About (`public/about/index.html`)**: company scope and equipment/service capabilities.
- **Contact (`public/contact/index.html`)**: business contact details and the main product/service enquiry form.
- Interior pages share a header/nav, page hero, content sections and footer. Their asset, stylesheet and script links are relative to the page directory.
- `public/*.html` files (except `public/index.html`) are compatibility pages that immediately redirect to the corresponding directory `index.html`; they are not the full page content.

## Shared behavior and styling

- `public/styles.css` defines the color tokens, typography, responsive breakpoints, forms, loading feedback, cookie banner, legal pages and sticky mobile CTA.
- `public/app.js` provides same-origin partial navigation and history handling, a loading progress indicator, mobile call/WhatsApp/quote actions, accessible form validation states, FormSubmit sending feedback, and opt-in-gated analytics.
- `ANALYTICS_MEASUREMENT_ID` in `public/app.js` is intentionally empty until the site owner supplies a GA4 ID. Analytics must remain disabled until a visitor opts in.
- Enquiry forms POST to FormSubmit (`info@adcoolindia.com`) and redirect to `/thank-you/`. FormSubmit must be activated for this inbox after deployment.
- Contact/WhatsApp number: `+91 99531 95901`. Business email: `info@adcoolindia.com`. Address: Tajnagar, Gurugram, Haryana, India.
- The only products offered are Panel Air Conditioners and Industrial Chillers; the only service offer is AMC for installed cooling equipment.
- There is no package manifest or build pipeline; the `adcoolindia` Worker serves static files from `public/`. `wrangler.jsonc` configures deployment with `npx wrangler deploy`.

## Assets

- `public/assets/adcool-logo.png`: shared brand mark and source for favicon/app icons.
- `public/assets/hero.jpg`, `panel-ac.jpg`, `chiller-detail.jpg`, and `amc-service.jpg`: compressed website photography.
- `public/assets/og-image.jpg`: 1200×630 social preview image.
- `public/assets/favicon-16x16.png`, `favicon-32x32.png`, `public/favicon.ico`, `apple-touch-icon.png`, and `android-chrome-*.png`: browser/platform icons.

## SEO and navigation notes

- Canonical URLs, structured data, robots and sitemap use `https://adcoolindia.com`; update all site identity URLs together if the domain changes.
- `public/robots.txt` points crawlers to `/sitemap.xml` (`public/sitemap.xml` in the repository), which lists indexable content and legal pages; the 404 and thank-you pages are noindex.
- All canonical content pages have page-specific titles/descriptions and Open Graph/Twitter cards.
- Homepage navigation/dropdown and product cards link to the Panel AC and Chiller pages. Preserve these routes when adjusting navigation.
- Compatibility pages under `public/` remain only for Home, About, Contact, Panel AC and AMC.

## Maintenance guidance

- Make page-specific content changes in the relevant `*/index.html`; shared behavior belongs in `app.js`, and shared appearance belongs in `styles.css`.
- When adding/renaming a page, check the homepage navigation/cards, interior-page navigation, any root compatibility redirect, `sitemap.xml`, canonical URL, and this map.
- Keep this file aligned when the site structure, shared behavior, or deployment setup changes materially.
