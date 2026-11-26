# Parlo UI internationalization — v241

## Purpose
This release separates **interface translations** (`i18n/en.json`, `i18n/ar.json`, `i18n/fr.json`) from Italian **learning content** (`data.json`).

## Settings behavior
- **Main translation & app language** = English / French / Arabic. Changing it also changes the interface language and stores the selection in the existing `parlo2` settings object.
- **Also show (small)** = independently selectable supplementary word translations. Selecting Arabic as the main language while EN and FR are checked shows the Arabic meaning large and both EN and FR meanings smaller. Their text is protected from UI localization.
- Arabic sets page `lang=ar` and `dir=rtl`; switching back sets `ltr`.
- The Italian target-language text and pronunciation remain Italian. Do **not** change Italian speech to Arabic: Italian is the language the learner is studying.

## How it is implemented
The startup loader loads the usual `data.json` and the three locale packs before running the app. A UI localization layer translates matching English display labels, descriptions, placeholders and accessibility labels, including newly rendered views/modals. The dictionary supports templates such as `{0} XP per day`. Italian learning terms and secondary translations are excluded from the UI translation pass. Source-level UI strings are retained for compatibility with older code.

## Deployment
Replace `index.html`, `data.json`, `sw.js`; add the `i18n/` folder. Deploy them as a single update. The service worker caches all three i18n packs for offline use. Keep your repository's existing `fonts/` folder; font files are not included in this ZIP. Retain the icons provided. Never publish your personal `me.json`.

## Compatibility / limitations
- **`data.json` is byte-for-byte unchanged** from Parlo v240. All 446 data modules are preserved, with 38 units, 153 verbs, 24 dialogues and 14 stories.
- The `parlo2` progress key, unit IDs, quiz answers and learning-data schema are unchanged.
- **This release is not a guarantee of 100% text localization.** The catalogs cover many app controls and English vocabulary glosses, but uncommon dynamically generated status text and English-only instructional/grammar explanations inside the original learning datasets may still appear in English. Missing dictionary keys intentionally fall back to the original displayed source text, rather than showing blanks.
- For thorough all-screens localization, remaining English-only course explanation text should be translated and added to locale-specific datasets; runtime UI rendering should ultimately call `t(key)` explicitly rather than relying solely on DOM translation. Existing browser-specific audio and PWA behavior was not exhaustively tested.

## QA performed
- JavaScript parsing, JSON catalog parsing and equality against the original v240 learning data.
- Chromium DOM tests: all six main routes in EN, AR and FR; Arabic RTL and reversible language switching; main Arabic word + preserved small EN/FR meanings; no uncaught page errors in these tests.
- Full content equality checks, 38 units / 153 runtime verbs / 24 dialogues / 14 stories.

## Updating translations
Edit `i18n/ar.json` or `i18n/fr.json`: under `strings`, add an exact English source phrase and its translation. For dynamic strings use `{0}`, `{1}` placeholder keys. Keep tags, application IDs and Italian target language entries unchanged. Update `sw.js` BUILD for every release to force cache refresh.
