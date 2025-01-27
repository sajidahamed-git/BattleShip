import "./style.css";
import gameController from "./gameController";

const form = document.getElementById("player-form");
const gameContainer = document.getElementById("game-container");
const gameMessage = document.getElementById("game-message");
const flipShipDirection = document.getElementById("flip-ship-direction");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const playerName = document.getElementById("player-name").value;
  gameController.initialize();
  gameMessage.classList.remove("hidden");
  gameContainer.classList.remove("hidden");
  form.classList.add("hidden");
//   startButton.classList.remove("hidden");
  flipShipDirection.classList.remove("hidden");
});

flipShipDirection.addEventListener("click", () => {
  gameController.flipShipDirection();
});
