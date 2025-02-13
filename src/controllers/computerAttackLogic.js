import domController from "./domController";
import shipPlacer from "../controllers/shipPlacer";
import Game from "./gameController";

const computerAttackLogic = (() => {
  const playerBoard = shipPlacer.playerBoard;
  let noofshipsSunkbythecomputer = 0;
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  const hit = (row, col) => {
    const targetShip = playerBoard[row][col];
    targetShip.hit();

    domController.updateColor(row, col, "hit", "player");

    if (targetShip.isSunk()) {
      const shipCoordinates = targetShip.shipCoordinates;
      console.log("player ship sunk");
      for (let index = 0; index < shipCoordinates.length; index++) {
        const element = shipCoordinates[index];
        domController.updateColor(element.row, element.col, "sunk", "player");
      }
      noofshipsSunkbythecomputer++;
      if (noofshipsSunkbythecomputer === 5) {
        gameMessage.textContent = "Computer has won. Game Over!";
        computerBoardElement.removeEventListener("click", handlePlayerAttack);
      }
      return { isHit: false, row: null, col: null };
    }
    return { isHit: true, row, col };
  };

  const smartHit = (previousHit, HitPlayerBoard) => {
    console.log("smart hit called");
    for (let [dx, dy] of directions) {
      let newRow = previousHit.row + dx;
      let newCol = previousHit.col + dy;
      if (HitPlayerBoard.includes(`${newRow}${newCol}`)) {
        continue;
      }
      if (newRow >= 0 && newRow < 10 && newCol >= 0 && newCol < 10) {
        if (playerBoard[newRow][newCol] !== null) {
          console.log('hit from smart hit');
          return hit(newRow, newCol);
        } else {
          // when smart hit misses
          console.log('missed while trying to smart hit');
          domController.updateColor(newRow, newCol, "miss", "player");
          return { isHit: false, row: null, col: null };
        }
      }
    }
    console.log('no valid smart hit found');
    Game.computerTurn(); // check if this is correct 
    return { isHit: false, row: null, col: null };
  };


  return { hit, smartHit };
})();
export default computerAttackLogic;
