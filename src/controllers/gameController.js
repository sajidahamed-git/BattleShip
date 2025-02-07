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
    computerBoardElement.addEventListener("click", handlePlayerAttack);
    // Create board cells
    domController.createBoardCells(playerBoardElement, "player");
    domController.createBoardCells(computerBoardElement, "computer");
    shipPlacer.placeComputerShips(computerBoard); // Pass the computerBoard
    // Set initial message with length
    gameMessage.textContent = `Place your carrier (length: 6)`;
  };

  const handlePlayerAttack = (event) => {
    if (currentPlayer === "player") {
      const cell = event.target;
      if (cell.classList.contains("cell")) {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        if (computerBoard.board[row][col] !== null) {
          const ship = computerBoard.board[row][col];
          ship.hit();
          console.log(ship.hits);
          console.log(`is ship sunk ${ship.isSunk()}`);
          
          domController.updateColor(row, col, "hit", "computer");
        } else domController.updateColor(row, col, "miss", "computer");

      }
      changeCurrentPlayer();
      computerTurn();
    } else {
      console.log("wait for your turn");
    }
  };

  const computerTurn = () => {
    console.log("computer turn started, wait for 5 seconds");
    setTimeout(() => {
      console.log("you can play now");
      // start()
      changeCurrentPlayer();
    }, 5000);
  };
  const changeCurrentPlayer = () => {
    currentPlayer = currentPlayer === "player" ? "computer" : "player";
  };

  return {
    initialize,
    computerTurn,
    changeCurrentPlayer
  };
})();

export default Game;
