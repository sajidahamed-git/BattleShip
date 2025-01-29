import createShip from "../factories/shipFactory";
import Player from "../factories/playerFactory";

const shipPlacer = (() => {
    const getRandomCoordinate = () => Math.floor(Math.random() * 10);
    const getRandomDirection = () => Math.random() < 0.5 ? "horizontal" : "vertical";
    
    const player = Player("Player 1");
    const computer = Player("Computer");
    
    const playerBoard = player.gameBoard;
    const computerBoard = computer.gameBoard;

    const ships = [
        { length: 6, name: "Carrier" },  
        { length: 5, name: "Battleship" },
        { length: 4, name: "Cruiser" },
        { length: 3, name: "Submarine" },
        { length: 2, name: "Destroyer" },
      ];

    const placeComputerShips = () => {
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
        console.log(computerBoard.board);
    };

    return {
        placeComputerShips
    };
})();

export default shipPlacer;