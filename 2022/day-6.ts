import { readFile, readFileSync } from "fs";

let arr = readFileSync('./data/day-6.txt', 'utf8');

var seq = 4;

for (var i = 0; i < arr.length; i++) {

  if (i < seq) {
    continue;
  }

  let prev = arr.split('').slice(i - seq, i)


  if (prev.length == new Set(prev).size) {
    console.log(i)
    break;
  }
}



var seq = 14;

for (var i = 0; i < arr.length; i++) {

  if (i < seq) {
    continue;
  }

  let prev = arr.split('').slice(i - seq, i)


  if (prev.length == new Set(prev).size) {
    console.log(i)
    break;
  }
}

