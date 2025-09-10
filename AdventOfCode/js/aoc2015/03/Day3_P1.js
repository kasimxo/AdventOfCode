const { readInput } = require('./../../input')

var posicion = { 'posX': 0, 'posY': 0 }
var casas = []
casas.push({ 'posX': 0, 'posY': 0 })
var texto = readInput()
for (let i = 0; i < texto.length; i++) {
    switch (texto[i]) {
        case '<':
            posicion.posX--
            break
        case '>':
            posicion.posX++
            break
        case '^':
            posicion.posY++
            break
        case 'v':
            posicion.posY--
            break
    }

    if (casas.find((elemento) => elemento.posX === posicion.posX && elemento.posY === posicion.posY) === undefined) {
        casas.push({ 'posX': posicion.posX, 'posY': posicion.posY })
    }
}
console.log(casas.length)