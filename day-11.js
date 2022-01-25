let lines = require('fs').readFileSync("./data/pus.json", "utf8").split("\n").map((line) => {
    return line.split("").map(Number)
})

const isSynced = (lines) => {
    let n = 0;
    for (var i = 0; i < lines.length; i++) {
        for (x = 0; x < lines[0].length; x++) {
            if (n !== lines[i][x])
                return false;

        }
    }
    return true;
}

const flash = (lines, i, x, step) => {
    const id = i > 1 ? (i * lines[0].length) - (lines[0].length - x) : x;
    const points = [
        [i - 1, x - 1], // top left
        [i - 1, x + 1], // top right
        [i - 1, x], // top
        [i, x - 1], // left
        [i, x + 1], // right
        [i + 1, x - 1], // bottom left
        [i + 1, x + 1], // bottom right
        [i + 1, x] //bottom
    ];

    for (var pos = 0; pos < points.length; pos++) {
        const _i = points[pos][0];
        const _x = points[pos][1];

        if (lines[_i] == undefined ||
            lines[_i][_x] == undefined ||
            lines[_i][_x] == 0)
            continue;

        lines[_i][_x] = lines[_i][_x] + 1;

        if (lines[_i][_x] > 9) {
            flashes++;
            lines[_i][_x] = 0;
            flash(lines, _i, _x);
        }
    }
}

var flashes = 0;

for (var step = 0; !isSynced(lines); step++) {
    for (var i = 0; i < lines.length; i++) {
        for (var x = 0; x < lines[0].length; x++)
            lines[i][x] = lines[i][x] + 1;
    }

    for (var i = 0; i < lines.length; i++) {
        for (var x = 0; x < lines[0].length; x++) {
            if (lines[i][x] > 9) {
                flashes++;
                lines[i][x] = 0;
                flash(lines, i, x)
            }
        }
    }

    if (step == 99)
        console.log("day 11 part 1 is: " + flashes)
}

console.log("day 11 part 2 is: " + step)
