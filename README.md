<div align="center">

# 🇮🇹 Parlo — Learn Italian, Your Way

**An offline-first Italian learning companion, from A1 to C2.**  
Learn vocabulary, grammar, reading, listening, speaking and writing through interactive lessons, personalized study plans and progress tracking.

**No account required · Local-first progress · Installable web app**

</div>

---

## ✨ About Parlo

Parlo is a browser-based Italian learning application designed for independent, self-paced study. It combines a structured A1–C2 learning path with focused practice, adaptive review, interactive scenarios and personal learning analytics.

The app is built with HTML, CSS and JavaScript, can be deployed to **GitHub Pages**, and supports offline study once the installable web app has cached its resources. A standalone HTML build is also available for local use.

> **Educational note:** Parlo's CEFR exercises and readiness estimates are practice tools, not accredited language examinations or official proficiency certificates. Offline conversation and writing feedback use predefined rules rather than an unrestricted AI model.

## 🚀 Features

| Area | What you can do |
| --- | --- |
| **A1–C2 learning path** | Follow 38 units with vocabulary, lessons, checkpoints and progress tracking. |
| **Vocabulary & flashcards** | Study Italian words, browse contextual forms and review with spaced repetition. |
| **Grammar & verbs** | Practice grammatical structures, sentence transformations and conjugations. |
| **Personal learning tutor** | Receive study suggestions based on recorded activity, mistakes, weak concepts and due reviews. |
| **Conversations** | Practice guided and branching Italian scenarios with offline rule-based feedback. |
| **Reading & listening** | Work through stories, comprehension activities, audio playback and listening exercises. |
| **Writing** | Keep an Italian diary and use guided writing activities. |
| **CEFR practice** | Try level-specific diagnostics and review skill-based results and follow-up suggestions. |
| **Progress & achievements** | Track XP, streaks, unit completion, mastery evidence, badges and learning activity. |
| **Personalization** | Choose study goals, language hints, visual preferences and light/dark modes. |
| **Offline & backup** | Work with local data and export/import personal progress in JSON format. |

Core learning features do not require a remote API or cloud account. Browser speech-recognition features can depend on the browser and may not work without internet access; typed alternatives remain available.

## 🗂️ Repository structure

```text
parlo/
├── index.html              # Application UI and learning runtime
├── data.json               # Shareable Italian curriculum and app content
├── manifest.webmanifest    # Installable PWA metadata
├── sw.js                   # Offline app-shell caching
├── icons/                  # Application icons
│   ├── icon-192.png
│   └── icon-512.png
├── README.md
└── development/            # Optional source/development files
```

**Do not publish a real `me.json`.** The packaged starter `me.json` is only a template. A personal export can contain your name, diary, learning history and settings. Keep your actual file private and outside the public repository.

## 🌐 Deploy on GitHub Pages

1. Create a GitHub repository (for example, `parlo`).
2. Extract the Parlo PWA ZIP and upload `index.html`, `data.json`, `manifest.webmanifest`, `sw.js` and `icons/` to the repository root. You can include `development/` if you want to share source, but it is not required for hosting.
3. **Do not upload your real `me.json`** or any backup containing personal data.
4. In the repository, open **Settings → Pages → Build and deployment**.
5. Choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
6. Open the GitHub Pages URL shown in your repository settings, typically:

   `https://YOUR-USERNAME.github.io/parlo/`

7. To transfer progress from a local copy, export your profile from the previous app and import it into the GitHub Pages version using **Me → Connected files** or **Data Safety**.

> **GitHub Pages is static hosting.** It can serve `data.json`, but it cannot automatically write changes to `me.json` in your repository. Public repositories and their published site are **not** appropriate storage locations for private learning profiles.

## 💾 How progress is saved

Parlo separates **application content** from **personal learner data**:

### `data.json` — curriculum content

- Holds extracted app data such as units, vocabulary, dialogues, stories, grammar and assessment registries.
- Can be connected or reloaded at runtime under **Me → Connected files**.
- Editing supported registries does **not** require running Python or rebuilding the HTML.
- Existing content IDs should remain stable to preserve compatibility with saved learner progress.
- Some inherited presentation and lesson logic still resides in `index.html`; not every part of the app can be edited through `data.json`.

### `me.json` — your private learning profile

- Contains personal progress and preferences: name, XP, streaks, lesson completion, flashcard schedules, exams, achievements, diary entries, mastery/history and settings.
- The app maintains a browser-local copy under the existing `parlo2` storage key.
- From **Me → Connected files**, you can export a profile, connect an existing file or create a new one.
- In compatible browsers, Parlo can write changes to an explicitly connected local `me.json` after you grant permission. Use **Sync now · Verify me.json** to check the latest write.
- If the browser does not support writable file access, use manual JSON export/import instead.

**Important:** Browser storage is specific to the site's origin and browser profile. Progress from a local `file://` copy does **not** automatically appear at a `github.io` URL, on a different device, or in another browser. Export/import `me.json` to move it. Clearing site data may erase the browser-local copy, so maintain a private backup.

### A safe workflow

1. Study normally; Parlo saves to browser storage.
2. Export your profile as a private `me.json` backup.
3. On a compatible browser, connect that file and grant write permission if you want automatic file synchronization.
4. Check **Connected files → Sync now · Verify me.json** after important changes.
5. Never commit your personal profile to a public repository.

## 📱 Install and use offline

On a browser that supports installing web apps, visit the deployed GitHub Pages site and use the browser's **Install app** or **Add to Home Screen** option.

After the app shell is cached, supported lessons and bundled content can run offline. Initial installation, updates and reconnecting to GitHub Pages require internet access. Local-file permission prompts may reappear after browser restarts, and browser-based speech recognition is not guaranteed offline.

A standalone HTML file can also be opened directly without GitHub Pages. Installing the PWA through GitHub Pages is generally more reliable for browser-managed caching than opening a local `file://` page.

## 🔐 Privacy & data ownership

- No account is required for core study.
- Personal progress is stored locally unless you explicitly export or connect a profile file.
- `me.json` is **private data**. Do not commit it, publish it through GitHub Pages, or include it in issue attachments.
- `data.json` is app curriculum data and is suitable for public hosting when it contains no personal information.
- GitHub Pages does **not** provide private multi-device progress sync. That would require an optional private synchronization service or manual file transfer.

For safety, add a `.gitignore` with at least:

```gitignore
me.json
me-*.json
*personal*backup*.json
```

Also check the Git staging list before pushing. `.gitignore` does not remove a file already committed; if private data was committed, remove it from the repository and consider its commit history exposed.

## 🛠️ Technology

- HTML, CSS and vanilla JavaScript
- Browser local storage and, where available, IndexedDB for remembered file connections
- File System Access API for permission-based local JSON writes on compatible browsers
- Web App Manifest and Service Worker for PWA installation and offline caching
- Static deployment on GitHub Pages — no backend required

## ⚠️ Current limitations

- Open-ended AI conversations are not available offline; Parlo uses curated dialogue and validation rules.
- Speaking recognition depends on browser/device capability and may require connectivity.
- CEFR preparation is educational practice, not an official assessment.
- Native writable file access varies by browser, operating system and permission state.
- Full automatic synchronization between separate devices is not included.

## 📌 Project status

Parlo is an evolving personal learning project. Content, learning feedback and browser support should be validated before relying on them for high-stakes assessment. Contributions and issue reports describing reproducible problems are welcome; **please remove personal learning data before sharing files or screenshots**.

---

<div align="center">

**Parlo — Un passo alla volta. 🇮🇹**  
*Learn a little every day. Make your Italian grow.*

</div>
