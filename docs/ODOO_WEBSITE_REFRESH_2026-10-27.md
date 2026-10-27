# BizNii launch website refresh — review record

Production app baseline: `da8759695b960e9f090aca1d8c5405c68f6ab29e`, `feature/discuss-realtime-calls`. Public baseline: `2589528`, reviewed on `codex/odoo-website-refresh`. Both remotes were fetched before work; neither branch was behind. Existing owner documents remain untouched and untracked. The newer public legal, pricing, SEO, early-access links and analytics markup were imported into the app website source before editing. Company homepage, AfterHours, corporate privacy, early-access privacy and terms were preserved byte-for-byte. Only the stale sign-in/compatibility sentence on the Early Access page was updated; the form, endpoint, consent and other recruitment copy are unchanged.

The reviewed catalogue contains **157 entries across 17 areas**. `launch-features.json` is now the copy source; the helper uses stable IDs, validates duplicates and renders counts from actual entries. README ordering can no longer overwrite newer marketing copy. Existing directory IDs, old product-page aliases and bookmark routes remain supported. Purchase information stays in the existing approved trial/lifetime sections; Google Play is explicitly coming soon.

| Reference area | Directory | Narrative / interaction | Representative media |
| --- | --- | --- | --- |
| 1. Connections and workspaces | `#directory-security` (9) | #security / #boundaries | More / overview (connection setup intentionally not shown) |
| 2. Business overview and quick access | `#directory-workspace` (8) | #workspaces / #explore | workspace-overview.png |
| 3. Customers and suppliers | `#directory-customers` (8) | #customers | workspace-customer-detail.png; workspace-customer-history.png |
| 4. Products and pricing | `#directory-products` (8) | #customers | workspace-products.png; workspace-quotation-editor.png |
| 5. Quotations and sales orders | `#directory-sales` (8) | #customers | workspace-sales.png; workspace-orders.png; workspace-quotation-editor.png |
| 6. Invoices, payments and credit notes | `#directory-invoices` (9) | #operations | workspace-money.png |
| 7. Money, statements and reports | `#directory-money` (8) | #operations / #boundaries | Money representative; no report/statement detail capture |
| 8. Purchasing | `#directory-purchasing` (9) | #operations | workspace-purchasing.png |
| 9. Inventory, receipts and deliveries | `#directory-stock` (8) | #operations | workspace-stock.png; workspace-receipts.png; workspace-deliveries.png |
| 10. Van stock, kits and warranties | `#directory-field` (8) | #operations / stock navigator | workspace-van-stock.png; workspace-kits.png; workspace-warranties.png |
| 11. To Dos and field work | `#directory-todo` (11) | #planning | workspace-todo.png; job.png |
| 12. Calendar and scheduling | `#directory-planning` (12) | #planning / calendar navigator | workspace-calendar*.png (all five modes) |
| 13. Discuss messaging | `#directory-discussion` (9) | #team / #widgets | discuss-list.png; discussion.png (attachment) |
| 14. Voice and video calls | `#directory-calls` (13) | #calls / #boundaries | call-*.png (six views, including Light/Dark) |
| 15. Home-screen widgets and reminders | `#directory-widgets` (11) | #widgets | widget-calendar.png; widget-discuss.png; local interactive examples |
| 16. Offline work and synchronization | `#directory-offline` (8) | #security / #boundaries | offline.png; job.png |
| 17. Privacy, security and appearance | `#directory-appearance` (10) | #security / #calls | call-incoming-video.png and call-incoming-video-dark.png |

## Checks and practical limits

- Debug/instrumentation builds passed with the installed Android Studio Java runtime and repository wrapper. Only screenshot instrumentation changed; production Android sources, manifest, dependencies, version and signing are unchanged.
- Clean selected instrumentation: 37 passed; subsequent focused final fixture recaptures passed (2 + 1 + 1 + 1). Detailed original filenames, source commit, themes, emulator and processing are recorded in the media README/manifest. The earlier job-completion UI test failure is retained as a separate test finding, not hidden behind the capture-only replacement.
- Product/support/privacy and the exported site are served locally. Browser QA covers 320, 390, 768 and 1280px, directory search/category/expand, deep links, gallery filter/dialog/Escape, phone navigation/hotspots/Back, calendar modes, widget month/date controls, local notes/completion/reply/filter/reset and the private-call shortcut. No sample interaction connects to Odoo.
- Source/export route, image path, intrinsic dimension, catalogue count and idempotence checks accompany the public repository's route/legal checker and JS syntax checks. Public URLs contain no APK download, private-repository link or invented Play link. The existing approved analytics integration is preserved; no new analytics service was added.
- Privacy wording was checked against call permissions, `DiscussIceConfiguration`, `discuss_call.js`, incoming-call and listener code. It discloses Odoo signalling, negotiated peer/relay media, configured STUN/TURN and Google STUN fallback, optional listening and user-shared diagnostics. Existing Google scanner/billing disclosures remain. This is not legal approval or Play compliance certification.
- Media shows representative screens, not every workflow. Connection/2FA setup, payment registration, statement/report details, signature capture and complete receipt/delivery validation have directory coverage but no dedicated new detail screenshot. The kit, warranty and receipt captures show their actual supported workspaces. Live network interoperability and locked-device delivery remain outside this fixture-only website task.

Website/capture implementation commit: `2e3b103b9e246084326ad60c8924669f0a7a829a` on the app feature branch.

## Review and publishing

Local source: `http://127.0.0.1:8088/showcase.html`; exported public preview: `http://127.0.0.1:8089/odoo-mobile.html`. These are local previews, not a deployment. Screenshots and raw capture logs are in the task's `outputs/biznii-website-refresh-2026-10-27` folder.

There are no deployment workflows in the public checkout. Its README identifies GitHub Pages publishing from `main` with `CNAME=biznii.com`. The app workflow runs verification on `main`, version tags or explicit dispatch; it does not run on this feature branch. Review-branch pushes do not publish this site. The exact separate publishing step is to review and merge `codex/odoo-website-refresh` into the public repository's `main` branch; the configured GitHub Pages branch build then publishes it. No merge, publishing-branch push, tag, release, production build or deployment is included here. GitHub CLI API authentication is unavailable, so Pages settings were established from the repository's documented publishing configuration and absence of workflow files, not a fresh authenticated Settings API read.

## Office sample background update — 27 October 2026

At the owner's request, `call-video.png` and `call-video-connecting.png` now use imagegen office sample backgrounds in the main video area and self-preview. These two assets are presentation composites, replacing the geometric synthetic rooms described in the original capture record. The native header, control bar and connecting caller card were restored from the original captures; header and control pixels were verified unchanged. Dimensions remain 810 × 1658. No production Android code or APK changed; no new instrumentation or live calls were run. The manifest hashes describe these edited renditions. All other capture records remain unchanged. Repeat capture alone will restore the original geometric room unless this presentation edit is reapplied.
