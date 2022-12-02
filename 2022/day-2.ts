import { readFileSync } from "fs";

const rounds: any = readFileSync('./data/rounds.json', 'utf8').split("\n").map((x) => {
  if (x !== "") {
    return x.split(" ")
  }
}).filter(function (el) {
  return el != null;
});

type first_col_letter = "A" | "B" | "C"
type last_col_letter = "X" | "Y" | "Z"

type hand = "ROCK" | "PAPER" | "SCISSORS"
type player = 1 | 2
type handScore = 1 | 2 | 3
type result = undefined | 1 | 2 
type round_score = 0 | 3 | 6

const letterToHand = (letter: first_col_letter|last_col_letter): hand  => { 
  switch (letter) {
    case 'A':
    case 'X':
      return 'ROCK';
    case 'B':
    case 'Y':
      return 'PAPER';
    case 'C':
    case 'Z':
      return 'SCISSORS';
  }
}

const calculateWinner = (p1: hand, p2: hand) : player|undefined => {
  if (p1 === p2) {
    return
  } else if (p1 == "ROCK" && p2 == "SCISSORS") {
    return 1
  } else if (p1 == "ROCK" && p2 == "PAPER") {
    return 2
  } else if (p1 == "PAPER" && p2 == "ROCK") {
    return 1
  } else if (p1 == "PAPER" && p2 == "SCISSORS") {
    return 2
  } else if (p1 == "SCISSORS" && p2 == "PAPER") {
    return 1
  } else if (p1 == "SCISSORS" && p2 == "ROCK") {
    return 2
  } else if (p2 == "ROCK" && p1 == "SCISSORS") {
    return 2
  } else if (p2 == "ROCK" && p1 == "PAPER") {
    return 1
  } if (p2 == "PAPER" && p1 == "ROCK") {
    return 2
  } if (p2 == "PAPER" && p1 == "SCISSORS") {
    return 1
  } if (p1 == "SCISSORS" && p2 == "PAPER") {
    return 1
  } if (p1 == "SCISSORS" && p2 == "ROCK") {
    return 2
  }
}

const handToScore = (z:hand) : handScore => {
switch (z) {
    case 'ROCK':
    return 1;
      case 'PAPER':
    return 2;
      case 'SCISSORS':
    return 3;
  }
}

var score: number = 0;

rounds.forEach((round: Array<first_col_letter|last_col_letter>) => {
   var opp = letterToHand(round[0])
   var me = letterToHand(round[1]) 
   var round_total: round_score = 0;
   var winner: result = calculateWinner(opp, me)

   switch(winner) {
    case undefined:
      round_total = 3;
      break;
    case 2:
      round_total = 6;
      break;
  }

  score = score + handToScore(me) + round_total

});

console.log(score)


type outcome = "LOOSE" | "WIN" | "DRAW"

const getOutcome = (o: last_col_letter): outcome => {
  switch(o) {
    case 'X':
      return 'LOOSE';
    case 'Y':
      return 'DRAW';
    case 'Z':
      return 'WIN';
  }
};

const swapForLoosingHand = (h: hand): hand => {
  if (h == "ROCK") {
    return "SCISSORS";
  } else if (h == "PAPER") {
    return "ROCK";
  } else { 
    return "PAPER";
  }
} 


const swapForWinningHand = (h: hand): hand => {
  if (h == "ROCK") {
    return "PAPER";
  } else if (h == "PAPER") {
    return "SCISSORS";
  } else { 
    return "ROCK";
  }
} 

var score:number = 0;

rounds.forEach((round: Array<any>) => {
   var round_total: round_score = 0;
   var opp = letterToHand(round[0])
   var me = letterToHand(round[1]) 

   var desired_outcome = getOutcome(round[1]);

    if (desired_outcome == "DRAW") {
      var me = opp; 
    } else if (desired_outcome == "WIN") {
      var me = swapForWinningHand(opp)
    } else if (desired_outcome == "LOOSE") {
      var me = swapForLoosingHand(opp)
    }
  
   var winner: result = calculateWinner(opp, me)

   switch(winner) {
    case undefined:
      round_total = 3;
      break;
    case 2:
      round_total = 6;
      break;
  }

  score = score + handToScore(me) + round_total
});

console.log(score)
