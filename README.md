# BizNii website

Static website published from `main` through GitHub Pages, using `CNAME` for `biznii.com`.

## BizNii for Odoo

- `odoo-mobile.html`: product page with 100 documented features, native screenshots/video, the interactive phone and widgets. Preserves the existing layout, cream/sage palette and #FF6630 brand orange, with darker text accents for readability. Public copy focuses on app capabilities, the trial and lifetime access. Internal release/distribution evidence belongs in the audit, not the product presentation.
- `odoo-mobile-showcase.html`: compatibility redirect to the product page; old section bookmarks are retained.
- `odoo-mobile-support.html`: setup, troubleshooting and support contact.
- `odoo-mobile-privacy.html`: public app-specific privacy policy for the Play Console URL field.
- `odoo/terms/index.html`: Terms of Use and Disclaimer at `/odoo/terms/`, linked from product, support and privacy pages.
- `odoo-mobile-showcase.css` / `.js`: design and navigation shared by all three app pages; search/filtering and image dialog on the product page.
- `odoo-mobile-experience.css` / `.js`: phone and home-screen-widget interactions.
- `assets/odoo/showcase/`: Android screen media with internal capture provenance in its README. Marketing copy describes the product experience, not capture tooling.
- Approved corporate logo `biznii-logo.png` and app logo `assets/odoo/odoo-mobile-logo.png` are reused unchanged.

The company homepage links to the unified app page. Corporate privacy lists the app-specific policy. AfterHours remains separate. No APK download or private app-repository link is exposed.

## Preview and maintenance

Serve this checkout with `python -m http.server 8089`, then open `http://localhost:8089/odoo-mobile.html`.

Maintain the published product and legal pages in this repository. Earlier app-repository export tooling is not authoritative for the current release/legal copy and can overwrite it. Review generated content before any future import. Do not modify the app repository to maintain this site. See `docs/ODOO_CONTENT_AUDIT.md` for release/source evidence, boundaries, legal references and Android onboarding recommendations.

Run `python tools/check_site.py` and `node --check` on both Odoo JavaScript files. Serve locally and check desktop/mobile layout, phone hotspots, feature search, widget interactions, and legal links before publishing to `main`.

The public policy is https://biznii.com/odoo-mobile-privacy.html. Before app submission, link it from the Android app and Play Console, complete accurate Data safety including scanner SDK diagnostics, and verify release-build practices. The app repository's website README records the outstanding Play submission steps and policy sources.

The app phone navigator uses thirteen native Android workspace captures plus detail screens and the real Overview, To Do, Sales, Money and More navigation. Sales includes Quotations, Orders and Products; More includes Customers and Calendar. The website switches screen images without running or editing an Odoo session.

The Calendar widget uses the Android five/six-week month rules, task status and configured colours. Interactive sample notes, completion/reopening, conversation filters and replies stay in browser memory; Reset examples restores the original records. Phone imagery includes all five native calendar views and tap targets with Back navigation.

## Early Access programme

The Odoo product page links to `/odoo/early-access/`. Registration is intentionally disabled until the owner configures Formspark Free, approves the programme privacy notice and completes real acceptance tests. See [setup, privacy decisions and private administration](docs/EARLY_ACCESS.md). No applicant data or secrets belong in this repository.
