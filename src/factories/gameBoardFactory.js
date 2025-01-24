const createGameBoard = () => {
  const board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));

  const ships = [];

  const placeShip = (ship, row, col, direction) => {
    //row and col are the starting position of the ship(head)
    if (direction === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        //placed along the row
        //same row incrementing col
        board[row][col + i] = ship;
      }
    }
    if (direction === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        //placed along the column
        //same column incrementing row
        board[row + i][col] = ship;
      }
    }
    ships.push(ship);
  };

  const receiveAttack = (x,y) => {
    //if attack is in an empty spot
    if(board[x][y] === null){
        board[x][y] = 'miss'
    }
    //if attack is on a ship
    if (typeof board[x][y] === "object") {
      const ship = board[x][y]; // Get the ship at the attacked position
      //check if it is actuall working tomorrow
      ship.hit(); // Call the hit method on the ship
      board[x][y] = "hit"; // Mark the board position as hit
      return "hit";
    }
  };

  return {
    board,
    placeShip,
    receiveAttack,
  };
};

export default createGameBoard;

