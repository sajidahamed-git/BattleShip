import createShip from "../factories/shipFactory";

const getRandomCoordinate = () => Math.floor(Math.random() * 10);
const getRandomDirection = () => Math.random() < 0.5 ? "horizontal" : "vertical";

const placeComputerShips = (computerBoard, ships) => {
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
export {placeComputerShips};