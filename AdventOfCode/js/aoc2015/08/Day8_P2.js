const { readInput, readInputRaw } = require('./../../input')

var lit = 0
var memoria = 0

var texto = readInput()
texto.split('\r\n').forEach(linea => {
    var print = linea.replace(/^[\"]/, 'dd')
        .replace(/\"$/, 'pp')
        .replaceAll('\\\\', 'cccc')
        .replaceAll("\\\"", "bbbb")
        .replaceAll(/\\x[0-9a-f][0-9a-f]/g, 'aaaaa')
    lit += linea.length
    memoria += print.length + 2
    //console.log(linea, linea.length, print.length + 2)
})

console.log(memoria - lit)