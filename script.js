// create array board object 
let gameBoard = [];

let winners = [
                [0,1,2], [3,4,5], 
                [6,7,8], [0,3,6], 
                [1,4,7], [2,5,8], 
                [0,4,8], [2,4,6]
              ];

let stats;

// check for straight line and return winner


const boxes = document.querySelectorAll('.box');
let playedBoxes = [];

boxes.forEach(box => {
  box.addEventListener('click', e => {
    // check if box has already been played
    if(playedBoxes.includes(parseInt(box.dataset.pos))){
      alert("Select another box");
    } else {
      // player makes move
      makeMove(e.target, 'X');

      // check if board is full
      if(playedBoxes.length === 9){
        setTimeout(() => {
          alert('Game Over');
        }, 500);
      } else { //board not full
        // generate random number btw 1-9
        let g = (Math.floor(1 + (Math.random() * 10)))%9;
        
        // check if number has already been played and generate another
        while(playedBoxes.includes(g)) {
          g = (Math.floor(1 + (Math.random() * 10)))%9;
        }
    
        const com = document.querySelector(`.box[data-pos="${g}"]`);
        
        // computer makes move
        setTimeout(() => {
          makeMove(com, 'O');
        }, 500);
      }
    }
  })
});

// create game status checker(board)
function checkGameStatus(){
  for (let i = 0; i < winners.length; i++) {
    if(gameBoard[winners[i][0]] && gameBoard[winners[i][0]] === gameBoard[winners[i][1]] && gameBoard[winners[i][1]] === gameBoard[winners[i][2]] ){
      return {
        status: "Winner", 
        winner: gameBoard[winners[i][0]]
      };
    } else {
      continue;
    }
  }
  if(playedBoxes.length === 9){ // check if board is full and return draw
    return {
      status: "Draw",
      winner: "No winner"
    };
  } else { // else, return continue
    return {status: "Continue"};
  }
}

// make-move function(marker, position)
function makeMove(box, mark){
  // put marker in box on board
  gameBoard[parseInt(box.dataset.pos)] = mark;

  box.textContent = mark;
  playedBoxes.push(parseInt(box.dataset.pos));
  stats = checkGameStatus();
  console.log(stats);
}

// create player object(marker)
const player = (mark) => {
  let moves = [];

  // player has marker
  const getMark = () => mark;

  // player has list of moves made []
  const getMoves = () => moves;

}

Object.assign(player, makeMove);

const player1 = Object.assign({}, player('X'));
const player2 = Object.assign({}, player('O'));



// play game
  // do
    // check game status(board)
    // player1.makemove
    // check game status(board)
    // player2.makemove
  // while game hasn't ended
  // display winner