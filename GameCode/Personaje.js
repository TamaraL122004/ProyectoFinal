//Dibuja al personaje

export default class Personaje {
  constructor(tileSize, startX, startY, sprite) {
    this.tileSize = tileSize;
    this.x = startX; // Posición inicial en X
    this.y = startY; // Posición inicial en Y
    this.speed = 5; // Velocidad del personaje
    this.sprite = sprite; // Imagen del personaje

    this.currentDirection = null; // Dirección actual
    this.nextDirection = null; // Próxima dirección
  }

  draw(ctx) {
    const image = new Image();
    image.src = this.sprite;
    ctx.drawImage(image, this.x, this.y, this.tileSize, this.tileSize);
  }

  setDirection(newDirection) {
    this.nextDirection = newDirection; // Cambia la próxima dirección
  }

  move(tileMap) {
    let directionX = 0;
    let directionY = 0;

    // Define la dirección según la actual
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

    // Calcula la posición siguiente en la dirección actual
    const nextX = this.x + directionX * this.speed;
    const nextY = this.y + directionY * this.speed;

    // Comprueba si es seguro moverse en la dirección actual
    if (!this.collidesWithWall(nextX, nextY, tileMap)) {
      this.x = nextX;
      this.y = nextY;
    }

    // Comprueba si se puede cambiar a la próxima dirección
    if (this.nextDirection) {
      let nextDirectionX = 0;
      let nextDirectionY = 0;

      switch (this.nextDirection) {
        case "up":
          nextDirectionY = -1;
          break;
        case "down":
          nextDirectionY = 1;
          break;
        case "left":
          nextDirectionX = -1;
          break;
        case "right":
          nextDirectionX = 1;
          break;
      }

      const futureX = this.x + nextDirectionX * this.speed;
      const futureY = this.y + nextDirectionY * this.speed;

      // Si no hay colisión en la nueva dirección, cámbiala
      if (!this.collidesWithWall(futureX, futureY, tileMap)) {
        this.currentDirection = this.nextDirection;
        this.nextDirection = null;
      }
    }
  }

  //Para que colide con la pared
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
}
