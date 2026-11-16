# AdCool Website - Deployment Guide

## Website Scope & Deployment

This static site focuses on Panel Air Conditioners, Industrial Chillers and AMC. Validate links, forms, business details and responsive behavior before publishing.

### Production error pages (Cloudflare Workers)

The `adcoolindia` Worker is configured by `wrangler.jsonc`. It serves static files from `public/` and runs `worker.js` first for document requests so it can customize error responses; static assets bypass the Worker. Keep the existing deployment command and run it from the repository root:

```bash
npx wrangler deploy
```

The Worker replaces HTML error responses with a branded page and preserves the original 4xx/5xx status; it intentionally skips 402 because the site has no payment flow.

The Worker cannot customize Cloudflare-generated errors that occur before a request reaches it, including some WAF, TLS and edge/network failures. Configure Cloudflare Custom Pages in the dashboard for the edge errors supported by your plan. GitHub Pages can serve the static `public/404.html`, but does not run this Worker.

---

## Deployment checklist

- [ ] Confirm the existing Cloudflare Worker is named `adcoolindia`.
- [ ] Keep the deployment command as `npx wrangler deploy`.
- [ ] Keep the working directory at the repository root so Wrangler can find `wrangler.jsonc` and `worker.js`.
- [ ] Confirm `public/` contains `index.html` and `404.html`.
- [ ] Verify a preview deployment before publishing to production.

---

## 📋 Pre-Deployment Checklist

Before making your repository public, complete these items:

### Update Domain References
The verified production domain is `https://adcoolindia.com`. If the domain changes, update it consistently in:

1. **robots.txt**
   - Update Sitemap URL to match your new domain

2. **sitemap.xml**
   - Update all URL locations to match your new domain

3. **index.html** & other pages
   - Update canonical tags with your new domain

4. **Meta tags & Structured Data**
   - Update og:image URLs if hosting images externally
   - Update the business, website and page URLs in structured data

### Verify Business Information
1. **contact/index.html**
   - Verify the business name
   - Verify phone number: +91 99531 95901
   - Verify emails: info@adcoolindia.com and sales@adcoolindia.com
   - Verify address: Tajnagar, Gurugram, Haryana, India
   - Update WhatsApp number if different

### Add Analytics & Verification
1. **Google Analytics**
   - Analytics is currently disabled until the site owner supplies a GA4 Measurement ID.
   - Set `ANALYTICS_MEASUREMENT_ID` in `app.js` to the verified `G-...` ID.
   - Tracking loads only after the visitor explicitly allows analytics in the cookie banner.
   - Do not install a separate analytics snippet that bypasses this consent flow.

2. **Google Search Console**
   - Add and DNS-verify the `adcoolindia.com` Domain property in Google Search Console.
   - Submit `https://adcoolindia.com/sitemap.xml` after the custom domain and HTTPS are live.
   - Use URL Inspection to request indexing for the homepage, product pages and AMC services page.
   - Review indexing and Core Web Vitals reports regularly; correct crawl or usability issues shown there.

3. **Google Business Profile** (if eligible)
   - Claim or create one profile using the exact business name and real, eligible business details.
   - Keep the address and phone consistent with this website. Do not list an unstaffed address as a customer-facing location.
   - Add the website URL, relevant business category, service area and genuine photos; do not add keywords to the business name.

4. **Bing Webmaster Tools** (for Bing and Copilot discovery)
   - Verify `adcoolindia.com` in Bing Webmaster Tools.
   - Submit `https://adcoolindia.com/sitemap.xml` and inspect the homepage, product pages and AMC services page for crawl or indexing issues.

5. **Build search visibility over time**
   - Add accurate product specifications, service coverage and answers to real customer questions as they are confirmed.
   - Earn relevant links and citations from genuine suppliers, customers, industry directories and local organizations.
   - Keep business contact details consistent and ask real customers for honest reviews without incentives.
   - Rankings depend on competition, relevance, authority and user experience. No website change can guarantee a top position or a particular indexing date.

---

## What's Included

### Included functionality
- Homepage with hero section
- 2 Product pages (Panel Air Conditioner and Industrial Chiller)
- About page
- Contact page with form
- AMC services page for Panel AC and Chiller
- Responsive mobile menu
- Sticky mobile call/WhatsApp/quote actions
- Form validation, loading feedback and thank-you redirect
- Privacy Policy, Terms and cookie-consent notice
- Custom 404 page and complete favicon set

### Performance considerations
- Client-side internal navigation with accessible loading feedback
- Compressed JPEG imagery and self-hosted fonts
- Responsive layouts for small screens through desktop
- SEO-friendly structure

### SEO
- robots.txt configured
- sitemap.xml with indexable content and legal pages
- Canonical tags on every page
- Page-specific titles and descriptions
- Open Graph and Twitter cards with a 1200×630 share image
- 16/32px favicons, Apple touch icon, Android icons and web manifest
- Descriptive alt text on content images
- Noindex on redirect, thank-you and not-found pages
- Structured data (Schema.org)
- Proper heading hierarchy

### Security
- .nojekyll file (prevents Jekyll processing)
- .gitignore configured
- No sensitive information in code
- Links use HTTPS (recommended)

---

## 🔗 After Deployment

### 1. Test Your Website
- [ ] Visit: `https://adcoolindia.com`
- [ ] Test all links work
- [ ] Test mobile responsive design
- [ ] Test forms (if configured)
- [ ] Check loading performance

### 2. Submit to Search Engines
- [ ] Submit sitemap to Google Search Console
- [ ] Verify domain ownership
- [ ] Request indexing
- [ ] Monitor search performance

### 3. Setup Analytics
- [ ] Supply and set a verified GA4 Measurement ID in `app.js`
- [ ] Verify tracking remains off until consent is accepted
- [ ] Configure conversions after analytics is enabled

### 4. Custom Domain
Manage `adcoolindia.com` under the `adcoolindia` Worker's **Custom Domains and Routes** settings. Confirm HTTPS is active before submitting the sitemap or testing forms.

---

## 📞 Contact Form Setup

The enquiry forms use **FormSubmit.co** for email delivery:

1. After deployment, visit your website
2. Fill out and submit the contact form once
3. You'll receive an activation email at `sales@adcoolindia.com`
4. Confirm by clicking the activation link
5. All future submissions will be delivered to the sales inbox and redirect to `/thank-you/`

---

## 🔧 Troubleshooting

### Cloudflare Worker deployment failing?
- Confirm the command is `npx wrangler deploy` and it runs from the repository root.
- Check that `wrangler.jsonc`, `worker.js` and the `public/` site output are present.
- Verify that the Cloudflare API credentials used by the build can deploy to the existing Worker.

### Links not working?
- Verify all internal links use relative paths
- Check that file paths are correct
- Test on mobile and desktop

### Form not sending?
- Ensure action attribute is correct in HTML
- Test form submission
- Verify email receiving works
- Contact support at formsubmit.co if needed

---

## 📞 Support

For questions about:
- **Cloudflare Workers**: https://developers.cloudflare.com/workers/
- **DNS Configuration**: Contact your domain registrar
- **Form Submission**: https://formsubmit.co
- **Google Analytics**: https://support.google.com/analytics

---

## 🎉 Success Criteria

Your deployment is successful when:
- ✅ Website accessible at `https://adcoolindia.com`
- ✅ All pages load without errors
- ✅ Navigation menu works
- ✅ Forms submit successfully
- ✅ Mobile responsive design works
- ✅ Custom 404, privacy policy and terms pages load
- ✅ All images load correctly
- ✅ Sitemap indexed by Google
- ✅ Analytics configured and consent-gated when a Measurement ID is supplied

---

**Website Version**: 1.0 Production Ready
**Last Updated**: 2026-11-16
**Deployed by**: Cloudflare Workers
**Framework**: Static HTML/CSS/JavaScript
