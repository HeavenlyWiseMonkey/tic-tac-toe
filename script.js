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
    return {get, display, changeCell};
});

const player = (shape) => {
    this.shape = shape;
    return {shape}
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

const game = (function (player, board) {
    let i = 0
    while (checkGameStatus(board.get()) && i !== 9) {
        let choice;
        while (board[choice] === 'x' || board.get()[choice] === 'o' || choice === undefined || choice < 0 || choice > 8) {
            choice = prompt(`Where do you want to put ${player.shape}?`);
        }
        board.changeCell(choice, player.shape);
        board.display();
        if (checkGameStatus(board.get())) {
            if (player.shape === 'x') {
                player.shape = 'o';
            }
            else {
                player.shape = 'x';
            }
        }
        i++;
    }
    if (i === 9 && checkGameStatus(board.get())) {
        console.log('Tie');
    }
    else {
        console.log(`${player.shape} wins!`);
    }
});

game(player('x'), gameBoard());