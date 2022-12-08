import { readFileSync } from "fs";

const data = readFileSync('./data/day-5.txt', 'utf8').split('\n\n');

type crates = Array<string[]>

const crates: crates = data[0].split('\n').map((z) => z.split(''))

const instructions = data[1].split('\n').filter((z) => z != '').map((z: string): instruction => {
  var i = z.split(' ').map(Number)
  return {
    no_crates: i[1],
    source: i[3],
    dest: i[5]
  }
});

type instruction = {
  no_crates: number
  source: number
  dest: number
}

const do_instruction = (instruction: instruction, crates: crates) => {
  for (var i = 0; i < instruction.no_crates; i++) {
    var src: Array<string> = crates[instruction.source - 1]

    if (!src.length) {
      continue;
    }

    var crate: string | undefined = src.pop()
    var dest: Array<string> = crates[instruction.dest - 1];

    if (dest == undefined) {
      continue;
    }

    if (crate != undefined) {
      dest.push(crate)
    }
  }
}


for (var i = 0; i < instructions.length; i++) {
  do_instruction(instructions[i], crates)
}

var ans = ""

for (var i = 0; i < crates.length; i++) {
  ans += crates[i].pop()
}

// console.log(ans.split('').join(''))

const crates2: crates = data[0].split('\n').map((z) => z.split(''))


const do_instruction_part2 = (instruction: instruction, crates2: crates) => {
  const pluck: Array<string> = crates2[instruction.source - 1].splice(crates2[instruction.source - 1].length - instruction.no_crates, instruction.no_crates)
  crates2[instruction.dest - 1].push(...pluck)
}


ans = "";

for (var i = 0; i < instructions.length; i++) {
  do_instruction_part2(instructions[i], crates2)
}

for (var i = 0; i < crates2.length; i++) {
  ans += crates2[i][crates2[i].length - 1]
}

// console.log(ans)
//
console.log(ans)


