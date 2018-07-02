console.log("main proc working");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let win;

function createWindow(){
    win = new BrowserWindow();


    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));



    win.webContents.openDevTools(); //dev tools
    win.on('closed', () => {
        win = null;
    });


}

app.on('ready', createWindow);


//for macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

//for macOS
app.on('activate', () => {
    if (win == null){
        createWindow();
    }
});
