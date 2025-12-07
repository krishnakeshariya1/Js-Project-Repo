// ---------- Elements ---------- //
const board = document.querySelector('.board');
const blockHeight = 40;
const blockWeight = 40;

// ----- Total row and Cols ---- //
const rows = Math.floor(board.clientHeight / blockHeight);
const cols = Math.floor(board.clientWidth / blockWeight);
const blocks = [];
const snake = [{
    x: 1,
    y: 3
}];
let direction = "right";
let directionInterval = null;
let score = 0;
let food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols)
};

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

    blocks[`${food.x}-${food.y}`].classList.add("food");

    let head = null;
    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 };
    }
    else if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 };
    }
    else if (direction === "down") {
        head = { x: snake[0].x + 1, y: snake[0].y }
    }
    else if (direction === "up") {
        head = { x: snake[0].x - 1, y: snake[0].y };
    }


    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        alert("Game over");
        clearInterval(directionInterval);
        return
    }

    if (head.x == food.x && head.y == food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        food = {
            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols)
        };
        
    }

    snake.forEach(block => {
        blocks[`${block.x}-${block.y}`].classList.remove("fill")
    });

    snake.unshift(head);
    snake.pop();
    snake.forEach(block => {
        blocks[`${block.x}-${block.y}`].classList.add("fill");
    });
};
directionInterval = setInterval(() => {
    renderSnake()
}, 300)
addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp") {
        direction = "up"
    }
    else if (event.key == "ArrowDown") {
        direction = "down";
    }
    else if (event.key == "ArrowRight") {
        direction = "right";
    }
    else if (event.key == "ArrowLeft") {
        direction = "left"
    }
});