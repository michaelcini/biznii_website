# Native Android showcase media — 27 October 2026

All 35 published screenshots are fresh renders from the feature-branch production Compose screens or native Android widget resources, with fictional fixture data. No existing website image or old APK was used as capture input. The production source checkpoint is `da8759695b960e9f090aca1d8c5405c68f6ab29e` (normal realtime/voice/video/background defaults enabled; debug protocol trial disabled). Capture-only instrumentation changes live in the same source commit as this document; no production app behavior, permissions, layout, signing or version was changed.

Device: isolated `BizNiiWebsite30`, emulator serial `emulator-5580`, Android 11 / API30, Google APIs x86, 1080 × 2400, density 420, portrait. The debug package was resolved from the current build as `com.biznii.bizniiforodoo.debug`; runner package is `com.biznii.bizniiforodoo.debug.test`. Emulator identity (`ro.kernel.qemu=1`) was checked before the clean debug-data reset. No physical phone was used. The fresh run starts with a cleared app and debug-only local trial bootstrap. No Odoo credentials or connection profile was saved.

The final clean selection passed 37 tests. Subsequent focused captures passed after presentation-fixture improvements: overview/fictional chat (2), native chat-list capture (1), job dialog capture (1), and stock quantities (1). The earlier existing job-completion test failed because its confirmation button was not displayed following its keyboard/Back sequence; this was not changed or presented as passing. A separate capture-only job test avoids the completion action. No live calls, live database walkthrough, production release, physical-device acceptance or universal Odoo interoperability are claimed.

Calls use `DiscussCallSurface` and the production `DiscussMediaDocument`. Local canvas video streams supply controlled synthetic room scenes through the real WebView media elements; they do not use camera, microphone, a peer connection or Odoo signalling. These media fixtures demonstrate the interface and preview placement only. They are identified as sample scenes on the product page. Theme comparison uses the same fictional incoming invitation in Light and Dark.

Widgets use the actual Android resource layouts, monthly renderer and production Discuss row renderer. Discuss header/rows are bound locally in a native View fixture, without a launcher service, account or callbacks. These captures demonstrate widget appearance and available controls, not background delivery. The separate HTML widget examples update browser memory only.

Every PNG is converted to RGB, downscaled with Lanczos to fit 810 × 1800 without changing aspect ratio, and losslessly PNG-optimized. Compose root/dialog captures use no crop. Full-window chat/offline/customer/editor captures remove 63px at the top and 126px at the bottom for Android system bars. The native chat list uses its production hub node directly, without system bars or a dismissal scrim. The native widget viewports are 1000 × 1250 before resizing. No UI text, controls, content or branding was redrawn or retouched. Per-file dimensions/checksums are in `capture-manifest.json`.

| Website asset | Fixture/test | Theme | Original capture filename | Crop before resizing |
| --- | --- | --- | --- | --- |
| `workspace-calendar-month.png` | `WebsiteScreenCaptureTest#calendarMonth` | Light | `website-calendar-month.png` | none |
| `workspace-calendar-schedule.png` | `WebsiteScreenCaptureTest#calendarSchedule` | Light | `website-calendar-schedule.png` | none |
| `workspace-calendar-three-days.png` | `WebsiteScreenCaptureTest#calendarThreeDays` | Light | `website-calendar-three-days.png` | none |
| `workspace-calendar-week.png` | `WebsiteScreenCaptureTest#calendarWeek` | Light | `website-calendar-week.png` | none |
| `workspace-calendar.png` | `WebsiteScreenCaptureTest#calendar` | Light | `website-calendar.png` | none |
| `call-incoming-video-dark.png` | `WebsiteCallsCaptureTest#incomingVideoDark` | Dark | `website-call-incoming-video-dark.png` | none |
| `call-incoming-video.png` | `WebsiteCallsCaptureTest#incomingVideoLight` | Light | `website-call-incoming-video.png` | none |
| `call-incoming-voice.png` | `WebsiteCallsCaptureTest#incomingVoiceLight` | Light | `website-call-incoming-voice.png` | none |
| `call-video-connecting.png` | `WebsiteCallsCaptureTest#connectingVideo` | Light | `website-call-video-connecting.png` | none |
| `call-video.png` | `WebsiteCallsCaptureTest#activeVideo` | Light | `website-call-video.png` | none |
| `call-voice.png` | `WebsiteCallsCaptureTest#activeVoice` | Light | `website-call-voice.png` | none |
| `workspace-customer-detail.png` | `WebsiteScreenCaptureTest#customerDetail` | Light | `website-customer-detail.png` | 63px top / 126px bottom Android system bars |
| `workspace-customer-history.png` | `WebsiteScreenCaptureTest#customerHistory` | Light | `website-customer-history.png` | 63px top / 126px bottom Android system bars |
| `workspace-customers.png` | `WebsiteScreenCaptureTest#customers` | Light | `website-customers.png` | none |
| `workspace-deliveries.png` | `WebsiteScreenCaptureTest#deliveries` | Light | `website-deliveries.png` | none |
| `job.png` | `ActivityScreenSmokeTest#websiteJobEvidence` | Dark | `website-job.png` | none |
| `workspace-kits.png` | `WebsiteScreenCaptureTest#kits` | Light | `website-kits.png` | none |
| `workspace-money.png` | `WebsiteScreenCaptureTest#money` | Light | `website-money.png` | none |
| `workspace-more.png` | `WebsiteScreenCaptureTest#more` | Light | `website-more.png` | none |
| `workspace-orders.png` | `WebsiteScreenCaptureTest#orders` | Light | `website-orders.png` | none |
| `workspace-overview.png` | `WebsiteScreenCaptureTest#overview` | Light | `website-overview.png` | none |
| `workspace-products.png` | `WebsiteScreenCaptureTest#products` | Light | `website-products.png` | none |
| `workspace-purchasing.png` | `WebsiteScreenCaptureTest#purchasing` | Light | `website-purchasing.png` | none |
| `workspace-quotation-editor.png` | `WebsiteScreenCaptureTest#quotationEditor` | Light | `website-quotation-editor.png` | 63px top / 126px bottom Android system bars |
| `workspace-receipts.png` | `WebsiteScreenCaptureTest#receipts` | Light | `website-receipts.png` | none |
| `workspace-sales.png` | `WebsiteScreenCaptureTest#sales` | Light | `website-sales.png` | none |
| `workspace-stock.png` | `WebsiteScreenCaptureTest#stock` | Light | `website-stock.png` | none |
| `workspace-todo.png` | `WebsiteScreenCaptureTest#todo` | Light | `website-todo.png` | none |
| `workspace-van-stock.png` | `WebsiteScreenCaptureTest#vanStock` | Light | `website-van-stock.png` | none |
| `workspace-warranties.png` | `WebsiteScreenCaptureTest#warranties` | Light | `website-warranties.png` | none |
| `widget-calendar.png` | `WebsiteWidgetsCaptureTest#calendar` | Light | `website-widget-calendar.png` | none |
| `widget-discuss.png` | `WebsiteWidgetsCaptureTest#discuss` | Light | `website-widget-discuss.png` | none |
| `offline.png` | `ActivityScreenSmokeTest#pendingOfflineTaskShowsItsSyncState` | Light | `review-pendingOfflineTaskShowsItsSyncState.png` | 63px top / 126px bottom Android system bars |
| `discussion.png` | `WebsiteDiscussionCaptureTest#fictionalConversationAndAttachmentReturnToChats` | Light | `review-website-discussion.png` | 63px top / 126px bottom Android system bars |
| `discuss-list.png` | `WebsiteDiscussionCaptureTest#fictionalConversationAndAttachmentReturnToChats` | Light | `review-website-discuss-list.png` | none |

## Repeat the capture

Use the installed Android Studio Java runtime and Gradle wrapper. Build `:app:assembleDebug :app:assembleDebugAndroidTest` with normal defaults. Windows outputs are under `%LOCALAPPDATA%/CodexBuilds/OdooMobile/app/outputs/apk/`.

On an isolated, root-capable emulator set 1080x2400 and density 420. Verify `adb -s <serial> shell getprop ro.kernel.qemu` returns `1` before any reset. Install the current debug and instrumentation APKs. For a fresh run, clear **only that emulator's** debug package, then run:

```text
adb -s <serial> shell am instrument -w -r -e class com.cersii.odoomobile.UiSuiteBootstrapTest,com.cersii.odoomobile.WebsiteScreenCaptureTest,com.cersii.odoomobile.WebsiteCallsCaptureTest,com.cersii.odoomobile.WebsiteWidgetsCaptureTest,com.cersii.odoomobile.WebsiteDiscussionCaptureTest,com.cersii.odoomobile.ActivityScreenSmokeTest#websiteJobEvidence,com.cersii.odoomobile.ActivityScreenSmokeTest#pendingOfflineTaskShowsItsSyncState com.biznii.bizniiforodoo.debug.test/androidx.test.runner.AndroidJUnitRunner
python tools/collect-website-captures.py --serial <serial> --raw-dir <outside-checkout-directory>
```

The collector refuses physical devices and restarts adbd as root only on the selected emulator, to read Android scoped external storage. Original PNGs and the initial manifest stay in the explicit raw directory. Review every rendition and refresh this provenance/manifest before export. Old `calendar.png`, `customer.png`, `pricing.png` and `chat-demo.mp4` were retired; no obsolete media remains linked. Public marketing copy contains no capture/test implementation details beyond the page-level sample-data explanation.
