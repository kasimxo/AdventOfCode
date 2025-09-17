const { readLines } = require('../../input')
let input = readLines()
for (let i = 0; i < input.length; i++) {
    let [op, arg] = input[i].split(' ')
    if (op !== 'acc') {
        let inputA = [...input]
        inputA[i] = `jmp ${arg}`
        let gameA = SimulateGame(inputA)
        let inputB = [...input]
        inputB[i] = `nop ${arg}`
        let gameB = SimulateGame(inputB)
        if (gameA !== undefined) {
            console.log(gameA)
            break
        } else if (gameB !== undefined) {
            console.log(gameB)
            break
        }
    }
}

function SimulateGame(instructions) {
    let ip = 0
    let seen = new Set()
    let acc = 0
    while (true) {
        let instruction = instructions[ip]
        if (ip >= instructions.length) {
            return acc
        }
        if (seen.has(`${instruction}-${ip}`)) {
            return
        } else {
            seen.add(`${instruction}-${ip}`)
        }
        let [op, arg] = instruction.split(' ')
        switch (op) {
            case 'acc':
                acc += Number.parseInt(arg)
                ip++
                break;
            case 'nop':
                ip++
                break;
            case 'jmp':
                ip += Number.parseInt(arg)
                break;
        }
    }
}