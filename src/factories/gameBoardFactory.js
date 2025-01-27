const createGameBoard = () => {
  const board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));

  const ships = [];

  const placeShip = (ship, row, col, direction) => {
    if (direction === "horizontal") {
      // Check bounds first
      if (col + ship.length > 10 || row >= 10) {
        throw new Error("Ship out of bounds - try again");
      }

      // Validate all positions first
      for (let i = 0; i < ship.length; i++) {
        if (board[row][col + i] !== null) {
          throw new Error("Ship already exists in this position - try again");
        }
      }

      // If validation passes, place the ship
      for (let i = 0; i < ship.length; i++) {
        board[row][col + i] = ship;
      }
    }

    if (direction === "vertical") {
      // Check bounds first
      if (row + ship.length > 10 || col >= 10) {
        throw new Error("Ship out of bounds - try again");
      }

      // Validate all positions first
      for (let i = 0; i < ship.length; i++) {
        if (board[row + i][col] !== null) {
          throw new Error("Ship already exists in this position - try again");
        }
      }

      // If validation passes, place the ship
      for (let i = 0; i < ship.length; i++) {
        board[row + i][col] = ship;
      }
    }

    ships.push(ship);
  };

  const receiveAttack = (x, y) => {
    //if attack is in an empty spot
    if (board[x][y] === null) {
      board[x][y] = "miss";
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

  const render = () => {
    return board.map((row) => row.join(" ")).join("\n");
  };
  return {
    board,
    placeShip,
    receiveAttack,
    render,
  };
};

export default createGameBoard;
