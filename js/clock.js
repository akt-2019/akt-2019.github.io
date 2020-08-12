"use strict";
var canvas = document.getElementById("clock-canvas");
var ctx = canvas.getContext("2d");
var posSecond;
var posMinute;
var intervalSecond = getRadian(6);
var intervalMinute = getRadian(30);
var lenSecond = 200;
var lenMinute = 185;
posSecond = {
    x: 0,
    y: lenSecond
};
posMinute = {
    x: 0,
    y: lenMinute
};
var tmrSecond = setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#ff0000";
    var newPos = {
        x: posSecond.x * Math.cos(intervalSecond) + posSecond.y * Math.sin(intervalSecond),
        y: posSecond.y * Math.cos(intervalSecond) - posSecond.x * Math.sin(intervalSecond)
    };
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(convertX(newPos.x), convertY(newPos.y));
    ctx.closePath();
    ctx.stroke();
    posSecond = newPos;
}, 1000);
var tmrMinute = setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#00ff00";
    var newPos = {
        x: posSecond.x * Math.cos(intervalMinute) + posSecond.y * Math.sin(intervalMinute),
        y: posSecond.y * Math.cos(intervalMinute) - posSecond.x * Math.sin(intervalMinute)
    };
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(convertX(newPos.x), convertY(newPos.y));
    ctx.closePath();
    ctx.stroke();
    posSecond = newPos;
}, 60000);
function getRadian(degree) {
    return (Math.PI * degree) / 180;
}
function convertX(orgX) {
    return canvas.width / 2 + orgX;
}
function convertY(orgY) {
    return canvas.height / 2 - orgY;
}
//# sourceMappingURL=clock.js.map