const { readInput } = require('./input')

var texto = readInput().split('\n')
const vocales = 'aeiou'
const combinaciones = ['ab', 'cd', 'pq', 'xy']
var cuentaVocales = 0
var dobleLetra = false
var cumpleCombinaciones = true
var total = 0
texto.forEach((linea) => {

    for (let i = 0; i < linea.length; i++) {
        if (vocales.includes(linea[i])) { cuentaVocales++ }

        if (i > 0 && linea[i].localeCompare(linea[i - 1]) === 0) {
            dobleLetra = true
        }
        combinaciones.forEach((combinacion) => {
            if (linea.includes(combinacion)) {
                cumpleCombinaciones = false
            }
        })
    }

    if (cuentaVocales >= 3 && dobleLetra && cumpleCombinaciones) {
        total++
    }
    cuentaVocales = 0
    dobleLetra = false
    cumpleCombinaciones = true
})
console.log(total)


