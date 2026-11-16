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
├── assets/                             Images and logo
├── styles.css                          Shared visual system and responsive styles
├── app.js                              Shared loader, menu, call link and form validation
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

- `styles.css` defines the color tokens (`--navy`, `--blue`, `--sky`, etc.), typography, navigation, hero, cards, product/page layouts, forms, footer, skeleton loader and responsive breakpoints (900px, 700px and 560px).
- `app.js` creates and dismisses a loading skeleton; toggles the mobile navigation; switches the home call button between `tel:` on small screens and the contact-details anchor on larger screens; validates required text fields; and injects a floating WhatsApp link.
- Enquiry forms are plain POST forms to FormSubmit (`adcoolproducts@gmail.com`). The browser validates required fields, email and phone pattern; `app.js` trims required values. FormSubmit activation may be needed after deployment.
- Contact/WhatsApp number: `+91 99531 95901`. Business email: `adcoolproducts@gmail.com`. Contact location: Sector-3, Gurugram, Haryana, India.
- The only products offered are Panel Air Conditioners and Industrial Chillers; the only service offer is AMC for installed cooling equipment.
- There is no package manifest or build pipeline; pages are served as static files. GitHub Pages configuration is documented in `README.md` and `DEPLOYMENT_GUIDE.md`.

## Assets

- `assets/adcool-logo.png`: shared brand mark.
- `assets/hero.png`: About page image.
- `assets/panel-ac.png`: Panel AC.
- `assets/hero-panel-ac.png`: cropped Panel AC visual used by the homepage hero.
- `assets/chiller-detail.png`: industrial chiller visual used on the homepage and Chiller page.
- `assets/amc-service.png`: AMC/service visual.

## SEO and navigation notes

- Canonical URLs, structured data and sitemap use `https://adcolproducts.vercel.app`; update the site-wide references together if the public domain changes.
- `robots.txt` points crawlers to `sitemap.xml`, which lists the home page and five content pages.
- Homepage navigation/dropdown and product cards link to the Panel AC and Chiller pages. Preserve these routes when adjusting navigation.
- Root compatibility pages remain only for Home, About, Contact, Panel AC and AMC.

## Maintenance guidance

- Make page-specific content changes in the relevant `*/index.html`; shared behavior belongs in `app.js`, and shared appearance belongs in `styles.css`.
- When adding/renaming a page, check the homepage navigation/cards, interior-page navigation, any root compatibility redirect, `sitemap.xml`, canonical URL, and this map.
- Keep this file aligned when the site structure, shared behavior, or deployment setup changes materially.
