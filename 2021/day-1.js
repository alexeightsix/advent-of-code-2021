const measurements = JSON.parse(require('fs').readFileSync("./data/measurements.json"));

var increased = 0;

for (var i = 1; i < measurements.length; i++) {
    if (measurements[i] > measurements[i - 1])
        increased++;
}

console.log("day 1 part 1 is: " + increased);

var windows = [];

for (var i = 0; i < measurements.length; i++) {
    var currentWindow = 0;

    for (var w = 0; w < 3; w++)
        currentWindow += measurements[i + w];

    windows.push(currentWindow);
}

var c = 0;

for (var z = 1; z < windows.length; z++) {
    if (windows[z] > windows[z - 1])
        c++;
}

console.log("day 1 part 2 is: " + c);