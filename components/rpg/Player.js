export default class Player {
  constructor(tileWidth, tileHeight, scale, x = 470, y = 355) {
    this.direction = 'front'
    this.action = 'still'
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
    this.x = x
    this.y = y
    this.anim = 0
    this.scale = scale
  }

  update(keys, elapsed) {
    // Update actions? You need to use elapsed somehow
    this.anim += elapsed
    if (keys['w'] && this.y > 0) {
      this.direction = 'back'
      if (this.anim > 50) {
        this.anim = 0
        this.action =
          this.action === 'still' ? '1' : this.action === '1' ? '2' : 'still'
      } else this.action = 'still'
      this.y += -0.1 * elapsed
    } else if (keys['s']) {
      this.direction = 'front'
      if (this.anim > 50) {
        this.anim = 0
        this.action =
          this.action === 'still' ? '1' : this.action === '1' ? '2' : 'still'
      }
      this.y += 0.1 * elapsed
    }
    if (keys['a'] && this.x > 0) {
      this.direction = 'left'
      if (this.anim > 50) {
        this.anim = 0
        this.action = this.action === 'still' ? '' : 'still'
      }
      this.x += -0.1 * elapsed
    } else if (keys['d']) {
      this.direction = 'right'
      if (this.anim > 50) {
        this.anim = 0
        this.action = this.action === 'still' ? '' : 'still'
      }
      this.x += 0.1 * elapsed
    }
  }

  draw(canvas, ctx) {
    let avatar = new Image()
    avatar.src = `/luna/luna_${this.direction}_walking${
      this.action ? '_' + this.action : ''
    }.png`
    avatar.onload = () => {
      ctx.drawImage(
        avatar,
        0,
        0,
        this.tileWidth,
        this.tileHeight,
        this.x,
        this.y,
        this.tileWidth * this.scale,
        this.tileHeight * this.scale
      )
    }
  }
}
