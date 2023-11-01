var canvas = document.getElementById("playingField");
var ctx = canvas.getContext("2d");
canvas.width = 1920;
canvas.height = 1080;
canvas.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});
var updateQueue = [];
var entities = [];
var greenSoldier = new BaseSoldier(700, 400, "team1");
var redSoldier = new BaseSoldier(1000, 500, "team2");
redSoldier.color = "rgb(200,20,0)";
// Move units and such
canvas.addEventListener("mousedown", function (event) {
    var click = {
        x: canvas.width * event.offsetX / canvas.clientWidth,
        y: canvas.height * event.offsetY / canvas.clientHeight
    };
    redSoldier.target = click;
});
// Selection Square
var bounds = { x1: 0, y1: 0, x2: 0, y2: 0 };
var marker = document.getElementById("marker");
marker.style.backgroundColor = "red";
marker.style.width = "99px";
marker.style.height = "99px";
marker.style.position = "absolute";
marker.style.zIndex = "999";
marker.draggable = true;
canvas.addEventListener("mousemove", function (event) {
    var pos = {
        x: (canvas.width * event.offsetX / canvas.clientWidth),
        y: (canvas.height * event.offsetY / canvas.clientHeight)
    };
    marker.style.left = "".concat(pos.x, "px");
    marker.style.top = "".concat(pos.y, "px");
    marker.style.left = "".concat(pos.x, "px");
    marker.style.top = "".concat(pos.y, "px");
});
canvas.addEventListener("dragstart", function (event) {
    var pos = {
        x: canvas.width * event.offsetX / canvas.clientWidth,
        y: canvas.height * event.offsetY / canvas.clientHeight
    };
    console.log(pos, event);
});
canvas.addEventListener("dragend", function (event) {
    var pos = {
        x: canvas.width * event.offsetX / canvas.clientWidth,
        y: canvas.height * event.offsetY / canvas.clientHeight
    };
    console.log(pos, event);
});
// Updates and Frame
var masterUpdate = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateQueue.forEach(function (element) {
        element.update(); // Movement and stuff
    });
    updateQueue.forEach(function (element) {
        element.drawZ0(); // Statics
    });
    updateQueue.forEach(function (element) {
        element.drawZ1(); // Particles and effects
    });
    updateQueue.forEach(function (element) {
        element.drawZ2(); // Entities
    });
    updateQueue.forEach(function (element) {
        element.drawZ3(); // Projectiles
    });
    updateQueue.forEach(function (element) {
        element.drawZ4(); // Lower UI
    });
    updateQueue.forEach(function (element) {
        element.drawZ5(); // UI
    });
};
var frame = function () {
    masterUpdate();
    window.requestAnimationFrame(frame);
};
window.requestAnimationFrame(frame);
