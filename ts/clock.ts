let canvas:HTMLCanvasElement=document.getElementById("clock-canvas") as HTMLCanvasElement;
let ctx=canvas.getContext("2d") as CanvasRenderingContext2D;
let posSecond:Coordinate;
let posMinute:Coordinate;
let intervalSecond:number=getRadian(6);
let intervalMinute:number=getRadian(30);
let lenSecond=200;
let lenMinute=185;

posSecond={
    x:0,
    y:lenSecond
};

posMinute={
    x:0,
    y:lenMinute
};

let tmrSecond=setInterval(function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle="#ff0000";
    let newPos:Coordinate={
        x:posSecond.x*Math.cos(intervalSecond)+posSecond.y*Math.sin(intervalSecond),
        y:posSecond.y*Math.cos(intervalSecond)-posSecond.x*Math.sin(intervalSecond)
    };
    ctx.beginPath();
    ctx.moveTo(canvas.width/2,canvas.height/2);
    ctx.lineTo(
        convertX(newPos.x),
        convertY(newPos.y)
    );
    ctx.closePath();
    ctx.stroke();
    posSecond=newPos;

},1000);

let tmrMinute=setInterval(function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle="#00ff00";
    let newPos:Coordinate={
        x:posSecond.x*Math.cos(intervalMinute)+posSecond.y*Math.sin(intervalMinute),
        y:posSecond.y*Math.cos(intervalMinute)-posSecond.x*Math.sin(intervalMinute)
    };
    ctx.beginPath();
    ctx.moveTo(canvas.width/2,canvas.height/2);
    ctx.lineTo(
        convertX(newPos.x),
        convertY(newPos.y)
    );
    ctx.closePath();
    ctx.stroke();
    posSecond=newPos;
},60000);

function getRadian(degree:number):number{
    return (Math.PI*degree)/180
}

function convertX(orgX:number):number{
    return canvas.width/2+orgX;
}

function convertY(orgY:number):number{
    return canvas.height/2-orgY;
}

interface Coordinate{
    x:number;
    y:number;
}