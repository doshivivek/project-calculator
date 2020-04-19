let buffer = '0';
let runningTotal = 0;
let previousOperator = null;

const screen = document.querySelector('.screen');

document.querySelector('.keypad').addEventListener('click', function(event){
    buttonClick(event.target.innerText);
})

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    } else {
        handleNumber(value);
    }

    rerender();
}

function rerender() {
    screen.innerText = buffer;
}

function handleNumber(value) {
    if (buffer === '0') {
        buffer = value;
    } else {
        buffer = buffer + value;
    }
};

function handleSymbol(value) {
    switch(value) {
        
        case "C":
            buffer = '0';
            previousOperator = null;
            runningTotal = 0;
            break;

        case '←':
            if(buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring( 0, buffer.length -1 )
            }
            break;

        case '=':
            if (previousOperator === null) {
                return;
            } else {
                flushOperation(parseInt(buffer));   // Query here
                previousOperator = null;
                buffer = runningTotal;
                runningTotal = 0;
            }
            break;

        default:
            handleMath(value);   // Query here
            break;

    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer)
    if(runningTotal ===0) {
        runningTotal = intBuffer;
    } else {
        flushOperation (intBuffer)    //Query here
    }

    previousOperator = value;
    buffer = '0';
}

function flushOperation(intBuffer) {      //Query here > intBuffer to handleMath ni andar che to ahia km access thyu
    if(previousOperator === '+') {
        runningTotal += intBuffer
    } else if(previousOperator === '-') {
        runningTotal -= intBuffer
    } else if(previousOperator === '*') {
        runningTotal *= intBuffer
    } else {
        runningTotal /= intBuffer
    }
}
