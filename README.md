# AdCool India Private Limited website

Static marketing website for AdCool India Private Limited, ready to deploy with GitHub Pages.

## Publish with GitHub Pages

1. Create a new GitHub repository and push this folder to its `main` branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/(root)` folder, then save.

GitHub will publish the site at `https://<username>.github.io/<repository-name>/` for a project repository, or `https://<username>.github.io/` for a user repository.

## Before publishing publicly

If the public domain changes, update every occurrence of `https://adcolproducts.vercel.app`. These values appear in canonical tags, structured data, `robots.txt`, and `sitemap.xml`.

Verify that the business name, address, phone number and email on the contact page are accurate before publishing.

## Enquiry email delivery

Both enquiry forms send their submitted details to `adcoolproducts@gmail.com` through FormSubmit. After the website is deployed, submit one test enquiry and open the activation email sent by FormSubmit to this address. Click its confirmation link once; every future enquiry will then be delivered to the same inbox.

## Local preview

Serve this folder with any static-file server to test client-side page navigation.
Opening `index.html` directly also works, but browsers may use normal page loads
for internal links when the site is opened with a `file://` URL.

Internal links fetch the destination page and update browser history without
reloading the shared layout. Direct page visits and form submissions continue
to use normal browser requests. Images are served as compressed JPEGs and fonts
are self-hosted to avoid external font requests.

The `.nojekyll` file ensures GitHub Pages serves the site files exactly as written.
