// ----- Typing Tester -----

// Select Elements
const randomPara = document.querySelector("#randomPara");
const startBtn = document.querySelector("#startBtn");
const resultPara = document.querySelector("#speedCalculate");
const textArea = document.querySelector("#textArea");

// Disable typing until test starts
textArea.disabled = true;

// ---------random sentences -----------
const sentences = [
    "javascript makes your brain stronger than the gym",
    "practice is the only shortcut that actually works",
    "coding feels hard because you are growing",
    "logic builds when you stop copying and start struggling",
    "consistency beats talent every single time",
    "every expert was a beginner who refused to quit"
];

// Variables
let spans = [];
let index = 0;
let preVal = "";
let timerStarted = false;
let startTime = null;
let endTime = null;

// ----------RandomSentence Function-------
function getRandomSentence() {
    const index = Math.floor(Math.random() * sentences.length);
    return sentences[index];
}

// ------------ RENDER SPANS ----------------
function renderSpan(line) {
    randomPara.innerHTML = "";
    const arr = [];

    for (let char of line) {
        const span = document.createElement("span");
        span.textContent = char;
        arr.push(span);
        randomPara.appendChild(span);
    }

    return arr;
}

// --------- START TEST ------------
startBtn.addEventListener("click", startTest);

function startTest() {
    // Reset values
    index = 0;
    preVal = "";
    timerStarted = false;
    startTime = null;
    endTime = null;
    resultPara.textContent = "";
    textArea.value = "";

    // Render new text
    const line = getRandomSentence();
    spans = renderSpan(line);

    // Activate first character
    spans[0].classList.add("active");

    // Enable typing
    textArea.disabled = false;
    textArea.focus();
}

// ---------------- INPUT HANDLER ----------------
textArea.addEventListener("input", () => {
    const typed = textArea.value;
    const isBackSpace = typed.length < preVal.length;

    // ---- Start timer on first keystroke ----
    if (!timerStarted && typed.length > 0) {
        timerStarted = true;
        startTime = Date.now();
    }

    // ---- Handle Backspace ----
    if (isBackSpace) {
        if (index > 0) {
            index--;

            spans[index].classList.remove("correct", "wrong");
            spans[index].classList.add("active");

            spans[index + 1]?.classList.remove("active");
        }
        preVal = typed;
        return;
    }

    // Stop if done
    if (index >= spans.length) return;

    // Compare the characters
    const correctChar = spans[index].textContent;
    const typedChar = typed[typed.length - 1];

    if (typedChar === correctChar) {
        spans[index].classList.add("correct");
    } else {
        spans[index].classList.add("wrong");
    }

    spans[index].classList.remove("active");
    index++;

    // If finished typing
    if (index === spans.length) {
        endTime = Date.now();
        const totalTime = (endTime - startTime) / 1000; // sec
        const minutes = totalTime / 60;

        const totalChars = spans.length;
        const wpm = (totalChars / 5) / minutes;

        resultPara.textContent = `WPM: ${Math.round(wpm)} (Time: ${totalTime.toFixed(1)}s)`;
        textArea.disabled = true;
    }

    // Set next active character
    if (index < spans.length) spans[index].classList.add("active");

    preVal = typed;
});
