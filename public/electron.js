"use strict";

exports.__esModule = true;
const electron = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const pathToFfmpeg = require('ffmpeg-static');

ffmpeg.setFfmpegPath(pathToFfmpeg);

const app = electron.app;
const ipcMain = electron.ipcMain;

let mainWindow;

const dir = path.join(process.cwd(), 'videos');
!fs.existsSync(dir) && fs.mkdirSync(dir);

function createWindow() {
  mainWindow = new electron.BrowserWindow({
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
    mainWindow = undefined;
  });
}

ipcMain.on('download-message', (e, arg) => {
  new ffmpeg(arg[1])
    .on('start', () => {
      e.reply('download-start', { target: arg[0], msg: '' });
    })
    .on('error', (err) => {
      e.reply('download-error', { target: arg[0], msg: err.message });
    })
    .on('end', () => {
      e.reply('download-end', { target: arg[0], msg: '' });
    })
    .videoCodec('copy')
    .audioCodec('copy')
    .save(path.join('videos', `${arg[0]}.ts`));
});

app.allowRendererProcessReuse = true;
app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    electron.app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});