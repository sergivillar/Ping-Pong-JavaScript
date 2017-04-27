class Player {
  constructor(x, y) {
    this.size = new Vector(10, 100)
    x = (x === 0) ? 0 : x - this.size.x
    this.pos = new Vector(x, y - (this.size.y / 2))
    this.points = 0
  }

  draw (context) {
    context.beginPath()
    context.fillStyle = '#53973f'
    context.rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
    context.fill()

    context.fillStlye = 'white'
    context.font = '16px Arial, sans-serif'
    context.textAlign = 'left'
    context.textBaseline = 'top'
    context.fillText('Score: ' + this.points, (this.pos.x === 0) ? this.pos.x + 40 : this.pos.x - 100, 20)
  }

  act (step, table) {
    // TODO: añadir limites para mantener el jugador dentro del campo
    let newPos = new Vector(this.pos.x, table.mouse.y - this.size.y / 2)
    // let obstable = table.obstacleAt(newPos)
    this.pos = newPos
  }
}
