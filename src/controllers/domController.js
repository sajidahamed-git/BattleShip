import game from "./gameController";
// import currentShipIndex from 

const createBoardCells = (boardElement,type) => {
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
          if(type === "player"){
            // Add click handler for ship placement
            cell.addEventListener("click", () => {
                game.placePlayerShip(i, j);
            })
          }
          else if(type === "computer"){
            cell.addEventListener("click", () => {
                game.playerAttack(i, j);
            })
          }
          boardElement.appendChild(cell);
        }
    }
};
const flipShipDirectionButton = document.getElementById("flip-ship-direction");
flipShipDirectionButton.addEventListener("click", () => {
    game.flipShipDirection();
});
export default createBoardCells;
