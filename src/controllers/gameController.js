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
    gameMessage.textContent = `Place your carrier (length: 6)`;
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

          if (targetShip.isSunk()) {
            const shipCoordinates = targetShip.shipCoordinates;
            console.log("computer ship sunk");
            for (let index = 0; index < shipCoordinates.length; index++) {
              const element = shipCoordinates[index];
              domController.updateColor(
                element.row,
                element.col,
                "sunk",
                "computer"
              );
            }
            noofshipsSunkbytheplayer++;
            if (noofshipsSunkbytheplayer === 5) {
              gameMessage.textContent = "Player won! Game Over";
              gameOver = true;
              computerBoardElement.removeEventListener(
                "click",
                handlePlayerAttack
              );
              return;
            }
          } else domController.updateColor(row, col, "hit", "computer");
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
    let row, col;
    do {
      row = getRandomRow();
      col = getRandomCol();
    } while (HitPlayerBoard.includes(`${row}${col}`));
    HitPlayerBoard.push(`${row}${col}`);

    if (previousHit.isHit === true) {
      previousHit = computerAttackLogic.smartHit(previousHit, HitPlayerBoard);
    } else {
      if (playerBoard[row][col] !== null) {
        console.log('hit from random hit');
        previousHit = computerAttackLogic.hit(row, col);
      } else {
        previousHit = { isHit: false, row: null, col: null };
        console.log("missed while trying to random hit");
        domController.updateColor(row, col, "miss", "player");
      }
    }
    changeCurrentPlayer();
  };

  const changeCurrentPlayer = () => {
    currentPlayer = currentPlayer === "player" ? "computer" : "player";
  };

  const getRandomRow = () => Math.floor(Math.random() * 10);
  const getRandomCol = () => Math.floor(Math.random() * 10);

  return {
    initialize,
    start,
  };
})();

export default Game;
