const square = document.querySelectorAll('.square')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')

let result = 0
let currentTime = timeLeft.textContent
let timerId = null
let hitPosition = null

function randomSquare () {
  square.forEach(className => {
    className.classList.remove('mole')
  })
  const randomPosition = square[Math.floor(Math.random() * 9)]
  randomPosition.classList.add('mole')

  // assign the id of the randomPosition to hitPosition for us to use later
  hitPosition = randomPosition.id
}

square.forEach(id => {
  id.addEventListener('mouseup', () => {
    if (id.id === hitPosition) {
      result = result + 1
      score.textContent = result
      hitPosition = null
    }
  })
})

function moveMole () {
  timerId = setInterval(randomSquare, 500)
}

moveMole()

function countDown () {
  currentTime--
  timeLeft.textContent = currentTime

  if (currentTime === 0) {
    clearInterval(timerId)
    clearInterval(countDownId)
    window.alert('GAME OVER! Your final score is' + result)
  }
}

const countDownId = setInterval(countDown, 1000)
