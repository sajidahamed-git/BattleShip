import gameController from "./gameController";
// import currentShipIndex from 

const createBoardCells = (boardElement) => {
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
  
          // Add click handler for ship placement
          cell.addEventListener("click", () => {
              gameController.handleShipEventListner(i, j);
            })
          boardElement.appendChild(cell);
        }
    }
};
const flipShipDirectionButton = document.getElementById("flip-ship-direction");
flipShipDirectionButton.addEventListener("click", () => {
    gameController.flipShipDirection();
});
export default createBoardCells;
