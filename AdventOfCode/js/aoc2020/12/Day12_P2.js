const { readLines } = require('../../input')
let input = readLines()
let wayPos = [1, 10] // X, Y
let shipPos = [0, 0]
input.forEach(l => {
    let instruction = l[0]
    let value = Number.parseInt(l.slice(1))
    switch (instruction) {
        case 'N':
            wayPos[0] += value
            break;
        case 'E':
            wayPos[1] += value
            break;
        case 'S':
            wayPos[0] -= value
            break;
        case 'W':
            wayPos[1] -= value
            break;
        case 'F':
            shipPos = [shipPos[0] + (wayPos[0] * value), shipPos[1] + (wayPos[1] * value)]
            break;
        case 'L':
            let turnL = value / 90
            switch (turnL % 4) {
                case 0:
                    break;
                case 1:
                    wayPos = [wayPos[1], -wayPos[0]]
                    break;
                case 2:
                    wayPos = [-wayPos[0], -wayPos[1]]
                    break;
                case 3:
                    wayPos = [-wayPos[1], wayPos[0]]
                    break;
            }
            break;
        case 'R':
            let turnR = value / 90
            switch (turnR % 4) {
                case 0:
                    break;
                case 1:
                    wayPos = [-wayPos[1], wayPos[0]]
                    break;
                case 2:
                    wayPos = [-wayPos[0], -wayPos[1]]
                    break;
                case 3:
                    wayPos = [wayPos[1], -wayPos[0]]
                    break;
            }
            break;
    }
})
console.log(Math.abs(shipPos[0]) + Math.abs(shipPos[1]))