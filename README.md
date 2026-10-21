# StudyVault Desktop

Your existing `StudyVault.html` wrapped in an Electron desktop window. Your data stays in the folder you pick (e.g. `Documents\StudyVault`) in the same format as before, so you can switch between the browser version and this app.

## Run it (Windows)
1. Install **Node.js LTS** from https://nodejs.org (once).
2. Double-click **START-StudyVault.bat** (first run downloads Electron, then opens the app).
3. Click **Choose folder**, pick your StudyVault folder. Next time use **Reconnect folder**.

Same on macOS/Linux: `npm install` then `npm start`.

## Make an installer / portable .exe
```
npm install
npm run dist
```
The installer and a portable `.exe` appear in `dist/`. Build on the OS you are targeting.

## No Node.js? Use the fallback
Double-click **LAUNCH-without-install.bat**. It opens `app/StudyVault.html` in an app-style Edge/Chrome window (same behaviour as the browser version).

## What the wrapper does
- Serves the page from a secure `app://` origin so the folder picker and "remember my folder" work.
- Opens web links (visualizations, GitHub, bookmarks) in your default browser; previews of PDFs/videos/images open in a small window.
- Allows one window at a time.

## Notes
- Your original instructions are in `app/ORIGINAL-README.txt`.
- To update the app UI, replace `app/StudyVault.html`.
- Not tested here: I could not install or run Electron in my sandbox, so please report any message that appears at the bottom-right of the app or in the terminal.
