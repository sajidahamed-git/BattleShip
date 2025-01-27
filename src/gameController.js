import Player from "./factories/playerFactory";
import createShip from "./factories/shipFactory";
import createBoardCells from "./domController";
const game = (() => {
  
  // Initialize players
  const player = Player("Player 1");
  const computer = Player("Computer");
  const directionButton = document.getElementById("flip-ship-direction");
  const startButton = document.getElementById("start-button");
  const gameMessage = document.getElementById("game-message");

  // Initialize game boards in memory in form of 2d array
  const playerBoard = player.gameBoard;
  const computerBoard = computer.gameBoard;
  // Ships to be placed
  const ships = [
    { length: 6, name: "Carrier" },  
    { length: 5, name: "Battleship" },
    { length: 4, name: "Cruiser" },
    { length: 3, name: "Submarine" },
    { length: 2, name: "Destroyer" },
  ];

  let currentShipIndex = 0;
  let currentDirection = "horizontal"; // default direction

  const handleShipEventListner = (row, col) => {
    const ship = createShip(ships[currentShipIndex].length);
    //todo :add some validation here when user clicks on cell after placing all ships
    //ie currentShipIndex is greater than ships.length
    try {
      playerBoard.validateAndPlaceShip(ship, row, col, currentDirection);
      playerBoard.updateBoardDisplay();
      currentShipIndex++;
      console.log(playerBoard.board);

      // Update game message
      if (currentShipIndex < ships.length) {
        gameMessage.textContent = `Place your ${ships[currentShipIndex].name} (length: ${ships[currentShipIndex].length})`;
      } else {
        gameMessage.textContent = "All ships placed!";
        directionButton.classList.add("hidden");
        startButton.classList.remove("hidden");
      }
    } catch (error) {
      gameMessage.textContent = error.message;
      console.error("Invalid placement:", error);
    }
  };

  // Initialize the game
  const initialize = () => {
    const playerBoardElement = document.getElementById("player-board");
    const computerBoardElement = document.getElementById("computer-board");

    // Create board cells
    createBoardCells(playerBoardElement);
    createBoardCells(computerBoardElement);

    // Set initial message with length
    gameMessage.textContent = `Place your ${ships[0].name} (length: ${ships[0].length})`;
  };

  const flipShipDirection = () => {
    currentDirection =
      currentDirection === "horizontal" ? "vertical" : "horizontal";
    directionButton.textContent = `current direction: ${currentDirection} click to flip`;
  };

  return {
    initialize,
    flipShipDirection,
    handleShipEventListner,
  };
})();

export default game;
