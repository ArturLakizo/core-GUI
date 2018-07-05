
const os = require("os");

const ram_free = document.getElementById("ram_free");
const ram_total = document.getElementById("ram_total");
const cpu_cores = document.getElementById("cpu");

const mbTotal = ((os.totalmem()) / 1048576);
const cpuCount = os.cpus().length;
ram_total.innerHTML = mbTotal;
cpu_cores.innerHTML = cpuCount;

const intervalObj = setInterval(() => {
    let mbFree = ((os.freemem()) / 1048576);
    ram_free.innerHTML = mbFree;
}, 500);


