export default class Enemigo {
  constructor(tileSize, startX, startY, sprite, id, defeatMessage) {
    this.tileSize = tileSize;
    this.x = startX; // Posición inicial en X
    this.y = startY; // Posición inicial en Y
    this.speed = 2; // Velocidad del enemigo
    this.sprite = sprite; // Imagen del enemigo

    this.directions = ["up", "down", "left", "right"];
    this.currentDirection = this.randomDirection(); // Dirección inicial

    this.id = id; // Identificador único
    this.defeatMessage = defeatMessage; // Mensaje personalizado
  }

  // Dibuja al enemigo
  draw(ctx) {
    const image = new Image();
    image.src = this.sprite;
    ctx.drawImage(image, this.x, this.y, this.tileSize, this.tileSize);
  }

  // Selecciona una dirección aleatoria
  randomDirection() {
    return this.directions[Math.floor(Math.random() * this.directions.length)];
  }

  // Mover al enemigo
  move(tileMap) {
    let directionX = 0;
    let directionY = 0;

    switch (this.currentDirection) {
      case "up":
        directionY = -1;
        break;
      case "down":
        directionY = 1;
        break;
      case "left":
        directionX = -1;
        break;
      case "right":
        directionX = 1;
        break;
    }

    const nextX = this.x + directionX * this.speed;
    const nextY = this.y + directionY * this.speed;

    // Si no hay colisión, continúa moviéndose
    if (!this.collidesWithWall(nextX, nextY, tileMap)) {
      this.x = nextX;
      this.y = nextY;
    } else {
      // Cambia de dirección si choca con una pared
      this.currentDirection = this.randomDirection();
    }
  }

  // Verifica colisiones con paredes
  collidesWithWall(x, y, tileMap) {
    const leftCol = Math.floor(x / this.tileSize);
    const rightCol = Math.floor((x + this.tileSize - 1) / this.tileSize);
    const topRow = Math.floor(y / this.tileSize);
    const bottomRow = Math.floor((y + this.tileSize - 1) / this.tileSize);

    return (
      tileMap.map[topRow][leftCol] === 1 || // Esquina superior izquierda
      tileMap.map[topRow][rightCol] === 1 || // Esquina superior derecha
      tileMap.map[bottomRow][leftCol] === 1 || // Esquina inferior izquierda
      tileMap.map[bottomRow][rightCol] === 1 // Esquina inferior derecha
    );
  }

  // Verifica colisión con el personaje
  checkCollision(playerX, playerY) {
    return (
      playerX < this.x + this.tileSize &&
      playerX + this.tileSize > this.x &&
      playerY < this.y + this.tileSize &&
      playerY + this.tileSize > this.y
    );
  }
}
