//Para dibujar el laberinto

export default class TileMap {
  constructor(tileSize, wallImage, floorImage) {
    this.tileSize = tileSize; // Tamaño de cada celda
    this.wallImage = wallImage; // Imagen de la pared
    this.floorImage = floorImage; // Imagen del suelo
  }

  // Matriz que define el laberinto (1 = pared, 0 = camino)
  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  // Dibujar el laberinto
  draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let col = 0; col < this.map[row].length; col++) {
        let tile = this.map[row][col];
        let x = col * this.tileSize;
        let y = row * this.tileSize;

        // Dibuja el suelo en todas las celdas
        ctx.drawImage(this.floorImage, x, y, this.tileSize, this.tileSize);

        // Dibuja los muros donde corresponda
        if (tile === 1) {
          ctx.drawImage(this.wallImage, x, y, this.tileSize, this.tileSize);
        }
      }
    }
  }
}
