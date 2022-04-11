function init() {
  
  // ? elements
  //grid container
  const grid = document.querySelector('#grid')
  const spanScoreCroatia = document.querySelector('#croatia-score')
  const spanScoreEngland = document.querySelector('#england-score')
  const startButton = document.querySelector('#start')
  const endButton = document.querySelector('#end')
  const timer = document.querySelector('#timer')


  // GRID 12x9
  const width = 12
  const height = 9
  const cellCount = height * width
  const cells = [] //array which holds all cells
  let countTimer
  let liveTimeTimer
  const time = 500

  // ? Create Grid

  function createGrid () {
    // create all grid cells
    // add cells to array
    // append cells to grid
    for (let i = 0; i < cellCount; i++) {
      // create cell
      const cell = document.createElement('div')
      cell.innerText = i
      cell.id = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    addKovacic(kovacicStartPosition)
    addEnglishPlayer(englishPlayerPosition[0])
    addEnglishPlayer(englishPlayerPosition[1])
    addEnglishPlayer(englishPlayerPosition[2])
    addEnglishPlayer(englishPlayerPosition[3])
    addEnglishPlayer(englishPlayerPosition[4])
    addEnglishPlayer(englishPlayerPosition[5])
    addEnglishPlayer(englishPlayerPosition[6])
    addEnglishPlayer(englishPlayerPosition[7])
    addEnglishPlayer(englishPlayerPosition[8])
    addEnglishPlayer(englishPlayerPosition[9])
    addEnglishPlayer(englishPlayerPosition[10])
    addGoalLeft(goalLeftStartingPosition)
    addGoalRight(goalRightStartingPosition)
  }

  function liveTime() {
    // 1. extract innerHTML and turn it into numbers
    let currentTime = timer.innerHTML
    // 2. separate the two numbers
    const currentTimeArray = currentTime.split(':')
    // create variables for each number
    let mili = parseInt(currentTimeArray[1])
    let sec = parseInt(currentTimeArray[0])
    // 3. increment the right side (milliseconds) by 10 every 0.1 second
    if (mili < 50) {
      mili += 10
    } 
    // 4. increment left side (seconds) by 1 every second.
    else {
      mili = 0
      sec += 1
    }
    // 5. update innerHTML as a string
    timer.innerHTML = `${sec.toString()}:${mili.toString()}`
    // 6. end at 90
    if (sec >= 5) {
      endGame()
    }
  }

  function startGame() {
    document.addEventListener('keydown', executeKeyDown) 
    startButton.disabled = true
    endButton.disabled = false

    liveTimeTimer = setInterval(liveTime, 100)

    clearInterval(countTimer)
    countTimer = setInterval(() => {
      // console.log('setInterval check')
      for (let i = 0; i < englishPlayerPosition.length; i++) {
        let currentDefenderPosition = englishPlayerPosition[i]

        removeEnglishPlayer(currentDefenderPosition)

        if (i === 0) {
          // accessing goalkeeper
          // console.log(`moving goalkeeper. currentDefenderPosition: ${currentDefenderPosition}`)
          currentDefenderPosition = (currentDefenderPosition === 17 ? 18 : 17)
        } else if (i > 0 && i < 5) {
          //accessing defensive line
          // console.log('defensive line active')
          if (currentDefenderPosition % 3 === 1) {
            currentDefenderPosition += (Math.floor(Math.random() * 2) === 0) ? -1 : 1
            // accessing central defender position to randomly move right or left
          } else if (currentDefenderPosition % 3 === 0) {
            //left position - send player right
            currentDefenderPosition += 1
          } else if (currentDefenderPosition % 3 === 2) {
            // right position - send player left
            currentDefenderPosition -= 1
          }
        } else {
          // accessing mids and forwards who are both in a line of 3.
          if (currentDefenderPosition % 4 === 1) {
            currentDefenderPosition += (Math.floor(Math.random() * 2) === 0) ? -1 : 1
          } else if (currentDefenderPosition % 4 === 2) {
            currentDefenderPosition += (Math.floor(Math.random() * 2) === 0) ? -1 : 1
          } else if (currentDefenderPosition % 4 === 0) {
            currentDefenderPosition += 1
          } else if (currentDefenderPosition % 4 === 3) {
            currentDefenderPosition -= 1
          }
        }
        englishPlayerPosition[i] = currentDefenderPosition              
        addEnglishPlayer(currentDefenderPosition)
      }
      collision()
    }, time)
  }

  function endGame () {
    document.removeEventListener('keydown', executeKeyDown)
    endButton.disabled = true
    startButton.disabled = false
    window.alert(`the final score, Croatia: ${spanScoreCroatia.innerHTML} England: ${spanScoreEngland.innerHTML}`)
    spanScoreCroatia.innerHTML = 0
    spanScoreEngland.innerHTML = 0
    clearInterval(countTimer)
    clearInterval(liveTimeTimer)
    removeKovacic(kovacicCurrentPosition)
    kovacicCurrentPosition = kovacicStartPosition
    addKovacic(kovacicCurrentPosition)
    timer.innerHTML = '00:00'
  }


  // characters
  const kovacicClass = 'kovacic'
  const kovacicStartPosition = 101
  let kovacicCurrentPosition = kovacicStartPosition

  const englishPlayersClass = 'english-players'
  const englishPlayerPosition = []
  englishPlayerPosition[0] = 17
  englishPlayerPosition[1] = 37
  englishPlayerPosition[2] = 40
  englishPlayerPosition[3] = 43
  englishPlayerPosition[4] = 46
  englishPlayerPosition[5] = 62
  englishPlayerPosition[6] = 66
  englishPlayerPosition[7] = 70
  englishPlayerPosition[8] = 85
  englishPlayerPosition[9] = 89
  englishPlayerPosition[10] = 93

  const goalClassLeft = 'goal-left'
  const goalLeftStartingPosition = 5
  const goalClassRight = 'goal-right'
  const goalRightStartingPosition = 6

  // Add and remove character functions
  function addKovacic(position) {
    cells[position].classList.add(kovacicClass)
  }

  function removeKovacic(position) {
    cells[position].classList.remove(kovacicClass)
  }

  function addEnglishPlayer(position) {
    cells[position].classList.add(englishPlayersClass)
  }

  function removeEnglishPlayer(position) {
    cells[position].classList.remove(englishPlayersClass)
  }

  function addGoalLeft(position) {
    cells[position].classList.add(goalClassLeft)
  }

  function addGoalRight(position) {
    cells[position].classList.add(goalClassRight)
  }

  // ? Execution

  // 

  // executed on 'keydown'
  // when a key is pressed Kovacic will move in that direction
  //disable leaving the grid
  function executeKeyDown(event) {
    const key = event.keyCode
    console.log(key)
    const left = 37
    const up = 38
    const right = 39
    const down = 40

    removeKovacic(kovacicCurrentPosition)

    if (key === left && kovacicCurrentPosition % width !== 0) {
      kovacicCurrentPosition--
    } else if (key === up && kovacicCurrentPosition >= width) {
      kovacicCurrentPosition -= 12
    } else if (key === right && kovacicCurrentPosition % width !== width - 1) {
      kovacicCurrentPosition++
    } else if (key === down && kovacicCurrentPosition < width * 8) {
      kovacicCurrentPosition += 12
    } else if (key !== left && key !== up && key !== right && key !== down) {
      window.alert('FOUL! - please use only up, down, right or left arrow keys')
      kovacicCurrentPosition = kovacicStartPosition
      addKovacic(kovacicCurrentPosition)
    } else {
      window.alert('ball out of play! - You have been returned to the start position')
      kovacicCurrentPosition = kovacicStartPosition
      addKovacic(kovacicCurrentPosition)
    }

    addKovacic(kovacicCurrentPosition)
    collision()
    croatiaScore()
  }

  // add function for collision
  function collision() {
    for (let i = 0; i < englishPlayerPosition.length; i++) {
      if (englishPlayerPosition[i] === kovacicCurrentPosition) {
        spanScoreEngland.innerHTML = parseInt(spanScoreEngland.innerHTML) + 1
        window.alert('Goal for England!')
        removeKovacic(kovacicCurrentPosition)
        kovacicCurrentPosition = kovacicStartPosition
        addKovacic(kovacicStartPosition)
      }
    }
  }

  function croatiaScore() {
    if (kovacicCurrentPosition === 5 || kovacicCurrentPosition === 6) {
      spanScoreCroatia.innerHTML = parseInt(spanScoreCroatia.innerHTML) + 1
      removeKovacic(kovacicCurrentPosition)
      window.alert('Goal for Croatia!')
      kovacicCurrentPosition = kovacicStartPosition
      addKovacic(kovacicCurrentPosition)
    }
  }

  // Disabling screen from scrolling up and down when pressing arrow keys
  // used this code from a google search = https://social.msdn.microsoft.com/Forums/en-US/3a66e3ce-df06-4309-b047-64cf7aa5ffec/how-to-disable-scroll-bar-moving-when-arrow-key-press-down?forum=asphtmlcssjavascript

  document.onkeydown = cancelArrowKeys


  function cancelArrowKeys(e) {
    try {
      const e = window.event || e


      const key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0


      if (key === 37 || key === 38 || key === 39 || key === 40) {
        if (key === 13)
          document.getElementById('<%=btnFightPokemon.ClientID%>').click()
        if (key === 37)
          document.getElementById('<%=ImgBtnWest.ClientID%>').click()
        if (key === 38)
          document.getElementById('<%=ImgBtnNorth.ClientID%>').click()
        if (key === 39)
          document.getElementById('<%=ImgBtnEast.ClientID%>').click()
        if (key === 40)
          document.getElementById('<%=ImgBtnSouth.ClientID%>').click()

        event.returnValue = false
      }
    } catch (Exception) {
      return false
    }

  }

  // ? events
  

  // key press event (using keydown for rapid acceleration
  createGrid()
  startButton.addEventListener('click', startGame)
  endButton.addEventListener('click', endGame)
}


document.addEventListener('DOMContentLoaded', init)


// ? -------------solved issues and remaining issues------------------

// * SOLVED

// * function to run game
// * just move defenders using remove and add functions using setInterval method
// * refactor englishPlayerPosition[i] = currentDefenderPosition to one line rather than after every if statement.
// * refactor appicable code to ternary function.
// * Croatia score - add to spanScoreCroatia.innerHTML
// * hook up start buttons - disable start button after pressed
// * end button function to end game and allow for restart using start button - end button disabled until start button pressed
// * startGame function - (fixed by disabling start button after until end Game button is pressed) when doing it second time around the grid updates x2.
// * After endGame(), removeKovacic and addKovacic to starting position
// * prevent screen from moving up and down when pressing arrow keys for kovacic to move - USED code from web - https://social.msdn.microsoft.com/Forums/en-US/3a66e3ce-df06-4309-b047-64cf7aa5ffec/how-to-disable-scroll-bar-moving-when-arrow-key-press-down?forum=asphtmlcssjavascript
// * added window alerts for Croatia or England scoring and return Kovacic to starting position
// * removeKovacic - else condition for ball going out of play not working (fixed by changing else if statement from || to &&)
// * disable Kovacic from moving before starting game
// * Create an internal timer for 90 minutes


// ? PENDING

// ? croatiaScore() - turn if statement into ternary - NO NEED for it as if statement has other conditions attached
// ? refactor collision() to be forEach() = google javascript turn for loop into forEach - Doesn't seem to work, can't figure out why yet.

// ! REMAINING ISSUES:

// ! Create a displayed timer
// ! Offer 3 levels of play - where setInterval is 700, 500, 300 for amateur, professional, world class respectively.
// ! start styling the CSS

