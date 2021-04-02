const electron = require("electron");
var fs = require("fs");
const { exec } = require("child_process");

try {
  require("electron-reloader")(module);
} catch (e) {}

const { app, BrowserWindow } = electron;

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    // width: 720,
    // height: 1200,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadURL(`file://${__dirname}\\index.html`);
});
