import domController from "./domController";
import shipPlacer from "../controllers/shipPlacer";

const computerAttackLogic = (() => {
  const playerBoard = shipPlacer.playerBoard;
  let previousHit = { isHit: false, row: null, col: null };
  let noofshipsSunkbythecomputer = 0;
  const hit = (row, col) => {
    console.log(`before condition check ${previousHit.isHit}`);
    if (previousHit.isHit === true) {
      //this not working as expected
      console.log("previous hit");
      console.log(previousHit.isHit);
    } else {
      const targetShip = playerBoard[row][col];
      targetShip.hit();
      console.log(`before updating previous hit ${previousHit.isHit}`);
      previousHit.isHit = true;
      previousHit.row = row;
      previousHit.col = col;
      console.log(`after updating previous hit ${previousHit.isHit}`);

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
          return;
        }
      }
    }
  };
  const resetPreviousHit = () => {
    previousHit.isHit = false;
    previousHit.row = null;
    previousHit.col = null;
  };

  return { hit, resetPreviousHit };
})();
export default computerAttackLogic;
