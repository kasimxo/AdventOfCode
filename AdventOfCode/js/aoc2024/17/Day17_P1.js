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

let output = []

while (!validateOutput(output.join(','))) {
    initialA++
    regA = initialA + 0
    regB = initialB + 0
    regC = initialc + 0
    ip = 0 // Instruction pointer
    output = []
    simulateProgram()
    //console.log(initialA)
}
console.log("End: ", initialA)

function validateOutput(string) {
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
}


function simulateProgram() {
    let calculating = true
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
