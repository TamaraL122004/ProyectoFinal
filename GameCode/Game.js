import TileMap from "./TileMap.js";
import Personaje from "./Personaje.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Configuración inicial
canvas.width = 1050;
canvas.height = 600;

const tileSize = 75;
let tileMap, personaje;
let wallImage, floorImage;
let gameStarted = false;

// Preload de imágenes
function preloadImages() {
  wallImage = new Image();
  wallImage.src = "./src/wall.png";

  floorImage = new Image();
  floorImage.src = "./src/Piso.png";

  wallImage.onload = () => console.log("Imagen de muro cargada");
  floorImage.onload = () => console.log("Imagen de piso cargada");
}

// Configurar el juego
function setup() {
  tileMap = new TileMap(tileSize, wallImage, floorImage);
  personaje = new Personaje(
    tileSize,
    tileSize,
    tileSize,
    "./src/Personaje.png"
  );
}

// Manejo de teclas para mover al personaje
function handleKeyDown(event) {
  switch (event.key) {
    case "ArrowUp":
      personaje.setDirection("up");
      break;
    case "ArrowDown":
      personaje.setDirection("down");
      break;
    case "ArrowLeft":
      personaje.setDirection("left");
      break;
    case "ArrowRight":
      personaje.setDirection("right");
      break;
  }
}

document.addEventListener("keydown", handleKeyDown);

// Dibujar el juego
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  tileMap.draw(ctx);
  personaje.move(tileMap); // Mover al personaje
  personaje.draw(ctx); // Dibujar al personaje
}

// Ciclo del juego
function gameLoop() {
  draw();
  if (gameStarted) {
    requestAnimationFrame(gameLoop);
  }
}

// Iniciar el juego
function startGame() {
  document.getElementById("start-screen").style.display = "none";
  canvas.style.display = "block";
  gameStarted = true;
  gameLoop();
}

// Prepara el juego y añade eventos
preloadImages();
setup();
document.getElementById("start-button").addEventListener("click", startGame);
