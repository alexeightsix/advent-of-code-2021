import { readFileSync } from "fs";

const alphabet: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const data = readFileSync('./data/day-3.txt', 'utf8').split('\n').filter(String).map((items) => {
  var chars = items.split('');
  const middleIndex = Math.ceil(chars.length / 2);
  return [chars.splice(0, middleIndex), chars.splice(-middleIndex)];
})

const items: Array<string[]> = [];

let total: number = 0;

data.forEach((sack, x) => {
  items[x] = [];
  for (var i = 0; i < sack[1].length; i++) {
    if (sack[0].includes(sack[1][i])) {
      if (!items[x].includes(sack[1][i])) {
        items[x].push(sack[1][i])
      }
    }
  }
});


items.flat().forEach((item) => {
  let points = alphabet.search(item) + 1;
  total = total + points
});

console.log("day 3 part 1 " + total)

const new_data: Array<string[]> = readFileSync('./data/day-3.txt', 'utf8').split('\n').filter(String).map((items) => {
  return items.split('');
})

var groups: Array<string[]> = [];

for (var i = 0; i < new_data.length; i += 3) {

  if (!groups[i]) {
    groups[i] = [];
  }

  for (var x = 0; x < new_data[i].length; x++) {
    if (new_data[i + 1].includes(new_data[i][x]) && new_data[i + 2].includes(new_data[i][x])) {
      if (!groups[i].includes(new_data[i][x])) {
        groups[i].push(new_data[i][x])
      }
    }
  }
}

total = 0;

groups.flat().forEach((item) => {
  let points = alphabet.search(item) + 1;
  total = total + points
});

console.log("day 3 part 2 " + total)
