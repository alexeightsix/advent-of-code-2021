const codes = require('fs').readFileSync("./data/codes.json", "utf8").split("\n");

function buildMap(codes) {
    var r = [];
    for (var i = 0; i < codes[0].length; i++) {
        for (var x = 0; x < codes.length; x++) {
            if (typeof r[i] == "undefined")
                r[i] = [];
            r[i].push(parseInt(codes[x][i]));
        }
    }
    return r;
}

function calculateRatings(r) {
    var gamma_rate = "";
    var epsilon_rate = "";

    for (var pos = 0; pos < r.length; pos++) {
        var sum = 0;

        for (var y = 0; y < r[pos].length; y++)
            sum = r[pos][y] + sum;

        gamma_rate += (sum >= r[0].length / 2) ? 1 : 0;
        epsilon_rate += (sum >= r[0].length / 2) ? 0 : 1;
    }

    return [
        gamma_rate,
        epsilon_rate
    ]
}

var mappings = buildMap(codes);
var ratings = calculateRatings(mappings);

console.log("day 3 part 1 is: " + parseInt(ratings[0], 2) * parseInt(ratings[1], 2))

var oxRatingCodes = codes;
var oxRatingCodes_length = oxRatingCodes[0].length;

for (var i = 0; i < oxRatingCodes_length; i++) {
    var oxRatingCodesMapping = buildMap(oxRatingCodes);
    var oxRatingCodesRates = calculateRatings(oxRatingCodesMapping);

    oxRatingCodes = oxRatingCodes.filter((code, index) => {
        if (i >= oxRatingCodes_length)
            return true;
        return code[i] == oxRatingCodesRates[0][i];
    });
}

var c0RatingCodes = codes;
var c0RatingCodes_length = c0RatingCodes[0].length;
var oxygen_generator_rating = parseInt(oxRatingCodes[0], 2);

for (var i = 0; i < c0RatingCodes_length; i++) {
    if (c0RatingCodes.length == 1)
        continue;

    var c0RatingCodesMapping = buildMap(c0RatingCodes);
    var c0RatingCodesRates = calculateRatings(c0RatingCodesMapping);

    c0RatingCodes = c0RatingCodes.filter((code, index) => {
        if (i >= c0RatingCodes_length)
            return false;
        return code[i] == c0RatingCodesRates[1][i];
    });
}

var c02_scrubber_rating = parseInt(c0RatingCodes[0], 2);

console.log("day 3 part 2 is: " + c02_scrubber_rating * oxygen_generator_rating)