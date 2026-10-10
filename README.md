# BizNii website

Static website published from `main` through GitHub Pages, using `CNAME` for `biznii.com`.

## BizNii Odoo Mobile

- `odoo-mobile.html`: single product page combining all 97 features, app screenshots/video, the interactive phone and widgets in the cream/sage/coral design. Includes a Google Play coming-soon section.
- `odoo-mobile-showcase.html`: compatibility redirect to the product page; old section bookmarks are retained.
- `odoo-mobile-support.html`: setup, troubleshooting and support contact.
- `odoo-mobile-privacy.html`: public app-specific privacy policy for the Play Console URL field.
- `odoo-mobile-showcase.css` / `.js`: design and navigation shared by all three app pages; search/filtering and image dialog on the product page.
- `odoo-mobile-experience.css` / `.js`: phone and home-screen-widget interactions.
- `assets/odoo/showcase/`: Android screen media with internal capture provenance in its README. Marketing copy describes the product experience, not capture tooling.
- Approved corporate logo `biznii-logo.png` and app logo `assets/odoo/odoo-mobile-logo.png` are reused unchanged.

The company homepage links to the unified app page. Corporate privacy lists the app-specific policy. AfterHours remains separate. No APK download or private app-repository link is exposed.

## Preview and maintenance

Serve this checkout with `python -m http.server 8089`, then open `http://localhost:8089/odoo-mobile.html`.

The product/support/privacy sources and capability inventory live in the private Odoo app repository:

```powershell
python tools/sync-website-features.py
python tools/export-biznii-showcase.py ../biznii_website
```

The export intentionally updates the unified product page, compatibility redirect, shared assets and app service pages. Company homepage and corporate privacy edits are maintained here. Review routing and release messaging whenever changing the export.

The public policy is https://biznii.com/odoo-mobile-privacy.html. Before app submission, link it from the Android app and Play Console, complete accurate Data safety including scanner SDK diagnostics, and verify release-build practices. The app repository's website README records the outstanding Play submission steps and policy sources.

The app phone navigator uses thirteen native Android workspace captures plus detail screens and the real Overview, To Do, Sales, Money and More navigation. Sales includes Quotations, Orders and Products; More includes Customers and Calendar. The website switches screen images without running or editing an Odoo session.

The Calendar widget uses the Android five/six-week month rules, task status and configured colours. Interactive sample notes, completion/reopening, conversation filters and replies stay in browser memory; Reset examples restores the original records. Phone imagery includes all five native calendar views and tap targets with Back navigation.
