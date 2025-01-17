export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize;

    // Matriz que define el laberinto (1 = pared, 0 = camino)
    this.map = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1],
      [1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
  }

  draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let col = 0; col < this.map[row].length; col++) {
        const tile = this.map[row][col];
        if (tile === 1) {
          ctx.fillStyle = "grey"; // Color de las paredes
          ctx.fillRect(
            col * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            this.tileSize
          );
        }
      }
    }
  }
}
