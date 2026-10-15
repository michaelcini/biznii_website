# BizNii for Odoo website audit — 15 October 2026

## Release evidence

Inspected fetched Android `origin/main` at `d726955` (clean checkout), recent history since `v0.29.18`, release notes and build configuration. Latest published GitHub tag is `v0.29.33`, marked prerelease and published 15 October 2026 at 06:27 UTC. Application source commit: `5f3c3fe`; version 0.29.33/code 99, package `com.biznii.bizniiforodoo`, min API 26/target API 36. The release/distribution notes verify the owner's Play-signed APK. Play internal-testing distribution is confirmed; public production availability is not. No public Play installation link or private repository download link is advertised.

GitHub Pages configuration confirms legacy deployment from website `main`, root directory, CNAME `biznii.com`, HTTPS enforced. Existing product, support, privacy and showcase redirect URLs are preserved.

## Source-backed feature scope

Paths below refer to the Android checkout; it was inspected, not modified.

| Website topic | Implementation evidence and limits |
| --- | --- |
| Overview and navigation | `feature/dashboard/.../DashboardScreen.kt`, app `WorkspaceMoreScreen.kt`, `AppModule` and navigation shell. Overview / To Do / Sales / Money / More; capabilities determine visibility. |
| Contacts and suppliers | `CustomersScreen.kt`, `VendorsScreen.kt`, JSON-2 customer operations and `OdooCustomerHistoryRepository.kt`; Odoo record/company permissions apply. |
| Quotes and orders | `SalesScreen.kt`, `OdooQuotationRepository.kt`: draft editing, pricing, confirmation, cancellation/restore, invoice creation and PDF export. |
| Invoices and credit notes | `InvoicesScreen.kt`, `OdooInvoiceRepository.kt`: draft editing, posting, reviewed payments and draft credit-note reversals. Registering an Odoo payment is not a bank transfer. |
| Vendor bills and purchasing | `OdooPurchaseRepository.kt`, vendor UI: RFQs/orders and eligible vendor-bill creation, subject to approval rules. |
| Products and inventory | `OdooProductRepository.kt`, `OdooInventoryRepository.kt`, `InventoryScreen.kt`; staged recovery and native Odoo fallbacks, not an atomic universal stock operation. |
| Calendar and To Do | `OdooCalendarScreen.kt`, `ActivityCenterScreen.kt`, `OdooActivityRepository.kt`; five calendar views, supported tasks/evidence and retry/conflict handling. |
| Reminders and notifications | `OverdueDigestWorker.kt`, `OverdueDigestPolicy.kt`, `AdministrationScreen.kt`, notification workers. Off/6/12-hour overdue digests and explicit Show overdue summary now. Saved authorised scope only, expandable details, redacted public content, Android delivery restrictions. |
| Discussion | `OdooDiscussionHubRepository.kt`, discussion/direct-chat screens and notification workers: native Odoo conversations. Online sending; periodic background polling, not guaranteed instant push. |
| Accounting and statements | `OdooAccountingRepository.kt`, Accounting UI/report exports: ageing and supported P&L, bank/cash, VAT and statements. Preserve calendar-year/local-report boundaries and native Odoo statutory-report fallback. |
| Offline and encryption | `OdooActivityRepository.kt`, `EncryptedRoomSupport.kt`, `EncryptedCredentialStore.kt`, local diagnostics and outboxes. SQLCipher business databases, Keystore/AES-GCM credentials; cached contacts read-only and supported To-Do writes, not fully offline accounting or stock. |
| Widgets | Existing activity/calendar and discussion widget implementations; five/six-week month grid, status, date navigation, scoped refresh and deep links. Website interactions affect browser-memory examples only. |
| Permissions | `BusinessAuthorization.kt` and `BusinessCapabilities`: Odoo ACLs, effective feature entitlements, company context and record rights. No website promise to bypass server restrictions. |
| Compatibility | `OdooJson2Client.kt`: Odoo 19/compatible rolling 19 versions plus real endpoint checks. Android 8+. Hosting/API access and modules remain prerequisites; no older-version claim. |
| Trial and commerce | `core/licensing` trial policy/LicenseStore and app `PlayLifetimeBilling.kt`, `LicenseEntry.kt`, `LicenseScreen.kt`: 72 hours, no automatic charge; one-time Play purchase, receipt/signature checks, acknowledgement, ownership restore/retry, promo link and pending state. No fixed worldwide price or purchase-success guarantee. |

The preceding page already documented the broad business workflows. This update retains their qualified scope, adds current access/licensing information and overdue-summary controls, and corrects identity/release messaging. Recent permission, reconnect, credit-note/payment layout and encrypted offline recovery changes were checked before refreshing previews.

## Privacy review

Preserved `/odoo-mobile-privacy.html`. Reviewed manifest (`allowBackup=false`), dependencies, local stores, billing and launch intents. Added trial/receipt/entitlement processing, Google Play ownership queries and acknowledgement, promo redemption and separate provider handling. Existing scanner diagnostics disclosure remains: Google code scanner/ML Kit is integrated, so a blanket “no data collected” claim would be wrong. No advertising, Firebase Analytics or Crashlytics dependency was found in the reviewed build. Support emails are user-initiated; business records go to the selected Odoo server, not a separate BizNii business backend. The privacy policy distinguishes organisation records, support, Google services and local retention.

## Android legal acknowledgement — recommendation only

`WelcomeScreen.kt` currently offers getting started, trial/purchase/recovery actions without public Terms or Privacy links. `LicenseScreen.kt` has an Android settings link, which is not a privacy-policy link. No contractual acceptance checkpoint or versioned acceptance record was found in those entry screens.

Recommended follow-up: before first business use, show an unchecked **“I agree to the Terms of Use and acknowledge that I have read the Privacy Policy”** acknowledgement with accessible links to `https://biznii.com/odoo/terms/` and the preserved privacy URL. Allow reading without accepting, explain the backup recommendation, and record the accepted terms version/date locally. Provide both links later in Settings and App access. Handle material changes with notice and renewed agreement where legally required, preserving acquired purchase and statutory rights. Do not silently interpret a website visit as acceptance.

Licence acceptance and receipt of a privacy notice are not GDPR consent to all processing. If a particular optional processing purpose requires consent, request specific, separate, freely given and withdrawable consent; do not preselect or bundle it with access to necessary app functions. Update Play Console policy/Data safety disclosures consistently. Confirm the provider's full legal identity/address for any applicable trader-information requirements; no unverified registered entity or address has been invented on the website.

## Legal drafting basis

The Terms include all sixteen requested topics, backup/restoration advice, transaction checks and prompt incident reporting. They qualify warranty/liability restrictions, retain mandatory consumer/data-protection rights, do not categorically exclude direct data loss, and do not impose exclusive Malta courts on consumers. No app payment or licensing behavior was changed.

Primary references reviewed:

- Malta Digital Content and Digital Services Contracts Regulations: https://legislation.mt/eli/sl/378.20/eng
- MCCAA regulator guidance: https://mccaa.org.mt/media/7107/user-guidelines-digital-content-and-digital-services-contracts-regulations-2021.pdf
- European Commission digital contract guidance: https://commission.europa.eu/topics/business-and-industry/contract-rules/digital-contracts/digital-contract-rules_en
- Rome I, Article 6: https://eur-lex.europa.eu/eli/reg/2008/593/2008-07-24/eng
- Google scanner/ML Kit disclosure: https://developers.google.com/ml-kit/android-data-disclosure

## Validation

`python tools/check_site.py` checks all five Odoo HTML routes, local assets, fragment targets, duplicate IDs and release/legal invariants. Both website JavaScript files are checked with `node --check`; all Odoo PNGs decode successfully. All five routes return HTTP 200 locally. Browser checks at 320, 390, 768 and 1440px cover responsive legal/product pages, mobile navigation, feature search, native phone navigation and widget examples (month navigation, completion/reset, note creation, mentions filter and sample reply). No horizontal page overflow or JavaScript errors were observed. The legacy showcase `#demo` redirect reaches the product's `#explore` anchor. Native screenshot provenance and the successful 13-case current fixture run are recorded in `assets/odoo/showcase/README.md`.

Only the Odoo product name/release badge on the company homepage and its product-policy label on corporate privacy were updated; AfterHours and corporate policy content are unchanged. Deployment status and exact website commit are reported after push; GitHub Pages remains sourced from `main`.
