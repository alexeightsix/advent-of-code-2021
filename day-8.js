const entries = require('fs').readFileSync('./data/displays.json', 'utf8').split("\n").map((entry) => entry.split(" | ")).map((entry) => {
    entry[0] = entry[0].split(" ").map((word) => s(word))
    entry[1] = entry[1].split(" ").map((word) => s(word))
    return entry;
});

function s(word) {
    return word.split("").sort().join("");
}

function uniq(a) {
    return Array.from(new Set(a));
}

var digits = 0;
var total_part_1 = 0;

entries.map((o) => o[1]).forEach((z) => {
    z.forEach((x) => {
        if ([2, 3, 7, 4].includes(x.length))
            total_part_1 = total_part_1 + 1;
    });
});

console.log("day 8 part 1 is: " + total_part_1);

for (var i = 0; i < entries.length; i++) {

    let entry = entries[i];
    let signals = entry[0];
    let output = entry[1];
    let mappings = [];

    mappings[1] = signals.filter((string) => string.length == 2);
    mappings[4] = signals.filter((string) => string.length == 4);
    mappings[7] = signals.filter((string) => string.length == 3);
    mappings[8] = signals.filter((string) => string.length == 7);
    mappings[3] = function () {
        let res = null;
        signals.forEach((word) => {
            if (word.length != 5)
                return;

            const ref = mappings[1].join(" ").split("");
            word = word.split("");
            let match = 0;
            word.forEach((letter) => {
                if (ref.includes(letter))
                    match++;
                if (match == 2)
                    res = word.join("")
            });
        });
        return [res];
    }();
    mappings[6] = function () {
        let res = null;
        signals.forEach((word) => {
            if (word.length != 6)
                return;

            var hasC = (word.includes(mappings[1][0][0]) && !word.includes(mappings[1][0][1]));
            var hasF = (!word.includes(mappings[1][0][0]) && word.includes(mappings[1][0][1]));

            if (hasC || hasF)
                res = word;
        });
        return [res];
    }();

    mappings[9] = function () {
        let res = null;
        signals.forEach((word) => {
            if (word.length != 6 || word == mappings[6])
                return;

            number_9 = word.split("").filter((letter) => {
                return !mappings[7].join().split("").includes(letter);
            });

            signals.forEach((word) => {
                if (word.length != 5)
                    return;

                if (mappings.includes(word))
                    return;

                number_5 = word.split("").filter((letter) => {
                    return !mappings[7].join().split("").includes(letter);
                });

                if (number_9.join("") === number_5.join("")) {
                    res = [s(number_5.join("") + mappings[7])];
                }
            });
        })

        return res;
    }();

    mappings[0] = function () {
        let res = null;
        signals.forEach((word) => {
            if (word.length == 6 || word.length == 5) {
                var e = false;
                mappings.forEach((mapping) => {
                    if (mapping[0] == word)
                        e = true;
                });

                if (e == false && word.length == 6) 
                    res = [word]
            }
        });
        return res;
    }();

    mappings[5] = function () {
        var res = "";
        signals.forEach((word) => {
            if (word.length != 5)
                return;

            var t = mappings.some((z) => z[0] == word)

            if (t == true)
                return;

            var tmp = uniq(word.split("").concat(mappings[1].join("").split(""))).sort();

            if (mappings[9].join() == tmp.join(""))
                res = word;
        });

        return [res];
    }();

    mappings[2] = function () {
        var res = "";

        signals.forEach((word) => {
            if (word.length != 5)
                return;

            var t = mappings.some((z) => z[0] == word)

            if (t == true)
                return;

            res = word
        });

        return [res];
    }();

    mappings = mappings.map((m) => m[0]);
    output = output.filter((w) => w != '');

    var d = "";

    output.forEach((o) => {
        d = d + mappings.findIndex((m) => m == o);
    });

    digits = (parseInt(digits) + parseInt(d));
}

console.log("day 8 part 2 is: " + digits);