import Player from "../factories/playerFactory";
// import createBoardCells from "./domController";
// import {updateColor} from "./domController";
import shipPlacer from "../controllers/shipPlacer";
import domController from "./domController";

const Game = (() => {
  const computer = Player("Computer");
  const computerBoard = computer.gameBoard;

  const gameMessage = document.getElementById("game-message");

  let currentPlayer = "player";
  let gameOver = false;
  let computerBoardElement, playerBoardElement;

  const initialize = () => {
    playerBoardElement = document.getElementById("player-board");
    computerBoardElement = document.getElementById("computer-board");
    computerBoardElement.addEventListener('click',handlePlayerAttack)
    // Create board cells
    domController.createBoardCells(playerBoardElement, "player");
    domController.createBoardCells(computerBoardElement, "computer");
    shipPlacer.placeComputerShips(computerBoard); // Pass the computerBoard
    // Set initial message with length
    gameMessage.textContent = `Place your carrier (length: 6)`;
  };

  const handlePlayerAttack = (event)=>{
    console.log('click is woriking');
    if (currentPlayer === 'player') {
      const cell = event.target 
      if (cell.classList.contains('cell')) {
        const row = cell.dataset.row
        const col = cell.dataset.col
        playerAttack(row,col)
        // computerTurn()
      }
      // domController.addAttackHandler()
    }
  }
  const start = () => {

    }
  

  const playerAttack = (i, j) => {
    console.log('player attack is called');
    if (computerBoard.board[i][j] !== null) {
      domController.updateColor(i, j, "hit",'computer');
    } else {
      domController.updateColor(i, j, "miss",'computer');
    }
  };
  const computerTurn = () => {
    console.log(currentPlayer);
    console.log("computer plays now 5s");
    setTimeout(() => {
      console.log("computer turn complete");
      switchTurns();
      console.log(`current player is ${currentPlayer}`);
      // start()
    }, 5000);
  };
  const switchTurns = () => {
    currentPlayer = currentPlayer === "player" ? "computer" : "player";
    console.log("currentPlayer changed");
  };

  return {
    initialize,
    playerAttack,
    computerTurn,
    start,
    switchTurns,
  };
})();

export default Game;
