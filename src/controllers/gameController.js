import Player from "../factories/playerFactory";
import createBoardCells from "./domController";
import {updateColor} from "./domController";
import shipPlacer from "../controllers/shipPlacer";

const game = (() => {
  
  const computer = Player("Computer");
  const computerBoard = computer.gameBoard;
  
  const gameMessage = document.getElementById("game-message");

  const initialize = () => {
    const playerBoardElement = document.getElementById("player-board");
    const computerBoardElement = document.getElementById("computer-board");
  
    // Create board cells
    createBoardCells(playerBoardElement,"player");
    createBoardCells(computerBoardElement,"computer");
    shipPlacer.placeComputerShips(computerBoard);  // Pass the computerBoard
    // Set initial message with length
    gameMessage.textContent = `Place your carrier (length: 6)`;
  };
  
  const playerAttack = (i,j) => {
    if (computerBoard.board[i][j] !== null) {
      updateColor(i,j,'hit');
    } else {
      updateColor(i,j,'miss');
    }
  }

  return {
    initialize,
    playerAttack,
  };
})();

export default game;
