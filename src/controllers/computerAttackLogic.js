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
        Shipdirection: Shipdirection,
      };
    } else {
      handleMiss(row, col);
      return {
        initialHit,
        // isHit: false,
        lastHit: { row, col },
        mode: "searching",
        Shipdirection: Shipdirection,
      };
    }
  };
  const findShipDirection = () => {
    const initialHitRow = initialHit.row;
    const initialHitCol = initialHit.col;

    // Ordered directions to check: right → down → left → up
    const orderedDirections = [
      { direction: "horizontal", dx: 0, dy: 1, moveDirection: "right" }, // Right
      { direction: "vertical", dx: 1, dy: 0, moveDirection: "down" }, // Down
      { direction: "horizontal", dx: 0, dy: -1, moveDirection: "left" }, // Left
      { direction: "vertical", dx: -1, dy: 0, moveDirection: "up" }, // Up
    ];

    for (const { direction, dx, dy, moveDirection } of orderedDirections) {
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
      const ship = playerBoard[newRow][newCol];

      if (ship) {
        console.log(`Direction found: ${direction}`);
        handleSuccessfulHit(newRow, newCol);
        Shipdirection = direction; // Set the global Shipdirection
        if (ship.isSunk()) {
          return { mode: "searching" };
        }
        return {
          initialHit,
          lastHit: { row: newRow, col: newCol },
          mode: "sinking",
          Shipdirection: direction,
          moveDirection: moveDirection,
        };
      } else {
        handleMiss(newRow, newCol);
        console.log("Missed. Will check next direction on the next turn.");

        return {
          initialHit,
          lastHit: { row: newRow, col: newCol },

          mode: "findingDirection",
          Shipdirection: null,
          moveDirection: moveDirection,
        };
      }
    }

    // If all directions were checked and no hit was found, reset to searching mode
    console.log("No valid direction found, switching to searching mode.");
    return { mode: "searching" };
  };

  //   const sinkShip = (previousHit) => {
  //     console.log("sinkShip called with:", previousHit);
  //     console.log(previousHit);

  //     // Extract data
  //     let lastRow = previousHit.lastHit.row;
  //     let lastCol = previousHit.lastHit.col;
  //     let initialRow = previousHit.initialHit.row;
  //     let initialCol = previousHit.initialHit.col;

  //     let moveDirection = previousHit.moveDirection; // Always exists in sinking mode
  //     let newRow = lastRow;
  //     let newCol = lastCol;

  //     // Move in the current direction
  //     if (moveDirection === "right") newCol += 1;
  //     if (moveDirection === "left") newCol -= 1;
  //     if (moveDirection === "bottom") newRow += 1;
  //     if (moveDirection === "up") newRow -= 1;

  //     // If the new move is invalid, switch direction from initialHit
  //     if (!isCellValid(newRow, newCol)) {
  //         console.log("Invalid move detected, switching direction...");

  //         // Reset to initial hit
  //         newRow = initialRow;
  //         newCol = initialCol;

  //         // Switch direction
  //         if (moveDirection === "right") moveDirection = "left";
  //         else if (moveDirection === "left") moveDirection = "right";
  //         else if (moveDirection === "bottom") moveDirection = "top";
  //         else if (moveDirection === "top") moveDirection = "bottom";

  //         // Move in the new direction
  //         if (moveDirection === "right") newCol += 1;
  //         if (moveDirection === "left") newCol -= 1;
  //         if (moveDirection === "bottom") newRow += 1;
  //         if (moveDirection === "top") newRow -= 1;
  //     }

  //     // If the new move is still valid, attack
  //     if (isCellValid(newRow, newCol)) {
  //         let targetShip = playerBoard[newRow][newCol];

  //         if (targetShip) {
  //             console.log(`Hit at ${newRow}, ${newCol}`);
  //             handleSuccessfulHit(newRow, newCol);
  //             return {
  //                 initialHit: previousHit.initialHit,
  //                 lastHit: { row: newRow, col: newCol },
  //                 mode: "sinking",
  //                 moveDirection: moveDirection
  //             };
  //         } else {
  //             console.log(`Miss at ${newRow}, ${newCol}`);
  //             handleMiss(newRow, newCol);
  //             return {
  //                 initialHit: previousHit.initialHit,
  //                 lastHit: previousHit.lastHit, // Keep last hit unchanged on miss
  //                 mode: "sinking",
  //                 moveDirection: moveDirection
  //             };
  //         }
  //     }

  //     console.log("No valid moves left. Reverting to searching mode.");
  //     return { mode: "searching" };
  // };
  const sinkHorizontalShip = (previousHit) => {
    let lastRow = previousHit.lastHit.row;
    let lastCol = previousHit.lastHit.col;
    let initialHit = previousHit.initialHit;
    let initialCol = previousHit.initialHit.col
    let initialRow = previousHit.initialHit.row
    let moveDirection = previousHit.moveDirection; // Always exists in sinking mode
    let newRow;
    let newCol;

    // Move in the current direction
    if (moveDirection === "right") {
      newRow = lastRow;
      newCol = lastCol + 1;
    }
    if (moveDirection === "left") {
      newRow = lastRow
      newCol =  lastCol -1 
      // if (newCol === initialCol) {
        // newCol = newCol -1
      // }
    }

    if (newCol > 9) {
      //no space in right side 
      console.log('direction changed due to edge');
      moveDirection = 'left'
      newCol = initialCol - 1

    }
    if (newCol < 0) {
      //no space in left side
      console.log('direction changed due to edge');
      moveDirection = 'right'
      newCol = initialCol + 1
    }


    const ship = playerBoard[newRow][newCol];

    if (ship) {
      handleSuccessfulHit(newRow, newCol);
      if (ship.isSunk()) {
        console.log("Ship is sunk, switching to searching mode.");
        return { mode: "searching" };
      }
      return {
        initialHit,
        
        lastHit: { row:newRow , col: newCol }, 
        mode: "sinking",
        Shipdirection: "horizontal",
        moveDirection,
      };
    } else {
      console.log('missed while sinking');
      handleMiss(newRow, newCol);

      moveDirection = moveDirection === "right" ? "left" : "right";
      return {
        initialHit,
        //here when we miss while sinking we set the last hit as 
        //initial hit so that we can reuse
        lastHit: { row: initialRow, col: initialCol},  //this was the key which chatGPT could not figure out
        mode: "sinking",
        Shipdirection: "horizontal",
        moveDirection,
      };
    }
  };
  const sinkVerticalShip = (previousHit) =>{
    let lastRow = previousHit.lastHit.row;
    let lastCol = previousHit.lastHit.col;
    let initialHit = previousHit.initialHit;
    let initialCol = previousHit.initialHit.col
    let initialRow = previousHit.initialHit.row
    let moveDirection = previousHit.moveDirection; // Always exists in sinking mode
    let newRow;
    let newCol = lastCol

    if (moveDirection === 'down') {
      newRow = lastRow + 1  
    }
    if (moveDirection === 'up') {
      newRow  = lastRow -1
    }
    if (newRow>9) {
      //no space in the bottom
      console.log('direction changed due to bottom edge');
      moveDirection = 'up'
      newRow  = initialRow -1
    }
    if (newRow < 0) {
      console.log('direction changed due to top edge');
      moveDirection = 'down'
      newRow = initialRow +1
    }
    console.log('momo',newRow,newCol);
    const ship = playerBoard[newRow][newCol];

    if (ship) {
      handleSuccessfulHit(newRow, newCol);
      if (ship.isSunk()) {
        console.log("Ship is sunk, switching to searching mode.");
        return { mode: "searching" };
      }
      return {
        initialHit,
        lastHit: { row:newRow , col: newCol }, 
        mode: "sinking",
        Shipdirection: "vertical",
        moveDirection,
      };
    } else {
      console.log('missed while sinking');
      handleMiss(newRow, newCol);

      moveDirection = moveDirection === "down" ? "up" : "down";
      return {
        initialHit,
        //here when we miss while sinking we set the last hit as 
        //initial hit so that we can reuse
        lastHit: { row: initialRow, col: initialCol},  //this was the key which chatGPT could not figure out
        mode: "sinking",
        Shipdirection: "vertical",
        moveDirection,
      };
    }
  }

  const isCellValid = (row, col) => {
    return (
      isValidCoordinate(row, col) && !HitPlayerBoard.includes(`${row}${col}`)
    );
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
    // console.log(HitPlayerBoard);

    // return { isHit: true, row, col };
  };

  const handleMiss = (row, col) => {
    domController.updateColor(row, col, "miss", "player");
    HitPlayerBoard.push(`${row}${col}`);
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

  return { RandomHit, findShipDirection, sinkHorizontalShip,sinkVerticalShip };
})();

export default computerAttackLogic;
