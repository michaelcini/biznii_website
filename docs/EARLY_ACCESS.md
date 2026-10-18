# BizNii for Odoo Early Access: setup and operation

## Current state

**Registration is enabled.** The owner supplied `https://submit-form.com/zhUewNLPQ`,
confirmed dashboard receipt and deletion of the setup test, and confirmed all three
provider settings: automatic spam filtering enabled and `biznii.com` allowed. On
18 October 2026 the owner confirmed administrator notifications are received in Gmail;
these replace the initially disabled notification setting. These settings are owner-confirmed; no
agent access to the private dashboard has been used.

The public controller name is **Biznii**, privacy contact support@biznii.com, and
retention is **three months after receipt**, managed by the administrator. The final
notice is effective 18 October 2026, version `2026-10-18`, and discloses Gmail notifications. The site contains no
personal controller name in its current files; earlier Git history is unchanged.

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

## Configuration and maintenance reference (initial setup completed)

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
4. Administrator notifications are enabled and received in **Gmail**, as confirmed
   by the owner on 18 October 2026. Keep the recipient mailbox owner-only. The notice
   now identifies Google/Gmail, worldwide processing and the published transfer
   information without assuming a Workspace contract or EEA-only storage. Delete
   notification emails and their specific Trash copies alongside applications within
   three months of the original registration date, or earlier for a valid withdrawal
   or deletion request. This deadline is not reset by delayed email delivery. Do not enable analytics,
   webhooks, Google Sheets, Slack, Zapier or other integrations by default.
5. **Confirmed by the owner:** Biznii is the controller, operating as BizNii
   from Malta. The established contact is support@biznii.com. These details are
   published in `odoo/early-access/privacy/index.html`; no postal address has been
   invented. The selected registration basis is consent, using the required unchecked
   checkbox. The owner approved deletion **no later than three months after receipt**.
   This replaces the earlier unapproved six-month proposal. Do not extend retention
   by changing application status. Any separate ongoing tester relationship requires
   its own information and legal basis.
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
  the approved deadline. At each weekly review, delete records falling due before
  the next review, so the deadline is not exceeded. The approved three-month duration is measured from receipt,
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
- NOT VERIFIED BY THE AGENT: real Formspark validation/spam enforcement, duplicate
  receipt, authenticated/anonymous access boundaries, CSV export and administrator
  status editing. The owner has since confirmed dashboard receipt and test deletion.
  Remaining checks require the owner's account and launch verification.
- NOT CONFIGURED: confirmation email (omitted on the free plan) and effective launch
  notice. The owner has since supplied controller identity and approved three-month retention.

## Owner-supplied endpoint verification (15 October 2026)

- Configured the public form ID `zhUewNLPQ` supplied by the owner and bumped the
  configuration asset cache version. Both launch gates remain false.
- Made **one real setup submission** from a browser on the live `biznii.com` origin
  to `https://submit-form.com/zhUewNLPQ`. Formspark returned HTTP 200 and a JSON object
  containing the submitted fields. The optional technical fields were empty.
- Used the existing public support mailbox and marked the payload `SETUP TEST ONLY`,
  not an applicant. The consent field was `setup-test-not-applicant`; no applicant
  consent was asserted. This test consumes one submission from the free allowance.
- This confirms browser-to-provider request acceptance only. It does not establish
  dashboard persistence, owner access, domain/spam settings, server-side schema
  enforcement, export, deletion or approved privacy arrangements.
- The owner subsequently confirmed deleting the setup test in Formspark Submissions.
  Any notification copies must also be deleted. No private dashboard credentials were provided or used.
- Registration remains visibly closed pending provider-settings confirmation, the final
  launch notice and remaining real acceptance checks. Controller identity and three-month
  retention are now confirmed.

## Owner privacy decisions and test deletion

The owner confirmed that the setup test was deleted, supplied **Biznii** as
controller, and shortened retention to **three months after receipt**. The programme
notice and operations instructions now use those decisions. The privacy contact
remains the existing public support@biznii.com mailbox; no unprovided postal address
is published or treated as an automatic launch blocker.

Three months is an administrator-managed deletion deadline, not an automatically
configured Formspark purge. Apply it to registrations, duplicate copies, exports,
private trackers and notification emails. Formspark's separately disclosed recovery,
log and filtered-submission periods remain unchanged and must not be described as
three months. The owner confirmation is evidence of dashboard receipt/access and
test deletion, rather than an independent agent audit of all administrative features.

The owner subsequently confirmed automatic spam filtering is enabled, Allowed domains
is set to biznii.com, and submission email notifications are disabled. If notifications
are enabled later, identify the delivery provider and processing arrangements in the notice. No extra provider account or
private API token is required by this website.

The owner requested **Biznii** as the published controller name. The current notice
and this guide use that name. This change does not assert incorporation or a
registered company status. The three-month retention policy remains unchanged.

## Registration activation

The owner answered “Yes—all three are set” to the spam/domain/disabled-notification
settings question. The remaining provider-settings gate is resolved. Registration is
enabled in `config.js`, with approved privacy version `2026-10-15-4` and a bumped
configuration asset URL. The public notice uses final wording and states notifications
are disabled. The public form still starts disabled in HTML and JavaScript enables
it only when both launch flags and the configured form ID/version are valid. If
scripts fail, visitors see an unavailable/loading message instead of losing data.

The three-month deadline is **manual**, including exports and private tracker copies.
It is not an automatic purge configured by this site. No new paid service, API key,
email system, application licence change or Android repository change was introduced.
CSV export, combined filtering/status workflow and provider spam enforcement are
supported/documented but have not been independently tested inside the owner’s account.

Activation checks passed: 11 pages / 227 local references, JavaScript syntax, diff
whitespace checks, changed-file secret/name scan, and the browser suite with 37
intercepted POSTs. The suite verifies the shipped open form, emergency closed gate,
validation, options, consent, duplicate-response UX, errors, responsive routes and
existing preview/navigation controls. No real submission is generated by that suite.

## Gmail notifications update — 18 October 2026

The owner confirmed receiving Formspark submission notifications in Gmail. The current
programme notice now discloses these administrator emails, Google/Gmail as the email
provider, possible processing outside the EEA, and Google's published privacy, transfer
and retention information. The actual recipient address is not added to public files.
No Gmail region setting, Google Workspace plan/DPA or automatic deletion arrangement
has been invented. Older entries above describe the initial disabled-email setup.

The notice and submitted `privacy_version` are now `2026-10-18`; the config asset URL
is bumped to avoid stale consent-version metadata. Registration remains enabled.
Applicant acknowledgement emails remain omitted; Gmail notifications go to the owner.
The mailbox must be searched for each privacy request, including archived mail, copies
and Trash. Delete only the relevant notification copies; do not empty unrelated mail.
Include these emails in the weekly deletion review and remove items due before the
next review. Deletion is manual and Google's provider-level retention can continue
under its published policies after the owner deletes an email.

Delivery is **owner-confirmed**, not independently audited by the agent. No extra live
submission is needed for this notice update. Original consent-version evidence must
remain tied to the version accepted at registration; do not overwrite earlier records.
Google references: https://policies.google.com/privacy ,
https://policies.google.com/privacy/frameworks ,
https://policies.google.com/technologies/retention .
