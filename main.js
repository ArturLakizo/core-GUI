//? lock highlighting
//? windows minim into tray and notification about it
//? show only when rendered
console.log("App run");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

const Config = require('electron-config');
const config = new Config();

const Menu = electron.Menu;
const Tray = electron.Tray;
const iconapp = path.join(__dirname, './assets/app/icon-app.png');
const icontray = path.join(__dirname, './assets/app/icon-tray.png');

let win;

function createMainWindow() {
    new Tray(icontray);
    win = new BrowserWindow({
        width: 500,
        height: 700,
        resizable: false,
        icon: iconapp,
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, './assets/one/index.html'),
        protocol: 'file',
        slashes: true
    }));
    win.setMenu(null);
    //win.webContents.openDevTools(); //dev tools
    win.on('closed', () => {
        win = null;
    });
    //==========================
    //if (config.get("agreement") == 'false') {
        first = new BrowserWindow({
            parent: win,
            width: 500,
            height: 300,
            resizable: false,
            frame: false,
            modal: true
        });
        first.loadURL(url.format({
            pathname: path.join(__dirname, './assets/info/index.html'),
            protocol: 'file',
            slashes: true
        }));
        first.setMenu(null);
        //first.webContents.openDevTools(); //dev tools
        first.on('closed', () => {
            first = null;
        });
    //}
}

app.on('ready', function () {
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
