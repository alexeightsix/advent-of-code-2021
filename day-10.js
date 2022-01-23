const lines = require('fs').readFileSync('./input.txt', 'utf8').split("\n");
const index = [
    {
        "opening": "(",
        "closing": ")",
        "points": {
            invalid: 3,
            completion: 1
        }
    },
    {
        "opening": "[",
        "closing": "]",
        "points": {
            invalid: 57,
            completion: 2
        }
    },
    {
        "opening": "{",
        "closing": "}",
        "points": {
            invalid: 1157,
            completion: 3
        }
    },
    {
        "opening": "<",
        "closing": ">",
        "points": {
            invalid: 25137,
            completion: 4
        }
    }
];

const hasClosing = (line) => {
    for (var i = 0; i < line.length; i++) {
        const _query = query(line[i]);

        if (_query.closing == line[i])
            return true;
    }
    return false;
};

const query = (query) => {
    return index.find((c) => {
        if (c.opening == query)
            return c;

        if (c.closing == query)
            return c;
    });
};

const invalidChars = []
const invalidLines = [];

lines.forEach((line) => {
    var line = line;

    for (var i = 0; i < line.length; i++) {
        index.forEach((chars, index) => {
            line = line.replaceAll(chars.opening + chars.closing, "")
        });
    }

    var hasClosingBrackets = hasClosing(line);

    if (!hasClosingBrackets)
        return invalidLines.push(line);


    for (var i = 0; i < line.length; i++) {
        var firstChar = query(line[i]);
        var secondChar = query(line[i + 1]);

        if (firstChar && secondChar) {
            if (firstChar.opening == line[i] &&
                secondChar.closing == line[i + 1]) {
                invalidChars.push(secondChar.closing);
            }
        }
    }
});

var seen = [];
var count = 0;

invalidChars.forEach((char) => {
    if (seen.includes(char))
        return;

    var findAll = invalidChars.filter((c) => char == c);

    seen.push(char);

    const { points } = query(char);

    count = count + findAll.length * points.invalid;
});

console.log("day 10 pt is: " + count)

let scores = [];

invalidLines.forEach((line, index) => {
    var str = ""
    var line = line;

    let score = 0;

    for (var z = line.length - 1; z >= 0; z--) {
        var test = query(line[z]);
        str += test.closing
        score = (score * 5) + test.points.completion;
    }

    scores.push(score);
});

scores = scores.sort((a, b) => a - b);

console.log(scores[Math.floor(scores.length / 2)]);