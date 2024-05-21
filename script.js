// script.js

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    const scoreXElement = document.getElementById('scoreX');
    const scoreOElement = document.getElementById('scoreO');

    let isXTurn = true;
    let board = ['', '', '', '', '', '', '', '', ''];
    let scoreX = 0;
    let scoreO = 0;

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWin() {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return { winner: board[a], pattern };
            }
        }
        return null;
    }

    function handleClick(e) {
        const index = e.target.dataset.index;
        if (board[index] !== '') return;

        board[index] = isXTurn ? 'X' : 'O';
        e.target.textContent = board[index];
        const result = checkWin();
        if (result) {
            const { winner, pattern } = result;
            pattern.forEach(i => cells[i].classList.add('win'));
            if (winner === 'X') {
                scoreX++;
                scoreXElement.textContent = scoreX;
            } else {
                scoreO++;
                scoreOElement.textContent = scoreO;
            }
            setTimeout(resetGame, 2000);
        } else if (!board.includes('')) {
            alert("It's a draw!");
            setTimeout(resetGame, 2000);
        } else {
            isXTurn = !isXTurn;
        }
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('win');
        });
        isXTurn = true;
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetButton.addEventListener('click', resetGame);
});
