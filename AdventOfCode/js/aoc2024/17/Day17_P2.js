const { readLines } = require('./input')

let text = [
    'Register A: 2024',
    'Register B: 0',
    'Register C: 0',
    '',
    'Program: 0,3,5,4,3,0'
]
text = readLines()

let initialA = 0
const initialB = Number.parseInt(text[1].split(':')[1])
const initialc = Number.parseInt(text[2].split(':')[1])
let regA = initialA + 0
let regB = Number.parseInt(text[1].split(':')[1])
let regC = Number.parseInt(text[2].split(':')[1])
let ip = 0 // Instruction pointer
const program = text[4].split(':')[1].split(',').map((a) => Number.parseInt(a))
const compareProgram = text[4].split(':')[1].trim()
let calculating = true
let output = []
let preValue = 0

while (!validateOutput(output.join(','))) {
    //initialA++
    regA = initialA + 0
    regB = initialB + 0
    regC = initialc + 0
    ip = 0 // Instruction pointer
    output = []
    simulateProgram()
    //  202356708354602
    //  105734774294938 -> TRUE???
    //  105734774294936 -> ?
    //  114668306016665
    //  33400000000

    if (initialA % 100000000 === 0) {
        console.log(initialA)
    }
}

// 105734774294936 -> TOO LOW
console.log("End: ", initialA)

function compareFull(arr) {
    let compare = true
    arr.forEach((e, index) => {
        if (e !== program[program.length - (arr.length - index)]) {
            compare = false
        }
    })
    return compare
}

function validateOutput(string) {
    let arr = string.split(',').map(Number)

    if (arr.length === program.length && compareFull(arr)) {
        console.log("Should be finished")
        return true
    } else if (compareFull(arr)) {
        preValue = initialA + 0
        initialA = initialA !== 0 ? initialA * 8 : 8
    } else if (initialA < preValue * 8 + 8) {
        initialA++
    } else {
        initialA = preValue + 1
    }

    return false
    /*
        if (string.length !== compareProgram.length) {
            return false
        } else {
            for (let i = 0; i < string.length; i++) {
                if (string[i].localeCompare(compareProgram[i]) !== 0) {
                    return false
                }
            }
        }
        return true
        */
}


function simulateProgram() {
    calculating = true
    while (calculating) {
        if (ip >= program.length) {
            calculating = false
        } else {
            let opcode = program[ip]
            let operand = program[ip + 1]
            //console.log("opcode: ", opcode, "\noperand: ", operand)
            let jump = performInstruction(opcode, takevalue(operand), operand)
            if (jump === undefined) {
                ip += 2 // Excepto salto
            } else {
                ip = jump
            }
        }
    }
}

//console.log("Halt: ", output.join(','))

function takevalue(op) {
    let value
    switch (op) {
        case 0:
        case 1:
        case 2:
        case 3:
            value = op + 0
            break
        case 4:
            value = regA + 0
            break
        case 5:
            value = regB + 0
            break
        case 6:
            value = regC + 0
            break
        case 7:
            throw new Error
    }
    return value
}

function performInstruction(operation, value, literal) {
    //console.log(operation, value)
    let jump = undefined
    switch (operation) {
        case 0:
            regA = Math.trunc(regA / (Math.pow(2, value)))
            break
        case 1:
            regB = regB ^ literal
            break
        case 2:
            regB = value % 8
            break
        case 3:
            jump = regA !== 0 ? literal : undefined
            break
        case 4:
            regB = regB ^ regC
            break
        case 5:
            output.push(value % 8)
            /*
            if (value % 8 !== program[output.length - 1]) {
                //console.log("Descartado: ", initialA)
                calculating = false
            }
*/
            break
        case 6:
            regB = Math.trunc(regA / (Math.pow(2, value)))
            break
        case 7:
            regC = Math.trunc(regA / (Math.pow(2, value)))
            break
    }
    return jump
}
