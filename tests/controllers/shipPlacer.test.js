import { placeComputerShips } from '../../src/controllers/shipPlacer'; // Adjust the import based on your file structure

// Mock computerBoard with necessary methods
const mockComputerBoard = () => ({
    board: [],
    validateAndPlaceShip: jest.fn(),
});

describe('placeComputerShips', () => {
    test('should call validateAndPlaceShip for each ship', () => {
        const computerBoard = mockComputerBoard();
        const ships = [{ length: 3 }, { length: 4 }];

        placeComputerShips(computerBoard, ships);

        // Ensure validateAndPlaceShip is called for every ship
        expect(computerBoard.validateAndPlaceShip).toHaveBeenCalledTimes(ships.length);
    });

    test('should retry placement if validateAndPlaceShip throws an error', () => {
        const computerBoard = mockComputerBoard();
        const ships = [{ length: 3 }];
        
        // Make validateAndPlaceShip fail once, then succeed
        computerBoard.validateAndPlaceShip
            .mockImplementationOnce(() => { throw new Error('Invalid placement'); })
            .mockImplementation(() => {}); // Success

        placeComputerShips(computerBoard, ships);

        // Ensure the function retries until successful
        expect(computerBoard.validateAndPlaceShip).toHaveBeenCalledTimes(2);
    });

    test('should handle random placements and not throw errors', () => {
        const computerBoard = mockComputerBoard();
        const ships = Array(5).fill({ length: 3 }); // Five ships of length 3

        // Assume validateAndPlaceShip always succeeds
        computerBoard.validateAndPlaceShip.mockImplementation(() => {});

        expect(() => placeComputerShips(computerBoard, ships)).not.toThrow();
        expect(computerBoard.validateAndPlaceShip).toHaveBeenCalledTimes(ships.length);
    });

    test('should generate random coordinates and directions', () => {
        const computerBoard = mockComputerBoard();
        const ships = [{ length: 3 }];

        // Track calls to validateAndPlaceShip
        computerBoard.validateAndPlaceShip.mockImplementation(() => {});

        placeComputerShips(computerBoard, ships);

        const calls = computerBoard.validateAndPlaceShip.mock.calls;
        const [ship, row, col, direction] = calls[0];

        expect(row).toBeGreaterThanOrEqual(0);
        expect(row).toBeLessThan(10);
        expect(col).toBeGreaterThanOrEqual(0);
        expect(col).toBeLessThan(10);
        expect(['horizontal', 'vertical']).toContain(direction);
    });
});
