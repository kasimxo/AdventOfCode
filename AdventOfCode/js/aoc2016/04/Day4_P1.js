const { readLines } = require('./input')
var texto = readLines()

let num = 0 // Suma de las ids de las habitaciones válidas

//recorrer todas las habitaciones
//Identificar si son válidas
//Sumar el id

texto.forEach((linea) => {
    if (validarHabitacion(linea)) {
        num += sumarId(linea)
    }
})

console.log(num)

function validarHabitacion(linea) {
    let divs = linea.replaceAll('-', '').split('[')
    let parte1 = divs[0]
    let parte2 = divs[1].replaceAll(']', '')
    let letras = {}
    for (let i = 0; i < parte1.length; i++) {
        if (Number.isNaN(Number.parseInt(parte1[i]))) {
            if (letras.hasOwnProperty(parte1[i])) {

                letras[parte1[i]] = letras[parte1[i]] + 1
            } else {
                letras[parte1[i]] = 1
            }
        }
    }

    //Almacenamos las letras ordenadas por cantidad, en caso de empate, por orden alfabetico
    let letrasOrdenadas = []
    Object.keys(letras).forEach((key) => {
        letrasOrdenadas.push([key, letras[key]])
    })

    letrasOrdenadas = letrasOrdenadas.sort((a, b) => {
        if (b[1] !== a[1]) {
            return b[1] - a[1]
        } else {
            return a[0].charCodeAt(0) - b[0].charCodeAt(0)
        }

    })

    for (let i = 0; i < parte2.length; i++) {
        if (parte2[i].localeCompare(letrasOrdenadas[i][0]) !== 0) {
            console.log('letrasOrdenadas')
            return false
        }
    }
    return true
}

function sumarId(linea) {
    let sum = '0'
    for (let i = 0; i < linea.length; i++) {
        if (!Number.isNaN(Number.parseInt(linea[i]))) {
            sum += linea[i]
        }
    }
    return Number.parseInt(sum)
}