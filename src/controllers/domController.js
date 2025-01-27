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
const updateColor = (i,j,status)=>{
  console.log(i,j,status);
  const computerBoard = document.getElementById('computer-board');
  const cell = computerBoard.querySelector(`[data-row="${i}"][data-col="${j}"]`);
  if (status === 'hit') {
    cell.classList.remove('bg-slate-300');
    cell.classList.add('bg-red-500');
    //cell is not an element
  }
  if (status === 'miss') {
    cell.classList.remove('bg-slate-300');
    cell.classList.add('bg-green-500');
    
  }
  

}
const flipShipDirectionButton = document.getElementById("flip-ship-direction");
flipShipDirectionButton.addEventListener("click", () => {
    game.flipShipDirection();
});
export default createBoardCells;
export {updateColor};