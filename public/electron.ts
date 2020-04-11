import { app, BrowserWindow, ipcMain } from 'electron';
import * as isDev from 'electron-is-dev';
import * as path from 'path';
import { exec } from 'child_process';
import shell from 'any-shell-escape';
import ffmpeg from 'ffmpeg-static-electron';

let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    }
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined!;
  });
}

ipcMain.on('asynchronous-message', (e, arg) => {
  const downloadVideo = shell([
    ffmpeg.path, '-i', arg[1], '-c', 'copy', `${arg[0]}.ts`
  ]);
  exec(downloadVideo, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    } else {
      console.log(`stdout: ${stdout}`)
      e.reply('asynchronous-reply', 'done');
    }
  });
});

app.allowRendererProcessReuse = true;
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});