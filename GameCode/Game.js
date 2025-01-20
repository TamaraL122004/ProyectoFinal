// import TileMap from "./TileMap.js";
// import Personaje from "./Personaje.js";
// import Enemigo from "./Enemigos.js";

// const canvas = document.getElementById("game-canvas");
// const ctx = canvas.getContext("2d");

// // Configuración inicial
// canvas.width = 1050;
// canvas.height = 700;

// const tileSize = 70;
// let tileMap, personaje, enemigos;
// let wallImage, floorImage;
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

// // Configurar los controles para el personaje principal
// function setupControls() {
//   window.addEventListener("keydown", (event) => {
//     switch (event.key) {
//       case "ArrowUp":
//         personaje.setDirection(0, -1); // Mover arriba
//         break;
//       case "ArrowDown":
//         personaje.setDirection(0, 1); // Mover abajo
//         break;
//       case "ArrowLeft":
//         personaje.setDirection(-1, 0); // Mover izquierda
//         break;
//       case "ArrowRight":
//         personaje.setDirection(1, 0); // Mover derecha
//         break;
//     }
//   });

//   window.addEventListener("keyup", (event) => {
//     switch (event.key) {
//       case "ArrowUp":
//       case "ArrowDown":
//       case "ArrowLeft":
//       case "ArrowRight":
//         personaje.setDirection(0, 0); // Detener el movimiento
//         break;
//     }
//   });
// }

// // Configurar el juego
// function setup() {
//   tileMap = new TileMap(tileSize, wallImage, floorImage);

//   // Crear al personaje principal
//   personaje = new Personaje(
//     tileSize,
//     tileSize,
//     tileSize,
//     "./src/Personaje.png"
//   );

//   // Crear los enemigos
//   enemigos = [
//     new Enemigo(
//       tileSize,
//       tileSize * 5,
//       tileSize * 5,
//       "./src/CorazonDelator.png"
//     ),
//     new Enemigo(tileSize, tileSize * 8, tileSize * 3, "./src/GatoNegro.png"),
//     new Enemigo(tileSize, tileSize * 2, tileSize * 6, "./src/Morella.png"),
//     new Enemigo(tileSize, tileSize * 7, tileSize * 8, "./src/MuerteRoja.png"),
//     new Enemigo(tileSize, tileSize * 10, tileSize * 2, "./src/Péndulo.png"),
//   ];

//   // Configurar controles para el personaje
//   setupControls();
// }

// // Dibujar el juego
// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   tileMap.draw(ctx);

//   // Actualizar y dibujar al personaje
//   personaje.move(tileMap);
//   personaje.draw(ctx);

//   // Mover y dibujar a los enemigos
//   enemigos.forEach((enemigo) => {
//     enemigo.move(tileMap);
//     enemigo.draw(ctx);
//   });
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
import Enemigo from "./Enemigos.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Configuración inicial
canvas.width = 1050;
canvas.height = 700;

const tileSize = 70;
let tileMap, personaje, enemigos;
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

// Configurar los controles para el personaje principal
function setupControls() {
  document.addEventListener("keydown", (event) => {
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
  });
}

// Configurar el juego
function setup() {
  tileMap = new TileMap(tileSize, wallImage, floorImage);

  // Crear al personaje principal
  personaje = new Personaje(
    tileSize,
    tileSize,
    tileSize,
    "./src/Personaje.png"
  );

  // Crear los enemigos
  enemigos = [
    new Enemigo(
      tileSize,
      tileSize * 5,
      tileSize * 5,
      "./src/CorazonDelator.png"
    ),
    new Enemigo(tileSize, tileSize * 8, tileSize * 3, "./src/GatoNegro.png"),
    new Enemigo(tileSize, tileSize * 1, tileSize * 6, "./src/Morella.png"),
    new Enemigo(tileSize, tileSize * 10, tileSize * 8, "./src/MuerteRoja.png"),
    new Enemigo(tileSize, tileSize * 10, tileSize * 2, "./src/Péndulo.png"),
  ];

  // Configurar controles para el personaje
  setupControls();
}

// Dibujar el juego
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  tileMap.draw(ctx);

  // Actualizar y dibujar al personaje
  personaje.move(tileMap);
  personaje.draw(ctx);

  // Mover y dibujar a los enemigos
  enemigos.forEach((enemigo) => {
    enemigo.move(tileMap);
    enemigo.draw(ctx);
  });
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
