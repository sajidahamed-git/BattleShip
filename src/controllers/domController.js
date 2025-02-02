import game from "./gameController";
import shipPlacer from "./shipPlacer";
const domController = (() => {
  const createBoardCells = (boardElement, type) => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.classList.add(
          "cell",
          "bg-slate-300",
          "hover:bg-slate-600",
          "w-10",
          "h-10"
        );
        cell.dataset.row = i;
        cell.dataset.col = j;
        if (type === "player") {
          // Add click handler for ship placement
          cell.addEventListener("click", () => {
            shipPlacer.placePlayerShip(i, j);
          });
        }
        boardElement.appendChild(cell);
      }
    }
  };
  const addAttackHandler = () => {
    console.log("you can attack now");
    const computerBoard = document.getElementById("computer-board");
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = computerBoard.querySelector(
          `[data-row="${i}"][data-col="${j}"]`
        );
        cell.addEventListener("click", (e) => {
          game.playerAttack(i, j);
        });
      }
    }
  };
  const updateColor = (i, j, status) => {
    console.log(i, j, status);
    const computerBoard = document.getElementById("computer-board");
    const cell = computerBoard.querySelector(
      `[data-row="${i}"][data-col="${j}"]`
    );
    if (status === "hit") {
      cell.classList.remove("bg-slate-300");
      cell.classList.add("bg-red-500");
      //cell is not an element
    }
    if (status === "miss") {
      cell.classList.remove("bg-slate-300");
      cell.classList.add("bg-green-500");
    }
  };

  const flipShipDirectionButton = document.getElementById(
    "flip-ship-direction"
  );
  flipShipDirectionButton.addEventListener("click", () => {
    shipPlacer.flipShipDirection();
  });
  return {
    createBoardCells,
    updateColor,
    addAttackHandler,
  };
})();
// export default createBoardCells;
// export { updateColor, addAttackHandler };
export default domController;
