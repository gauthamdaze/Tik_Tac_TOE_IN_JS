// html Elements

const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

// game variable 

let gameIsLive = true;
let xIsNext = true;
let winner = null;
let xSymbol = '×';
let oSymbol = '○';

//function 

const letterTosymbol = (letter) => letter ==='x'?xSymbol :oSymbol;


const checkGameStatus = ()=>{
 // store current value of divs   
const top_left = cellDivs[0].classList[2];
const top_middle = cellDivs[1].classList[2];
const top_right = cellDivs[2].classList[2];
const middle_left = cellDivs[3].classList[2];
const middle_middle = cellDivs[4].classList[2];
const middle_right = cellDivs[5].classList[2];
const bottom_left = cellDivs[6].classList[2];
const bottom_middle = cellDivs[7].classList[2];
const bottom_right = cellDivs[8].classList[2];

console.log(top_left);
console.log(top_middle);
console.log(top_right);
//check for  a winner
if(top_left && top_left === top_middle && top_left === top_right){   
    handleWin(top_left);
}
else if (middle_left && middle_left === middle_middle && middle_left === middle_right){
    handleWin(middle_left);
}
else if(bottom_left && bottom_left === bottom_middle && bottom_left === bottom_right){
    handleWin(bottom_left);
}
else if(top_left && top_left === middle_left && top_left=== bottom_left){
    handleWin(top_left);
}
else if(top_middle && top_middle === middle_middle && top_middle=== bottom_middle){
    handleWin(top_middle);
}
else if(top_right && top_right === middle_right && top_right === bottom_right){
    handleWin(top_right);
}
else if(top_left && top_left === middle_middle && top_left === bottom_right){
    handleWin(top_left);
}
else if(top_right && top_right === middle_middle && top_right === bottom_left){
    handleWin(top_right);
}
else if(top_left && top_middle && top_right && middle_left && middle_middle && middle_right && bottom_left && bottom_middle && bottom_right){
    gameIsLive =false;
    statusDiv.innerHTML = 'Game is tie !';
}
};


const handleWin = (letter)=>{
    gameIsLive = false;
    winner =letter;
    statusDiv.innerHTML = `${letterTosymbol(winner)} has won! chicken dinner! `

}
//actions [event handelers]


const handlerReset = (event)=>{
    xIsNext = true ;
    statusDiv.innerHTML = `${xSymbol}is next`;
    gameIsLive = true;
    for(const cellDiv of cellDivs){
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        winner = null;
    }
};
const gridHandler = (event)=>{
    if(gameIsLive){
        const classList = event.target.classList;
        if(classList[2]==='x' || classList[2] === 'o'){
            return ;
        }
        else{
            if(xIsNext){
                classList.add('x');
                checkGameStatus();
                xIsNext = !xIsNext;
            }
            else{
                classList.add('o');
                checkGameStatus();
                xIsNext =!xIsNext;
            }
        }
    }
    // checkGameStatus();
  
    


}
// event listners

resetDiv.addEventListener('click',handlerReset);
for(const cellDiv of cellDivs ){
    cellDiv.addEventListener('click',gridHandler);
}

