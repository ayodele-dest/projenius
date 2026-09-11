# Progenius

A static experimental portfolio, built from the supplied PRD and SVG brand assets.

Run `node preview.cjs` and open http://127.0.0.1:5173.

Pages: Home, About, Capabilities, Projects, two project detail views, and Contact. Project records and page content are in `dist/app.js`. Shared styles are in `dist/style.css`.

The contact flow validates and downloads a project brief locally. It does not send enquiries; a delivery destination and provider are still required. Case studies use explicitly labelled concept artwork. Verified dates, locations, responsibilities, outcomes and project photography remain to be supplied. Analytics and a CMS are not configured. Navigation uses hash routes; dedicated static page exports would be needed for per-project search indexing.
