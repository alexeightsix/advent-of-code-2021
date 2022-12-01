import { readFileSync } from "fs";

const calories: Array<number> = readFileSync('./data/calories.json', 'utf8').split("\n").map((x) => parseInt(x))

const totals: Array<number> = []

let tmp: number = 0;

calories.forEach((c) => {
  if (isNaN(c)) {
    totals.push(tmp)
    tmp = 0;
    return;
  }

  tmp = tmp + c;

});

const answer = totals.sort((a, b) => b - a);

console.log(answer[0])
console.log(answer[0] + answer[1] + answer[2])
