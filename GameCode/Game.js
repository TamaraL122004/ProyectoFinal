import TileMap from "./TileMap.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Configuración inicial
canvas.width = 900; // Ajusta según el tamaño del laberinto
canvas.height = 600;

const tileMap = new TileMap(60); // Tamaño de cada celda del laberinto
let gameStarted = false;

// Iniciar el juego
function startGame() {
  document.getElementById("start-screen").style.display = "none";
  canvas.style.display = "block";
  gameStarted = true;
  gameLoop();
}

// Ciclo del juego
function gameLoop() {
  tileMap.draw(ctx); // Dibujar el laberinto
  if (gameStarted) {
    requestAnimationFrame(gameLoop);
  }
}

// Evento para iniciar el juego
document.getElementById("start-button").addEventListener("click", startGame);
