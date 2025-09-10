const {readLines} = require('./../../input')
const lines = readLines().map(l => Number.parseInt(l))

let pos = 0
let steps = 0
console.log(lines.length)
while(true){
    steps++
    let jump = lines[pos]
    lines[pos]++
    pos += jump
    if(isNaN(lines[pos])) {       
        console.log(steps)
        return
    }
}