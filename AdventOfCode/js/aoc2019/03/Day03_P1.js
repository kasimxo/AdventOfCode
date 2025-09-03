const {readLines} = require('./input')

let input = readLines()
let wires = []
// [x, y]
let directions = {
    U: [0, 1],
    D: [0, -1],
    R: [1, 0],
    L: [-1, 0]
}
input.forEach(l=>{
    let wire = new Set()
    let steps = l.split(',')
    let position = [0, 0]
    steps.forEach(s=>{
        let factor = directions[s[0]]
        let maxIncrement = Number.parseInt(s.slice(1))
        for(let increment = 0; increment<maxIncrement; increment++){
            position[0] += factor[0]
            position[1] += factor[1] 
            wire.add(`${position[0]},${position[1]}`)
        }
    })
    wires.push(wire)
})
let crosses = wires[0].intersection(wires[1])
let min = Infinity
crosses.forEach(c=>{
    let values = c.split(',').map(n=>Number.parseInt(n))
    let val = Math.abs(values[0]) + Math.abs(values[1])
    min = Math.min(min, val)
})
console.log(min)