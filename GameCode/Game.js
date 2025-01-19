// import TileMap from "./TileMap.js";

// const canvas = document.getElementById("game-canvas");
// const ctx = canvas.getContext("2d");

// // Configuración inicial
// canvas.width = 1050; // Ajusta según el tamaño del laberinto
// canvas.height = 600;

// let tileMap;
// const tileSize = 75; // Tamaño de cada celda en píxeles
// let wallImage, floorImage; // Variables para las imágenes
// let gameStarted = false;

// // Preload de imágenes
// function preloadImages() {
//   wallImage = new Image();
//   wallImage.src = "./src/wall.png";

//   floorImage = new Image();
//   floorImage.src = "./src/Piso.png";

//   wallImage.onload = () => console.log("Imagen de muro cargada");
//   floorImage.onload = () => console.log("Imagen de piso cargada");
// }

// // Configurar el juego
// function setup() {
//   tileMap = new TileMap(tileSize, wallImage, floorImage);
// }

// // Dibujar el juego
// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
//   tileMap.draw(ctx); // Dibuja el laberinto
// }

// // Ciclo del juego
// function gameLoop() {
//   draw();
//   if (gameStarted) {
//     requestAnimationFrame(gameLoop);
//   }
// }

// // Iniciar el juego
// function startGame() {
//   document.getElementById("start-screen").style.display = "none";
//   canvas.style.display = "block";
//   gameStarted = true;
//   gameLoop();
// }

// // Prepara el juego y añade eventos
// preloadImages();
// setup();
// document.getElementById("start-button").addEventListener("click", startGame);

import TileMap from "./TileMap.js";
import Personaje from "./Personaje.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Configuración inicial
canvas.width = 1050; // Ajusta según el tamaño del laberinto
canvas.height = 600;

const tileSize = 75; // Tamaño de cada celda en píxeles
let tileMap;
let personaje;

let wallImage, floorImage, spritePersonaje; // Variables para las imágenes
let gameStarted = false;

// Preload de imágenes
function preloadImages() {
  wallImage = new Image();
  wallImage.src = "./src/wall.png";

  floorImage = new Image();
  floorImage.src = "./src/Piso.png";

  spritePersonaje = new Image();
  spritePersonaje.src = "./src/Personaje.png";

  wallImage.onload = () => console.log("Imagen de muro cargada");
  floorImage.onload = () => console.log("Imagen de piso cargada");
  spritePersonaje.onload = () => console.log("Imagen del personaje cargada");
}

// Configurar el juego
function setup() {
  tileMap = new TileMap(tileSize, wallImage, floorImage);
  personaje = new Personaje(75, 75, tileSize, spritePersonaje); // Inicializa el personaje en la posición (75, 75)
}

// Dibujar el juego
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
  tileMap.draw(ctx); // Dibuja el laberinto
  personaje.draw(ctx); // Dibuja el personaje
}

// Ciclo del juego
function gameLoop() {
  draw();
  if (gameStarted) {
    requestAnimationFrame(gameLoop);
  }
}

// Mover al personaje
function handleMovement(event) {
  const key = event.key;
  let directionX = 0;
  let directionY = 0;

  // Detectar teclas de movimiento
  if (key === "ArrowUp") directionY = -1;
  if (key === "ArrowDown") directionY = 1;
  if (key === "ArrowLeft") directionX = -1;
  if (key === "ArrowRight") directionX = 1;

  personaje.move(directionX, directionY, tileMap); // Mueve el personaje
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
window.addEventListener("keydown", handleMovement); // Escucha las teclas para mover al personaje
