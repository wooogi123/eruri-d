"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
var child_process_1 = require("child_process");
var any_shell_escape_1 = require("any-shell-escape");
var path = require('path');
var fs = require('fs');
var mainWindow;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    });
    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();
    }
    else {
        mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
    }
    mainWindow.on('closed', function () {
        mainWindow = undefined;
    });
}
electron_1.ipcMain.on('asynchronous-message', function (e, arg) {
    var dir = path.join(process.cwd(), "/videos");
    !fs.existsSync(dir) && fs.mkdirSync(dir);
    var downloadVideo = any_shell_escape_1([
        path.join(process.cwd(), "/ffmpeg"),
        '-i', arg[1], '-c', 'copy',
        path.join(dir, arg[0] + ".ts")
    ]);
    console.log(arg);
    child_process_1.exec(downloadVideo, function (err) {
        if (err) {
            e.reply('asynchronous-reply', err);
        }
        else {
            e.reply('asynchronous-reply', 'done');
        }
    });
});
electron_1.app.allowRendererProcessReuse = true;
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
