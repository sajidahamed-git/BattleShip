import domController from "./domController";
import shipPlacer from "../controllers/shipPlacer";
//this is computerAttackLogic.js
const computerAttackLogic = (() => {
  const playerBoard = shipPlacer.playerBoard;
  let noofshipsSunkbythecomputer = 0;
  let initialHit = { row: null, col: null };
  let direction;

  const gameMessage = document.getElementById("game-message");

  const RandomHit = (HitPlayerBoard) => {
    let row, col;
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (HitPlayerBoard.includes(`${row}${col}`));
    const targetShip = playerBoard[row][col];

    if (targetShip) {
      handleSuccessfulHit(row, col, "random");
      initialHit.row = row;
      initialHit.col = col;
      return { initialHit:initialHit,isHit: true, row, col, mode: "findingDirection",direction };
    } else {
      handleMiss(row, col, "random");
      return {initialHit, isHit: false, row, col, mode: "searching",direction };
    }
  };
  const findShipDirection = (HitPlayerBoard) => {
    const initialHitRow = initialHit.row;
    const initialHitCol = initialHit.col;
    const orderedDirections = [
      { direction: "horizontal", dx: 0, dy: 1 },
      { direction:"vertical", dx: 1, dy: 0 },
      { direction: "horizontal", dx: 0, dy: -1 },
      { direction: "vertical", dx: -1, dy: 0 },
    ];
    let i = previousHit.lastCheckedIndex || 0;

    while (i < orderedDirections.length) {
      const { direction, dx, dy } = orderedDirections[i];
      const row = initialHitRow + dx;
      const col = initialHitCol + dy;
      const coordinateKey = `${row}${col}`;

      if (isValidCoordinate(row, col) &&!HitPlayerBoard.includes(coordinateKey)) {
        console.log(row, col);
        const targetShip = playerBoard[row][col]; // **Corrected syntax: [row][col]**
        if (targetShip) {
          console.log(`Direction found: ${direction}`);
          handleSuccessfulHit(row, col);
          // return directionType; // Found a hit in this direction, return direction
          return {
            isHit: false,
            row,
            col,
            mode: "sinking",
            direction:direction,
          };
        } else {
          handleMiss(row, col);
          console.log("Direction not immediately found.");
          return { isHit: false, row, col, mode: "findingDirection" };
        }
      }
    }
  };

  // const smartHit = (previousHit, HitPlayerBoard) => {
  //   const directions = [
  //     [0, 1],
  //     [1, 0],
  //     [0, -1],
  //     [-1, 0],
  //   ];
  //   for (let [dx, dy] of directions) {
  //     let row = previousHit.row + dx;
  //     let col= previousHit.col + dy;
  //     let coordinatekey = `${row}${col}`;

  //     if (
  //       HitPlayerBoard.includes(coordinatekey) ||
  //       !isValidCoordinate(row,col)
  //     ) {
  //       continue;
  //     }

  //     const targetShip = playerBoard[row][col];
  //     if (targetShip) {
  //       handleSuccessfulHit(row,col);
  //       return { isHit: true, row, col };

  //     }else{
  //       handleMiss(row,col);
  //       return { isHit: false, row, col };

  //     }

  //   }
  //   console.log("no valid smart hit found");
  //   return RandomHit(HitPlayerBoard);
  // };

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
    return "sunk";
  };

  return { RandomHit, findShipDirection };
})();

export default computerAttackLogic;
