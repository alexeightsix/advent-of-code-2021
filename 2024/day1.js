const { readFileSync } = require('fs');

let input = readFileSync('./input.txt', 'utf-8')
  .split("\n").map((z) => z.split("   "))
  .filter(n => n != '')
  .map(n => [n[0], n[1]]
    .filter(Number))

const first = []
const second = []

for (var i = 0; i < input.length; i++) {
  first[i] = input[i][0]
  second[i] = input[i][1]
}

first.sort()
second.sort()

let diff = 0

for (var i = 0; i < input.length; i++) {
  tmp = [first[i], second[i]].sort()
  tmp = tmp[1] - tmp[0]
  diff = diff + tmp
}

console.log("day 1 part 1: " + diff)

let total = 0

for (var i = 0; i < input.length; i++) {
  var tmp = 0
  for (var z = 0; z < input.length; z++) {
    if (first[i] == second[z]) {
      tmp = tmp + 1
    }
  }
  total = total + tmp * first[i]
}

console.log("day 1 part 2: " + total)
