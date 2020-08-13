let canvas: HTMLCanvasElement = document.getElementById("clock-canvas") as HTMLCanvasElement;
let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let posSecond: Coordinate;
let posMinute: Coordinate;
let posHour: Coordinate;
let intervalSecond: number = getRadian(6);
let intervalMinute: number = getRadian(6);
let intervalHour: number = getRadian(30);
let lenSecond = 200;
let lenMinute = 185;
let lenHour = 100;
let date=new Date();
// let second = Math.floor((Date.now() / 1000) % 60);
// let minute = Math.floor((Date.now() / 60000) % 60);
// let hour = Math.floor((Date.now() / 3600000) % 12)-3;
let second=date.getSeconds();
let minute=date.getMinutes();
let hour=date.getHours();

posSecond = {
    x: lenSecond * Math.sin(getRadian(6*second)),
    y: lenSecond * Math.cos(getRadian(6*second))
};

posMinute = {
    x: lenMinute * Math.sin(getRadian(6*minute)),
    y: lenMinute * Math.cos(getRadian(6*minute))
};

posHour = {
    x: lenHour * Math.sin(getRadian(30*hour)),
    y: lenHour * Math.cos(getRadian(30*hour))
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
    let newPos: Coordinate = {
        x: posSecond.x * Math.cos(intervalSecond) + posSecond.y * Math.sin(intervalSecond),
        y: posSecond.y * Math.cos(intervalSecond) - posSecond.x * Math.sin(intervalSecond)
    };
    posSecond = newPos;
    if(second%60==0){
        calculateMinutePos();
    }
}

function calculateMinutePos() {
    minute++;
    let newPos: Coordinate = {
        x: posMinute.x * Math.cos(intervalMinute) + posMinute.y * Math.sin(intervalMinute),
        y: posMinute.y * Math.cos(intervalMinute) - posMinute.x * Math.sin(intervalMinute)
    };
    posMinute = newPos;
    if(minute%60==0){
        calculateHourPos();
    }
}

function calculateHourPos() {
    hour++;
    let newPos: Coordinate = {
        x: posHour.x * Math.cos(intervalHour) + posHour.y * Math.sin(intervalHour),
        y: posHour.y * Math.cos(intervalHour) - posHour.x * Math.sin(intervalHour)
    };
    posHour = newPos;
}

setInterval(calculateSecondPos, 1000);
setInterval(drawClockHands, 1000);

function getRadian(degree: number): number {
    return (Math.PI * degree) / 180
}

function convertX(orgX: number): number {
    return canvas.width / 2 + orgX;
}

function convertY(orgY: number): number {
    return canvas.height / 2 - orgY;
}

interface Coordinate {
    x: number;
    y: number;
}

function drawLine(x: number, y: number, targetX: number, targetY: number, style: string) {
    ctx.strokeStyle = style;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(targetX, targetY);
    ctx.closePath();
    ctx.stroke();
}

function drawClockHand(target: Coordinate, style: string) {
    drawLine(canvas.width / 2, canvas.height / 2, convertX(target.x), convertY(target.y), style);
}