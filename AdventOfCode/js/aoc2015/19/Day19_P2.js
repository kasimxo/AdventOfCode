const { readInput } = require('./input')

var texto = readInput().split('\r\n')
/*
texto = [
    'H => OO',
    'HOHOHO'
]
    */

//texto = ['ARnBRnCYDArYERnFYGArAr']



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

// count(tokens) - count("(" or ")") - 2*count(",") - 1

//número de tokens
var tokens = 0
var rn = 0
var comas = 0

for (let i = 0; i < inicial.length; i++) {
    if (inicial[i].toUpperCase().localeCompare(inicial[i]) === 0) {

        //es una mayúscula
        if (i < inicial.length - 1 && inicial[i].localeCompare('R') === 0 && inicial[i + 1].localeCompare('n') === 0) {
            rn++
            tokens--
        } else if (i < inicial.length - 1 && inicial[i].localeCompare('A') === 0 && inicial[i + 1].localeCompare('r') === 0) {
            rn++
            tokens--
        } else if (inicial[i].localeCompare('Y') === 0) {
            comas++
            tokens--
            tokens--
        }
        tokens++
    }
}
tokens--
// count(tokens) - count("(" or ")") - 2*count(",") - 1
//var resultado = tokens - rn - 2 * comas - 1
console.log(tokens)
//console.log('Solucion: ', resultado)

/*
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
*/

//console.log(distintas)
//console.log('Solucion', inicial.length)

