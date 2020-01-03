import Snake from './Snake'
import Apple from './Apple'

const canvas = document.getElementById('canvas')

const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40

const snake = new Snake()
const apple = new Apple()

const CANVAS_HEIGHT = 600
const CANVAS_WIDTH = 600

const CANVAS_COLS = 30
const CANVAS_ROWS = 30

canvas.height = CANVAS_HEIGHT
canvas.width = CANVAS_WIDTH

const CELL_HEIGHT = CANVAS_HEIGHT / CANVAS_ROWS
const CELL_WIDTH = CANVAS_WIDTH / CANVAS_COLS

const ctx = canvas.getContext('2d')

const initialDraw = () => {
  ctx.fillStyle = 'black'
  for (let i = 0; i < CANVAS_HEIGHT; i += CELL_HEIGHT) {
    for (let j = 0; j < CANVAS_WIDTH; j += CELL_WIDTH) {
      ctx.fillRect(i, j, CELL_WIDTH, CELL_HEIGHT)
    }
  }
}

const removeApple = () => {
  const [x, y] = apple.getLocation()
  ctx.fillStyle = 'black'
  ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT)
}

const setApple = () => {
  if (apple.getLocation) {
    removeApple()
  }
  const x = Math.floor(Math.random() * CANVAS_COLS) * CELL_WIDTH
  const y = Math.floor(Math.random() * CANVAS_ROWS) * CELL_HEIGHT
  apple.setLocation(x, y)
  ctx.fillStyle = 'red'
  ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT)
}

const initializeSnake = () => {
  const x = 0
  const y = 0
  snake.setBody([[x, y]])
  ctx.fillStyle = 'green'
  ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT)
}

function moveInDirection(dir) {
  const [x, y] = snake.body[0]
  let newLocation
  switch (dir) {
    case LEFT:
      if (previousDirection === RIGHT) gameOver()

      newLocation = [x - CELL_WIDTH, y]
      if (!snake.body.every(loc => loc.toString() !== newLocation.toString())) {
        gameOver('you hit yourself')
      } else {
        console.log('youre fine')
      }
      snake.body.unshift(newLocation)
      break
    case RIGHT:
      if (previousDirection === LEFT) gameOver()

      newLocation = [x + CELL_WIDTH, y]
      if (!snake.body.every(loc => loc.toString() !== newLocation.toString())) {
        gameOver('you hit yourself')
      } else {
        console.log('youre fine')
      }
      snake.body.unshift(newLocation)
      break
    case UP:
      if (previousDirection === DOWN) gameOver()

      newLocation = [x, y - CELL_HEIGHT]
      if (!snake.body.every(loc => loc.toString() !== newLocation.toString())) {
        gameOver('you hit yourself')
      } else {
        console.log('youre fine')
      }
      snake.body.unshift(newLocation)
      break
    case DOWN:
      if (previousDirection === UP) gameOver()

      newLocation = [x, y + CELL_HEIGHT]
      if (!snake.body.every(loc => loc.toString() !== newLocation.toString())) {
        gameOver('you hit yourself')
      } else {
        console.log('youre fine')
      }
      snake.body.unshift(newLocation)
      break
    default:
  }
  previousDirection = direction
  drawSnake()
}

const gameOver = (str = 'game over') => {
  clearInterval(mainInterval)
  ctx.font = '50px Dank Mono'
  ctx.fillStyle = 'yellow'
  ctx.fillText(str, 10, 50)
}
const drawSnake = () => {
  const dupes = snake.body.reduce(loc => {
    return loc.toString() === snake.body[0].toString() ? 1 : 0
  }, 0)

  console.log('dupes', dupes)

  if (dupes > 1) gameOver('you hit yourself')

  const [snakeX, snakeY] = snake.body[0]
  const [appleX, appleY] = apple.location

  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX > CANVAS_WIDTH ||
    snakeY > CANVAS_HEIGHT
  )
    gameOver()
  if (snakeX === appleX && snakeY === appleY) {
    setApple()
  } else {
    ctx.fillStyle = 'black'
    const [x, y] = snake.body[snake.body.length - 1]
    ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT)

    snake.body = [...snake.body.slice(0, -1)]
  }

  ctx.fillStyle = 'green'
  for (let [x, y] of snake.body) {
    ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT)
  }
}

const updateScore = () => {
  document.getElementById('score').innerHTML = snake.body.length
}
initialDraw()
setApple()
initializeSnake()
updateScore(1)
let previousDirection = null
let direction = DOWN

let mainInterval = setInterval(() => {
  moveInDirection(direction)
  updateScore()
}, 75)

document.addEventListener('keydown', evt => {
  direction = evt.keyCode
})