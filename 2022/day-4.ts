import { readFileSync } from "fs";

const data: Array<any> = readFileSync('./data/day-4.txt', 'utf8').split('\n').filter((x) => x != '').map((x) => {
  return x.split(',')
});

const contains = (a: number, b: number, c: number, d: number) => {
  if (a < c && b > d) {
    return true
  }
  if (a <= c && b > d) {
    return true
  }
  if (a < c && b >= d) {
    return true;
  }
  if (a <= c && b >= d) {
    return true;
  }
  if (c < a && d > b) {
    return true;
  }
  if (c <= a && d >= b) {
    return true;
  }
  return false;
}

var total = 0;

for (var i = 0; i < data.length; i++) {
  let a = parseInt(data[i][0].split('-')[0])
  let b = parseInt(data[i][0].split('-')[1])
  let c = parseInt(data[i][1].split('-')[0])
  let d = parseInt(data[i][1].split('-')[1])

  if (contains(a, b, c, d)) {
    total++;
  }
}

console.log(total)

const contains_any = (a: number, b: number, c: number, d: number) => {
  if (contains(a, b, c, d)) {
    return true;
  }

  if (a >= c && a <= d) {
    return true;
  }

  if (b >= c && b <= d) {
    return true;
  }

  if (c >= b && c >= a && c <= b) {
    return true;
  }

  if (d <= b && d >= a) {
    return true
  }
}

var new_total: number = 0;

for (var i = 0; i < data.length; i++) {
  let a = parseInt(data[i][0].split('-')[0])
  let b = parseInt(data[i][0].split('-')[1])
  let c = parseInt(data[i][1].split('-')[0])
  let d = parseInt(data[i][1].split('-')[1])

  if (contains_any(a, b, c, d)) {
    new_total++;
  }
}

console.log(new_total)
