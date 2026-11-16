# AdCool Website Structure

Quick project map for future work. This is a static HTML/CSS/JavaScript website; read the relevant page and shared files before changing behavior.

## Project layout

```text
/
├── index.html                         Homepage
├── about.html                         Legacy redirect to about/index.html
├── contact.html                       Legacy redirect to contact/index.html
├── panel-air-conditioner.html         Legacy redirect to panel-air-conditioner/index.html
├── hvac-amc-services.html             Legacy redirect to hvac-amc-services/index.html
├── about/index.html                    About page
├── contact/index.html                 Contact details and enquiry form
├── panel-air-conditioner/index.html   Panel AC product page
├── chiller/index.html                 Industrial chiller product page
├── hvac-amc-services/index.html      Panel AC and Chiller AMC page and enquiry form
├── thank-you/index.html              Form success destination (noindex)
├── privacy-policy/index.html         Privacy and cookie/analytics disclosure
├── terms/index.html                  Website terms
├── 404.html                           Custom not-found page (noindex)
├── assets/                             Images and logo
├── styles.css                          Shared visual system and responsive styles
├── app.js                              Navigation, mobile CTAs, consent and form states
├── robots.txt, sitemap.xml             Search-engine discovery
├── .nojekyll, .gitignore               Hosting/repository configuration
└── brain.md, README.md, DEPLOYMENT_GUIDE.md
```

## Pages and content

- **Home (`index.html`)**: hero with tilted 3D-style Panel AC and chiller product cards, company introduction, the two product cards, AMC overview, differentiators, application sectors, quote CTA, FAQ and footer.
- **Products**:
  - `panel-air-conditioner/index.html`: cooling for electrical panels and enclosures.
  - `chiller/index.html`: application-led industrial chiller overview and quotation guidance.
- **AMC (`hvac-amc-services/index.html`)**: maintenance contract scope and an enquiry form.
- **About (`about/index.html`)**: company scope and equipment/service capabilities.
- **Contact (`contact/index.html`)**: business contact details and the main product/service enquiry form.
- Interior pages share a header/nav, page hero, content sections and footer. Their asset, stylesheet and script links are relative to the page directory.
- Root-level `*.html` files (except `index.html`) are compatibility pages that immediately redirect to the corresponding directory `index.html`; they are not the full page content.

## Shared behavior and styling

- `styles.css` defines the color tokens, typography, responsive breakpoints, forms, loading feedback, cookie banner, legal pages and sticky mobile CTA.
- `app.js` provides same-origin partial navigation and history handling, a loading progress indicator, mobile call/WhatsApp/quote actions, accessible form validation states, FormSubmit sending feedback, and opt-in-gated analytics.
- `ANALYTICS_MEASUREMENT_ID` in `app.js` is intentionally empty until the site owner supplies a GA4 ID. Analytics must remain disabled until a visitor opts in.
- Enquiry forms POST to FormSubmit (`sales@adcoolindia.com`) and redirect to `/thank-you/`. FormSubmit must be activated for the sales inbox after deployment.
- Contact/WhatsApp number: `+91 99531 95901`. Business emails: `info@adcoolindia.com` and `sales@adcoolindia.com`. Address: Tajnagar, Gurugram, Haryana, India.
- The only products offered are Panel Air Conditioners and Industrial Chillers; the only service offer is AMC for installed cooling equipment.
- There is no package manifest or build pipeline; pages are served as static files. GitHub Pages configuration is documented in `README.md` and `DEPLOYMENT_GUIDE.md`.

## Assets

- `assets/adcool-logo.png`: shared brand mark and source for favicon/app icons.
- `assets/hero.jpg`, `assets/panel-ac.jpg`, `assets/chiller-detail.jpg`, and `assets/amc-service.jpg`: compressed website photography.
- `assets/og-image.jpg`: 1200×630 social preview image.
- `assets/favicon-16x16.png`, `assets/favicon-32x32.png`, `favicon.ico`, `assets/apple-touch-icon.png`, and `assets/android-chrome-*.png`: browser/platform icons.

## SEO and navigation notes

- Canonical URLs, structured data, robots and sitemap use `https://adcoolindia.com`; update all site identity URLs together if the domain changes.
- `robots.txt` points crawlers to `sitemap.xml`, which lists indexable content and legal pages; the 404 and thank-you pages are noindex.
- All canonical content pages have page-specific titles/descriptions and Open Graph/Twitter cards.
- Homepage navigation/dropdown and product cards link to the Panel AC and Chiller pages. Preserve these routes when adjusting navigation.
- Root compatibility pages remain only for Home, About, Contact, Panel AC and AMC.

## Maintenance guidance

- Make page-specific content changes in the relevant `*/index.html`; shared behavior belongs in `app.js`, and shared appearance belongs in `styles.css`.
- When adding/renaming a page, check the homepage navigation/cards, interior-page navigation, any root compatibility redirect, `sitemap.xml`, canonical URL, and this map.
- Keep this file aligned when the site structure, shared behavior, or deployment setup changes materially.
