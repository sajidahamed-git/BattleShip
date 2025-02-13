import Game from "../../../src/controllers/gameController";
import Player from "../../../src/factories/playerFactory";
import shipPlacer from "../../../src/controllers/shipPlacer";
import domController from "../../../src/controllers/domController";
import computerAttackLogic from "../../../src/controllers/computerAttackLogic";

jest.mock("../../../src/factories/playerFactory");
jest.mock("../../../src/controllers/shipPlacer");
jest.mock("../../../src/controllers/domController");
jest.mock("../../../src/controllers/computerAttackLogic");

describe("Game Controller", () => {
    let gameMessage;
    let computerBoardElement;
    let playerBoardElement;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="game-message"></div>
            <div id="player-board"></div>
            <div id="computer-board"></div>
        `;
        gameMessage = document.getElementById("game-message");
        computerBoardElement = document.getElementById("computer-board");
        playerBoardElement = document.getElementById("player-board");

        shipPlacer.playerBoard = Array(10).fill(Array(10).fill(null));
        Player.mockImplementation(() => ({
            gameBoard: {
                board: Array(10).fill(Array(10).fill(null)),
            },
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("computerTurn should call smartHit if previous hit was successful", () => {
        const { computerTurn } = Game;
        const previousHit = { isHit: true, row: 1, col: 1 };
        computerAttackLogic.smartHit.mockImplementation(() => {});

        computerTurn();

        expect(computerAttackLogic.smartHit).toHaveBeenCalled();
    });

    test("computerTurn should call hit if previous hit was not successful", () => {
        const { computerTurn } = Game;
        const previousHit = { isHit: false, row: 1, col: 1 };
        computerAttackLogic.hit.mockImplementation(() => previousHit);

        computerTurn();

        expect(computerAttackLogic.hit).toHaveBeenCalled();
    });

    test("computerTurn should call resetPreviousHit if attack missed", () => {
        const { computerTurn } = Game;
        const previousHit = { isHit: false, row: 1, col: 1 };
        computerAttackLogic.resetPreviousHit.mockImplementation(() => {});

        computerTurn();

        expect(computerAttackLogic.resetPreviousHit).toHaveBeenCalled();
    });
});