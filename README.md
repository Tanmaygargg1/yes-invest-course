# YES Investing Course

A free investing education course for JC students, built by the Young Entrepreneurs' Society at ACS(Independent). Eleven units, forty-two lessons — from "what is money?" through valuation, private equity, and dealcraft.

Pure HTML + CSS + JS. No frameworks, no build step, no npm. Progress is tracked client-side in `localStorage` only — there is no backend and no accounts.

## Structure

```
/
├── index.html                 ← landing page / course home
├── assets/
│   ├── css/main.css           ← shared styles
│   └── js/main.js             ← mobile nav + progress tracking
└── lessons/
    └── unit-X-lesson-Y.html   ← one file per lesson (42 total)
```

## Local preview

No build tools needed — any static file server works:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository (the contents of this folder should be at the repo root, or in `/docs` if you configure Pages that way).
2. In the repo, go to **Settings → Pages**.
3. Under **Source**, select the branch (usually `main`) and the root folder (`/` or `/docs`).
4. Save. GitHub will publish the site at `https://<username>.github.io/<repo>/` within a minute or two.

### Using a custom subdomain (e.g. `invest.yes-acsi.com`)

1. Add a file named `CNAME` at the repo root containing just the domain, e.g.:
   ```
   invest.yes-acsi.com
   ```
2. At your DNS provider, add a `CNAME` record pointing `invest` to `<username>.github.io`.
3. Back in **Settings → Pages**, enter the custom domain and enable **Enforce HTTPS** once DNS has propagated (can take up to 24 hours).

No `.htaccess`, no server config, and no environment variables are needed — this is a fully static site.

## Editing content

Every lesson page is self-contained HTML. To edit a lesson, open the corresponding file in `lessons/` directly — there are no templates or includes to compile. If you add or reorder lessons, update the sidebar navigation block (present in every page) and the prev/next links at the bottom of each lesson to keep navigation consistent.
