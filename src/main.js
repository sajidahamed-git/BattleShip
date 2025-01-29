import "./style.css";
import game from "./controllers/gameController";
import domController from "./controllers/domController";
// import {addAttackHandler} from "./controllers/domController";

const DOM = {
    form: document.getElementById("player-form"),
    gameContainer: document.getElementById("game-container"),
    gameMessage: document.getElementById("game-message"),
    flipShipDirection: document.getElementById("flip-ship-direction"),
    playerNameInput: document.getElementById("player-name"),
    startButton: document.getElementById("start-button"),
};

DOM.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const playerName = document.getElementById("player-name").value;
  //no use for playerName as of now
  game.initialize();

  DOM.gameMessage.classList.remove("hidden");
  DOM.gameContainer.classList.remove("hidden");
  DOM.form.classList.add("hidden");
  DOM.flipShipDirection.classList.remove("hidden");
});

DOM.startButton.addEventListener("click", () => {
  console.log("start game");
  domController.addAttackHandler();
});
  


