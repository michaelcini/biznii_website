# BizNii website

Static website deployed by the existing GitHub Pages **pages build and deployment** workflow from `main`, using the custom domain in `CNAME`: `biznii.com`.

## Odoo Mobile showcase

- `odoo-mobile-showcase.html` — complete app tour, 97 documented capabilities in 12 searchable categories, six native simulator screenshots and a captioned private-chat recording.
- `odoo-mobile.html` — existing fictional interactive phone/widget previews, retained and linked to the complete showcase.
- `odoo-mobile-support.html` / `odoo-mobile-privacy.html` — app-specific guidance; the existing corporate `privacy.html` remains separate.
- `odoo-mobile-showcase.css` / `odoo-mobile-showcase.js` — responsive design, feature filtering and accessible screenshot dialog.
- `assets/odoo/showcase/` — sample-data media with capture provenance in its README.
- `biznii-logo.png` — original corporate branding, reused directly by the showcase.
- `assets/odoo/odoo-mobile-logo.png` — approved transparent app logo exported unchanged from `Odoo-app`'s app resources. The original JPG used by the existing interactive preview is retained.

The main homepage and existing Odoo app page both link to the complete showcase. Existing AfterHours pages and preview behavior are preserved.

## Local preview

From this repository:

```powershell
python -m http.server 8089
```

Open `http://localhost:8089/odoo-mobile-showcase.html`.

## Source maintenance

The showcase source and feature inventory are maintained in the `michaelcini/Odoo-app` repository:

```powershell
python tools/sync-website-features.py
python tools/export-biznii-showcase.py ../biznii_website
```

The export copies only named showcase/support files and media. It does not overwrite the homepage, corporate logo, corporate privacy, AfterHours or the interactive Odoo preview. Update the homepage/preview links explicitly when changing routes or release messaging. Review the narrative and category assignments when capabilities change.

## Verification

The showcase was checked with desktop/mobile browser previews, feature search/filter/expansion, native screenshot dialog, local links/assets/anchors and JavaScript syntax. Simulator media uses sample fixtures, with no production connection/customer information. Video is H.264 MP4 with English captions and web fast-start metadata.
