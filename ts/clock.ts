let canvas:HTMLCanvasElement=document.getElementById("clock-canvas") as HTMLCanvasElement;
let ctx=canvas.getContext("2d") as CanvasRenderingContext2D;
let currentPos:Array<number>;
let currentRad:number=getRadian(270);
let radInterval:number=getRadian(6);

ctx.setLineDash([3,2]);
currentPos=[256,0];
ctx.moveTo(256,256);
ctx.lineTo(currentPos[0],currentPos[1]);
ctx.stroke();

setInterval(function(){
    ctx.moveTo(0,0);
    ctx.clearRect(0,0,512,512);
    let newRad=currentRad-radInterval;
    let newPos=[    
        -256*Math.cos(newRad)+256,
        256*Math.sin(newRad)+256
    ];
    ctx.moveTo(256,256);
    ctx.lineTo(
        newPos[0],
        newPos[1]
    );
    ctx.stroke();
    currentRad=newRad;
    currentPos=newPos;

},1000);

function getRadian(d:number):number{
    return (Math.PI*d)/180
}

