"use strict";
var canvas = document.getElementById("clock-canvas");
var log_area = document.getElementById("calc-log");
var bgClock = document.getElementById("clock-background-image");
var bgMonitor = document.getElementById("monitor-background-image");
var ctx = canvas.getContext("2d");
onWindowResize();
var posSecond;
var posMinute;
var posHour;
var intervalSecond = getRadian(6);
var intervalMinute = getRadian(6);
var intervalHour = getRadian(30);
var lenSecond = canvas.width * 0.9 / 2;
var lenMinute = canvas.width * 0.8 / 2;
var lenHour = canvas.width * 0.5 / 2;
var date = new Date();
var second = date.getSeconds();
var minute = date.getMinutes();
var hour = date.getHours();
var logSecond;
var logMinute;
var logHour;
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
window.onresize = onWindowResize;
function drawClockHands() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawClockHand(posSecond, "#FF0000");
    drawClockHand(posMinute, "#00FF00");
    drawClockHand(posHour, "#0000FF");
    log_area.innerText = logSecond + logMinute;
}
function calculateSecondPos() {
    second++;
    var newPos = {
        x: posSecond.x * Math.cos(intervalSecond) + posSecond.y * Math.sin(intervalSecond),
        y: posSecond.y * Math.cos(intervalSecond) - posSecond.x * Math.sin(intervalSecond)
    };
    logSecond = "sec: newX = " + newPos.x.toFixed(2) + " = oldX:" + posSecond.x.toFixed(2) + "*cos(" + intervalSecond.toFixed(2) + ")+oldY:" + posSecond.y.toFixed(2) + "*sin(" + intervalSecond.toFixed(2) + ") \r\n sec: newY = " + newPos.y.toFixed(2) + " = oldY:" + posSecond.y.toFixed(2) + "*cos(" + intervalSecond.toFixed(2) + ")-oldX:" + posSecond.x.toFixed(2) + "*sin(" + intervalSecond.toFixed(2) + ")\r\n";
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
    logMinute = "min: newX = " + newPos.x.toFixed(2) + " = oldX:" + posSecond.x.toFixed(2) + "*cos(" + intervalMinute.toFixed(2) + ")+oldY:" + posSecond.y.toFixed(2) + "*sin(" + intervalMinute.toFixed(2) + ") \r\n min: newY = " + newPos.y.toFixed(2) + " = oldY:" + posSecond.y.toFixed(2) + "*cos(" + intervalMinute.toFixed(2) + ")-oldX:" + posSecond.x.toFixed(2) + "*sin(" + intervalMinute.toFixed(2) + ")\r\n";
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
function onWindowResize() {
    if (detectMobile()) {
        canvas.width = window.screen.width / 1.5;
        bgMonitor.width = window.screen.width;
        log_area.style.top = (bgMonitor.width / 24).toString() + "px";
    }
    else {
        canvas.width = window.screen.width / 3;
        bgMonitor.width = window.screen.width / 2.5;
        log_area.style.top = (bgMonitor.width / 24).toString() + "px";
    }
    canvas.height = canvas.width;
    bgClock.width = canvas.width;
    bgClock.height = canvas.height;
    bgMonitor.height = bgMonitor.width / 2;
    log_area.style.left = log_area.style.top;
    lenSecond = canvas.width * 0.45;
    lenMinute = canvas.width * 0.4;
    lenHour = canvas.width * 0.25;
}
function detectMobile() {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
        check = true; })(navigator.userAgent || navigator.vendor);
    return check;
}
//# sourceMappingURL=clock.js.map