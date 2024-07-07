const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// function to initialize the game
function initGame(){

    currentPlayer="X";
    gameGrid=["","","","","","","","",""];

    // UI pr empty
    for(let i=0;i<boxes.length;i++){
        boxes[i].innerText="";
        boxes[i].classList.remove("win");
        boxes[i].style.pointerEvents="auto";
    }
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player -${currentPlayer}`;
}

initGame();

for(let i=0;i<boxes.length;i++){
    boxes[i].addEventListener("click",()=>{
        // console.log(i);
        handleClick(i);
    });
}

function swapTurn(){
    if(currentPlayer==="X") currentPlayer="O";
    else currentPlayer="X";

    // UI UPDATE OF GAME INFO CURRENT PLAYER
    gameInfo.innerText=`Current Player -${currentPlayer}`;
}

function checkGameOver(){
    
    let answer="";
    for(let i=0;i<winningPosition.length;i++){
        if((gameGrid[winningPosition[i][0]]==="X" && gameGrid[winningPosition[i][1]]==="X" && gameGrid[winningPosition[i][2]]==="X") ||
        (gameGrid[winningPosition[i][0]]==="O" && gameGrid[winningPosition[i][1]]==="O" && gameGrid[winningPosition[i][2]]==="O")){
            
            // as we get the winner diable all pointer events
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            });
            answer = gameGrid[winningPosition[i][0]];
            boxes[winningPosition[i][0]].classList.add("win");
            boxes[winningPosition[i][1]].classList.add("win");
            boxes[winningPosition[i][2]].classList.add("win");
        }
    }

    if(answer!==""){
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    
    // when game is tied
    let fillCount=0;

    gameGrid.forEach((box)=>{
        if(box!=="") fillCount++;
    });

    if(fillCount===9) {
        gameInfo.innerText=`Game Tied !`;
        newGameBtn.classList.add("active");
    }
    
    
}
function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        boxes[index].style.pointerEvents="none";
        gameGrid[index]=currentPlayer;

        // swapTurn
        swapTurn();
        // check if someone win or not
        checkGameOver();
    }
}

newGameBtn.addEventListener("click",initGame);

 