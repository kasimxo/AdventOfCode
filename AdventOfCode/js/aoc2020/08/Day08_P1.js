const { readLines } = require('../../input')
let instructions = readLines()
let ip = 0
let seen = new Set()
let acc = 0
let calculating = true
while (calculating) {
    let instruction = instructions[ip]
    if (seen.has(`${instruction}-${ip}`)) {
        calculating = false
        break
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
console.log(acc)