import pieces from './pieces.js'

document.addEventListener('DOMContentLoaded', () => {
  const ROWS = 20
  const COLS = 10
  const COLORS = ['white', 'cyaan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red']
  const gridDOM = document.querySelector('#grid')
  const nextDOM = document.querySelector('#next')
  const scoreDOM = document.querySelector('#score')
  const levelDOM = document.querySelector('#level')

  // Initial grid
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const square = document.createElement('div')
      square.id = `${row}_${col}`
      square.classList.add('square')
      square.classList.add('white')
      gridDOM.appendChild(square)
    }
  }
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      const square = document.createElement('div')
      square.id = `next_${row}_${col}`
      square.classList.add('square')
      square.classList.add('white')
      nextDOM.appendChild(square)
    }
  }

  // Initial Values
  let renderedPiece = []
  let currentPiece
  let nextPiece = [Math.floor(Math.random() * 7), Math.floor(Math.random() * 4)]
  let currentPosition
  let score
  let grid
  let speed = 500
  let level = 1
  let piecesTotal = 0
  let timerId

  // Random Piece
  function setRandomPieces () {
    renderedPiece = []
    currentPiece = Array.from(nextPiece)
    nextPiece = [Math.floor(Math.random() * 7), Math.floor(Math.random() * 4)]
    renderNext()
    currentPosition = [0, Math.floor((10 - pieces[currentPiece[0]][currentPiece[1]][0].length) / 2)]
    piecesTotal++
    if (piecesTotal % 20 === 0 && level < 30) {
      level++
      speed = 500 - (level * 15)
      levelDOM.innerHTML = level
      clearInterval(timerId)
      movePiece()
    }
  }

  // Render next piece
  function renderNext () {
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 4; col++) {
        const square = document.getElementById(`next_${row}_${col}`)
        square.classList.remove(...square.classList)
        square.classList.add('square')
        square.classList.add('white')
      }
    }

    const piece = pieces[nextPiece[0]][0]
    for (let row = 0; row < piece.length; row++) {
      for (let col = 0; col < piece[0].length; col++) {
        const color = piece[row][col]
        if (color) {
          const square = document.getElementById(`next_${1 - row}_${col}`)
          square.classList.remove(...square.classList)
          square.classList.add('square')
          square.classList.add(COLORS[color])
        }
      }
    }
  }

  // Reset grid
  function resetBoard () {
    grid = new Array(ROWS).fill(0).map(() => new Array(COLS).fill(0))
    score = 0
    level = 1
    speed = 500
    piecesTotal = 0
    scoreDOM.innerHTML = score
    levelDOM.innerHTML = level
    setRandomPieces()
  }

  // Render grid
  function renderGrid () {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const square = document.getElementById(`${row}_${col}`)
        square.classList.remove(...square.classList)
        square.classList.add('square')
        square.classList.add(COLORS[grid[row][col]])
      }
    }
  }

  // Put the current piece on grid
  function renderPiece () {
    // Remove previously rendered
    if (renderedPiece.length > 0) {
      for (let i = 0; i < renderedPiece.length; i++) {
        grid[renderedPiece[i][0]][renderedPiece[i][1]] = 0
      }
    }
    renderedPiece = []

    // Render new piece
    const piece = pieces[currentPiece[0]][currentPiece[1]]
    for (let row = 0; row < piece.length; row++) {
      for (let col = 0; col < piece[0].length; col++) {
        const color = piece[row][col]
        if (color && currentPosition[0] - row >= 0) {
          renderedPiece.push([currentPosition[0] - row, currentPosition[1] + col])
          if (grid[currentPosition[0] - row][currentPosition[1] + col] !== 0) {
            finished()
          } else {
            grid[currentPosition[0] - row][currentPosition[1] + col] = color
          }
        }
      }
    }
  }

  // Move Piece Down
  function moveDown () {
    if ((currentPosition[0] + 1 === ROWS)) {
      checkRows()
      setRandomPieces()
    } else {
      if (checkNext([1, 0])) {
        // Move piece down
        currentPosition = [currentPosition[0] + 1, currentPosition[1]]
      } else {
        // Choose new piece
        checkRows()
        setRandomPieces()
      }
    }
    renderPiece()
    renderGrid()
  }

  // Check next position
  function checkNext (offset) {
    const piece = pieces[currentPiece[0]][currentPiece[1]]
    for (let row = 0; row < piece.length; row++) {
      for (let col = 0; col < piece[0].length; col++) {
        const color = piece[row][col]
        const newPosition = [currentPosition[0] + offset[0] - row, currentPosition[1] + col + offset[1]]
        const match = renderedPiece.filter((pos) => {
          return JSON.stringify(pos) === JSON.stringify(newPosition)
        })
        if (color && (newPosition[0] >= 0) && match.length === 0 &&
          grid[newPosition[0]][newPosition[1]] !== 0) {
          return false
        }
      }
    }
    return true
  }

  // Move piece
  function movePiece () {
    timerId = setInterval(() => {
      moveDown()
    }, speed)
  }

  function checkRows () {
    let rowsRemoved = 0
    for (let i = ROWS - 1; i >= 0; i--) {
      if (!grid[i].includes(0)) {
        grid.splice(i, 1)
        rowsRemoved++
      }
    }
    for (let i = 0; i < rowsRemoved; i++) {
      grid.unshift(new Array(COLS).fill(0))
    }
    if (rowsRemoved === 4) {
      score += 1000
    } else {
      score += (rowsRemoved * 200)
    }
    scoreDOM.innerHTML = score
    renderGrid()
  }

  // Start Game
  function start () {
    resetBoard()
    movePiece()
  }

  // Finished game
  function finished () {
    clearInterval(timerId)
    window.alert('Game Finished')
  }

  function changeDirection (event) {
    switch (event.keyCode) {
      case 37:
        // Left
        if (currentPosition[1] > 0 && checkNext([0, -1])) {
          currentPosition = [currentPosition[0], currentPosition[1] - 1]
          renderPiece()
          renderGrid()
        }
        break
      case 38:
        // Up
        const next = currentPiece[1] + 1 > 3 ? 0 : currentPiece[1] + 1
        currentPiece = [currentPiece[0], next]
        renderPiece()
        renderGrid()
        break
      case 39:
        // Right
        if (currentPosition[1] < (COLS - pieces[currentPiece[0]][currentPiece[1]][0].length) &&
          checkNext([0, 1])) {
          currentPosition = [currentPosition[0], currentPosition[1] + 1]
          renderPiece()
          renderGrid()
        }
        break
      case 40:
        // Down
        moveDown()
        break
    }
  }

  document.onkeydown = changeDirection
  document.getElementById('start').onclick = start
})

/**
 * Scoring
 * Clear 1 line = 100 points
 * Clear 2 lines = 200 points
 * Clear 3 lines = 600 points
 * Tetris = 1000 points
 */

/**
 * Key controls
 * Up arrow = turn piece
 * Right arrow = move piece right
 * Left arrow =  move piece left
 * Down arrow = soft drop
 * Space bar = hard drop
 */

/**
  * Board 40 x 10
  * Start/stop button
  * Next piece
  * Score
  * 7 Pieces
  * Starting speed 500
  */
