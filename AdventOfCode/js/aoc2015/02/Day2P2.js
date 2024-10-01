const { readInput } = require('./input')

//  L   W   H
//2*l*w + 2*w*h + 2*h*l

var total = 0
var texto = readInput()
texto.split('\n').forEach((linea) => {
    let separado = linea.split('x')
    let ladoA = Number.parseInt(separado[0])
    let ladoB = Number.parseInt(separado[1])
    let ladoC = Number.parseInt(separado[2])
    let perimetros = [2 * (ladoA + ladoB), 2 * (ladoB + ladoC), 2 * (ladoC + ladoA)]
    total += perimetros.sort((a, b) => { if (a < b) { return -1 } else { return 1 } })[0] + (ladoA * ladoB * ladoC)
})

console.log(total)
