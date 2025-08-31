const {readLines} = require('./input')

const input = readLines().map(n=>Number.parseInt(n))
let frecuencies = []
let currFrecuency = 0
let index = 0
let processing = true
while(processing){
    currFrecuency += input[index%input.length]
    if(frecuencies.includes(currFrecuency)){
        console.log("SOLUTION: ", currFrecuency)
        break
    } else {
        frecuencies.push(currFrecuency)
    }
    index++
}