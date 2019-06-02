var board = [];
board.push(['_', '_', '_']);
board.push(['_', '_', '_']);
board.push(['_', '_', '_']);

function clicked(f) {
    if (!document.getElementById(f).innerHTML && document.getElementById('draw').style.visibility == 'hidden' && document.getElementById('lost').style.visibility == 'hidden') {
        document.getElementById(f).innerHTML = "X";
        if (f == 1)
            board[0][0] = 'X';
        else if (f == 2)
            board[0][1] = 'X';
        else if (f == 3)
            board[0][2] = 'X';
        else if (f == 4)
            board[1][0] = 'X';
        else if (f == 5)
            board[1][1] = 'X';
        else if (f == 6)
            board[1][2] = 'X';
        else if (f == 7)
            board[2][0] = 'X';
        else if (f == 8)
            board[2][1] = 'X';
        else if (f == 9)
            board[2][2] = 'X';
        if (!isMovesLeft(board)) {
            document.getElementById('draw').style.visibility = 'visible';
        }
        move = findBestMove(board);
        board[move[0]][move[1]] = 'O';
        var index = move[0] * 3 + move[1] + 1;
        index = index.toString();
        document.getElementById(index).innerHTML = "O";
        if (checkLoss(board)) {
            document.getElementById('lost').style.visibility = 'visible';
        }
    }
}

function resetBoard() {
    console.log("HERE");
    board = [];
    board.push(['_', '_', '_']);
    board.push(['_', '_', '_']);
    board.push(['_', '_', '_']);
    document.getElementById('draw').style.visibility = 'hidden';
    document.getElementById('lost').style.visibility = 'hidden';
    for(var i=1;i<=9;i++)
        document.getElementById(i.toString()).innerHTML="";
}

function checkLoss(b) {
    for (var row = 0; row < 3; row++) {
        if (b[row][0] == b[row][1] &&
            b[row][1] == b[row][2]) {
            if (b[row][0] == 'O')
                return true;
        }
    }

    for (var col = 0; col < 3; col++) {
        if (b[0][col] == b[1][col] &&
            b[1][col] == b[2][col]) {
            if (b[0][col] == 'O')
                return true;
        }
    }

    if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) {
        if (b[0][0] == 'O')
            return true;
    }

    if (b[0][2] == b[1][1] && b[1][1] == b[2][0]) {
        if (b[0][2] == 'O')
            return true;
    }
    return false;
}

function findBestMove(board) {
    var bestVal = -1000;
    var bestMoveR = -1, bestMoveC = -1;

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] == '_') {
                board[i][j] = 'O';

                var moveVal = minimax(board, 0, false);

                board[i][j] = '_';

                if (moveVal > bestVal) {
                    bestMoveR = i;
                    bestMoveC = j;
                    bestVal = moveVal;
                }
            }
        }
    }
    return [bestMoveR, bestMoveC];
}

function minimax(board, depth, isMax) {
    var score = evaluate(board);

    if (score == 10)
        return score;

    if (score == -10)
        return score;

    if (isMovesLeft(board) == false)
        return 0;

    if (isMax) {
        var best = -1000;

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] == '_') {
                    board[i][j] = 'O';

                    best = max(best, minimax(board, depth + 1, !isMax));

                    board[i][j] = '_';
                }
            }
        }
        return best;
    }
    else {
        var best = 1000;

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] == '_') {
                    board[i][j] = 'X';

                    best = min(best, minimax(board, depth + 1, !isMax));

                    board[i][j] = '_';
                }
            }
        }
        return best;
    }
}

function isMovesLeft(board) {
    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++)
            if (board[i][j] == '_')
                return true;
    return false;
}

function evaluate(b) {
    for (var row = 0; row < 3; row++) {
        if (b[row][0] == b[row][1] &&
            b[row][1] == b[row][2]) {
            if (b[row][0] == 'O')
                return +10;
            else if (b[row][0] == 'X')
                return -10;
        }
    }

    for (var col = 0; col < 3; col++) {
        if (b[0][col] == b[1][col] &&
            b[1][col] == b[2][col]) {
            if (b[0][col] == 'O')
                return +10;

            else if (b[0][col] == 'X')
                return -10;
        }
    }

    if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) {
        if (b[0][0] == 'O')
            return +10;
        else if (b[0][0] == 'X')
            return -10;
    }

    if (b[0][2] == b[1][1] && b[1][1] == b[2][0]) {
        if (b[0][2] == 'O')
            return +10;
        else if (b[0][2] == 'X')
            return -10;
    }

    return 0;
}

function min(a, b) {
    if (a < b)
        return a;
    return b;
}

function max(a, b) {
    if (a > b)
        return a;
    return b;
}

function resetAll() {

}