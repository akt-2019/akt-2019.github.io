"use strict";
var canvas = document.getElementById("clock-canvas");
var ctx = canvas.getContext("2d");
var posSecond;
var posMinute;
var posHour;
var intervalSecond = getRadian(6);
var intervalMinute = getRadian(6);
var intervalHour = getRadian(30);
var lenSecond = 200;
var lenMinute = 185;
var lenHour = 100;
var date = new Date();
// let second = Math.floor((Date.now() / 1000) % 60);
// let minute = Math.floor((Date.now() / 60000) % 60);
// let hour = Math.floor((Date.now() / 3600000) % 12)-3;
var second = date.getSeconds();
var minute = date.getMinutes();
var hour = date.getHours();
posSecond = {
    x: lenSecond * Math.sin(getRadian(6 * second)),
    y: lenSecond * Math.cos(getRadian(6 * second))
};
posMinute = {
    x: lenMinute * Math.sin(getRadian(6 * minute)),
    y: lenMinute * Math.cos(getRadian(6 * minute))
};
posHour = {
    x: lenHour * Math.sin(getRadian(30 * hour)),
    y: lenHour * Math.cos(getRadian(30 * hour))
};
drawClockHands();
function drawClockHands() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawClockHand(posSecond, "#FF0000");
    drawClockHand(posMinute, "#00FF00");
    drawClockHand(posHour, "#0000FF");
}
function calculateSecondPos() {
    second++;
    var newPos = {
        x: posSecond.x * Math.cos(intervalSecond) + posSecond.y * Math.sin(intervalSecond),
        y: posSecond.y * Math.cos(intervalSecond) - posSecond.x * Math.sin(intervalSecond)
    };
    posSecond = newPos;
    if (second % 60 == 0) {
        calculateMinutePos();
    }
}
function calculateMinutePos() {
    minute++;
    var newPos = {
        x: posMinute.x * Math.cos(intervalMinute) + posMinute.y * Math.sin(intervalMinute),
        y: posMinute.y * Math.cos(intervalMinute) - posMinute.x * Math.sin(intervalMinute)
    };
    posMinute = newPos;
    if (minute % 60 == 0) {
        calculateHourPos();
    }
}
function calculateHourPos() {
    hour++;
    var newPos = {
        x: posHour.x * Math.cos(intervalHour) + posHour.y * Math.sin(intervalHour),
        y: posHour.y * Math.cos(intervalHour) - posHour.x * Math.sin(intervalHour)
    };
    posHour = newPos;
}
setInterval(calculateSecondPos, 1000);
setInterval(drawClockHands, 1000);
function getRadian(degree) {
    return (Math.PI * degree) / 180;
}
function convertX(orgX) {
    return canvas.width / 2 + orgX;
}
function convertY(orgY) {
    return canvas.height / 2 - orgY;
}
function drawLine(x, y, targetX, targetY, style) {
    ctx.strokeStyle = style;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(targetX, targetY);
    ctx.closePath();
    ctx.stroke();
}
function drawClockHand(target, style) {
    drawLine(canvas.width / 2, canvas.height / 2, convertX(target.x), convertY(target.y), style);
}
//# sourceMappingURL=clock.js.map