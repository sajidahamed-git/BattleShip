import Player from "../factories/playerFactory";
// import createBoardCells from "./domController";
// import {updateColor} from "./domController";
import shipPlacer from "../controllers/shipPlacer";
import domController from "./domController";

const game = (() => {
  
  const computer = Player("Computer");
  const computerBoard = computer.gameBoard;
  
  const gameMessage = document.getElementById("game-message");

  const initialize = () => {
    const playerBoardElement = document.getElementById("player-board");
    const computerBoardElement = document.getElementById("computer-board");
  
    // Create board cells
    domController.createBoardCells(playerBoardElement,"player");
    domController.createBoardCells(computerBoardElement,"computer");
    shipPlacer.placeComputerShips(computerBoard);  // Pass the computerBoard
    // Set initial message with length
    gameMessage.textContent = `Place your carrier (length: 6)`;
  };
  
  const playerAttack = (i,j) => {
    if (computerBoard.board[i][j] !== null) {
      domController.updateColor(i,j,'hit');
    } else {
      domController.updateColor(i,j,'miss');
    }
  }

  return {
    initialize,
    playerAttack,
  };
})();

export default game;
