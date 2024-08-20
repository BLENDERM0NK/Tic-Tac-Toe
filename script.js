let gameText = document.querySelector('#gameText')
let restartBtn = document.querySelector('#restartBtn')
let boxes = Array.from(document.querySelectorAll('.box'))
let gameOn = true;
let clickCount = 0


const PLAYER_O = "O"
const PLAYER_X = "X"
let currentPlayer = PLAYER_O;
let array = Array(9).fill(null) // Creating an array to store the "X" or "O"

// Adding Event Listener to the all the boxes
const startGame = () => {
    boxes.forEach(box => {
        box.addEventListener('click', handleClick)
    })
}

const handleClick = (e) =>{
    const id = e.target.id // Storing id of individual box 

    if(!array[id] && gameOn){ // Box should null and game should be on
        array[id] = currentPlayer // Inserting "X" or "O" in array based on id of box
        e.target.innerHTML = currentPlayer

        if(isPlayerWon() !== false){ // If isPlayerWon returns other than false
            gameText.innerHTML = `${currentPlayer} Has Won!`
            gameOn = false
            let winnerCombination = isPlayerWon() // Storing the winning combination id to add color to that pattern
            winnerCombination.map(box => { // Adding color by mapping combination
                boxes[box].style.backgroundColor = "green"
                return
            })
        }
        clickCount++
        currentPlayer = currentPlayer == PLAYER_X ? PLAYER_O : PLAYER_X // Changing player after each move
    }
    if(clickCount === 9 && !isPlayerWon()){ // If no one won then all boxes will become red and message will be displayed draw
        boxes.forEach(box => {
            box.style.backgroundColor = "red"
        })
        gameText.innerHTML = "Draw"
    }
}

const winningCombinations = [ // All possible winning pattern
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const isPlayerWon = () => {
    for(const combination of winningCombinations){
        let a = combination[0]
        let b = combination[1]
        let c = combination[2]

        if(array[a] && (array[a] == array[b] && array[a] == array[c])) { // Returning combination after comparing with array
            return [a,b,c]
        }
    }
    return false
}


// Resting every thing to original form whenever restart button got clicked
const restart = () => {
    array.fill(null)
    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })

    currentPlayer = PLAYER_X
    gameOn = true
    clickCount = 0
    gameText.innerHTML = 'TIC TAC TOE'
}

restartBtn.addEventListener('click', restart)

startGame()

