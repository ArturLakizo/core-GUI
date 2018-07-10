
const os = require("os");
const si = require('systeminformation');

const neo = require("../blockchain/interactions.js");

const Config = require('electron-config');
const config = new Config();

const ram_free = document.getElementById("ram_free");
const ram_total = document.getElementById("ram_total");
const cpu_cores = document.getElementById("cpu");

const cpuCount = os.cpus().length;
const gbTotal = ((os.totalmem()) / 1073741824).toFixed(2);

cpu_cores.innerHTML = cpuCount;
ram_total.innerHTML = gbTotal;

let gbFree = 0;

var cpuRS = document.createElement("input");
cpuRS.setAttribute("type", "range");
cpuRS.setAttribute("min", "1");
cpuRS.setAttribute("max", cpuCount);
cpuRS.setAttribute("step", "1");
cpuRS.setAttribute("value", "1");
cpuRS.setAttribute("class", "cpuRS");
cpuRS.setAttribute("id", "cpuvalue");

var cpuRSvalue = document.createElement("p");
cpuRSvalue.innerHTML = cpuRS.getAttribute("value");

cpuRS.addEventListener("input", () => {
    cpuRSvalue.innerHTML =+ cpuRS.value;
});
/*************************************** */
var ramRS = document.createElement("input");
ramRS.setAttribute("type", "range");
ramRS.setAttribute("min", "1");
ramRS.setAttribute("max", gbTotal);
ramRS.setAttribute("step", "1");
ramRS.setAttribute("value", "1");
ramRS.setAttribute("class", "ramRS");
ramRS.setAttribute("id", "ramvalue");

var ramRSvalue = document.createElement("p");
ramRSvalue.innerHTML = ramRS.getAttribute("value");

ramRS.addEventListener("input", () => {
    ramRSvalue.innerHTML =+ ramRS.value;
});
/*************************************** */
const cpuRScontainer = document.getElementById("cpu-rangeslider-container");
cpuRScontainer.appendChild(cpuRS);
cpuRScontainer.appendChild(cpuRSvalue);

const ramRScontainer = document.getElementById("ram-rangeslider-container");
ramRScontainer.appendChild(ramRS);
ramRScontainer.appendChild(ramRSvalue);

const intervalObj = setInterval(() => {
    si.mem()
        .then((data) => {
            gbFree = (data.free / 1073741824).toFixed(2);
        })
        .catch(error => console.error(error));
    ram_free.innerHTML = gbFree;
    ramRS.setAttribute("max", parseFloat(gbFree).toFixed(0));    
    ramRSvalue.innerHTML = ramRS.value;
}, 1000);



module.exports = {
    corecall: () => {
        //1st Ram 2nd Core 3rd master IP
        const address = config.get("address");
        neo.getValueByKey("readtask", address).then((res) => {
            if (res !== "") {
                console.log("We r in corecall");
                var spawn = require("child_process").spawn;
                var mycall = spawn('python', ["app/python/core-call.py", ramRS.value, cpuRS.value, res]);


            }
        });


    }

};