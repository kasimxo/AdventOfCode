const {readLines} = require('./../../input')

let registers = {}
let input = readLines()
input.forEach(l => {
    const words = l.split(' ')
    const register = words[0]
    if(registers[register] == null){
        registers[register] = 0
    }
    let numA = registers[words[4]] ?? 0
    let numB = Number.parseInt(words[6])
    let op = words[5]
    if(Operation(numA, numB, op)){
        let sum = Number.parseInt(words[2])
        registers[register] += words[1] === 'inc' ? sum : sum * -1;
    }
})

function Operation(numA, numB, op){
    switch(op){
        case '==':
            return numA == numB;
        case '>=':
            return numA >= numB;
        case '<=':
            return numA <= numB;
        case '>':
            return numA > numB;
        case '<':
            return numA < numB;
        case '!=':
            return numA != numB;
        default:
            console.error("NOT VALID: ", numA, numB, op)
    }
}

let max = 0
Object.entries(registers).forEach(([k, v]) => max = Math.max(v, max))
console.log(max)