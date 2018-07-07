
const ram_free = document.getElementById("ram_free");
const ram_total = document.getElementById("ram_total");
const cpu_cores = document.getElementById("cpu");

/*
const os = require("os");
const mbTotal = ((os.totalmem()) / 1048576);
const cpuCount = os.cpus().length;
ram_total.innerHTML = mbTotal;
cpu_cores.innerHTML = cpuCount;

const intervalObj = setInterval(() => {
    let mbFree = ((os.freemem()) / 1048576);
    ram_free.innerHTML = mbFree;
}, 500);
*/

const si = require('systeminformation');
let gbFree = 0;
si.cpu()
    .then((data) => {
        cpu_cores.innerHTML = data.cores;
    })
    .catch(error => console.error(error));


si.mem().then((data) => {
    ram_total.innerHTML = data.total / 1073741824;
});

const intervalObj = setInterval(() => {
    si.mem()
        .then((data) => {
            gbFree = data.free / 1073741824;
        })
        .catch(error => console.error(error));
    ram_free.innerHTML = gbFree;
}, 500);