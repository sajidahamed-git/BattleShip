import domController from "./domController";
import shipPlacer from "../controllers/shipPlacer";
//hunting mode keeps hunting one column down sometimes

const computerAttackLogic = (() => {
  const playerBoard = shipPlacer.playerBoard;
  let noofshipsSunkbythecomputer = 0;

  const gameMessage = document.getElementById("game-message");

  const RandomHit = (HitPlayerBoard) => {
    let row, col;
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (HitPlayerBoard.includes(`${row}${col}`));
    const targetShip = playerBoard[row][col];

    if (targetShip) {
      return handleSuccessfulHit(row, col,'random');
    }else {

      return handleMiss(row, col,'random');
    }
    
  };

  const smartHit = (previousHit, HitPlayerBoard) => {
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    for (let [dx, dy] of directions) {
      let newRow = previousHit.row + dx;
      let newCol = previousHit.col + dy;
      let coordinatekey = `${newRow}${newCol}`;

      if (
        HitPlayerBoard.includes(coordinatekey) ||
        !isValidCoordinate(newRow, newCol)
      ) {
        continue;
      }

      const targetShip = playerBoard[newRow][newCol];
      if (targetShip) {
        return handleSuccessfulHit(newRow, newCol, 'smart');
        
      }else{
        return handleMiss(newRow, newCol, 'smart');
      }
    

    }
    console.log("no valid smart hit found");
    return RandomHit(HitPlayerBoard);
  };

  const HuntingMode = (previousHit, HitPlayerBoard) => {
    let row = previousHit.row; // Stay in the same row
    let col = previousHit.col - 1; // Start at -1 from previous column
  
    // Keep moving left until we find a valid, unhit square
    while (isValidCoordinate(row, col) && HitPlayerBoard.includes(`${row}${col}`)) {
      col--; // Move left
    }
  
    // If we found a valid unhit square, attack it
    if (isValidCoordinate(row, col)) {
      const targetShip = playerBoard[row][col];
      if (targetShip) {
        return handleSuccessfulHit(row, col, 'hunting');
      } else {
        return handleMiss(row, col, 'hunting');
      }
    }
  
    // If no valid move is found, return to random mode
    return RandomHit(HitPlayerBoard);

  }

  const isValidCoordinate = (row, col) => {
    if (row >= 0 && row < 10 && col >= 0 && col < 10) {
      return true;
    }
    return false;
  };

  
  const handleSuccessfulHit = (row, col, typeofHit) => {
    const targetShip = playerBoard[row][col];

    targetShip.hit();
    domController.updateColor(row, col, "hit", "player");

    if (targetShip.isSunk()) {
       typeofHit = handleShipSunk(targetShip);
    }

    return { isHit: true, row, col, typeofHit };
  };


  const handleShipSunk = (targetShip) => {
    for (let { row, col } of targetShip.shipCoordinates) {
      domController.updateColor(row, col, "sunk", "player");
    }
    noofshipsSunkbythecomputer++;

    if (noofshipsSunkbythecomputer === 5) {
      gameMessage.textContent = "Computer has won. Game Over!";
      // computerBoardElement.removeEventListener("click", handlePlayerAttack);
    }
    return 'sunk'
  };
  const handleMiss = (row, col, typeofHit) => {
    domController.updateColor(row, col, "miss", "player");
    return { isHit: false, row, col, typeofHit: typeofHit };
  };

  return { RandomHit, smartHit, HuntingMode };
})();

export default computerAttackLogic;
