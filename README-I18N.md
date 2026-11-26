# Parlo content layout: it_data/

Learning language = folder. Italian course = `it_data/`.

    it_data/index.json        languages, file names, fallback language
    it_data/it-data.json      language-independent base: Italian text, ids, structure, audio refs, level logic, "learning" block
    it_data/it-data.en.json   all translatable fields (English)
    it_data/it-data.fr.json   same keys, French
    it_data/it-data.ar.json   same keys, Arabic (MSA)

Each language file is `{lang, languageName, strings:{ "<path in base>": "text" }}`. The path is the position of the field in the base file, so the same key exists in every language file. The app loads base + the UI language (Settings > Main translation) and overlays it. If a key is missing it falls back to English.
Changing the UI language reloads the page once, so the right file is loaded.

## Add a language (example Spanish)
1. Copy `it_data/it-data.en.json` to `it_data/it-data.es.json`, set `"lang":"es"` and `"languageName"`, translate the values (do not touch keys).
2. Add `"es"` to `languages` in `it_data/index.json`.
3. Add `i18n/es.json` (copy `i18n/en.json`, translate) for the app screens.
4. Add `./it_data/it-data.es.json` and `./i18n/es.json` to the cache list in `sw.js`, bump its version.
5. Run `python3 check_it_data.py` and `python3 check_i18n.py`. They list every missing, empty or broken ({0}, tags) value.

## Other courses
`index.html?course=xx` loads `./xx_data/index.json` (old `?data=xx` still works). Missing folder shows the friendly error page.

## Checks
    python3 check_it_data.py     # it_data language files
    python3 check_i18n.py        # i18n/*.json app strings
Both exit 1 on any gap.
