var neon = require('@cityofzion/neon-js');
var Neon = neon.default;
const neo = require("../../backend/blockchain.js");
const account = require("../../backend/config.js");
const util = require("../../backend/util.js");
const tools = require("../../backend/tools.js");
const Config = require('electron-config');
const config = new Config();

const btn = document.getElementById("runBtn");
const status = document.getElementById("status");

let working = false;

btn.addEventListener('click', () => {
    if (!working){
        const address = config.get("address");
        status.innerHTML = "looking for a master";
        btn.disabled = true; 
        neo.getValueByKey("readtask", address).then((res) => {
            btn.disabled = false;             
            if(res != ""){
                btn.innerHTML = "Stop";
                status.innerHTML = "master found: " + res;
                working = true;
            }else{
                status.innerHTML = "no work now";
                working = false;
            }
        });
    }else{
        btn.innerHTML = "Run";
        status.innerHTML = "disconected";
        working = false;
    }
});

