import "./style.css";
import game from "./controllers/gameController";

const DOM = {
    form: document.getElementById("player-form"),
    gameContainer: document.getElementById("game-container"),
    gameMessage: document.getElementById("game-message"),
    flipShipDirection: document.getElementById("flip-ship-direction"),
    playerNameInput: document.getElementById("player-name"),
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

