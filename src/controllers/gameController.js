import Player from "../factories/playerFactory";
import shipPlacer from "../controllers/shipPlacer";
import domController from "./domController";

const Game = (() => {
  const computer = Player("Computer")
  const computerBoard = computer.gameBoard;

  const playerBoard  = shipPlacer.playerBoard


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
  let HitComputerBoard = []; //stores coordinates of already hit cells in computer board
  let HitPlayerBoard = []; //stores coordinates of already hit cells in player board
  const targetShipCorordinates = []
  
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
        if (computerBoard.board[row][col] !== null) {
          const targetShip = computerBoard.board[row][col];
          targetShip.hit();
          const length = targetShip.length;
          console.log(targetShip);


          targetShipCorordinates.push(`${row}${col}`);
          console.log(targetShipCorordinates);
          if (targetShip.isSunk()) {
            console.log('computer ship sunk');
            //add the head and direction of the ship 
            //to the createShip object and then update its value
            //after placing the ship in the shipPlacer.js
            //then use something like targetShip.head or
            //targetShip.coordinates to get the position of the ship
            //and then change the color using dom controller
            
          }
          domController.updateColor(row, col, "hit", "computer");

        } else domController.updateColor(row, col, "miss", "computer");

        changeCurrentPlayer();
        computerTurn();
      }
    } else {
      console.log("wait for your turn");
    }
  };

  const computerTurn = () => {
    console.log("computer's turn");
    const row = getRandomRow();
    const col = getRandomCol();
    if (HitPlayerBoard.includes(`${row}${col}`)) {
      // console.log("already hit");
      computerTurn();
      return;
      
    }

    HitPlayerBoard.push(`${row}${col}`);

    if (playerBoard[row][col] !== null) {
      const targetShip = playerBoard[row][col];
      targetShip.hit();
      domController.updateColor(row, col, "hit", "player");
      if (targetShip.isSunk()) {
        console.log('sunk');
        }
        
      
    } else {
      domController.updateColor(row, col, "miss", "player");
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
    computerTurn,
    changeCurrentPlayer
  };
})();

export default Game;
