
const os = require("os");
const si = require('systeminformation');

const ram_free = document.getElementById("ram_free");
const ram_total = document.getElementById("ram_total");
const cpu_cores = document.getElementById("cpu");

const cpuCount = os.cpus().length;
const gbTotal = ((os.totalmem()) / 1073741824).toFixed(1);

cpu_cores.innerHTML = cpuCount;
ram_total.innerHTML = gbTotal;

let gbFree = 0;

const intervalObj = setInterval(() => {
    si.mem()
        .then((data) => {
            gbFree = (data.free / 1073741824).toFixed(1);
        })
        .catch(error => console.error(error));
    ram_free.innerHTML = gbFree;
}, 1000);


var cpuRS = document.createElement("input");
cpuRS.setAttribute("type", "range");
cpuRS.setAttribute("min", "1");
cpuRS.setAttribute("max", cpuCount);
cpuRS.setAttribute("step", "1");
cpuRS.setAttribute("value", "1");
cpuRS.setAttribute("class", "cpuRS");

var cpuRSvalue = document.createElement("p");
cpuRSvalue = setAttribute("id", "cpuvalue");
cpuRSvalue.innerHTML = cpuRS.getAttribute("value");

cpuRS.addEventListener("input", () => {
    cpuRSvalue.innerHTML =+ cpuRS.value;
});

var ramRS = document.createElement("input");
ramRS.setAttribute("type", "range");
ramRS.setAttribute("min", "1");
ramRS.setAttribute("max", gbTotal);
ramRS.setAttribute("step", "1");
ramRS.setAttribute("value", "1");
ramRS.setAttribute("class", "ramRS");

var ramRSvalue = document.createElement("p");
ramRSvalue = setAttribute("id", "ramvalue");
ramRSvalue.innerHTML = ramRS.getAttribute("value");

ramRS.addEventListener("input", () => {
    ramRSvalue.innerHTML =+ ramRS.value;
});

const cpuRScontainer = document.getElementById("cpu-rangeslider-container");
cpuRScontainer.appendChild(cpuRS);
cpuRScontainer.appendChild(cpuRSvalue);

const ramRScontainer = document.getElementById("ram-rangeslider-container");
ramRScontainer.appendChild(ramRS);
ramRScontainer.appendChild(ramRSvalue);

