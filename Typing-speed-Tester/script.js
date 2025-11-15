// -----Typing-Tester-----

// ---Select Element---
const randomPara = document.querySelector("#randomPara");
const startBtn = document.querySelector("#startBtn");
const resultPara = document.querySelector("#speedCalculate");
const textArea = document.querySelector("#textArea");

// add eventListener to button

function renderSpan(line){
    randomPara.innerHTML = "";
    const spanArray = [];
    for(let i = 0 ; i<line.length; i++){
        const span = document.createElement("span");
        span.textContent = line[i];
        spanArray.push(span);
        randomPara.appendChild(span)
    }
    return spanArray;
}
let spans = renderSpan("hello world");
let index =0;
textArea.addEventListener("input", ()=>{
    const typed = textArea.value;
    console.log(typed)

    if(index >= spans.length) return;

    const correctType = spans[index].textContent;
    const typedText = typed[typed.length-1];
    console.log(typedText)
    spans[index].classList.add(typedText === correctType ? "correct" : "wrong");

    index ++;
});

