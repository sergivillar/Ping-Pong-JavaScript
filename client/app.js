window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60)
  }
})()

window.cancelRequestAnimFrame = (function () {
  return window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    clearTimeout
})()

let table = new Table()

function runAnimation (frameFunc) {
  let lastTime = null
  function frame (time) {
    let stop = false
    if (lastTime != null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000
      stop = frameFunc(timeStep) === false
    }
    lastTime = time
    if (!stop) requestAnimFrame(frame)
  }
  requestAnimFrame(frame)
}

function runGame (level, Display, andThen) {
  runAnimation(function (step) {
    table.reset()
    table.draw()

    if (table.mouse.x && table.mouse.y) table.players.map(player => player.act(step, table))
    table.ball.act(step, table)

    table.ball.draw(table.context)
    table.players.map(player => player.draw(table.context))
  })
}

runGame()
