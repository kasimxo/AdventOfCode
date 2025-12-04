const { readLines } = require('../../input')

let input = readLines()

let sol = 0
const ALIVE = "@"
const WIDTH = input[0].length
const HEIGHT = input.length

while(true){
    let newGrid = Array(HEIGHT).fill(".".repeat(WIDTH))
    let changed = false
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
            
            if(neightbors < 4){
                changed = true
                sol++
            } else{
                newGrid[y] = newGrid[y].slice(0, x) + ALIVE + newGrid[y].slice(x+1)
            }
        }
    }
    input = newGrid
    if(!changed) break  
}
console.log("SOLUTION:", sol)
