//Para toda la configuración del juego

import TileMap from "./TileMap.js"; // Dibuja la forma del laberinto
import Personaje from "./Personaje.js"; // Dibuja al personaje y sus acciones
import Enemigo from "./Enemigos.js"; // Añade a los obstáculos
import MovingDirection from "./MovingDirection.js"; // Archivo de Teachable Machine

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Configuración inicial
canvas.width = 1050;
canvas.height = 700;

const tileSize = 70; // Tamaño de cada tile

let tileMap, personaje, enemigos, esferas;
let wallImage, floorImage, esferaImage;
let gameStarted = false;
let score = 0; // Puntuación inicial
let totalEsferas = 0; // Total de esferas en el mapa

const movingDirection = new MovingDirection(); // Instancia de MovingDirection

// Preload de imágenes
function preloadImages() {
  wallImage = new Image();
  wallImage.src = "./src/wall.png";

  floorImage = new Image();
  floorImage.src = "./src/FondoPiso.png";

  esferaImage = new Image();
  esferaImage.src = "./src/EsferaVida.png";

  wallImage.onload = () => console.log("Imagen de muro cargada");
  floorImage.onload = () => console.log("Imagen de piso cargada");
  esferaImage.onload = () => console.log("Imagen de esfera cargada");
}

// Configurar controles para el personaje principal - en el teclado
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

// Controlar al personaje basado en gestos detectados - con la cámara
function controlCharacterWithGestures() {
  const gestureCommand = movingDirection.getGestureCommand();

  switch (gestureCommand) {
    case "Up":
      personaje.setDirection("up");
      break;
    case "Down":
      personaje.setDirection("down");
      break;
    case "Left":
      personaje.setDirection("left");
      break;
    case "Right":
      personaje.setDirection("right");
      break;
    default:
      // Sin movimiento si la clase detectada es "Nothing"
      break;
  }
}

// Configurar el juego
async function setup() {
  tileMap = new TileMap(tileSize, wallImage, floorImage);

  // Crear al personaje principal
  personaje = new Personaje(
    tileSize,
    tileSize,
    tileSize,
    "./src/Personaje.png"
  );

  // Crear los enemigos con mensajes personalizados
  enemigos = [
    new Enemigo(
      tileSize,
      tileSize * 5,
      tileSize * 5,
      "./src/CorazonDelator.png",
      1,
      "Los latidos te persiguen... como al narrador, no puedes silenciar la verdad."
    ),
    new Enemigo(
      tileSize,
      tileSize * 8,
      tileSize * 3,
      "./src/GatoNegro.png",
      2,
      "El gato negro te ha juzgado. No puedes escapar de tu destino, como el narrador no pudo escapar de su culpa"
    ),
    new Enemigo(
      tileSize,
      tileSize * 1,
      tileSize * 6,
      "./src/Morella.png",
      3,
      "El espíritu de Morella te ha alcanzado. La muerte no puede borrar ciertas almas."
    ),
    new Enemigo(
      tileSize,
      tileSize * 10,
      tileSize * 8,
      "./src/MuerteRoja.png",
      4,
      "Has sido alcanzado por la Muerte Roja. Ninguna puerta ni muro puede protegerte."
    ),
    new Enemigo(
      tileSize,
      tileSize * 10,
      tileSize * 2,
      "./src/Péndulo.png",
      5,
      "El péndulo ha encontrado su objetivo. No siempre hay un rescate en el último momento."
    ),
  ];

  // Crear las esferas en el laberinto
  esferas = [];
  for (let row = 0; row < tileMap.map.length; row++) {
    for (let col = 0; col < tileMap.map[row].length; col++) {
      if (tileMap.map[row][col] === 0) {
        esferas.push({
          x: col * tileSize + tileSize / 2 - 25, // Posición centrada para 50x50
          y: row * tileSize + tileSize / 2 - 25,
        });
        totalEsferas++;
      }
    }
  }

  // // Cargar el modelo de Teachable Machine
  // const modelURL = "https://teachablemachine.withgoogle.com/models/Xg-xeG70N/";
  // await movingDirection.loadModel(modelURL);
  const movingDirection = new MovingDirection();

  // Cargar el modelo y configurar la cámara
  movingDirection
    .loadModel("https://teachablemachine.withgoogle.com/models/Xg-xeG70N/")
    .then(() => {
      // Mostrar el video en el contenedor con ID "video-container"
      movingDirection.addVideoToScreen("video-container");
    });

  // Configurar controles para el personaje
  setupControls();
}

// Dibujar las esferas
function drawEsferas() {
  esferas.forEach((esfera) => {
    ctx.drawImage(esferaImage, esfera.x, esfera.y, 50, 50); // Tamaño 50x50
  });
}

// Detectar colisión con esferas
function checkEsferaCollision() {
  esferas = esferas.filter((esfera) => {
    const distX = Math.abs(personaje.x + tileSize / 2 - esfera.x - 25); // Ajustado a 50x50
    const distY = Math.abs(personaje.y + tileSize / 2 - esfera.y - 25); // Ajustado a 50x50

    // Si el personaje recoge la esfera
    if (distX < tileSize / 2 && distY < tileSize / 2) {
      score++;
      console.log(`Puntuación: ${score}`);
      return false; // Eliminar la esfera
    }
    return true; // Mantener la esfera
  });
}

// Verificar colisión con enemigos
function checkEnemyCollision() {
  enemigos.forEach((enemigo) => {
    if (enemigo.checkCollision(personaje.x, personaje.y)) {
      gameStarted = false;
      showDefeatScreen(enemigo.defeatMessage);
    }
  });
}

// Mostrar la pantalla de derrota
function showDefeatScreen(message) {
  const defeatScreen = document.getElementById("defeat-screen");
  defeatScreen.querySelector(".message").textContent = message;

  defeatScreen.style.display = "block"; // Mostrar la pantalla de derrota
  canvas.style.filter = "blur(2px)"; // Aplicar un desenfoque al fondo
}

// Verificar si el jugador ha ganado
function checkWin() {
  if (score === totalEsferas) {
    gameStarted = false;
    showVictoryScreen(); // Mostrar la pantalla de victoria
  }
}

// Mostrar la pantalla de victoria
function showVictoryScreen() {
  const victoryScreen = document.getElementById("victory-screen");
  victoryScreen.style.display = "block"; // Hacer visible la pantalla de victoria
  canvas.style.filter = "blur(2px)"; // Aplicar un desenfoque al fondo
}

// Dibujar el juego
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  tileMap.draw(ctx);

  // Dibujar esferas
  drawEsferas();

  // Controlar al personaje con gestos detectados
  controlCharacterWithGestures();

  // Actualizar y dibujar al personaje
  personaje.move(tileMap);
  personaje.draw(ctx);

  // Verificar colisión con esferas
  checkEsferaCollision();

  // Dibujar y mover a los enemigos
  enemigos.forEach((enemigo) => {
    enemigo.move(tileMap);
    enemigo.draw(ctx);
  });

  // Verificar colisiones con enemigos
  checkEnemyCollision();

  // Verificar si el jugador ha ganado
  checkWin();
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

// Función para reiniciar el juego
function restartGame() {
  score = 0; // Reiniciar puntuación
  esferas = []; // Reiniciar las esferas
  totalEsferas = 0; // Reiniciar el total de esferas

  setup(); // Reconfigurar el juego

  document.getElementById("victory-screen").style.display = "none";
  document.getElementById("defeat-screen").style.display = "none";

  canvas.style.display = "block";
  canvas.style.filter = "none"; // Eliminar desenfoque

  gameStarted = true; // Reiniciar el ciclo de juego
  gameLoop();
}

// Prepara el juego y añade eventos
preloadImages();
setup();

document.getElementById("start-button").addEventListener("click", startGame); // Para iniciar el juego desde la pantalla de inicio

document
  .getElementById("restart-button-defeat")
  .addEventListener("click", restartGame); // Para reiniciar el juego cuando se ha perdido

document
  .getElementById("restart-button-victory")
  .addEventListener("click", restartGame); // Para reiniciar el juego cuando se ha ganado
