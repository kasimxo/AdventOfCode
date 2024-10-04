const { readInput } = require('./input')

var texto = readInput()

for (let i = 0; i < 40; i++) {
    var nuevaCadena = ''

    var ultimoChar = ''
    var contador = 1

    for (let index = 0; index < texto.length; index++) {
        var char = texto[index]
        if (ultimoChar.localeCompare(char) === 0) {
            contador++
        } else if (ultimoChar.localeCompare('') !== 0) {
            nuevaCadena += contador + ultimoChar
            ultimoChar = char
            contador = 1
        } else {
            ultimoChar = char
        }
        if (index === texto.length - 1) {
            nuevaCadena += contador + ultimoChar
        }
    }

    texto = nuevaCadena + ''
}

console.log(texto.length)

