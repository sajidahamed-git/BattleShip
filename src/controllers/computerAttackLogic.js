import domController from "./domController";
import shipPlacer from "../controllers/shipPlacer";
//this is computerAttackLogic.js
const computerAttackLogic = (() => {
  const playerBoard = shipPlacer.playerBoard;
  let noofshipsSunkbythecomputer = 0;
  let initialHit = { row: null, col: null };
  let Shipdirection;
  let HitPlayerBoard = []; //stores coordinates of already hit cells in player board
  let targetShip;

  const gameMessage = document.getElementById("game-message");

  const RandomHit = () => {
    let row, col;
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (HitPlayerBoard.includes(`${row}${col}`));
    targetShip = playerBoard[row][col];

    if (targetShip) {
      handleSuccessfulHit(row, col, "random");
      initialHit.row = row;
      initialHit.col = col;
      return {
        initialHit: initialHit,
        lastHit: { row, col },
        // isHit: true,
        mode: "findingDirection",
        direction: Shipdirection,
      };
    } else {
      handleMiss(row, col);
      return {
        initialHit,
        // isHit: false,
        lastHit: { row, col },
        mode: "searching",
        direction: Shipdirection,
      };
    }
  };
  const findShipDirection = () => {
    const initialHitRow = initialHit.row;
    const initialHitCol = initialHit.col;

    // Ordered directions to check: right → down → left → up
    const orderedDirections = [
      { direction: "horizontal", dx: 0, dy: 1 }, // Right
      { direction: "vertical", dx: 1, dy: 0 }, // Down
      { direction: "horizontal", dx: 0, dy: -1 }, // Left
      { direction: "vertical", dx: -1, dy: 0 }, // Up
    ];

    for (const { direction, dx, dy } of orderedDirections) {
      const newRow = initialHitRow + dx;
      const newCol = initialHitCol + dy;
      const coordinateKey = `${newRow}${newCol}`;

      // Skip if the coordinate is invalid or already hit
      if (
        !isValidCoordinate(newRow, newCol) ||
        HitPlayerBoard.includes(coordinateKey)
      ) {
        console.log(
          "Skipping invalid or already hit coordinate:",
          newRow,
          newCol
        );
        continue;
      }

      const targetShip = playerBoard[newRow][newCol];

      if (targetShip) {
        console.log(`Direction found: ${direction}`);
        handleSuccessfulHit(newRow, newCol);
        Shipdirection = direction; // Set the global Shipdirection

        return {
          initialHit,
          lastHit: { newRow, newCol },

          mode: "sinking",
          direction: direction,
        };
      } else {
        handleMiss(newRow, newCol);
        console.log("Missed. Will check next direction on the next turn.");

        return {
          initialHit,
          lastHit: { newRow, newCol },

          mode: "findingDirection",
          direction: null,
        };
      }
    }

    // If all directions were checked and no hit was found, reset to searching mode
    console.log("No valid direction found, switching to searching mode.");
    return { mode: "searching" };
  };

  const sinkShip = (previousHit) => {
    let row = previousHit.row;
    let col = previousHit.col;
    console.log(previousHit);
    console.log(targetShip);
    if (Shipdirection === "horizontal") {
      row = row + 1;
      if (
        isValidCoordinate(row, col) &&
        HitPlayerBoard.includes(`${row}${col}`)
      ) {
        console.log(row, col);
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
    const targetShip1 = playerBoard[row][col];

    targetShip1.hit();
    domController.updateColor(row, col, "hit", "player");

    if (targetShip1.isSunk()) {
      handleShipSunk(targetShip1);
    }
    HitPlayerBoard.push(`${row}${col}`);
    console.log(HitPlayerBoard);

    // return { isHit: true, row, col };
  };

  const handleMiss = (row, col) => {
    domController.updateColor(row, col, "miss", "player");
    HitPlayerBoard.push(`${row}${col}`);
    console.log(HitPlayerBoard);
  };
  const handleShipSunk = (targetShip1) => {
    for (let { row, col } of targetShip1.shipCoordinates) {
      domController.updateColor(row, col, "sunk", "player");
    }
    noofshipsSunkbythecomputer++;

    if (noofshipsSunkbythecomputer === 5) {
      gameMessage.textContent = "Computer has won. Game Over!";
      // computerBoardElement.removeEventListener("click", handlePlayerAttack);
    }
    return "sunk";
  };

  return { sinkShip, RandomHit, findShipDirection };
})();

export default computerAttackLogic;
