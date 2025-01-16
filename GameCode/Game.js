import TileMap from "./TileMap.js";

const tileSize = 35;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(tileSize);

// Game loop
function gameLoop() {
  tileMap.draw(ctx);
}

// Tamaño del canvas en donde va el juego
tileMap.setCanvasSize(canvas);
