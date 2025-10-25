const {readLines} = require('../../input')
let input = readLines()
let registers = {}
let lastPlayed = 0
for(let i = 0; i<input.length; i){
    let increment = 1
    let line = input[i]
    let [op, pam1, pam2] = line.split(' ')
    console.log(op, pam1, pam2)
    if(IsRegister(pam1) && registers[pam1]==undefined){
        registers[pam1] = 0
    }
    if(IsRegister(pam2) && registers[pam2]==undefined){
        registers[pam2] = 0
    }
    switch(op){
        case 'snd':
            lastPlayed = registers[pam1]
            break
        case 'set':
            registers[pam1] = IsRegister(pam2) ? registers[pam2] : Number.parseInt(pam2)
            break
        case 'add':
            registers[pam1] += IsRegister(pam2) ? registers[pam2] : Number.parseInt(pam2)
            break
        case 'mul':
            registers[pam1] *= IsRegister(pam2) ? registers[pam2] : Number.parseInt(pam2)
            break
        case 'mod':
            registers[pam1] = IsRegister(pam2) ? registers[pam1] % registers[pam2] : registers[pam1] % Number.parseInt(pam2)
            break 
        case 'rcv':
            if(registers[pam1] !== 0){
                console.log("LAST PLAYED: ", lastPlayed)
                throw new Error
            }
            break
        case 'jgz':
            if(registers[pam1] !== 0){
                increment = IsRegister(pam2) ? registers[pam2] : Number.parseInt(pam2)
            }
            break
    }
    i += increment    
}
function IsRegister(parameter){
    return ('abcdefghijklmnopqrstuvwxyz').includes(parameter)
}