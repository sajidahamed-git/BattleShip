import domController from "./domController";
import shipPlacer from "../controllers/shipPlacer";
//this is computerAttackLogic.js
const computerAttackLogic = (() => {
  const playerBoard = shipPlacer.playerBoard;
  let noofshipsSunkbythecomputer = 0;
  let initialHit = { row: null, col: null };
  let Shipdirection;
  let HitPlayerBoard = []; //stores coordinates of already hit cells in player board

  const gameMessage = document.getElementById("game-message");

  const RandomHit = () => {
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
      return {
        initialHit: initialHit,
        // isHit: true,
        row,
        col,
        mode: "findingDirection",
        direction: Shipdirection,
      };
    } else {
      handleMiss(row, col);
      return {
        initialHit,
        // isHit: false,
        row,
        col,
        mode: "searching",
        direction: Shipdirection,
      };
    }
  };
  const findShipDirection = () => {
    const initialHitRow = initialHit.row;
    const initialHitCol = initialHit.col;
    const orderedDirections = [
      { direction: "horizontal", dx: 0, dy: 1 },
      { direction: "vertical", dx: 1, dy: 0 },
      { direction: "horizontal", dx: 0, dy: -1 },
      { direction: "vertical", dx: -1, dy: 0 },
    ];

    for (let i = 0; i < orderedDirections.length; i++) {
      const { direction, dx, dy } = orderedDirections[i];
      const row = initialHitRow + dx;
      const col = initialHitCol + dy;
      const coordinateKey = `${row}${col}`;

      if (
        !isValidCoordinate(row, col) ||
        HitPlayerBoard.includes(coordinateKey)
      ) {
        continue;
        //skip this coordinates and look for next
      }

      console.log(row, col);
      const targetShip = playerBoard[row][col]; // **Corrected syntax: [row][col]**
      if (targetShip) {
        console.log(`Direction found: ${direction}`);
        handleSuccessfulHit(row, col);
        Shipdirection = direction;
        // return directionType; // Found a hit in this direction, return direction
        return {
          initialHit: initialHit,
          // isHit: false,
          row,
          col,
          mode: "sinking",
          direction: direction,
        };
      } else {
        handleMiss(row, col);
        console.log("Direction not immediately found.");
        return {
          initialHit: initialHit,
          // isHit: false,
          row,
          col,
          mode: "findingDirection",
          direction: null,
        };
      }
    }
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
