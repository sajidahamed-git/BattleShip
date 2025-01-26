import Player from './factories/playerFactory';

const gameController = (() => {
    // Initialize players
    const player = Player('Player 1');
    const computer = Player('Computer');

    // Initialize game boards in memory in form of 2d array
    const playerBoard = player.gameBoard;
    
    const computerBoard = computer.gameBoard;

    // Function to create board cells
    const createBoardCells = (boardElement) => {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell', 'bg-slate-300', 'hover:bg-slate-600', 'w-10', 'h-10');
                cell.dataset.row = i;
                cell.dataset.col = j;
                boardElement.appendChild(cell);
            }
        }
    };

    // Initialize the game
    const initialize = () => {
        const playerBoardElement = document.getElementById('player-board');
        const computerBoardElement = document.getElementById('computer-board');

        // Create board cells
        createBoardCells(playerBoardElement, playerBoard);
        createBoardCells(computerBoardElement, computerBoard);
    };

    return {
        initialize,
    };
})();

export default gameController;
