const { readInput, readInputRaw } = require('./input')

var lit = 0
var memoria = 0

var texto = readInput()
texto.split('\r\n').forEach(linea => {
    var print = linea.replace(/^[\"]/, '')
        .replace(/\"$/, '')
        .replaceAll('\\\\', '\\')
        .replaceAll("\\\"", "a")
        .replaceAll(/\\x[0-9a-f][0-9a-f]/g, 'a')
    lit += linea.length
    memoria += print.length
})

console.log(lit - memoria)