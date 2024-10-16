const { readInput } = require('./input')

var texto = readInput().split('\r\n')

var tablero = []

var dimensiones = 100
var pasos = 100

for (let i = 0; i < dimensiones; i++) {
    tablero.push(Array(dimensiones).fill(false))
}

tablero[0][0] = true
tablero[dimensiones - 1][0] = true
tablero[0][dimensiones - 1] = true
tablero[dimensiones - 1][dimensiones - 1] = true


iniciarTablero()

printTablero()

for (let i = 0; i < pasos; i++) {
    console.log('Step ', i)
    tablero = avanzarTablero()
    //printTablero()
}

mostrarCeldasVivas()

//console.log(tablero)


function iniciarTablero() {
    texto.forEach((linea, fila) => {
        for (let columna = 0; columna < linea.length; columna++) {
            if (linea[columna].localeCompare('#') === 0) {
                tablero[fila][columna] = true
            }
        }
    })
}

function mostrarCeldasVivas() {
    var total = 0
    tablero.forEach((linea) => { linea.forEach((celda) => { if (celda) { total++ } }) })
    console.log(total)
}

function avanzarTablero() {
    var newTablero = []

    for (let i = 0; i < dimensiones; i++) {
        newTablero.push(Array(dimensiones).fill(false))
    }

    for (let fila = 0; fila < tablero.length; fila++) {
        for (let columna = 0; columna < tablero[fila].length; columna++) {
            let vivas = 0 //Contamos las celdas vivas

            if (tablero[fila - 1] !== undefined) {
                if (tablero[fila - 1][columna - 1] !== undefined && tablero[fila - 1][columna - 1]) {
                    vivas++
                }
                if (tablero[fila - 1][columna] !== undefined && tablero[fila - 1][columna]) {
                    vivas++
                }
                if (tablero[fila - 1][columna + 1] !== undefined && tablero[fila - 1][columna + 1]) {
                    vivas++
                }
            }

            if (tablero[fila][columna - 1] !== undefined && tablero[fila][columna - 1]) {
                vivas++
            }
            if (tablero[fila][columna + 1] !== undefined && tablero[fila][columna + 1]) {
                vivas++
            }

            if (tablero[fila + 1] !== undefined) {
                if (tablero[fila + 1][columna - 1] !== undefined && tablero[fila + 1][columna - 1]) {
                    vivas++
                }
                if (tablero[fila + 1][columna] !== undefined && tablero[fila + 1][columna]) {
                    vivas++
                }
                if (tablero[fila + 1][columna + 1] !== undefined && tablero[fila + 1][columna + 1]) {
                    vivas++
                }
            }

            if (tablero[fila][columna] === true && (vivas === 2 || vivas === 3)) {

                newTablero[fila][columna] = true
            } else if (tablero[fila][columna] === false && vivas === 3) {
                newTablero[fila][columna] = true
            }
        }
    }

    newTablero[0][0] = true
    newTablero[dimensiones - 1][0] = true
    newTablero[0][dimensiones - 1] = true
    newTablero[dimensiones - 1][dimensiones - 1] = true

    return newTablero
}

function printTablero() {
    for (let fila = 0; fila < tablero.length; fila++) {
        var linea = ''
        for (let columna = 0; columna < tablero[fila].length; columna++) {
            if (tablero[fila][columna]) {
                linea += '#'
            } else {
                linea += '.'
            }
        }
        console.log(linea)
    }
}