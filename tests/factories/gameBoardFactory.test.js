import createGameBoard from "../../src/factories/gameBoardFactory";
import createShip from "../../src/factories/shipFactory";

describe("Gameboard Factory", () => {
  test("creates 10x10 board", () => {
    const gameBoard = createGameBoard();
    expect(gameBoard.board.length).toBe(10);
    expect(gameBoard.board[0].length).toBe(10);
  });
  test("check length of row 7", () => {
    const gameBoard = createGameBoard();
    expect(gameBoard.board[7].length).toBe(10);
  });

  test("board starts empty", () => {
    const gameBoard = createGameBoard();
    expect(gameBoard.board[0][0]).toBeNull();
  });
  test("can place ship horizontally", () => {
    const gameBoard = createGameBoard();
    const ship = createShip(3);
    gameBoard.placeShip(ship, 0, 0, "horizontal");
    expect(gameBoard.board[0][0]).toBe(ship);
    expect(gameBoard.board[0][1]).toBe(ship);
    expect(gameBoard.board[0][2]).toBe(ship);
  });
  test("can place ship vertically", () => {
    const gameBoard = createGameBoard();
    const ship = createShip(5);
    gameBoard.placeShip(ship, 5, 5, "vertical");
    expect(gameBoard.board[5][5]).toBe(ship);
    expect(gameBoard.board[6][5]).toBe(ship);
    expect(gameBoard.board[7][5]).toBe(ship);
    expect(gameBoard.board[8][5]).toBe(ship);
    expect(gameBoard.board[9][5]).toBe(ship);
  });
  // test("cant place ship if already occupied", () => {
    // const gameBoard = createGameBoard();
    // const ship = createShip(3);
    // gameBoard.placeShip(ship, 0, 0, "horizontal");
    // expect(() => gameBoard.placeShip(ship, 0, 0, "horizontal")).toThrow(
      // "Ship already placed"
    // );
  // });
  test('receiveAttack on an empty spot',()=>{
    const gameBoard = createGameBoard()
    const ship = createShip(3)
    gameBoard.placeShip(ship,0,0,'horizontal')

    gameBoard.receiveAttack(9,9)// this will be empty
    expect(gameBoard.board[9][9]).toBe('miss')
  })
  test('receiveAttack on a spot with the ship',()=>{
    const gameBoard = createGameBoard()
    const ship  = createShip(4)
    gameBoard.placeShip(ship,0,0,'horizontal')
    gameBoard.receiveAttack(0,0) // there will be a ship here
    // expect(gameBoard.board[0][0]).toBe(ship)
    expect(gameBoard.board[0][0]).toBe('hit')

  })
});
