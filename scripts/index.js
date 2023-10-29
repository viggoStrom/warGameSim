var canvas = document.getElementById("playingField");
var ctx = canvas.getContext("2d");
canvas.width = 1920;
canvas.height = 1080;
canvas.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});
var updateQueue = [];
var soldier = new BaseSoldier(300, 200);
soldier.drawBody();
canvas.addEventListener("mousedown", function (event) {
    var click = {
        x: canvas.width * event.offsetX / canvas.clientWidth,
        y: canvas.height * event.offsetY / canvas.clientHeight
    };
});
var masterUpdate = function () {
    Object.keys(updateQueue).forEach(function (key) {
        updateQueue[key].forEach(function (update) {
            update();
        });
    });
};
var frame = function () {
    masterUpdate();
    window.requestAnimationFrame(frame);
};
window.requestAnimationFrame(frame);
