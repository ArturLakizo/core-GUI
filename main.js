//? windows minim into tray and notification about it

console.log("App run");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

const Config = require('electron-config');
const config = new Config();

const Tray = electron.Tray;
const iconapp = path.join(__dirname, './app/icons/icon-app.png');
const icontray = path.join(__dirname, './app/icons/icon-tray.png');

let win;

console.log(config.path);

function createMainWindow() {
    new Tray(icontray);
    if (config.get("agreement") != 'true') {
        first = new BrowserWindow({
            parent: win,
            width: 500,
            height: 300,
            resizable: false,
            frame: false,
            show: false,
            modal: true
        });
        first.loadURL(url.format({
            pathname: path.join(__dirname, './app/html/info.html'),
            protocol: 'file',
            slashes: true
        }));
        first.once('ready-to-show', () => {
            first.show();
        });
        first.setMenu(null);
        first.webContents.openDevTools(); //dev tools
        first.on('closed', () => {
            first = null;
        });
    }
    else {
        win = new BrowserWindow({
            show: false,
            width: 500,
            height: 700,
            resizable: false,
            frame: false,
            icon: iconapp,
        });
        win.loadURL(url.format({
            pathname: path.join(__dirname, './app/html/one.html'),
            protocol: 'file',
            slashes: true
        }));
        win.once('ready-to-show', () => {
            win.show();
        });
        win.setMenu(null);
        win.webContents.openDevTools(); //dev tools
        win.on('closed', () => {
            win = null;
        });
    }
}

app.on('ready', () => {
    createMainWindow();
});

//for macOS
app.on('activate', () => {
    if (win == null) {
        createWindow();
    }
});

//for macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
