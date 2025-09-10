const { readInput } = require('./../../input')

var texto = readInput().split('\r\n')
/*
texto = [
    'H => OO',
    'H2O'
]
*/


var reemplazamientos = {}
var inicial = ''


//Colección de las distintas moléculas
var distintas = []

//Preparamos variables
texto.forEach((linea) => {
    var palabras = linea.split(' ')
    if (palabras.length > 1) {
        //  reemplazamiento
        if (reemplazamientos[palabras[0]] === undefined) {
            reemplazamientos[palabras[0]] = [palabras[2]]
        } else {
            reemplazamientos[palabras[0]].push(palabras[2])
        }
    } else if (palabras.length === 1) {
        inicial = linea
    }
})

console.log(reemplazamientos)

Object.keys(reemplazamientos).forEach((key) => {
    console.log('Key ', key)
    var lastIndex = -1
    reemplazamientos[key].forEach((molecula) => {
        do {
            console.log('Molecula ', molecula)
            var index = inicial.indexOf(key, lastIndex + 1)
            console.log('Indice', index)
            lastIndex = index
            if (index >= 0) {
                var modificacion = inicial.substring(0, index) + molecula + inicial.substring(index + key.length, inicial.length)
                var contenida = distintas.find((element) => { return element.localeCompare(modificacion) === 0 ? true : false })
                if (contenida === undefined) {
                    distintas.push(modificacion)
                    console.log('Hemos añadido una modificacion: ', distintas.length, molecula, key, modificacion)
                }
            }
        } while (lastIndex >= 0)
    })
})

//console.log(distintas)
console.log('Solucion', distintas.length)
