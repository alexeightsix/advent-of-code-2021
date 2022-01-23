const data = require('fs').readFileSync('./data/vents.json', 'utf8');

var cords = data.split("\n").map((c) => c.split(' -> ')).map((c) => {
    var _c = c.toString().split(",");
    var x = [];
    x["source"] = []
    x["source"]["x"] = parseInt(_c[0]);
    x["source"]["y"] = parseInt(_c[1]);

    x["dest"] = []
    x["dest"]["x"] = parseInt(_c[2]);
    x["dest"]["y"] = parseInt(_c[3]);
    return x;
});

var map = [];

let x = [];
let y = [];

cords.forEach((cord) => {
    const isHorzLine = cord['source']['x'] == cord['dest']['x'];
    const isVertLine = cord['source']['y'] == cord['dest']['y'];
    const isDiagLine = (!isHorzLine && !isVertLine);

    let max_x = cord['source']['x'] > cord['dest']['x'] ? cord['source']['x'] : cord['dest']['x'];
    let min_x = cord['source']['x'] < cord['dest']['x'] ? cord['source']['x'] : cord['dest']['x'];
    let max_y = cord['source']['y'] > cord['dest']['y'] ? cord['source']['y'] : cord['dest']['y'];
    let min_y = cord['source']['y'] < cord['dest']['y'] ? cord['source']['y'] : cord['dest']['y'];

    if (isHorzLine) {
        for (var i = min_y; i <= max_y; i++)
            map[cord['source']['x'] + "," + i] = map[cord['source']['x'] + "," + i] == undefined ? 1 : map[cord['source']['x'] + "," + i] + 1;
    }

    if (isVertLine) {
        for (var i = min_x; i <= max_x; i++)
            map[i + "," + cord['source']['y']] = map[i + "," + cord['source']['y']] == undefined ? 1 : map[i + "," + cord['source']['y']] + 1;
    }

    if (isDiagLine) {
        if (cord['source']['x'] > cord['dest']['x'] && cord['source']['y'] < cord['dest']['y']) {
            for (var i = max_x; i >= min_x; i--)
                x.push(i);

            for (var i = min_y; i <= max_y; i++)
                y.push(i);
        }

        if (cord['source']['x'] > cord['dest']['x'] && cord['source']['y'] > cord['dest']['y']) {
            for (var i = max_x; i >= min_x; i--)
                x.push(i);

            for (var i = max_y; i >= min_y; i--)
                y.push(i);
        }

        if (cord['source']['x'] < cord['dest']['x'] && cord['source']['y'] < cord['dest']['y']) {
            for (var i = min_x; i <= max_x; i++)
                x.push(i);

            for (var i = min_y; i <= max_y; i++)
                y.push(i);
        }

        if (cord['source']['x'] < cord['dest']['x'] && cord['source']['y'] > cord['dest']['y']) {
            for (var i = min_x; i <= max_x; i++)
                x.push(i);

            for (var i = max_y; i >= min_y; i--)
                y.push(i);
        }
    }
});

console.log("day 5 part 1 is: " + Object.values(map).filter((count) => count > 1).length);

for (var i = 0; i < x.length; i++) {
    var cord = x[i] + "," + y[i];
    map[cord] = map[cord] == undefined ? 1 : map[cord] + 1;
}

console.log("day 5 part 2 is: " + Object.values(map).filter((count) => count > 1).length);