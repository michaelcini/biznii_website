# BizNii for Odoo Early Access: setup and operation

## Current state

The website integration is implemented, but **registration is closed**. No Formspark
account, endpoint or real submission has been configured or tested. The disabled
fieldset and JavaScript configuration both prevent accidental collection. The
privacy notice is explicitly a draft. Do not describe the programme as operational
until the launch checks below pass.

- Page: https://biznii.com/odoo/early-access/
- Programme notice: https://biznii.com/odoo/early-access/privacy/
- Product integration: the `#early-access` section and footer link in `odoo-mobile.html`.
- Existing app privacy, terms, routes, screenshots, navigation scripts, branding,
  CNAME, `.nojekyll` and Pages configuration are preserved.

## Provider choice and costs

The owner selected **Formspark Free**. It accepts the site's own HTML form, keeps
records behind a private dashboard and supports CSV/JSON export and deletion.
No server, runtime dependency, admin portal or private frontend key is added.

As checked on 15 October 2026, the initial workspace includes **250 submissions
total, not per month**, 10 forms and five team members. Exports and spam filtering
are included. Free notification emails can take up to 15 minutes. Paid bundles
are optional; the current advertised offer is $25 for 50,000 submissions, with no
recurring subscription. No purchase has been made or authorised. Monitor remaining
credits; close registration before exhaustion if staying free. Deletion does not
replenish the allowance. Reserve several submissions for launch tests.

Sources: [plans](https://formspark.io/pricing/),
[limits](https://documentation.formspark.io/troubleshooting/limits-and-plans.html),
[AJAX protocol](https://documentation.formspark.io/examples/ajax.html).
Prices and allowances can change; confirm in the account before launch.

## Required owner configuration and launch checks

1. Create/sign in to an owner-controlled [Formspark account](https://dashboard.formspark.io/).
   Use the initial workspace with its free allowance. Create a dedicated form named
   `BizNii for Odoo Early Access`. Do not use a demo/test endpoint on the live site.
2. Review the [DPA](https://formspark.io/legal/dpa/),
   [privacy policy](https://formspark.io/legal/privacy-policy/),
   [GDPR information](https://formspark.io/legal/gdpr/) and
   [subprocessors](https://formspark.io/legal/subprocessors/).
   The published DPA forms part of the service terms; the owner must decide whether
   the actual arrangements meet this programme's needs. This implementation is not
   legal certification.
3. In form settings keep **Automatic filter / Screen submissions for spam** enabled.
   Add `biznii.com` to **Allowed domains**. The submitted `_honeypot` checkbox is
   already integrated. Temporarily allow `localhost` for local acceptance tests,
   then remove it. Domain checks and honeypots alone do not stop determined abuse;
   review spam and quota during promotion. If needed, add Formspark's free Turnstile
   integration later, including its privacy disclosure and client token integration;
   simply selecting Turnstile without integrating it will reject every registration.
4. Disable notification emails unless needed. If enabled, use an owner-only mailbox,
   document its provider, processing countries, transfers and retention in the notice,
   and delete those copies alongside applications. Do not enable analytics,
   webhooks, Google Sheets, Slack, Zapier or other integrations by default.
5. Publish the controller's **full legal identity and contact/address details** in
   `odoo/early-access/privacy/index.html`. Only the brand and support@biznii.com were
   established by existing website content. Confirm consent as the legal basis.
   Approve or replace the **proposed six months after receipt** retention period and
   disclose any exceptions. The six months is not currently an approved policy.
6. Review processor retention separately: Formspark's published DPA says submitted
   content stays until customer deletion, deleted records are recoverable for 30
   days, IP/derived location remain 12 months, filtered submissions remain 12 months
   (visible for 30 days), and generated exports remain seven days. Resolve any
   incompatible requirements with Formspark before collecting data. Storage is
   described as Ireland/Germany; some subprocessors process outside the EEA with
   published safeguards. Review these details and actual enabled services, rather
   than claiming there are no international transfers.
7. Replace draft language in the notice with the approved arrangements, effective
   date and version. Put only the public form ID (from
   `https://submit-form.com/FORM_ID`) in `odoo/early-access/config.js`.
   Set `privacyVersion` to the approved date, e.g. `2026-10-15` (or date plus numeric
   revision). Set `privacyApproved: true`. Never put account/API tokens in the site.
8. In a **local-only configuration override**, set `enabled: true` and run real
   acceptance tests against the actual endpoint: valid email with optional fields
   blank; every dropdown category; consent; duplicate email; rejection/spam; errors;
   and receipt in the private dashboard. Use an owner-controlled test address,
   confirm timestamps and consent/version storage, and delete test submissions.
   Confirm anonymous visitors cannot read records or perform administration.
   Confirm CSV export, deletion and the private status workflow below. The automated
   browser tests mock the endpoint and are not evidence of any of these operations.
9. Once those checks pass, set `enabled: true`, increment the `config.js` cache
   query in `index.html`, run checks and publish via the existing `main` workflow.
   Verify the live form and perform/delete a final owner-controlled test submission.
   To close registration, set `enabled: false`, increment the cache query and publish.

## Fields, validation and acceptance

| Stored field | Meaning |
| --- | --- |
| Provider receipt timestamp | Authoritative registration date |
| `email` | Trimmed email; required; at most 254 characters |
| `odoo_edition` | Optional Community / Enterprise / Both / Not sure |
| `odoo_version` | Optional listed version/category |
| `android_version` | Optional listed version/category |
| `interest` | Optional listed interest category |
| `comments` | Optional, at most 2,000 characters |
| `registration_consent` | Required checkbox answer `agreed` |
| `privacy_version` | Approved notice version |
| `programme` | Programme identifier |
| `application_status` | Initial `New`; administrator controls subsequent status |

The client checks native email validity, required consent, field lengths and listed
dropdown values. Formspark applies its own service limits and spam checks. Its
documented integration does **not establish a custom server-side schema for these
fields**: a caller can bypass frontend validation or forge hidden values. Administrators
must quarantine records with invalid email, missing/incorrect consent/version,
overlong comments or unknown values, and never use a submitted status as authority.
Do not contact applicants based on missing or doubtful consent. If strict server-side
enforcement becomes necessary, reassess the provider or add a small validated gateway;
do not claim the browser alone enforces backend rules.

Submission uses HTTPS JSON POST with both JSON headers, omitted credentials and an
origin-only referrer. A successful Formspark 2xx JSON object triggers the thank-you
state; non-2xx, malformed JSON, explicit errors and network failures do not. Spam
rejections are documented as 403. Never return success locally for a honeypot hit.
There are no automatic retries. A timeout/lost response may follow a stored record;
the error explains the uncertainty and the owner merges duplicate applications.
No email, comments or consent are written to browser storage, URLs, console or analytics.

## Private application management

Sign in to Formspark, select the form, then open **Submissions**. Keep workspace
membership limited to the owner and necessary authorised staff. Use account security
and MFA where the chosen sign-in provider supports it. No public list or admin route
exists in this website. The form ID permits submission; it is not a read/admin key.

- **View:** review receipt date and fields in the dashboard; check Spam for false positives.
- **Export:** Submissions → select records → Export → CSV or JSON. Keep exports
  outside every Git checkout, in owner-only encrypted storage. Treat all spreadsheet
  cells as untrusted text; do not execute formula-like comments when opening CSVs.
- **Filter and status:** use a private local spreadsheet from the export for combined
  filters on edition, Odoo version, Android version and interest. Add `Status`,
  `Last contacted`, `Deletion due` and provider record ID columns. Use the exact statuses:
  **New, Under review, Selected, Invited, Testing, Completed, Not selected**.
  This is the reliable fallback if the account does not offer editable status fields
  or combined filters; no dedicated workflow board is promised. Where the dashboard
  allows editing, update the stored `application_status` there as well. Never publish
  or share the tracker by link.
- **Duplicates:** do not query or reveal whether an address is registered. Success
  copy is neutral. The same page cannot submit again after acceptance, and in-flight
  requests disable the form. Across browsers/reloads, Formspark may store duplicates:
  group privately by trimmed, case-normalised email, keep the original receipt and
  latest valid answers, preserve relevant consent evidence, and treat as one applicant.
  Do not strip `+tags` or dots. No backend email uniqueness is claimed.
- **Delete/withdraw:** verify the request proportionately using the registered mailbox;
  search all copies/duplicates, delete provider records, notification copies, exports
  and tracker rows, and stop application contact. Use dashboard Delete for records;
  ask Formspark support about processor logs, filtered records and recoverable copies.
  Record only the minimum request-completion evidence justified by the approved policy.
  Do not promise instant erasure of processor backups or logs.
- **Retention:** review deletion due dates weekly and remove records no later than
  the approved deadline. The proposed six-month duration is measured from receipt,
  not reset by status updates. Delete unnecessary exports promptly. If an ongoing
  tester relationship needs longer retention, explain it and establish its basis
  separately. Provider storage otherwise continues until deletion.
- **Quota:** check credits before/after community sharing and at least weekly while
  open. Close the public form before credits run out if you do not want to buy a bundle.

## Invitations, codes and confirmation email

Select and contact applicants manually, within their recorded consent. Testing access
and complimentary codes are separate discretionary decisions. Do not request positive
reviews or tie codes to a rating. Distribute only genuine codes from Play Console after
checking app/product eligibility and current rules. Google currently requires active
eligible one-time products/buy purchase options and limits non-subscription promotions
to 500 codes per app per quarter; confirm again when issuing. This website does not
generate codes, grant licences or change app billing/trials.
[Current Google instructions](https://support.google.com/googleplay/android-developer/answer/6321495).

Confirmation emails are intentionally omitted: Formspark's autoresponder requires an
upgraded workspace. The accepted submission receives the requested website thank-you
message. No newsletter opt-in or unrelated marketing is added. If an upgrade is chosen
later, use only the acknowledgement text supplied in the task and update disclosures.
[Autoresponder availability](https://documentation.formspark.io/dashboard/autoresponder.html).

## Verification and future feedback

Run `python tools/check_site.py`, `node --check odoo/early-access/registration.js`,
`node --check odoo/early-access/config.js` and
`node tools/check_early_access.cjs http://localhost:8089` with Playwright available.
The browser check uses synthetic reserved-domain addresses and intercepts all
submission requests. It never creates real applications. Visual evidence is saved
outside the checkout in the OS temporary directory.

There is no package/build/lint framework in this repository. Existing JavaScript
syntax checks and `tools/check_site.py` remain the baseline regression checks.

A future feedback page can use another dedicated Formspark form in the same workspace,
with a separate purpose/notice and optional fields. Do not add uploads, tester accounts,
credentials or public feedback records to this registration form.

## Implementation verification (15 October 2026)

- PASS: `tools/check_site.py`: 11 pages and 227 local asset/route/fragment references,
  including existing privacy and terms URLs.
- PASS: Node syntax checks for configuration, registration, browser check and both
  existing shared product/interactive-preview scripts; `git diff --check`.
- PASS: Headless Microsoft Edge browser checks, 37 intercepted POSTs and **zero real
  submissions**: closed configuration, invalid/trimmed email, empty optional fields,
  every dropdown value, unchecked/required consent, comment limit, payload metadata,
  disabled/loading state, in-flight double-submit prevention, neutral duplicate
  response, accepted state, HTTP/spam/quota/network/timeout/malformed-response errors,
  keyboard skip link, desktop/mobile navigation, responsive routes, phone workspace
  tabs and feature search. Reserved synthetic addresses never left the test browser.
- PASS: visual inspection of desktop 1440px and mobile 390px captures; no horizontal
  overflow on tested routes. Existing shared styles and media are unchanged.
- PASS: staged file review and secret/address-pattern scan; no applicant data,
  credentials, domain settings or Pages configuration added/modified.
- NOT VERIFIED: real Formspark validation/spam behaviour, storage, duplicate receipt,
  authenticated/anonymous access boundaries, CSV export, deletion and administrator
  status editing. Those require the owner's account/endpoint and launch checks.
- NOT CONFIGURED: confirmation email (omitted on the free plan), controller identity,
  approved retention, effective programme notice and live registration endpoint.
