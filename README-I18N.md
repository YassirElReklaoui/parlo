# Languages

languages.json (repo root) lists every language. The app, the service worker and the check scripts read it. Nothing else is hardcoded.

## Add a language (example: Spanish, code es)
1. Copy i18n/en.json to i18n/es.json and translate the values (keep the keys and {0} {1} {L}).
2. Copy it_data/it-data.en.json to it_data/it-data.es.json, translate the values, set "lang":"es" and "languageName":"Español".
3. Add one line to languages.json: { "code": "es", "name": "Español", "label": "ES", "dir": "ltr" }  (dir is "rtl" for Arabic, Hebrew, Persian, Urdu).
4. Run: python3 check_i18n.py and python3 check_it_data.py (both read languages.json).
5. Upload the two json files and languages.json. Nothing else changes.

## Notes
- English is the fallback. A missing key shows English. A missing or broken language file is skipped and never breaks the app.
- Extra languages are stored after the three original ones (en, fr, ar), in the order of languages.json.
- Some small lists (the mkLab labels in the app code) hold only en, fr and ar. Other languages show English there.
- sw.js reads languages.json when it installs and caches every listed file. Change BUILD in sw.js on each release.
