var neon = require('@cityofzion/neon-js');
var Neon = neon.default;
const remote = require('electron').remote;
const Config = require('electron-config');
const config = new Config();

const address = document.getElementById("inpAddr");
const info = document.getElementById("info");
const btn = document.getElementById("agreeBtn");

btn.addEventListener('click', () => {
    if(!neon.wallet.isAddress(address.value)){
        info.innerHTML = "Invalid wallet address";
    }else{
        config.set("address", address.value);
        config.set("agreement", "true");
        var window = remote.getCurrentWindow();
        window.close();
    }
});

