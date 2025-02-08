import createShip from "../factories/shipFactory";
import Player from "../factories/playerFactory";
import domController from "./domController";
import game from "./gameController";

const shipPlacer = (() => {
    const gameMessage = document.getElementById("game-message");
    const directionButton = document.getElementById("flip-ship-direction");
    const startButton = document.getElementById("start-button");


    const player = Player("Player 1");
    const playerBoard = player.gameBoard;

    const getRandomCoordinate = () => Math.floor(Math.random() * 10);
    const getRandomDirection = () => Math.random() < 0.5 ? "horizontal" : "vertical";
    const ships = [
        { length: 6, name: "Carrier" },  
        { length: 5, name: "Battleship" },
        { length: 4, name: "Cruiser" },
        { length: 3, name: "Submarine" },
        { length: 2, name: "Destroyer" },
      ];
      let currentShipIndex = 0;
      let currentDirection = "horizontal"; // default direction

    const placeComputerShips = (computerBoard) => {
        ships.forEach(shipData => {
            let placed = false;
            while (!placed) {
                try {
                    const ship = createShip(shipData.length);
                    const row = getRandomCoordinate();
                    const col = getRandomCoordinate();
                    const direction = getRandomDirection();
                    
                    computerBoard.validateAndPlaceShip(ship, row, col, direction);
                    placed = true;
                } catch (error) {
                    // If placement fails, try again with new coordinates
                    continue;
                }
            }
        });
        // console.log(computerBoard.board);
    };
    const placePlayerShip = (row, col) => {
        const ship = createShip(ships[currentShipIndex].length);
        //todo :add some validation here when user clicks on cell after placing all ships
        //ie currentShipIndex is greater than ships.length
        try {
          playerBoard.validateAndPlaceShip(ship, row, col, currentDirection);
          playerBoard.updateBoardDisplay();
          // console.log(playerBoard.board);
          currentShipIndex++;
          // console.log(playerBoard.board);
    
          // Update game message
          if (currentShipIndex < ships.length) {
            // gameMessage.textContent = `Place your ${ships[currentShipIndex].name} (length: ${ships[currentShipIndex].length})`;

            // gameMessage.textContent = `Place your ${ships[currentShipIndex].name} (length: ${ships[currentShipIndex].length})`;
            domController.gameMessageupdater(`Place your ${ships[currentShipIndex].name} (length: ${ships[currentShipIndex].length})`)
            

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
      const flipShipDirection = () => {
        currentDirection =
          currentDirection === "horizontal" ? "vertical" : "horizontal";
        directionButton.textContent = `current direction: ${currentDirection} click to flip`;
      };
    return {
        placeComputerShips,
        placePlayerShip,
        flipShipDirection,
        playerBoard: playerBoard.board
    };
})();

export default shipPlacer;