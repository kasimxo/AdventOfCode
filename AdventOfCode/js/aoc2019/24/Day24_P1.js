const { readLines } = require('../../input')

let input = readLines().map(l => {
    l = l.replaceAll('.', '0')
    l = l.replaceAll('#', '1')
    return l.split('').map(c => Number.parseInt(c))
})

const BUG = 1
const EMPTY = 0
const HEIGHT = input.length
const WIDTH = input[0].length

let cache = new Set()

while (true) {
    let newInput = []
    let table = ''
    for (let y = 0; y < HEIGHT; y++) {
        let newLine = []
        for (let x = 0; x < WIDTH; x++) {
            let curr = input[y][x]
            let UP = input[y + 1] !== undefined ? input[y + 1][x] : EMPTY
            let DOWN = input[y - 1] !== undefined ? input[y - 1][x] : EMPTY
            let LEFT = input[y][x - 1] !== undefined ? input[y][x - 1] : EMPTY
            let RIGHT = input[y][x + 1] !== undefined ? input[y][x + 1] : EMPTY
            let sum = UP + DOWN + LEFT + RIGHT
            if (curr === BUG && sum === 1) {
                newLine.push(BUG)
            } else if (curr === EMPTY && (sum === 1 || sum === 2)) {
                newLine.push(BUG)
            } else {
                newLine.push(EMPTY)
            }
        }
        table += newLine.join('')
        newInput.push(newLine)
    }
    input = newInput
    if (cache.has(table)) {
        break
    }
    cache.add(table)

}
let score = 0
input.forEach((line, lineIndex) => {
    line.forEach((position, positionIndex) => {
        if (position === BUG) {
            score += Math.pow(2, WIDTH * lineIndex + positionIndex)
        }
    })
})
console.log(score)