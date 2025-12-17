const display = document.querySelector("#inputFeild");
const buttons = document.querySelectorAll(".btn");
const inputs = ["+", "-", "*", "%", "/"];
let curVal = 0;
buttons.forEach(e => {
    e.addEventListener("click", () => {
        let num = Number(e.value);
        if (typeof (num) === "number") {
            display.value += e.value;
        }
        else{
            throw new Error("Invalide input")
        }
    })

});