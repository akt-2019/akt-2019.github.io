"use strict";
let txtInput = document.getElementById("textarea-input");
let txtOutput = document.getElementById("textarea-output");
let btnSort = document.getElementById("button-sort");
btnSort.onclick = function () {
    txtOutput.value = " ";
    let input = txtInput.value.split(",");
    let numInput = new Array();
    let numOutput = new Array();
    let c = 0;
    input.forEach((value) => {
        let num;
        num = parseInt(value);
        if (isNaN(num)) {
            txtOutput.value = "ERROR";
            return;
        }
        numInput[c] = num;
        c++;
    });
    for (let i = 0; i < numInput.length; i++) {
        let index = 0;
        for (let j = 0; j < numInput.length; j++) {
            if (numInput[i] > numInput[j]) {
                index++;
            }
        }
        numOutput[index] = numInput[i];
    }
    txtOutput.value = numOutput.join();
};
//# sourceMappingURL=sort.js.map