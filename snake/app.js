document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')

  // Populate initial grid
  for (let row = 0; row < 40; row++) {
    for (let col = 0; col < 30; col++) {
      const square = document.createElement('div')
      square.className = 'square'
      square.id = `${row}_${col}`
      grid.appendChild(square)
    }
  }

  const MAX_ROW = 39
  const MAX_COL = 29

  // Define variables
  let snake
  let direction
  let newBlock
  let timerId

  function drawSnake () {
    snake.forEach((position) => {
      const square = document.getElementById(`${position[0]}_${position[1]}`)
      square.classList.add('black')
    })
  }

  function generateRandom () {
    while (true) {
      const row = Math.floor(Math.random() * 40)
      const col = Math.floor(Math.random() * 30)
      const square = document.getElementById(`${row}_${col}`)
      if (square.classList.length === 1) {
        newBlock = [row, col]
        square.classList.add('grey')
        break
      }
    }
  }

  function moveSnake () {
    // Get last
    const last = snake.pop()

    // Get next
    const next = Array.from(snake[0])
    next[0] = next[0] + direction[0]
    next[1] = next[1] + direction[1]
    const nextSquare = document.getElementById(`${next[0]}_${next[1]}`)

    // Determine if we hit wall or ourselves
    if (!nextSquare || nextSquare.classList.contains('black')) {
      clearInterval(timerId)
      return window.alert('YOU LOST')
    }

    // Determine if we hit apple
    if (JSON.stringify(next) === JSON.stringify(newBlock)) {
      snake.push(last)
      generateRandom()
    } else {
      const square = document.getElementById(`${last[0]}_${last[1]}`)
      square.classList.remove('black')
    }
    snake.unshift(next)
    nextSquare.classList.remove('grey')
    nextSquare.classList.add('black')
  }

  function animateSnake () {
    timerId = setInterval(() => {
      moveSnake()
    }, 80)
  }

  function startGame () {
    snake = [[19, 14], [19, 15], [19, 16], [19, 17], [19, 18]]
    document.querySelectorAll('.square').forEach((square) => {
      square.classList.remove('grey')
      square.classList.remove('black')
    })
    direction = [0, -1]
    newBlock = null
    timerId = null
    drawSnake()
    generateRandom()
    animateSnake()
  }

  function changeDirection (event) {
    switch (event.keyCode) {
      case 37:
        if (direction[1] !== 1) direction = [0, -1]
        break
      case 38:
        if (direction[0] !== 1) direction = [-1, 0]
        break
      case 39:
        if (direction[1] !== -1) direction = [0, 1]
        break
      case 40:
        if (direction[0] !== -1) direction = [1, 0]
        break
    }
  }

  document.onkeyup = changeDirection
  document.getElementById('start').onclick = startGame
})
