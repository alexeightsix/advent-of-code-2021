const commands = JSON.parse(require('fs').readFileSync("./data/commands.json"));

class Submarine {
    constructor() {
        this.horizontal_pos = 0;
        this.depth = 0;
    }

    fwd(value) {
        this.horizontal_pos = this.horizontal_pos + parseInt(value);
    }

    down(value) {
        this.depth = this.depth + parseInt(value);
    }

    up(value) {
        this.depth = this.depth - parseInt(value);
    }
}

var s = new Submarine();

for (var q = 0; q < commands.length; q++) {

    var cmd = commands[q];
    cmd = cmd.split(" ");

    if (cmd[0] == "up")
        s.up(cmd[1])

    if (cmd[0] == "forward")
        s.fwd(cmd[1]);

    if (cmd[0] == "down")
        s.down(cmd[1])
}

console.log("day 2 part 1 is: " + s.horizontal_pos * s.depth)

class UpdatedSubmarine {
    constructor() {
        this.horizontal_pos = 0;
        this.depth = 0;
        this.aim = 0;
    }

    fwd(value) {
        this.horizontal_pos = this.horizontal_pos + parseInt(value);
        this.depth = (this.aim * parseInt(value) + this.depth);
    }

    down(value) {
        this.aim = this.aim + parseInt(value);
    }

    up(value) {
        this.aim = this.aim - parseInt(value);
    }
}

var us = new UpdatedSubmarine();

for (var j = 0; j < commands.length; j++) {

    var cmd = commands[j];
    cmd = cmd.split(" ");

    if (cmd[0] == "up")
        us.up(cmd[1])

    if (cmd[0] == "forward")
        us.fwd(cmd[1]);

    if (cmd[0] == "down") 
        us.down(cmd[1])
}

console.log("day 2 part 2 is: " + us.horizontal_pos * us.depth);