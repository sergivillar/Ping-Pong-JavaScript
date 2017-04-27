class Table {
  constructor (player1, player2) {
    this.canvas = document.getElementById('canvas')
    this.context = this.canvas.getContext('2d')
    this.width = this.canvas.width
    this.height = this.canvas.height

    this.wallWidth = 5
    this.maxBounceAngle = 75
    this.maxBallSpeed = 400

    this.mouse = { x: 0, y: 0 }
    this.canvas.addEventListener('mousemove', this.trackPosition.bind(this))

    this.players = [new Player(0, this.height / 2), new Player(this.width, this.height / 2)]
    this.ball = new Ball(this.width / 2, this.height / 2, 10, this.maxBallSpeed / 2, this.maxBallSpeed / 2)
    this.status = 'play'
  }

  draw () {
    this.context.beginPath()
    this.context.strokeStyle = 'black'
    this.context.lineWidth = this.wallWidth
    this.context.moveTo(0, 0)
    this.context.lineTo(this.width, 0)
    this.context.lineTo(this.width, this.height)
    this.context.lineTo(0, this.height)
    this.context.closePath()
    this.context.stroke()

    this.context.beginPath()
    this.context.lineWidth = this.wallWidth / 2
    this.context.moveTo(this.width / 2, 0)
    this.context.lineTo(this.width / 2, this.height)
    this.context.stroke()
  }

  trackPosition (event) {
    this.mouse.x = event.clientX
    this.mouse.y = event.clientY
  }

  reset () {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  playerAt (ball) {
    let bx1 = ball.pos.x - ball.radius
    let bx2 = ball.pos.x + ball.radius
  
    for (let i = 0; i < this.players.length; i++) {
      let other = this.players[i]
      if (bx1 < other.pos.x + other.size.x &&
        bx2 > other.pos.x &&
        ball.pos.y + ball.radius > other.pos.y &&
        ball.pos.y < other.pos.y + other.size.y) return other
    }
  }

  obstacleAt (newPos) {
    if ((newPos.y < this.wallWidth) || (newPos.y > this.height - this.wallWidth)) return 'wall'
    if ((newPos.x < this.wallWidth) || (newPos.x > this.width - this.wallWidth)) return 'lose'
  }

  hitBall (player, ball) {
    let relativeIntersectY = player.pos.y - ball.pos.y
    let normalizedRelativeIntersectionY = (relativeIntersectY / (player.size.y / 2))
    let bounceAngle = normalizedRelativeIntersectionY * this.maxBounceAngle

    console.log(relativeIntersectY)

    //ball.speed = new Vector(this.maxBallSpeed * Math.cos(bounceAngle), this.maxBallSpeed * -Math.sin(bounceAngle))
    ball.speed= ball.speed.times(-1)
    if (player.pos.x > this.width / 2) {
      ball.x = player.pos.x - ball.radius
    } else {
      ball.x = player.size.x + ball.radius
    }
  }

  addPoint (ball) {
    let player = this.players.filter(player => {
      return Math.abs((player.pos.x - ball.pos.x)) > (this.width / 2)
    })
    player[0].points += 1
    this.resetGame()
  }

  resetGame () {
    let randomDirection = [-1, 1]
    this.ball.resetPosition(this.width / 2, this.height / 2,
      200 * randomDirection[Math.floor(Math.random() * randomDirection.length)],
      200 * randomDirection[Math.floor(Math.random() * randomDirection.length)]
    )
  }
}
