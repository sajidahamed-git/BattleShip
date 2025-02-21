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
          }
        } else domController.updateColor(row, col, "miss", "computer");

        changeCurrentPlayer();
        computerTurn();
      }
    } else {
      console.log("wait for your turn");
    }
  };

  let previousHit = {
    initialHit: null,
    lastHit: null,
    isHit: false,
    mode: "searching",
    Shipdirection: null,
    moveDirection: null,
  };
  const computerTurn = () => {
    let result;
    console.log('--',previousHit.mode);

    if (previousHit.mode === "searching") {
      result = computerAttackLogic.RandomHit();
    } else if (previousHit.mode === "findingDirection") {
      result = computerAttackLogic.findShipDirection();
    } else if (previousHit.mode === "sinking") {
      if (previousHit.Shipdirection === "horizontal") {
        result = computerAttackLogic.sinkHorizontalShip(previousHit)
        // if (result.mode === 'searching') {
          // result = computerAttackLogic.RandomHit()
        // }
        // console.log('main',result);
      }
      if (previousHit.Shipdirection === "vertical") {
        console.log("sink vertical ship");
      }
    }

    if (result) {
      previousHit = result;
    }

    // Change turns after the computer's move.
    changeCurrentPlayer();
    return true; // For testing purposes
  };

  const changeCurrentPlayer = () => {
    currentPlayer = currentPlayer === "player" ? "computer" : "player";
  };

  const handleComputerShipSunk = (targetShip) => {
    //used to handle ships sunk by the player on the computer board
    for (let { row, col } of targetShip.shipCoordinates) {
      domController.updateColor(row, col, "sunk", "computer");
    }
    noofshipsSunkbytheplayer++;

    if (noofshipsSunkbytheplayer === 5) {
      gameMessage.textContent = "Player has won. Game Over!";
      computerBoardElement.removeEventListener("click", handlePlayerAttack);
    }
  };

  return {
    initialize,
    start,
  };
})();

export default Game;
