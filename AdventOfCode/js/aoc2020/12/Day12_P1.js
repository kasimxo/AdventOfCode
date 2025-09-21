const { readLines } = require('../../input')
let input = readLines()
let pos = [0, 0] // X, Y
let facing = 400 // E-S-W-N
input.forEach(l => {
    let instruction = l[0]
    let value = Number.parseInt(l.slice(1))
    switch (instruction) {
        case 'N':
            pos[0] += value
            break;
        case 'E':
            pos[1] += value
            break;
        case 'S':
            pos[0] -= value
            break;
        case 'W':
            pos[1] -= value
            break;
        case 'F':
            switch (facing % 4) {
                case 0:
                    pos[1] += value
                    break;
                case 1:
                    pos[0] -= value
                    break;
                case 2:
                    pos[1] -= value
                    break;
                case 3:
                    pos[0] += value
                    break;
            }
            break;
        case 'L':
            let turnL = value / 90
            facing = facing - turnL
            break;
        case 'R':
            let turnR = value / 90
            facing = facing + turnR
            break;
    }
})
console.log(Math.abs(pos[0]) + Math.abs(pos[1]))