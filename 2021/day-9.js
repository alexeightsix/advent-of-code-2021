const heights = require('fs').readFileSync('./data/heightmap.json', 'utf8').split("\n");

const dimensions = {
    width: heights[0].length,
    height: heights.length,
    total: heights[0].length * heights.length
}

function mapFactory(heights) {
    var map = [];
    for (var i = 0; i < dimensions.height; i++)
        map.push(heights[i].split("").map((p) => parseInt(p)))
    return map;
}

function getPoints(map, i, x) {
    let points = {};

    if (!i == 0)
        points.top = map[i - 1][x];

    if (map[i][x - 1] >= 0)
        points.left = map[i][x - 1];

    if (map[i][x + 1] >= 0) {
        points.right = map[i][x + 1];
    }

    if (i < map.length - 1) {
        if (map[i + 1][x] >= 0)
            points.bottom = map[i + 1][x];
    }

    return points;
}

function getSize(map) {
    let total = 0;
    for (var i = 0; i < map.length; i++) {
        for (var x = 0; x < map[i].length; x++) {
            if (map[i][x] == 1000)
                total++;
        }
    }
    return total;
}


function fill(tmpMap, i, x) {
    if (tmpMap[i][x] != 9 && tmpMap[i][x] >= 0)
        tmpMap[i][x] = 1000;

    const points = getPoints(tmpMap, i, x);

    if (points.top != 9 && points.top >= 0 && points.top != 1000)
        fill(tmpMap, i - 1, x);

    if (points.left != 9 && points.left >= 0 && points.left != 1000) 
        fill(tmpMap, i, x - 1);
    
    if (points.bottom != 9 && points.bottom >= 0 && points.bottom != 1000) 
        fill(tmpMap, i + 1, x);
    
    if (points.right != 9 && points.right >= 0 && points.right != 1000) 
        fill(tmpMap, i, x + 1);
}

const map = mapFactory(heights);

let riskLevel = 0;
let sizes = [];

for (var i = 0; i < map.length; i++) {
    for (var x = 0; x < map[i].length; x++) {
        const points = getPoints(map, i, x)

        var current = map[i][x];
        var lowestValue = Math.min(...Object.values(points));

        if (current < lowestValue) {
            riskLevel = riskLevel + map[i][x] + 1;

            var tmpMap = mapFactory(heights);

            fill(tmpMap, i, x);

            sizes.push(getSize(tmpMap));
        }
    }
}

sizes = sizes.sort(function (a, b) {
    return a - b;
});

console.log("day 9 part 1 is: " + riskLevel);

console.log("day 9 part 2 is: " + sizes[sizes.length - 1] * sizes[sizes.length - 2] * sizes[sizes.length - 3]);