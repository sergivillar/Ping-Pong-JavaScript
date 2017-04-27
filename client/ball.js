class Ball {
  constructor (x, y, radius, vx, vy) {
    this.pos = new Vector(x, y)
    this.speed = new Vector(vx, vy)
    this.radius = radius
  }

  resetPosition (x, y, vx, vy) {
    this.pos = new Vector(x, y)
    this.speed = new Vector(vx, vy)
  }

  draw (context) {
    context.beginPath()
    context.fillStyle = 'blue'
    context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI)
    context.fill()
  }

  act (step, table) {
    let newPos = this.pos.plus(this.speed.times(step))
    let obstable = table.obstacleAt(newPos)
    if (!obstable) this.pos = newPos
    else if (obstable === 'wall') this.speed.y *= -1
    else if (obstable === 'lose') table.addPoint(this)

    let playerTouched = table.playerAt(this)
    if (playerTouched) table.hitBall(playerTouched, this, table)
  }
}
