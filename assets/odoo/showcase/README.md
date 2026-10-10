# Native app showcase media

All assets are real Android simulator captures from the app's Compose screens using **test fixtures**, not production records or invented website UI. Some focused tests render a screen without the complete app shell. Capture dates and theme/layout reflect the corresponding test run. Media does not demonstrate every feature; the complete feature inventory is on `showcase.html`.

| Website asset | Capture source |
| --- | --- |
| `customer.png` | `DiscussionScreenTest` customer fixture: `review-customerReadsPostsAndReturnsToSameDetail.png`, emulator API 31 app-private test capture |
| `job.png` | `ActivityScreenSmokeTest` task/evidence fixture: `review-completeJobConfirmsWithOptionalCommentWithoutChecklist.png`, app-private test capture |
| `offline.png` | `ActivityScreenSmokeTest` queued task fixture: `review-pendingOfflineTaskShowsItsSyncState.png`, app-private test capture |
| `pricing.png` | `PricingUxTest`: `review-pricing-calc-net-totals.png`, app-private test capture |
| `discussion.png` | `DirectChatScreenTest`: `review-direct-chat-phone-reply.png`, app-private test capture |
| `calendar.png` | Fresh 2026-10-09 API 31 run: `CalendarScreenSmokeTest#calendarDayOpensLinkedTaskThroughTodoFlowAndShowsCustomer`, `calendar-day.png` |
| `chat-demo.mp4` | Fresh 2026-10-09 API 31 screenrecord of `DirectChatScreenTest#pcConversationOpensSendsPrivateReplyAndReturnsToChats`; fixture repository, no real messages sent |

The chat recording retains the actual chat-list → conversation → reply → chat-list sequence. Startup and launcher footage were trimmed; playback is slowed to 80% to make the short automated interaction legible. H.264 MP4, 540px wide, no audio, fast-start metadata. On-page description explains the flow. Both fresh instrumentation methods passed.

For future capture sessions, run fixture-only tests against a debug emulator and inspect every asset before replacing it. Do not publish connected production customer, financial, contact, connection or credential information. Keep video and screenshots inside `website/assets/` so any static host can serve the complete tour.

## Workspace navigator (2026-10-10)

`workspace-{overview,todo,sales,orders,products,money,more,calendar,customers}.png` are 1080 x 2211 captures from `WebsiteScreenCaptureTest` on API 31. Nine instrumentation tests passed. They render production Compose screens inside the same NavigationSuiteScaffold and WorkspaceTopBar used by MainActivity, with Overview / To Do / Sales / Money / More in production order. Money uses the production accounting labels and shared tab component. Sample records are created in the test; no Odoo connection is opened.

Rebuild debug and AndroidTest APKs, install both on the test emulator, then run `adb shell am instrument -w -r -e class com.cersii.odoomobile.WebsiteScreenCaptureTest com.cersii.odoomobile.debug.test/androidx.test.runner.AndroidJUnitRunner`. Pull `website-*.png` from the debug package's external files directory and rename to `workspace-*.png`. Inspect every image before export.

The website navigates these native screenshots; it does not run the Android app or submit edits. Keep screen names, primary navigation and subgroup mappings aligned with MainActivity when refreshing assets.
