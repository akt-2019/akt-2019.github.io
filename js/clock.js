"use strict";
var canvas = document.getElementById("clock-canvas");
var ctx = canvas.getContext("2d");
var currentPos;
var currentRad = getRadian(270);
var radInterval = getRadian(6);
ctx.setLineDash([3, 2]);
currentPos = [256, 0];
ctx.moveTo(256, 256);
ctx.lineTo(currentPos[0], currentPos[1]);
ctx.stroke();
setInterval(function () {
    ctx.moveTo(0, 0);
    ctx.clearRect(0, 0, 512, 512);
    var newRad = currentRad - radInterval;
    var newPos = [
        -256 * Math.cos(newRad) + 256,
        256 * Math.sin(newRad) + 256
    ];
    ctx.moveTo(256, 256);
    ctx.lineTo(newPos[0], newPos[1]);
    ctx.stroke();
    currentRad = newRad;
    currentPos = newPos;
}, 1000);
function getRadian(d) {
    return (Math.PI * d) / 180;
}
//# sourceMappingURL=clock.js.map