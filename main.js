const electron = require('electron');
var fs = require('fs');
const { exec } = require('child_process')

try {
    require('electron-reloader')(module);
}
catch (e) {}

const { app, BrowserWindow, ipcMain } = electron;

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            nativeWindowOpen: true,
            contextIsolation: false,
        },
    });
    mainWindow.loadURL(`file://${__dirname}\\index.html`);
});

var username, rpi_id, res;
var credsObj = {};

ipcMain.on('username', (event, arg) => {
    console.log(`Username: ${arg}`);
    username = arg;
});

ipcMain.on('ipAddress', (event, arg) => {
    res = arg["Wi-Fi"][0];
});

ipcMain.on('rpi_id', (event, arg) => {
    console.log(`RPI ID: ${arg}`);
    rpi_id = arg;

    credsObj['username'] = username;
    credsObj['rpi_id'] = rpi_id;
    credsObj['ip_address'] = res;

    console.log(res);
    credsObj = JSON.stringify(credsObj);
    fs.writeFileSync(
        'credentials.txt',
        credsObj,
        'utf-8'
    );
});