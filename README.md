<div align="center">
<img src="icons/icon-512.png" alt="Parlo app icon" width="144" />
Parlo
Learn a language, one day at a time.
An offline-first language learning app with Italian and Spanish courses, covering A1 to C2, with interactive lessons, vocabulary, grammar, listening, speaking practice, review activities, and personal progress tracking.
Built with HTML, CSS, and JavaScript · Installable PWA · No account required
</div>
What you can do
Pick a course: Italian and Spanish today. Tap the flag, code and level chip in the header to switch. Each course keeps its own progress.
Use the app in your language: the interface is available in English, French, Arabic (right to left) and Spanish. Meanings and explanations follow your chosen language.
Follow a structured learning path: 38 units spanning CEFR levels A1 to C2, with lessons and practice activities.
Build vocabulary: word packs, translations, a searchable dictionary, and review tools.
Study grammar and verbs: grammar guides, conjugations, pronunciation examples, and listening controls.
Practice language skills: reading, listening, conversation, writing, games, labs, quizzes, and level exams.
Find content quickly: global search for pages, units, words, verbs, sentences, stories, and dialogues.
Track your learning: daily streak, XP, goals, statistics, mastery, and achievements in the Trophy Room.
Personalize the experience: name, interface language, appearance, and text-size settings.
Keep learning offline: install Parlo as a Progressive Web App and use cached content without a connection.
Some browser-dependent capabilities, including speech playback and recognition, vary by device, installed voices, and offline support. Features that a course has no content for hide themselves instead of showing empty pages.
Try or install Parlo
Online: Open Parlo (https://yassirelreklaoui.github.io/parlo/)
Android (Chrome): open the site, then browser menu, then Install app or Add to Home screen.
iPhone (Safari): open the site, then Share, then Add to Home Screen.
Desktop: open the site in a compatible browser and use its install control when available.
The first visit needs internet access to download the app. Offline availability requires successful initial caching. Installation prompts and file-system permissions differ between browsers.
The app needs to be opened through its web address (GitHub Pages or any HTTPS or localhost server). Opening index.html straight from the phone file system does not work, because the app loads its course files with fetch.
Your data stays yours
Parlo separates course content from personal learning data:
Storage	Purpose	Where it belongs
it_data/, es_data/	Course content: units, lessons, vocabulary, grammar, verbs, dialogues, stories, games	Published with the app
i18n/	Interface text in English, French, Arabic and Spanish	Published with the app
Browser storage parlo2	Automatically saves your Italian progress on that browser and device	Your device only
Browser storage parlo2-es	Automatically saves your Spanish progress	Your device only
me.json	Exportable personal profile: name, progress, XP, streaks, lessons, exams, achievements	Your private backup. Do not publish it
Keep your progress safe
Open Settings and find the section about keeping your learning progress safe and connected files.
Choose Download me.json to make a private backup of your current progress.
On supported desktop browsers, you can create or connect a writable me.json, grant permission once, and let Parlo save into it.
Use the import or restore control to move your progress to a new browser or device.
Parlo does not provide automatic cross-device cloud sync. If you move from a local copy to the hosted site, restore your previously exported me.json there.
Repository structure
index.html            the app (HTML, CSS, JavaScript)
sw.js                 service worker, offline cache (change BUILD on every release)
manifest.webmanifest  PWA manifest
courses.json          list of courses shown in the course switcher
languages.json        list of interface languages (en, fr, ar, es)
i18n/                 interface text: en.json, fr.json, ar.json, es.json
it_data/              Italian course: it-data.json + it-data.en/fr/ar/es.json
es_data/              Spanish course: es-data.json + es-data.en/fr/ar/es.json
icons/                app icons
fonts/                bundled fonts
Not needed on GitHub Pages: development/, Python build scripts, and me.json. The old data.json is no longer loaded by the current app, so it is not part of the deployment.
Deploy on GitHub Pages
Create or open the repository (YassirElReklaoui/parlo).
Upload the files listed above to the repository root, keeping the folder names.
Open Settings, then Pages.
Under Build and deployment, select Deploy from a branch, then main, then / (root), then Save.
Open https://yassirelreklaoui.github.io/parlo/ after GitHub Pages finishes publishing.
Installed apps keep old files in the cache. Before each release, change the BUILD value in sw.js so phones download the new files.
How course content files work
Parlo is a template: the app code is generic and each course is a set of JSON files. A course never needs changes in index.html.
courses.json lists the courses. Each entry has a code, a native name, a flag, a status (ready shows the course), and a names object with the course name in each interface language.
<code>_data/<code>-data.json is the course base: units, lessons, vocabulary, verbs, dialogues, stories, grammar, game banks, voice settings, and the learning section (voice, letters, numbers, hide list, and uiText overrides).
<code>_data/<code>-data.<ui>.json are the translation overlays for en, fr, ar and es. They fill the meanings and explanations in each interface language. Keys follow the path modules/NAME#1/index/column.
Progress for each course is stored separately in the browser (parlo2 for Italian, parlo2-<code> for the others).
If a course has no data for a feature (a game, a lab, a lesson type), that feature hides itself. Nothing falls back to another course's content or to English in French, Arabic or Spanish mode.
Add a new course
Create xx_data/ with xx-data.json and the four overlay files xx-data.en.json, xx-data.fr.json, xx-data.ar.json, xx-data.es.json.
Fill the content. Keep unit and word identifiers stable so saved progress stays valid.
Add the course to courses.json with "status": "ready", its flag, native name, and names in the four interface languages.
Bump BUILD in sw.js, upload, and the course shows up in the switcher.
Add an interface language
Add i18n/xx.json, add the language to languages.json, and add xx overlay files for each course.
Technology
HTML, CSS, and vanilla JavaScript
Progressive Web App manifest and service worker
Browser storage for offline learning state
File System Access API where supported, with manual JSON import and export as a fallback
GitHub Pages compatible static hosting
No backend or cloud account is required for the core experience.
Development and local use
Serve the repository over HTTPS or localhost to test (for example python3 -m http.server in the repository folder, then open http://localhost:8000/). Service worker and install behavior need HTTPS or localhost. Test voice playback, offline mode and the installed app on the target device. Open ?course=es to start directly in a course.
Project notes
Do not publish real learner backups, personal exports, or credentials.
Some audio and speech features depend on the browser and available system voices.
Offline content availability depends on the successful service worker cache installation.
Suggested .gitignore
# Personal learning profiles and exports
me.json
me-*.json
*personal*backup*.json

# Local-only development files (optional)
development/
<div align="center">
Parlo · Impara l'italiano. Aprende español. Every day.
</div>
