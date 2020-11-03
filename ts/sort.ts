let txtInput:HTMLTextAreaElement=document.getElementById("textarea-input") as HTMLTextAreaElement;
let txtOutput:HTMLTextAreaElement=document.getElementById("textarea-output") as HTMLTextAreaElement;

let btnSort:HTMLButtonElement=document.getElementById("button-sort") as HTMLButtonElement;

btnSort.onclick=function(){
    txtOutput.value=" ";
    let input:Array<string>=txtInput.value.split(",");
    let numInput:Array<number>=new Array();
    let numOutput:Array<number>=new Array();
    let c:number=0;
    input.forEach((value:string)=>{
        let num:number;
        num=parseInt(value);
        if(isNaN(num)){
            txtOutput.value="ERROR";
            return;
        }
        numInput[c]=num;
        c++;
    });
    for(let i:number=0;i<numInput.length;i++){
        let index:number=0;
        for(let j:number=0;j<numInput.length;j++){
            if(numInput[i]>numInput[j]){
                index++;
            }
        }
        numOutput[index]=numInput[i];
    }
    txtOutput.value=numOutput.join();
};
