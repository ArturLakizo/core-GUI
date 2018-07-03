var neon = require('@cityofzion/neon-js');
var Neon = neon.default;

const remote = require('electron').remote;
const Config = require('electron-config');
const config = new Config();

const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');
const iconapp = path.join(__dirname, '../assets/app/icon-app.png');

const shell = require('electron').shell

const address = document.getElementById("inpAddr");
const info = document.getElementById("info");
const btn = document.getElementById("agreeBtn");
const href = document.getElementById('href')

href.addEventListener('click', function (event) {
  shell.openExternal('http://electron.atom.io')
})

btn.addEventListener('click', () => {
    if (!neon.wallet.isAddress(address.value)) {
        info.innerHTML = "Invalid wallet address";
    } else {
        config.set("address", address.value);
        config.set("agreement", "true");

        let win = new BrowserWindow({
            width: 500,
            height: 700,
            resizable: false,
            icon: iconapp
        });
        win.loadURL(url.format({
            pathname: path.join(__dirname, '../one/index.html'),
            protocol: 'file',
            slashes: true
        }));

        win.setMenu(null);
        win.webContents.openDevTools(); //dev tools
        win.on('closed', () => {
            win = null;
        });

        let window = remote.getCurrentWindow();
        window.close();
    }
});

