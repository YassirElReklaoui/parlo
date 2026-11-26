<!-- First public release. Internal development versions are not shown in the application. -->
# Parlo — Italian Learning (First Public Release)

No Python, command line, server, cloud account, or internet service is needed for the **standalone HTML**.

## Files

- `index.html` — Parlo interface, learning logic, and **Settings → Connected files** controls. The standalone `parlo-v232.html` has the same content.
- `data.json` — editable curriculum and learning content. It contains 38 units and 532 vocabulary entries, together with the extracted content registries. It contains **no learner progress**.
- `me.json` — a **blank starter profile only**. Do not overwrite your actual saved profile with this file. Export your own personal `me.json` from Parlo.
- `sw.js`, `manifest.webmanifest`, `icons/` — optional installable PWA support when served over HTTPS/localhost.

## Use the app without running scripts

1. Open `index.html` (or the single HTML) in a compatible browser.
2. Open the **Me** page, then choose **Connected files → data.json & me.json**. The same controls are also in **Data Safety**.
3. Press **Connect data.json** and choose the `data.json` file in the same folder. Parlo reads its curriculum immediately. To apply subsequent external edits, press **Reload file content** or reopen Parlo with access granted.
4. For a learner with existing progress, use the same browser/origin as before. Export a backup first.
5. Press **Reconnect / choose me.json** to select an existing personal profile, or **Create me.json** to create a writable file. Confirm whether to use the file's progress or the browser's existing progress.
6. After permission is granted, progress updates are automatically written to connected `me.json`, debounced shortly after each save. `parlo2` browser storage stays as a safety copy. A visible message warns if automatic file saving stops.
7. File connections are remembered through IndexedDB when the browser allows it. On later launches, previously granted permissions are reused when possible. If permission expired, reconnect through Settings.

**Do not import the blank starter `me.json` over your actual progress.** Create a real backup from your existing Parlo browser profile.

## Editing content

`data.json` is read directly at runtime. **You do not run `build.py` and do not need to rebuild the HTML.** Select or reload it in Settings after editing. Parlo validates the content before replacing the loaded registries. Existing unit and word identifiers are protected because changing them could attach old progress to the wrong lesson or word. New content may be added while preserving existing identifiers. Some inherited hard-coded presentation and original lesson definitions remain in the HTML; this release makes the extracted curriculum registries live-editable.

## Important browser limitations

- **Automatic filesystem writes require the File System Access API**, a user gesture, and explicit read/write permission. Desktop Chrome and Edge on supported secure contexts are recommended. Support for `file://` varies by browser; opening the app from a stable local path is preferable to moving it frequently.
- Other browsers can **load `data.json` using a file input** and **download/import `me.json` manually**, but they cannot silently overwrite a local file. Parlo never attempts to bypass this browser restriction.
- If you move the standalone file to a different browser origin, old browser storage or granted file connections may not be shared. Use your exported `me.json` to restore.
- Standalone HTML always has built-in curriculum content as a fallback until you connect `data.json`.
- Core learning content works offline. A service worker requires an HTTPS/localhost install; local file-picker permissions are governed by the browser and may need renewal after reopening.

## Security and privacy

`me.json` contains your personal profile: name, XP, lessons, goals, reviews, badges, exams, diary, history, mastery, preferences, and future state fields. Keep it private. No content or progress is uploaded. The installed PWA never precaches `me.json`.

## Testing

See `TEST_REPORT.md`. Browser tests cover reading a modified content file without rebuilding, preservation of 532 vocabulary entries, profile writes after progress changes, existing-ID protection, Settings UI, and JavaScript startup. Native system file permissions and installed PWA upgrades require testing on your device.


## v233: Verified me.json sync

After granting read/write permission, personal changes (including name) queue a file update. Open **Me → Connected files → Sync now · Verify me.json** to force a write and verify the file contents. The status shows the verified save time and name. JSON stores the name at `profile.name`. If write permission expires, reconnect the file. `data.json` contains curriculum content and does not hold your name. The browser-local copy remains a safety backup.


## Public 1.1 enhancements
- Installable custom Parlo icon and onboarding install guidance (HTTPS or localhost for install).
- Global search in the header for pages, units, vocabulary, verbs, grammar, dialogue, stories, and sentences.
- Profile backup, connect, restore, and sync controls grouped in Settings.
- `me.json` is private, and should **not** be uploaded to a public GitHub repository. Mobile browser file writing is limited; browser-local progress continues independently.


## GitHub Pages publishing
Upload `index.html`, `data.json`, `manifest.webmanifest`, `sw.js`, `icons/`, and this README to the repository root. In GitHub, enable **Settings → Pages → Deploy from a branch → main → /(root)**.
Never upload your real `me.json` to a public repository. After visiting your hosted URL, import your existing profile from **Settings → Keep your learning progress safe**.
For installation, open the hosted HTTPS URL, then accept the install prompt where available or use the phone browser's Add to Home Screen command. Offline support depends on a successful initial cache install.

## Public 1.2 updates

- App icon uses the uploaded Parlo artwork.
- Text scale: S 14px, M 16.5px, L 18px, XL 19px.
- Word Pack listen buttons play the selected Italian word.
- Grammar Guides animate only the tapped audio example.


## Public 1.3 changes
- Shows the streak in the mobile header; the language selector is now under Me.
- Search category chips are centered and input focus styling is cleaner.
- Grammar guide listening animates only the tapped speaker icon.
- Removed duplicate Home learning shortcut trio; adjusted spacing in Me and Speak.
- Icon now uses a transparent PNG outside its rounded artwork.
