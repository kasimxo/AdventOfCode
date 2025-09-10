const { readInput } = require('./../../input')

var posicionA = { 'posX': 0, 'posY': 0 }
var posicionB = { 'posX': 0, 'posY': 0 }

var casas = []
casas.push({ 'posX': 0, 'posY': 0 })
var texto = readInput()
for (let i = 0; i < texto.length; i++) {
    if (i % 2 === 0) {
        //Santa
        switch (texto[i]) {
            case '<':
                posicionA.posX--
                break
            case '>':
                posicionA.posX++
                break
            case '^':
                posicionA.posY++
                break
            case 'v':
                posicionA.posY--
                break
        }
        if (casas.find((elemento) => elemento.posX === posicionA.posX && elemento.posY === posicionA.posY) === undefined) {
            casas.push({ 'posX': posicionA.posX, 'posY': posicionA.posY })
        }
    } else {

        switch (texto[i]) {
            case '<':
                posicionB.posX--
                break
            case '>':
                posicionB.posX++
                break
            case '^':
                posicionB.posY++
                break
            case 'v':
                posicionB.posY--
                break
        }
        if (casas.find((elemento) => elemento.posX === posicionB.posX && elemento.posY === posicionB.posY) === undefined) {
            casas.push({ 'posX': posicionB.posX, 'posY': posicionB.posY })
        }
    }


}
console.log(casas.length)