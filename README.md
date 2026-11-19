# AdCool India Private Limited website

Static marketing website for AdCool India Private Limited, deployed on the custom domain `https://adcoolindia.com`.

## Production deployment: Cloudflare Workers

The production host is the `adcoolindia` Worker. `wrangler.jsonc` configures `worker.js` to serve static files from `public/` and run first for document requests so it can brand error responses. Static assets are excluded from Worker execution. Keep the existing deployment command:

```bash
npx wrangler deploy
```

The Worker returns branded HTML for document requests that receive 4xx or 5xx responses while preserving the original HTTP status. It deliberately leaves 402 responses unchanged because the site has no payment flow.

Cloudflare-generated errors that occur before a request reaches the Worker, such as some WAF, TLS or edge/network errors, cannot be handled by the Worker. Configure Cloudflare Custom Pages for supported edge errors in the Cloudflare dashboard.

The static output lives in `public/`, so the default GitHub Pages branch-root setup will not publish it. A GitHub Actions workflow can publish `public/` as static files if needed, but GitHub Pages will not run the Cloudflare Worker error handling.

## Before publishing publicly

The verified public domain is `https://adcoolindia.com`. If it changes, update canonical and Open Graph URLs, structured data, `robots.txt`, `sitemap.xml`, and FormSubmit's redirect URL together.

Verified public contact details are +91 99531 95901, `info@adcoolindia.com`, and Tajnagar, Gurugram, Haryana, India.

## Enquiry email delivery

Both enquiry forms send submissions to `info@adcoolindia.com` through FormSubmit and redirect to the site's thank-you page. After deployment, submit a test enquiry and complete FormSubmit's email activation for this inbox.

## Analytics and consent

Optional Google Analytics is opt-in only and is currently disabled because no GA4 Measurement ID has been supplied. Set `ANALYTICS_MEASUREMENT_ID` in `public/app.js` to the verified GA4 ID to enable the consent controls and defer tracking until acceptance. Do not add a separate analytics script that bypasses this consent flow.

The Privacy Policy and Terms pages are available at `/privacy-policy/` and `/terms/`. Browser, Apple touch, Android and Open Graph assets are in `public/assets/`.

## Search visibility

The site includes page-specific titles and descriptions, canonical URLs, Open Graph metadata, structured business/product/service/breadcrumb data, `robots.txt` and an XML sitemap. After the custom domain is live, verify it in Google Search Console and submit `https://adcoolindia.com/sitemap.xml`. Search rankings are not guaranteed and also depend on relevant content, local eligibility, competition and trustworthy links.

## Answer engine readiness

The homepage, product pages and AMC page provide visible, direct answers to common buyer questions. Their `FAQPage` structured data mirrors the on-page answers, while page and entity markup connects those pages to the business. Keep the visible answers and JSON-LD synchronized. Add only confirmed product specifications, prices, service areas, certifications and business profiles; do not infer missing facts. Publish author bios and first-hand case studies only when staff credentials and customer/project details are verified, and cite credible sources for externally sourced claims. Structured data does not guarantee citations, rankings or enhanced search results. Search engines and answer engines make their own selection decisions.

## Local preview

Serve the `public/` folder with any static-file server to test client-side page navigation.
Use a static server rather than opening `public/index.html` directly, since
root-relative assets and browser security rules may not work with a `file://` URL.

Internal links fetch the destination page and update browser history without
reloading the shared layout. Direct page visits and form submissions continue
to use normal browser requests. Images are served as compressed JPEGs and fonts
are self-hosted to avoid external font requests.

The `public/.nojekyll` file disables Jekyll processing on hosts that support it.
