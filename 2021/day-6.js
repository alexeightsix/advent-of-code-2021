const data = require('fs').readFileSync('./data/fish.json', 'utf8');

function dayFactory() {
    return {
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0
    };
}

function generate(TOTAL_DAYS) {
    var TOTAL_DAYS = TOTAL_DAYS + 1;
    var FISH = {};
    var sum = 0;

    for (var i = 0; i < TOTAL_DAYS; i++)
        FISH[i] = dayFactory();

    data.split(",").forEach((fish, index) => {
        FISH[0][fish] = FISH[0][fish] + 1;
    });

    for (var TODAY = 1; TODAY < TOTAL_DAYS; TODAY++) {
        const YESTERDAY = TODAY - 1;
        FISH[TODAY] = dayFactory();

        for (var timer = 8; timer >= -1; timer--) {
            if (timer == -1 && FISH[YESTERDAY][0] > 0) {
                FISH[TODAY][6] = FISH[YESTERDAY][0] + FISH[TODAY][6];
                FISH[TODAY][8] = FISH[TODAY][8] + FISH[YESTERDAY][0];
            }

            if (timer > 0)
                FISH[TODAY][timer - 1] = FISH[YESTERDAY][timer];
        }
    }

    Object.values(FISH[TOTAL_DAYS - 1]).map((z) => sum = z + sum)
    return sum;
}

console.log("day 6 part 1 is: " + generate(80));
console.log("day 6 part 2 is: " + generate(256));