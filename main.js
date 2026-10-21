'use strict';
const { app, BrowserWindow, protocol, net, session, shell } = require('electron');
const path = require('path');
const { pathToFileURL } = require('url');

// Serve the app from a secure custom origin: the File System Access API
// (showDirectoryPicker) and IndexedDB folder memory need a secure context.
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true } }
]);

const ROOT = path.join(__dirname, 'app');
const ALLOWED = new Set(['fileSystem', 'clipboard-sanitized-write', 'fullscreen', 'media']);

function external(url) { if (/^https?:/i.test(url)) shell.openExternal(url); }

function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 820, minWidth: 900, minHeight: 600,
    backgroundColor: '#0a0f2c', title: 'StudyVault', autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  win.loadURL('app://studyvault/StudyVault.html');

  // Links: web pages open in the default browser; blob previews (PDF, video, images) open in a small window.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('blob:') || url.startsWith('app://')) {
      return { action: 'allow', overrideBrowserWindowOptions: { width: 1000, height: 760, autoHideMenuBar: true } };
    }
    external(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (!url.startsWith('app://')) { e.preventDefault(); external(url); }
  });
}

const lock = app.requestSingleInstanceLock();
if (!lock) app.quit();
else {
  app.on('second-instance', () => {
    const w = BrowserWindow.getAllWindows()[0];
    if (w) { if (w.isMinimized()) w.restore(); w.focus(); }
  });
  app.whenReady().then(() => {
    protocol.handle('app', req => {
      let p = decodeURIComponent(new URL(req.url).pathname);
      if (p === '/' || p === '') p = '/StudyVault.html';
      const file = path.join(ROOT, p);
      if (!file.startsWith(ROOT)) return new Response('Forbidden', { status: 403 });
      return net.fetch(pathToFileURL(file).toString());
    });
    const ses = session.defaultSession;
    ses.setPermissionRequestHandler((wc, perm, cb) => cb(ALLOWED.has(perm)));
    ses.setPermissionCheckHandler((wc, perm) => ALLOWED.has(perm));
    createWindow();
    app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) createWindow(); });
  });
  app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
}
