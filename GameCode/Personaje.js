// export default class Personaje {
//     constructor(x, y, tileSize, sprite) {
//       this.x = x; // Posición inicial en X
//       this.y = y; // Posición inicial en Y
//       this.tileSize = tileSize; // Tamaño del personaje
//       this.sprite = sprite; // Imagen del personaje
//       this.speed = 2; // Velocidad de movimiento
//     }

//     // Dibujar el personaje en el canvas
//     draw(ctx) {
//       ctx.drawImage(this.sprite, this.x, this.y, this.tileSize, this.tileSize);
//     }

//     // Mover el personaje
//     move(directionX, directionY, tileMap) {
//       const nextX = this.x + directionX * this.speed;
//       const nextY = this.y + directionY * this.speed;

//       // Evitar que el personaje atraviese paredes
//       if (!this.collidesWithWall(nextX, nextY, tileMap)) {
//         this.x = nextX;
//         this.y = nextY;
//       }
//     }

//     // Verificar colisión con paredes
//     collidesWithWall(x, y, tileMap) {
//       const row = Math.floor(y / this.tileSize);
//       const col = Math.floor(x / this.tileSize);
//       return tileMap.map[row][col] === 1; // 1 representa una pared
//     }
//   }

export default class Personaje {
  constructor(x, y, tileSize, sprite) {
    this.x = x; // Posición inicial en X
    this.y = y; // Posición inicial en Y
    this.tileSize = tileSize; // Tamaño del personaje
    this.sprite = sprite; // Imagen del personaje
    this.speed = 15; // Velocidad de movimiento
  }

  // Dibujar el personaje en el canvas
  draw(ctx) {
    ctx.drawImage(this.sprite, this.x, this.y, this.tileSize, this.tileSize);
  }

  // Mover el personaje
  move(directionX, directionY, tileMap) {
    const nextX = this.x + directionX * this.speed;
    const nextY = this.y + directionY * this.speed;

    // Evitar que el personaje atraviese paredes
    if (!this.collidesWithWall(nextX, nextY, tileMap)) {
      this.x = nextX;
      this.y = nextY;
    }
  }

  //   // Verificar colisión con paredes
  //   collidesWithWall(x, y, tileMap) {
  //     const row = Math.floor(y / this.tileSize);
  //     const col = Math.floor(x / this.tileSize);
  //     return tileMap.map[row][col] === 1; // 1 representa una pared
  //   }

  collidesWithWall(x, y, tileMap) {
    // Calcular las celdas que ocupan las esquinas del personaje
    const leftCol = Math.floor(x / this.tileSize);
    const rightCol = Math.floor((x + this.tileSize - 1) / this.tileSize);
    const topRow = Math.floor(y / this.tileSize);
    const bottomRow = Math.floor((y + this.tileSize - 1) / this.tileSize);

    // Verificar si alguna esquina choca con una pared
    return (
      tileMap.map[topRow][leftCol] === 1 || // Esquina superior izquierda
      tileMap.map[topRow][rightCol] === 1 || // Esquina superior derecha
      tileMap.map[bottomRow][leftCol] === 1 || // Esquina inferior izquierda
      tileMap.map[bottomRow][rightCol] === 1 // Esquina inferior derecha
    );
  }
}
