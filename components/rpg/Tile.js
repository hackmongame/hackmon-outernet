class Tile {
  constructor(x, y, width, height, tile) {
    this.tile = tile
    this.startx = x
    this.starty = y
    this.endx = this.startx + width
    this.endy = this.starty + height
    this.width = width
    this.height = height
  }

  update(keys, elapsed) {}

  draw(canvas, ctx) {
    ctx.drawImage(this.tile, this.startx, this.starty, this.width, this.height)
  }
}
