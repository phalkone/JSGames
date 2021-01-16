document.addEventListener('DOMContentLoaded', () => {
  let turn = 'red'
  let ended = false
  const currentPlayer = document.getElementById('current-player')

  const grid = document.querySelector('.grid')
  for (let row = 5; row >= 0; row--) {
    for (let col = 0; col < 7; col++) {
      const square = document.createElement('div')
      square.className = 'square white'
      square.classList.add(`r${row}`)
      square.classList.add(`c${col}`)
      square.classList.add(`d${row + col}`)
      square.classList.add(`e${col - row}`)
      square.id = `${row}_${col}`
      square.onclick = addDisc
      grid.appendChild(square)
    }
  }

  function addDisc (event) {
    if (ended) return
    const col = event.target.id.split('_').map(Number)[1]
    for (let i = 0; i < 6; i++) {
      const disc = document.getElementById(`${i}_${col}`)
      if (!disc.classList.contains('white')) continue

      // Add disc
      disc.classList.remove('white')
      disc.classList.add(turn)

      // Check if 4 in a row
      if (checkWinner(turn, i, col)) {
        ended = true
        const winner = turn
        setTimeout(function () {
          window.alert(`${winner.toUpperCase()} WON!`)
        }, 100)
      }

      // Switch turns
      turn = turn === 'red' ? 'blue' : 'red'
      currentPlayer.innerHTML = turn
      break
    }
  }

  function checkWinner (color, row, col) {
    const directions = [`r${row}`, `c${col}`, `d${row + col}`, `e${col - row}`]
    for (let i = 0; i < 4; i++) {
      const discs = document.getElementsByClassName(directions[i])
      const mapped = [...discs].map((disc) => {
        if (disc.classList.contains('white')) return 'W'
        if (disc.classList.contains('blue')) return 'B'
        if (disc.classList.contains('red')) return 'R'
      }).join('')
      if (new RegExp(color.charAt(0).toUpperCase().repeat(4)).test(mapped)) {
        return true
      }
    }
    return false
  }
})
