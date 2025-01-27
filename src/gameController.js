import Player from "./factories/playerFactory";
import createShip from "./factories/shipFactory";

const gameController = (() => {
  // Initialize players
  const player = Player("Player 1");
  const computer = Player("Computer");
  const directionButton = document.getElementById("flip-ship-direction");
  const startButton = document.getElementById("start-button");

  // Initialize game boards in memory in form of 2d array
  const playerBoard = player.gameBoard;

  const computerBoard = computer.gameBoard;

  // Ships to be placed
  const ships = [
    { length: 5, name: "Carrier" },
    { length: 4, name: "Battleship" },
    { length: 3, name: "Cruiser" },
    { length: 3, name: "Submarine" },
    { length: 2, name: "Destroyer" },
  ];

  let currentShipIndex = 0;
  let currentDirection = "horizontal";

  // Function to create board cells
  const createBoardCells = (boardElement) => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.classList.add(
          "cell",
          "bg-slate-300",
          "hover:bg-slate-600",
          "w-10",
          "h-10"
        );
        cell.dataset.row = i;
        cell.dataset.col = j;

        // Add hover effect for ship placement
        // cell.addEventListener('mouseover', () => {
        // if (currentShipIndex < ships.length) {
        // showShipPreview(i, j);
        // }
        // });

        // Add click handler for ship placement
        cell.addEventListener("click", () => {
          if (currentShipIndex < ships.length) {
            placeShip(i, j);
          }
        });

        boardElement.appendChild(cell);
      }
    }
  };

  // const showShipPreview = (row, col) => {
  // clearPreviews();
  // const shipLength = ships[currentShipIndex].length;
  // const cells = getShipCells(row, col, shipLength);

  // cells.forEach(([r, c]) => {
  // const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
  // if (cell) cell.classList.add('bg-slate-500');
  // });
  // };

  // const clearPreviews = () => {
  //     document.querySelectorAll('.cell').forEach(cell => {
  //         cell.classList.remove('bg-slate-500');
  //     });
  // };

  const placeShip = (row, col) => {
    const ship = createShip(ships[currentShipIndex].length);
    try {
      playerBoard.placeShip(ship, row, col, currentDirection);
      updateBoardDisplay();
      currentShipIndex++;
      console.log(playerBoard.board);

      // Update game message
      const gameMessage = document.getElementById("game-message");
      if (currentShipIndex < ships.length) {
        gameMessage.textContent = `Place your ${ships[currentShipIndex].name} (length: ${ships[currentShipIndex].length})`;
      } else {
        gameMessage.textContent = "All ships placed!";
        directionButton.classList.add("hidden");
        startButton.classList.remove("hidden");
      }
    } catch (error) {
      console.error("Invalid placement:", error);
    }
  };

  const updateBoardDisplay = () => {
    playerBoard.board.forEach((row, i) => {
      row.forEach((cell, j) => {
        const cellElement = document.querySelector(
          `[data-row="${i}"][data-col="${j}"]`
        );
        if (cell && cell.length) {
          cellElement.classList.add("bg-slate-500");
        }
      });
    });
  };

  // Initialize the game
  const initialize = () => {
    const playerBoardElement = document.getElementById("player-board");
    const computerBoardElement = document.getElementById("computer-board");

    // Create board cells
    createBoardCells(playerBoardElement);
    createBoardCells(computerBoardElement);

    // Set initial message with length
    document.getElementById(
      "game-message"
    ).textContent = `Place your ${ships[0].name} (length: ${ships[0].length})`;
  };

  const flipShipDirection = () => {
    currentDirection =
      currentDirection === "horizontal" ? "vertical" : "horizontal";
    directionButton.textContent = `current direction: ${currentDirection} click to flip`;
  };

  return {
    initialize,
    flipShipDirection,
  };
})();

export default gameController;
