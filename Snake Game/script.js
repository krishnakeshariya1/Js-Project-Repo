// ---------- Elements ---------- //
const board = document.querySelector('.board');
const blockHeight = 40;
const blockWeight = 40;
const blocks = [];
const snake = [{
    x: 1,
    y: 3
}];
let direction = "right";

// ----- Total row and Cols ---- //
const rows = Math.floor(board.clientHeight / blockHeight);
const cols = Math.floor(board.clientWidth / blockWeight);


function makeBlocks() {
    for (let i = 0; i < rows; i++) {
        for (let k = 0; k < cols; k++) {
            const block = document.createElement("div");
            block.classList.add("block");
            block.innerHTML = `${i}-${k}`
            board.appendChild(block);
            blocks[`${i}-${k}`] = block;
        }
    }
    return;
}
makeBlocks();

function renderSnake() {
    snake.forEach(block => {
        blocks[`${block.x}-${block.y}`].classList.add("fill");
    });
};
// setInterval(() => {
//     let head = null;
//     if (direction === "left") {
//         head = { x: snake[0].x, y: snake[0].y - 1 };
//     }
//     else if(direction === "right"){
//         head={x: snake[0].x , y: snake[0].y+1};
//     }
//     else if(direction === "down"){
//         head ={x: snake[0].x+1, y: snake[0].y}
//     }
//     else if(direction === "up"){
//         head ={x:snake[0].x-1 , y : snake[0].y};
//     }
//     snake.forEach(block => {
//         blocks[`${block.x}-${block.y}`].classList.remove("fill")
//     });
    
//     snake.unshift(head);
//     snake.pop()
//     renderSnake()
// }, 300)
addEventListener("keydown",(event)=>{
    if(event.key == "ArrowUp"){
        direction = "up"
    }
    else if(event.key == "ArrowDown"){
        direction ="down";
    }
    else if(event.key == "ArrowRight"){
        direction = "right";
    }
    else if(event.key == "ArrowLeft"){
        direction = "left"
    }
});