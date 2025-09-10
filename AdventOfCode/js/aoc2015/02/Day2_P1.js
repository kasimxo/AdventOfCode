const { readInput } = require('./../../input')

//  L   W   H
//2*l*w + 2*w*h + 2*h*l

var total = 0
var texto = readInput()
texto.split('\n').forEach((linea) => {
    let separado = linea.split('x')
    let lados = [separado[0] * separado[1], separado[1] * separado[2], separado[2] * separado[0]]
    total += lados.sort((a, b) => { if (a < b) { return -1 } else { return 1 } })[0] + 2 * (lados[0] + lados[1] + lados[2])
})

console.log(total)

