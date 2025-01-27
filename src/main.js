import "./style.css";
import game from "./controllers/gameController";


const form = document.getElementById("player-form");
const gameContainer = document.getElementById("game-container");
const gameMessage = document.getElementById("game-message");
const flipShipDirection = document.getElementById("flip-ship-direction");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const playerName = document.getElementById("player-name").value;
  game.initialize();

  gameMessage.classList.remove("hidden");
  gameContainer.classList.remove("hidden");
  form.classList.add("hidden");
//   startButton.classList.remove("hidden");
  flipShipDirection.classList.remove("hidden");
});

