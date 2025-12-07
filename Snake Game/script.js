// ---------- Elements ---------- //
const board = document.querySelector('.board');
const blockHeight = 30;
const blockWeight = 30;
const blocks =[];
const snake =[{
    x:1,
    y:3
},{
    x:1,
    y:4
},{
    x:1,
    y:5
}];

// ----- Total row and Cols ---- //
const cols = Math.floor(board.clientHeight / blockHeight);
const rows = Math.floor(board.clientWidth / blockWeight);

function makeBlocks(){
    for(let i=0; i<rows; i++){
        for(let k =0; k<cols; k++){
            const block = document.createElement("div");
            block.classList.add("block");
            board.appendChild(block);
            blocks[`${i}-${k}`] = block;
        }
    }
    return ;
}
makeBlocks()
