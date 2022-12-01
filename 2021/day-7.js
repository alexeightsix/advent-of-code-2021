const data = require('fs').readFileSync('./data/fuel.json', 'utf8');
const positions = data.split(",").map((p) => parseInt(p))

function highest(arr) {
    var highest;
    for (var i = 0; i < arr.length; i++) {
        if (highest == null)
            highest = arr[i];

        if (arr[i] > highest)
            highest = arr[i];
    }
    return highest;
}

function lowest(arr) {
    var lowest;
    for (var i = 0; i < arr.length; i++) {
        if (lowest == null)
            lowest = arr[i];

        if (arr[i] < lowest)
            lowest = arr[i];
    }
    return lowest;
}

function calcFuelBeteenTwoPositions(constant = true, ...numbers) {
    let fuel = 0;

    var min = Math.min(numbers[0], numbers[1]);
    var max = Math.max(numbers[0], numbers[1]);

    if (constant == true)
        return fuel + max - min;

    var xx = 0;
    var zz = 0;

    for (var c = min; c < max; c++) {
        xx++;
        zz = xx + zz;
    }

    fuel = fuel + zz;
    return fuel;
}

function calculateTotalFuel(constant, positions, alignTo) {
    let totalFuel = 0;

    for (var i = 0; i < positions.length; i++)
        totalFuel += calcFuelBeteenTwoPositions(constant, positions[i], alignTo)

    return totalFuel
}

let inconstant_cases = [];
let constant_cases = [];

for (var i = 0; i < highest(positions); i++) {
    inconstant_cases[i] = calculateTotalFuel(false, positions, i);
    constant_cases[i] = calculateTotalFuel(true, positions, i);
}

console.log("day 7 part 1 is: " + lowest(constant_cases));
console.log("day 7 part 2 is: " + lowest(inconstant_cases));