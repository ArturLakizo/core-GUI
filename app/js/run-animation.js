const btn = document.getElementById("runBtn");

var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("run-animation"),
    antialias: true
});

const height = 150;

renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.setSize(window.innerWidth, height);

var scene = new THREE.Scene();
scene.background = new THREE.Color(0x272b30);

var camera = new THREE.PerspectiveCamera(
    30,
    2,
    5,
    500
);

camera.position.z = 60;
var length = 30;
var mouseJump = {
    x: 0,
    y: 0
};

var offset = 0;

function Spline() {
    this.geometry = new THREE.Geometry();
    this.color = Math.floor(Math.random() * 80 + 180);
    for (var j = 0; j < 180; j++) {
        this.geometry.vertices.push(
            new THREE.Vector3(j / 180 * length * 2 - length, 0, 0)
        );
        this.geometry.colors[j] = new THREE.Color(
            "hsl(" + (j * 0.6 + this.color) + ",70%,70%)"
        );
    }
    this.material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors
    });
    this.mesh = new THREE.Line(this.geometry, this.material);
    this.speed = (Math.random() + 0.1) * 0.0002;
    scene.add(this.mesh);
}

var running = false;
var prevA = 0;

function render(a) {
    requestAnimationFrame(render);
    for (var i = 0; i < splines.length; i++) {
        for (var j = 0; j < splines[i].geometry.vertices.length; j++) {
            var vector = splines[i].geometry.vertices[j];
            vector.y =
                noise.simplex2(j * 0.05 + i - offset, a * splines[i].speed) * 8;
            vector.z = noise.simplex2(vector.x * 0.05 + i, a * splines[i].speed) * 8;

            vector.y *= 1 - Math.abs(vector.x / length);
            vector.z *= 1 - Math.abs(vector.x / length);
        }
        splines[i].geometry.verticesNeedUpdate = true;
    }
    scene.rotation.x = a * 0.0003;
    if (running) {
        if (mouseJump.x < 0.03){
            mouseJump.x += 0.001;
        }
        if (a - prevA > 100) {
            updateColor();
            prevA = a;
        }
    } else {
        mouseJump.x -= 0.001;
    }
    mouseJump.x = Math.max(0, Math.min(0.07, mouseJump.x));
    offset += mouseJump.x;
    renderer.render(scene, camera);
}
var splines = [];
for (var i = 0; i < 18; i++) splines.push(new Spline());

function onResize() {
    camera.aspect = window.innerWidth / height;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, height);
}

function updateColor() {
    for (var i = 0; i < splines.length; i++) {
        var color = Math.abs((splines[i].color - offset * 10) % 360);
        for (var j = 0; j < splines[i].geometry.vertices.length; j++) {
            splines[i].mesh.geometry.colors[j] = new THREE.Color(
                "hsl(" + (j * 0.6 + color) + ",70%,70%)"
            );
        }
        splines[i].mesh.geometry.colorsNeedUpdate = true;
    }
}

function run() {
    if (running) {
        running = false;
    } else {
        running = true;
    }
}

btn.addEventListener('click', run);
requestAnimationFrame(render);

