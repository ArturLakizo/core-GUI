var neon = require('@cityofzion/neon-js');
var Neon = neon.default;
const neo = require("../blockchain/interactions.js");
const account = require("../blockchain/config.js");
const util = require("../blockchain/util.js");
const tools = require("../blockchain/tools.js");

const Config = require('electron-config');
const config = new Config();

const btn = document.getElementById("runBtn");
const status = document.getElementById("status");
const neo_c = document.getElementById("neo_assets");
const gas_c = document.getElementById("gas_assets");

let running = false;
let neo_assets = 0;
let gas_assets = 0;

let cores = 1; // cores picked
let ram = 2; // ram picked

btn.addEventListener('click', () => {
    if (!running) {
        const address = config.get("address");
        status.innerHTML = "looking for a master";
        btn.disabled = true;
        neo.getValueByKey("readtask", address).then((res) => {
            btn.disabled = false;
            if (res != "") {
                btn.innerHTML = "Stop";
                status.innerHTML = "master found: " + res;
                running = true;
            } else {
                status.innerHTML = "no work now";
                running = false;
            }
        });
    } else {
        btn.innerHTML = "Run";
        status.innerHTML = "disconected";
        running = false;
    }
});

neon.api.neoscan.getBalance("TestNet", config.get("address")).then((res) => {
    neo_assets = res.assets["NEO"].balance;
    gas_assets = res.assets["GAS"].balance;
    neo_assets = (Math.floor(neo_assets * 100) / 100);
    gas_assets = (Math.floor(gas_assets * 100) / 100);
    neo_c.innerHTML = neo_assets;
    gas_c.innerHTML = gas_assets;
});