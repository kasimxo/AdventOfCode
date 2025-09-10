const {readLines} = require('./../../input')

let input = readLines()
let wires = []
let wiresRaw = []
// [x, y]
let directions = {
    U: [0, 1],
    D: [0, -1],
    R: [1, 0],
    L: [-1, 0]
}
input.forEach(l=>{
    let wire = new Set()
    let wireKeys = new Set()
    let steps = l.split(',')
    let position = [0, 0]
    let delay = 0
    steps.forEach(s=>{
        let factor = directions[s[0]]
        let maxIncrement = Number.parseInt(s.slice(1))
        for(let increment = 0; increment<maxIncrement; increment++){
            delay++
            position[0] += factor[0]
            position[1] += factor[1] 
            if(!wireKeys.has(`${position[0]},${position[1]}`)){
                wire.add(`${position[0]},${position[1]},${delay}`)
                wireKeys.add(`${position[0]},${position[1]}`)
            }
        }
    })
    wires.push(wire)
    wiresRaw.push(wireKeys)
})
let crosses = wiresRaw[0].intersection(wiresRaw[1])
let min = Infinity
let w1 = {}
wires[0].values().forEach(f=>{
    let split = f.split(',')
    if(crosses.has(`${split[0]},${split[1]}`)) {
        w1[`${split[0]},${split[1]}`]= Number.parseInt(split[2])
    }
})
let w2 = {}
wires[1].values().forEach(f=>{
    let split = f.split(',')
    if(crosses.has(`${split[0]},${split[1]}`)) {
        w2[`${split[0]},${split[1]}`] = Number.parseInt(split[2])
    }
})
crosses.forEach(c=>{
    let val1 = w1[c]
    let val2 = w2[c]
    let val = val1+val2
    min = Math.min(min, val)
    
})
console.log(min)