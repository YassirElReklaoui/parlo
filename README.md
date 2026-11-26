<div align="center">

<img src="icons/icon-512.png" alt="Parlo app icon" width="144" />

# Parlo 🇮🇹

**Learn Italian, one day at a time.**

An offline-first Italian learning app covering **A1 to C2**, with interactive lessons, vocabulary, grammar, listening, speaking practice, review activities, and personal progress tracking.

**Built with HTML, CSS, and JavaScript · Installable PWA · No account required**

</div>

---

## ✨ What you can do

- **Follow a structured learning path:** 38 units spanning CEFR levels A1–C2, with lessons and practice activities.
- **Build vocabulary:** 532 entries in the included vocabulary collection, word packs, translations, and review tools.
- **Study grammar and verbs:** Grammar Guides, conjugations, pronunciation examples, and listening controls.
- **Practice language skills:** Reading, listening, conversation, writing, quizzes, and exam-style activities.
- **Find content quickly:** Global search for pages, units, words, verbs, sentences, stories, and dialogues.
- **Track your learning:** Daily streak, XP, goals, statistics, mastery, and achievements in the Trophy Room.
- **Personalize the experience:** Name, target language, appearance, and text-size settings.
- **Keep learning offline:** Install Parlo as a Progressive Web App and use cached learning content without a connection.

Some browser-dependent capabilities, including speech playback and recognition, may vary by device, installed voices, and offline support.

## 📱 Try or install Parlo

**Online:** [Open Parlo](https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/)

> Replace `YOUR-USERNAME` and `YOUR-REPOSITORY` with your GitHub Pages account and repository name after publishing.

**Android (Chrome):** Open the site → browser menu → **Install app** or **Add to Home screen**.

**iPhone (Safari):** Open the site → **Share** → **Add to Home Screen**.

**Desktop:** Open the site in a compatible browser and use its install control when available.

The first visit needs internet access to download the app. Offline availability requires successful initial caching. Installation prompts and file-system permissions differ among browsers.

## 🔒 Your data stays yours

Parlo separates **application content** from **personal learning data**:

| Storage | Purpose | Where it belongs |
| --- | --- | --- |
| `data.json` | Curriculum, vocabulary, grammar, verbs, dialogues, stories, and content registries | Public repository |
| Browser storage (`parlo2`) | Automatically saves your learning progress on that browser/device | Your device |
| `me.json` | Exportable personal profile: name, progress, XP, streaks, lessons, exams, achievements, settings, and learning history | **Private — never commit to a public repo** |

### Keep your progress safe

1. Open **Settings → Keep your learning progress safe / Connected files**.
2. Choose **Download me.json** to make a private backup of your current progress.
3. On supported desktop browsers, you can **create or connect a writable `me.json`**, grant permission, and use **Sync now** to verify the saved file.
4. Use the app's import/restore control to transfer your progress to a new browser or device.

**Important:** Browser storage is local to a specific browser and website origin. Opening Parlo on a phone or another computer does **not** automatically synchronize progress from another device. Local-file autosave requires browser support and permission; on unsupported devices, download/import backups manually. GitHub Pages is static hosting and cannot write personal changes back into the repository.

## 🚀 Deploy with GitHub Pages

1. Create a GitHub repository (for example, `parlo-italian-learning`).
2. Upload these files to the repository **root**:

   ```text
   parlo-italian-learning/
   ├── index.html
   ├── data.json
   ├── manifest.webmanifest
   ├── sw.js
   ├── icons/
   │   ├── icon-192.png
   │   ├── icon-512.png
   │   ├── icon-1024.png
   │   └── favicon.png
   └── README.md
   ```

3. Open **Repository Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch** → `main` → `/ (root)` → **Save**.
5. Open `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/` after GitHub Pages finishes publishing.
6. If you're moving from a local HTML copy, restore your previously exported `me.json` on the newly hosted site.

**Do not upload `me.json`.** The `development/` folder and Python build scripts are not required for a GitHub Pages deployment.

### Suggested `.gitignore`

```gitignore
# Personal learning profiles and exports
me.json
me-*.json
*personal*backup*.json

# Local-only development files (optional)
development/
```

## 🗂️ How content files work

Parlo's standalone HTML includes built-in learning data as a fallback. The separate `data.json` is a runtime-connectable content source:

1. Open **Settings → Connected files**.
2. Choose **Connect data.json** to select your content file.
3. To apply edits to that file, choose **Reload file content**.

**No Python script or rebuild is required** to load supported changes from the connected JSON. Preserve existing unit and word identifiers to maintain compatibility with saved progress. Some inherited lesson presentation and logic still live in `index.html`, rather than in `data.json`.

## 🧩 Technology

- HTML, CSS, and vanilla JavaScript
- Progressive Web App manifest and service worker
- Browser storage for offline learning state
- File System Access API where supported, with manual JSON import/export fallback
- GitHub Pages-compatible static hosting

No backend or cloud account is required for the core experience.

## 🛠️ Development and local use

Open `index.html` directly in a compatible browser for standalone use. For PWA installation and service-worker behavior, serve the repository over **HTTPS** or `localhost` (GitHub Pages provides HTTPS).

You can customize supported learning content through `data.json`; connect or reload it from Settings. Browser file permissions, voice playback, and installed-PWA behavior should be tested on the target device.

## 📌 Project notes

- Parlo does **not** provide automatic cross-device cloud sync.
- Do not publish real learner backups, personal exports, or credentials.
- Some audio and speech features depend on the browser and available system voices.
- Offline content availability depends on the successful service-worker cache installation.

---

<div align="center">

**Parlo — Impara l’italiano, ogni giorno. 🇮🇹**

</div>
