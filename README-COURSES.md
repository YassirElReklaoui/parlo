# Courses (phase 1)

- courses.json lists the courses. status "ready" = the folder <code>_data/ exists and the app can switch to it. status "soon" = vote only.
- A course folder holds index.json, <code>-data.json and one <code>-data.<lang>.json per language (same layout as it_data/).
- Progress is stored per course: Italian in 'parlo2' (unchanged), another course in 'parlo2-<code>'. A new course starts empty and copies only the name and settings.
- The header chip (flag + code + level) opens the course switcher. The switcher is also in Me, "I want to learn".
- Optional in a course's data, under "learning": "labels": {"republic": "...", "passport": "...", "certificate": "...", "congrats": "..."} (a text, or an object with one text per app language). Without labels the Italian words are used.
- To test: open the app with ?course=<code>, or tap the course in the switcher.

## Spanish (es) course, built in this release
- Folder es_data/ (same layout as it_data/). Spanish (Spain), A1 to C2, 38 units, 153 verbs with 5 tenses, 23 grammar topics, level exams, talk, stories, phrasebook, kit, culture, missions, journeys, bosses, long listening, chat practice, story practice, scenarios, trivia, word packs, extra unit words.
- Voice: es-ES. If the phone has no Spanish voice, the app respells the text for an English voice, using the rules in es_data/es-data.json (CONTENT_SPEECH_RESPELL_RULES#1, CONTENT_SPEECH_VOWEL_MAPPING#1), the same way Italian does.
- Not in the Spanish course yet (the screens stay hidden or empty, no Italian text shows): verb lab drills, regular-verb rules page, themed labs, glossary tap-a-word banks, placement/plan hubs and their banks. Nothing in the Spanish course was reviewed by a native speaker.
