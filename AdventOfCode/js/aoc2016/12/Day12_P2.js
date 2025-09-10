const {readLines} = require('./../../input')

const lines = readLines()

let registers = {
    a: 0,
    b: 0,
    c: 1,
    d: 0
}

for(let i = 0; i<lines.length; i++) {
    const words = lines[i].split(' ')
    switch(words[0]){
        case 'inc':
            inc(words[1])
            break
        case 'dec':
            dec(words[1])
            break
        case 'cpy':
            cpy(words[1], words[2])
            break
        case 'jnz':
            i += jnz(words[1]) ? Number.parseInt(words[2]) - 1 : 0
            break
        default:
            break
    }
}
console.log(registers)
function inc(register){
    registers[register]++
}
function dec(register){
    registers[register]--
}
function cpy(value, register){
    if(!Number.isNaN(Number.parseInt(value)))
        registers[register] = Number.parseInt(value)
    else 
        registers[register] = registers[value]

}
function jnz(value){
    if(!Number.isNaN(Number.parseInt(value)))
        return Number.parseInt(value) !== 0
    
    return registers[value] !== 0
}