const {readLines} = require('./input')
let input = readLines()
/*
input = [
    "#1 @ 1,3: 4x4",
    "#2 @ 3,1: 4x4",
    "#3 @ 5,5: 2x2"
]*/
const squares = {}
/**
 * Square:
 * x = number
 * y = number
 * surfaces = number
 * ids = []
 */

input.forEach(l => {
    const words = l.split(' ')
    const id = words[0]
    const coords = words[2].replaceAll(':', '')
    let [x, y] = coords.split(',').map(n=>Number.parseInt(n))
    const [dimX, dimY] = words[3].split('x').map(n=>Number.parseInt(n))
    const maxX = x+dimX
    const maxY = y+dimY
    for(let i = x; i<maxX; i++){
        for(let j = y; j<maxY; j++){
            const position = `${i},${j}`
            if(squares[position] == undefined){
                squares[position] = 1
            } else {
                squares[position]++
            }
        }
    }
})
const solution = Object.values(squares).filter(v=>v>1).length
console.log(solution)