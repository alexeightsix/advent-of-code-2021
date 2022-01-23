const data = require('fs').readFileSync('./data/boards.json', 'utf8');
const numbers = data.split("\n")[0].split(",").map((number) => parseInt(number)).filter((number) => !isNaN(number))

function createBoards() {
    var boards = [];
    var currentBoard = 0;
    var currentLine = 0;

    data.split("\n").forEach((line, index) => {
        if (line.includes(",") || line.length == 0)
            return;

        var n = line.split(" ").filter((number) => number != "");

        n = n.map((number) => parseInt(number));

        if (typeof boards[currentBoard] == "undefined")
            boards[currentBoard] = [];

        boards[currentBoard].push(n);

        if (currentLine == 4) {
            currentLine = 0;
            currentBoard++;
        } else {
            currentLine++;
        }
    });
    return boards;
}

function checkHorizontalLines(boardIndex) {
    let valid = true;
    for (var i = 0; i < 5; i++) {
        valid = true;
        for (var x = 0; x < 5; x++) {
            if (boards[boardIndex][i][x] != "X")
                valid = false;
        }
        if (valid)
            return valid;
    }
    return valid;
};

function checkVerticleLines(boardIndex) {
    let valid = true;
    for (var i = 0; i < 5; i++) {
        valid = true;
        for (var x = 0; x < 5; x++) {
            if (boards[boardIndex][x][i] != "X")
                valid = false;
        }
        if (valid)
            return valid;
    }
    return valid;
}


function isWinner(boardIndex) {
    return checkHorizontalLines(boardIndex) || checkVerticleLines(boardIndex)
}

function calcWinningScore(boardIndex, number) {
    var count = 0;
    var board = boards[boardIndex];

    for (var i = 0; i < 5; i++) {
        for (var x = 0; x < 5; x++) {
            if (board[i][x] != "X")
                count = count + board[i][x];
        }
    }
    return count * number;
}

let boards = createBoards(data);
var winners = [];
var firstWinner = [];
var lastWinner = [];

numbers.forEach((number, index) => {
    boards.forEach((boardLines, boardIndex) => {
        for (var i = 0; i < 5; i++) {
            for (var x = 0; x < 5; x++) {
                if (winners.includes(boardIndex))
                    return;

                if (boards[boardIndex][i][x] == number) {
                    boards[boardIndex][i][x] = "X";

                    if (isWinner(boardIndex)) {
                        winners.push(boardIndex);

                        if (firstWinner.length == 0) {
                            firstWinner[0] = boardIndex;
                            firstWinner[1] = number;
                        }

                        lastWinner[0] = boardIndex;
                        lastWinner[1] = number;
                    }
                }
            }
        }
    });
});

console.log("day 4 part 1 is: " + calcWinningScore(firstWinner[0], firstWinner[1]));
console.log("day 4 part 2 is: " + calcWinningScore(lastWinner[0], lastWinner[1]));