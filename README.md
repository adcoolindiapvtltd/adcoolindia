# AdCool India Private Limited website

Static marketing website for AdCool India Private Limited, deployed on the custom domain `https://adcoolindia.com`.

## Publish with GitHub Pages

1. Create a new GitHub repository and push this folder to its `main` branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/(root)` folder, then save.

GitHub will publish the site at `https://<username>.github.io/<repository-name>/` for a project repository, or `https://<username>.github.io/` for a user repository.

## Before publishing publicly

The verified public domain is `https://adcoolindia.com`. If it changes, update canonical and Open Graph URLs, structured data, `robots.txt`, `sitemap.xml`, and FormSubmit's redirect URL together.

Verified public contact details are +91 99531 95901, `info@adcoolindia.com`, `sales@adcoolindia.com`, and Tajnagar, Gurugram, Haryana, India.

## Enquiry email delivery

Both enquiry forms send submissions to `sales@adcoolindia.com` through FormSubmit and redirect to the site's thank-you page. After deployment, submit a test enquiry and complete FormSubmit's email activation for this inbox.

## Analytics and consent

Optional Google Analytics is opt-in only and is currently disabled because no GA4 Measurement ID has been supplied. Set `ANALYTICS_MEASUREMENT_ID` in `app.js` to the verified GA4 ID to enable the consent controls and defer tracking until acceptance. Do not add a separate analytics script that bypasses this consent flow.

The Privacy Policy and Terms pages are available at `/privacy-policy` and `/terms`. Browser, Apple touch, Android and Open Graph assets are generated under `assets/`.

## Search visibility

The site includes page-specific titles and descriptions, canonical URLs, Open Graph metadata, structured business/product/service/breadcrumb data, `robots.txt` and an XML sitemap. After the custom domain is live, verify it in Google Search Console and submit `https://adcoolindia.com/sitemap.xml`. Search rankings are not guaranteed and also depend on relevant content, local eligibility, competition and trustworthy links.

## Local preview

Serve this folder with any static-file server to test client-side page navigation.
Opening `index.html` directly also works, but browsers may use normal page loads
for internal links when the site is opened with a `file://` URL.

Internal links fetch the destination page and update browser history without
reloading the shared layout. Direct page visits and form submissions continue
to use normal browser requests. Images are served as compressed JPEGs and fonts
are self-hosted to avoid external font requests.

The `.nojekyll` file ensures GitHub Pages serves the site files exactly as written.
