import "./style.css";
import Game from "./controllers/gameController";
import domController from "./controllers/domController";

const ui = {
  form: document.getElementById("player-form"),
  gameContainer: document.getElementById("game-container"),
  gameMessage: document.getElementById("game-message"),
  flipShipDirectionButton: document.getElementById("flip-ship-direction"),
  playerNameInput: document.getElementById("player-name"),
  startButton: document.getElementById("start-button"),
  computerBoard: document.getElementById('computer-board')
};

ui.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const playerName = document.getElementById("player-name").value;
  //no use for playerName as of now
  Game.initialize();

  ui.gameMessage.classList.remove("hidden");
  ui.gameContainer.classList.remove("hidden");
  ui.flipShipDirectionButton.classList.remove("hidden");

  ui.form.classList.add("hidden");
  domController.attachFlipShipListener(ui.flipShipDirectionButton);
});
ui.startButton.addEventListener("click", () => {
  console.log("start game");
  Game.start()
  ui.startButton.classList.add('hidden')
  // domController.gameMessageupdater('Click on the enemy board to Attack')
});
