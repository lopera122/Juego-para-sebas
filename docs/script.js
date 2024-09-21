const gameBoard = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restartBtn');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function createBoard() {
    board.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.setAttribute('data-index', index);
        cellDiv.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cellDiv);
    });
}

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (board[index] !== '' || !isGameActive) return;
    board[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkResult() {
    let roundWon = false;
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] === '' || board[b] === '' || board[c] === '') continue;
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        alert(`Jugador ${currentPlayer} ha ganado!`);
        isGameActive = false;
        return;
    }
    if (!board.includes('')) {
        alert('¡Es un empate!');
        isGameActive = false;
    }
}

restartBtn.addEventListener('click', restartGame);

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    gameBoard.innerHTML = '';
    createBoard();
}

createBoard();
