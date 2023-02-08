const statusDisplay = document.querySelector('.game-status');
const cell = document.querySelectorAll('.cell');


let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            console.log(winCondition);
            for (let j = 0; j <= winCondition.length; j++) {
                let index = winCondition[j];
                let winCell = document.getElementById(`${index}`);
                console.log(index);
                winCell.classList.add('win');
            };
            roundWon = true;
            console.log(winningMessage());
            break

        }

    }

    if (roundWon === true) {
        console.log(winningMessage());
        statusDisplay.innerHTML = winningMessage();
        gameActive = false; 
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    for (let z = 0; z <= 7; z++) {
    let list = document.getElementById(`${z}`);
    list.classList.remove('win');
    }
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

            // switch(roundWon){
            //     case 0:
            //         console.log(winningWays[0])
            //     break;
            //     case 1:
            //         console.log(winningWays[1])
            //     break;
            //     case 2:
            //         console.log(winningWays[2])
            //     break;
            //     case 3:
            //         console.log(winningWays[3])
            //     break;
            //     case 4:
            //         console.log(winningWays[4])
            //     break;
            //     case 5:
            //         console.log(winningWays[5])
            //     break;
            //     case 6:
            //         console.log(winningWays[6])
            //     break;
            //     case 7:
            //         console.log(winningWays[7])
            //     break;
            //     case 8:
            //         console.log(winningWays[8])
            //     break;
            //     default:
            //         return;
            // }

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);
 