import Player from "../factories/playerFactory";
import shipPlacer from "../controllers/shipPlacer";
import domController from "./domController";
import computerAttackLogic from "./computerAttackLogic";

const Game = (() => {
  const computer = Player("Computer");
  const computerBoard = computer.gameBoard;

  const playerBoard = shipPlacer.playerBoard;

  const gameMessage = document.getElementById("game-message");

  let currentPlayer = "player";
  let gameOver = false;
  let computerBoardElement, playerBoardElement;

  const initialize = () => {
    playerBoardElement = document.getElementById("player-board");
    computerBoardElement = document.getElementById("computer-board");
    domController.createBoardCells(playerBoardElement, "player");
    domController.createBoardCells(computerBoardElement, "computer");
    shipPlacer.placeComputerShips(computerBoard);
    const gameMessage = document.getElementById("game-message");

    gameMessage.textContent = `Place your carrier (length: 6)`;
    return true; // for testing purposes
  };

  const start = () => {
    computerBoardElement.addEventListener("click", handlePlayerAttack);
    domController.gameMessageupdater("Click on the enemy board to Attack");
  };

  let HitComputerBoard = [];
  let noofshipsSunkbytheplayer = 0;

  const handlePlayerAttack = (event) => {
    if (currentPlayer === "player") {
      const cell = event.target;
      if (cell.classList.contains("cell")) {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        if (HitComputerBoard.includes(`${row}${col}`)) {
          console.log("already hit");
          gameMessage.textContent = "Attack already made at this position";
          return;
        }
        HitComputerBoard.push(`${row}${col}`);

        //becomes true if the attack is on a ship
        if (computerBoard.board[row][col] !== null) {
          gameMessage.textContent = "Click on the computer board to attack";
          const targetShip = computerBoard.board[row][col];
          targetShip.hit();
          domController.updateColor(row, col, "hit", "computer");

          if (targetShip.isSunk()) {
            handleComputerShipSunk(targetShip);
              return;
            }
         
        } else domController.updateColor(row, col, "miss", "computer");

        changeCurrentPlayer();
        computerTurn();
      }
    } else {
      console.log("wait for your turn");
    }
  };

  let previousHit = { isHit: false, row: null, col: null };
  let HitPlayerBoard = []; //stores coordinates of already hit cells in player board
  const computerTurn = () => {
    let result
    if (!previousHit.isHit) {
      result = computerAttackLogic.RandomHit(HitPlayerBoard);
    } else{
      result = computerAttackLogic.smartHit(previousHit, HitPlayerBoard);
    }
    if (result.row !==null && result.col !==null) {
      HitPlayerBoard.push(`${result.row}${result.col}`);
      previousHit = result;
    }
    changeCurrentPlayer();
    return true; // for teting purposes
  };

  const changeCurrentPlayer = () => {
    currentPlayer = currentPlayer === "player" ? "computer" : "player";
  };

  const handleComputerShipSunk = (targetShip) => {
    for (let { row, col } of targetShip.shipCoordinates) {
      domController.updateColor(row, col, "sunk", "computer");
    }
    noofshipsSunkbytheplayer++;

    if (noofshipsSunkbytheplayer === 5) {
      gameMessage.textContent = "Player has won. Game Over!";
      computerBoardElement.removeEventListener("click", handlePlayerAttack);
    }
  }

  return {
    initialize,
    start
  };
})();

export default Game;
