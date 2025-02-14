import domController from "./domController";
import shipPlacer from "../controllers/shipPlacer";

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
      return handleSuccessfulHit(row, col);
    }else {

      return handleMiss(row, col);
    }
    
  };

  const smartHit = (previousHit, HitPlayerBoard) => {
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    console.log("smart hit called");
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
        return handleSuccessfulHit(newRow, newCol);
        
      }else{
        return handleMiss(newRow, newCol);
      }
    

    }
    console.log("no valid smart hit found");
    return RandomHit(HitPlayerBoard);
  };

  const isValidCoordinate = (row, col) => {
    if (row >= 0 && row < 10 && col >= 0 && col < 10) {
      return true;
    }
    return false;
  };

  
  const handleSuccessfulHit = (row, col) => {
    const targetShip = playerBoard[row][col];

    targetShip.hit();
    domController.updateColor(row, col, "hit", "player");

    if (targetShip.isSunk()) {
      handleShipSunk(targetShip);
    }

    return { isHit: true, row, col };
  };

  const handleMiss = (row, col) => {
    domController.updateColor(row, col, "miss", "player");
    return { isHit: false, row, col };
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
  };

  return { RandomHit, smartHit };
})();

export default computerAttackLogic;
