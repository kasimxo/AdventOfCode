const { readInput } = require('./../../input')

var texto = readInput()
const json = JSON.parse(texto)

var resultado = 0

iterateObject(json)

console.log(resultado)

function iterateObject(objeto) {

    var valido = true

    Object.keys(objeto).forEach((key) => {
        if (typeof objeto[key] === 'string' && objeto[key].localeCompare('red') === 0) {
            valido = false
        }
    })

    if (valido === false) {
        return
    }

    Object.keys(objeto).forEach((key) => {
        //console.log(objeto[key])
        var value = Number.parseInt(objeto[key])
        if (Array.isArray(objeto[key])) {
            //console.log('TEST ARRAY ', objeto[key])
            iterateArray(objeto[key])
        } else if (!Number.isNaN(value)) {
            resultado += value
        } else if (typeof objeto[key] === 'string') {
            //console.log('ERROR CADENA ', objeto[key])
        } else if (typeof objeto[key] === 'object') {
            iterateObject(objeto[key])
        } else {
        }
    })
}

function iterateArray(coleccion) {
    coleccion.forEach((element) => {
        var value = Number.parseInt(element)
        if (Array.isArray(element)) {
            iterateArray(element)
        } else if (!Number.isNaN(value)) {
            resultado += value
        } else if (typeof element === 'string') {
        } else if (typeof element === 'object') {
            iterateObject(element)
        } else {
        }
    })
}

/*
resultado = 0
var ultimoNumero = ''

for (let i = 0; i < texto.length; i++) {
    var char = texto[i]
    if (!Number.isNaN(Number.parseInt(texto[i]))) {
        ultimoNumero += texto[i]
    } else if (ultimoNumero.localeCompare('') !== 0) {
        resultado += Number.parseInt(ultimoNumero)
        ultimoNumero = ''
    }
}

console.log(resultado)
*/