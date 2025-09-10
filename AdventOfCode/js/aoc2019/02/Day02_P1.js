const {readInput} = require('./../../input')

const input = readInput().split(',').map(n=>Number.parseInt(n))
input[1] = 12
input[2] = 2
let calculating = true
let index = 0
while(calculating){
    let instruction = input[index]
    switch(instruction){
        case 1:
            input[input[index+3]] = input[input[index+1]] + input[input[index+2]]
            break;
        case 2:
            input[input[index+3]] = input[input[index+1]] * input[input[index+2]]
            break;
        case 99:
            console.log("END")
            calculating = false
            break;
        default:
            throw new Error
    }
    index += 4
}
console.log(input[0])
