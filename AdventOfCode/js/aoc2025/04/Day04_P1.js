const { readLines } = require('../../input')

let input = readLines()
let sol = 0

const ALIVE = "@"
const WIDTH = input[0].length
const HEIGHT = input.length

for(let y = 0; y<HEIGHT; y++){
    for(let x = 0; x<WIDTH; x++){
        if(input[y][x]!==ALIVE) continue
        let neightbors = 0

        neightbors += input[y-1]?.[x-1] === ALIVE | 0
        neightbors += input[y-1]?.[x] === ALIVE | 0
        neightbors += input[y-1]?.[x+1] === ALIVE | 0

        neightbors += input[y]?.[x-1] === ALIVE | 0
        neightbors += input[y]?.[x+1] === ALIVE | 0

        neightbors += input[y+1]?.[x-1] === ALIVE | 0
        neightbors += input[y+1]?.[x] === ALIVE | 0
        neightbors += input[y+1]?.[x+1] === ALIVE | 0

        sol += neightbors < 4
    }
}

console.log("SOLUTION:", sol)