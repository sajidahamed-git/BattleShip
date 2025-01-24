import Player from "../../src/factories/playerFactory.js";
import createShip from "../../src/factories/shipFactory.js";

describe("player Factory", () => {
  test("demo test", () => {
    const player = Player("Player 1");
    expect(player.name).toBe("Player 1");
  });
  test("player has a game board", () => {
    const player = Player("Player 1");
    expect(player.gameBoard).toBeDefined();
  });
  test("player's game board is an instance of gameBoard", () => {
    const player = Player("Player 1");
    expect(player.gameBoard.board).toHaveLength(10);
    expect(player.gameBoard.board[0]).toHaveLength(10);
  });

  test("player can place a ship on their game board", () => {
    const player = Player("Player 1");
    const ship = createShip(3);
    player.gameBoard.placeShip(ship, 0, 0, "horizontal");
    expect(player.gameBoard.board[0][0]).toBe(ship);
    expect(player.gameBoard.board[0][1]).toBe(ship);
    expect(player.gameBoard.board[0][2]).toBe(ship);
  });

  test("player's game board can receive an attack", () => {
    const player = Player("Player 1");
    const ship = createShip(2);
    player.gameBoard.placeShip(ship, 1, 1, "vertical");
    player.gameBoard.receiveAttack(1, 1);
    expect(player.gameBoard.board[1][1]).toBe("hit");
  });

  test("player's game board records a miss", () => {
    const player = Player("Player 1");
    player.gameBoard.receiveAttack(5, 5);
    expect(player.gameBoard.board[5][5]).toBe("miss");
  });
  test("player can place ship vertically", () => {
    const player = Player("Player 1");
    const ship = createShip(2);
    player.gameBoard.placeShip(ship, 1, 1, "vertical");
    expect(player.gameBoard.board[1][1]).toBe(ship);
    expect(player.gameBoard.board[2][1]).toBe(ship);
  });
test("player's game board can hit a ship and increase hits", () => {
    const player = Player("Player 1");
    const ship = createShip(3);
    player.gameBoard.placeShip(ship, 0, 0, "horizontal");
    player.gameBoard.receiveAttack(0, 0);
    expect(ship.hits).toBe(1);
});

test("player's game board can sink a ship", () => {
    const player = Player("Player 1");
    const ship = createShip(3);
    player.gameBoard.placeShip(ship, 0, 0, "horizontal");
    player.gameBoard.receiveAttack(0, 0);
    player.gameBoard.receiveAttack(0, 1);
    player.gameBoard.receiveAttack(0, 2);
    expect(ship.isSunk()).toBe(true);
});

test("player's game board cannot place a ship out of bounds", () => {
    const player = Player("Player 1");
    const ship = createShip(4);
    expect(() => player.gameBoard.placeShip(ship, 0, 8, "horizontal")).toThrow();
    expect(() => player.gameBoard.placeShip(ship, 8, 0, "vertical")).toThrow();
});

test("player's game board cannot place a ship on an occupied space", () => {
    const player = Player("Player 1");
    const ship1 = createShip(3);
    const ship2 = createShip(3);
    player.gameBoard.placeShip(ship1, 0, 0, "horizontal");
    expect(() => player.gameBoard.placeShip(ship2, 0, 0, "horizontal")).toThrow();
});
});
