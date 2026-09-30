const statusElement = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const resetAllBtn = document.getElementById('resetAllBtn');
const cells = document.querySelectorAll('.cell');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const winningLine = document.getElementById('winningLine');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

let scoreX = 0;
let scoreO = 0;

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    updateCell(clickedCell, clickedCellIndex);
    checkForWinner();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'x-color' : 'o-color');
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.innerHTML = `Player <span class="${currentPlayer === 'X' ? 'x-color' : 'o-color'}">${currentPlayer}</span>'s turn`;
}

function checkForWinner() {
    let win = null;

    // Direct conditional checking to verify rows, columns, and diagonals safely
    if (board[0] !== '' && board[0] === board[1] && board[1] === board[2]) win = { player: board[0], type: 'row', idx: 0 };
    else if (board[3] !== '' && board[3] === board[4] && board[4] === board[5]) win = { player: board[3], type: 'row', idx: 1 };
    else if (board[6] !== '' && board[6] === board[7] && board[7] === board[8]) win = { player: board[6], type: 'row', idx: 2 };
    
    else if (board[0] !== '' && board[0] === board[3] && board[3] === board[6]) win = { player: board[0], type: 'col', idx: 0 };
    else if (board[1] !== '' && board[1] === board[4] && board[4] === board[7]) win = { player: board[1], type: 'col', idx: 1 };
    else if (board[2] !== '' && board[2] === board[5] && board[5] === board[8]) win = { player: board[2], type: 'col', idx: 2 };
    
    else if (board[0] !== '' && board[0] === board[4] && board[4] === board[8]) win = { player: board[0], type: 'diag', idx: 0 };
    else if (board[2] !== '' && board[2] === board[4] && board[4] === board[6]) win = { player: board[2], type: 'diag', idx: 1 };

    if (win) {
        statusElement.innerHTML = `🏆 Player <span class="${win.player === 'X' ? 'x-color' : 'o-color'}">${win.player}</span> Wins!`;
        isGameActive = false;
        
        // Render and color the overlay strike line
        winningLine.className = `winning-line ${win.type}-${win.idx} ${win.player === 'X' ? 'x-bg' : 'o-bg'}`;
        
        updateScore(win.player);
        return;
    }

    if (!board.includes('')) {
        statusElement.textContent = '🤝 Game ended in a draw!';
        isGameActive = false;
        return;
    }

    changePlayer();
}

function updateScore(winner) {
    if (winner === 'X') {
        scoreX++;
        scoreXElement.textContent = scoreX;
    } else {
        scoreO++;
        scoreOElement.textContent = scoreO;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    statusElement.innerHTML = `Player <span class="x-color">X</span>'s turn`;
    winningLine.className = 'winning-line';
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x-color', 'o-color');
    });
}

function resetAll() {
    scoreX = 0;
    scoreO = 0;
    scoreXElement.textContent = '0';
    scoreOElement.textContent = '0';
    resetGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
resetAllBtn.addEventListener('click', resetAll);
