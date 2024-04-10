const gameBoard = (function () {
    let board = ['.','-','!','#',' ','^','*','_','+'];

    const get = () => {
        return board;
    }

    const display = () => {
        for (let i = 0; i<9; i+=3) {
            console.log(`${board[i]} | ${board[i+1]} | ${board[i+2]}`)
        }
    }

    const changeCell = (position, shape) => {
        board[position] = shape;
    }

    const reset = () => {
        board = ['.','-','!','#',' ','^','*','_','+'];
    }

    return {get, display, changeCell, reset};
});

const player = (shape) => {
    this.shape = shape;

    const swap = () => {
        if (this.shape === 'x') {
            this.shape = 'o';
        }
        else {
            this.shape = 'x';
        }
        return this.shape;
    }
    return {shape, swap};
}

function checkGameStatus(board) {
    let ongoing = true;
    if (board[0] === board[1] && board[0] === board[2] || board[3] === board[4] && board[3] === board[5] || board[6] === board[7] && board[6] === board[8]) {
        ongoing = false;
    }
    else if (board[0] === board[3] && board[0] === board[6] || board[1] === board[4] && board[1] === board[7] || board[2] === board[5] && board[2] === board[8]) {
        ongoing = false;
    }
    else if (board[0] === board[4] && board[0] === board[8] || board[2] === board[4] && board[2] === board[6]) {
        ongoing = false;
    }
    return ongoing;
}

const displayController = function (player, board) {
    const cells = document.querySelectorAll('.cell');
    const turnText = document.querySelector('.turn');
    turnText.textContent = 'Turn: x';
    for (let i = 0; i<9; i++) {
        cells[i].addEventListener('click', () => {
            if (board.get()[i] !== 'x' && board.get()[i] !== 'o' && checkGameStatus(board.get())) {
                turnText.textContent = `Turn: ${player.shape === 'x' ? 'o': 'x'}`;
                board.changeCell(i, player.shape);
                cells[i].textContent = player.shape;
                if (!checkGameStatus(board.get())) {
                    turnText.textContent = `${shape} wins`;
                }
                player.shape = player.swap();
            }
        });
    }
    const reset = document.querySelector('.reset');
    reset.addEventListener('click', () => {
        board.reset();
        for (let i = 0; i<9; i++) {
            cells[i].textContent = '';
        }
        turnText.textContent = `Turn: ${player.shape}`;
    })
}

const game = (function (player, board) {
    displayController(player, board);
});

game(player('x'), gameBoard());