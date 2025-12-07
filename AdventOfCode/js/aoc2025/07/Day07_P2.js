const { readLines } = require('../../input')

let input = readLines()
input[0] = input[0].replaceAll('S', '|')
let sol = 0
/**
 * La cache va a tener la siguiente estructura clave valor (donde valor es la cantidad de timelines para esa clave)
 * 
 * Clave: 'Longitud de pirámide'-'Index del nodo que se toca'
 */
let cache = {}

/**
 * Vamos a hacer una función recursiva a la que le podamos pasar la parte inferior de la pirámide y devuelva el número de timelines
 * 
 * Tendremos una caché para evitar comprobaciones dobles
 * 
 * La condición de paro de la función recursiva será la longitud de la pirámide. 
 * 
 * Si la longitud es 1, ahí ya deberíamos saber la cantidad de timelines
 */

sol = calculateTimelines(input[0], input.slice(1))

function calculateTimelines(prevRow, pyramid) {
    if (pyramid.length == 0) {
        return 1
    }

    let currRow = pyramid[0]

    let count = 0
    let newRow = ""

    for (let charAt = 0; charAt < currRow.length; charAt++) {
        if (prevRow[charAt] == '|' && currRow[charAt] == '.') {
            newRow = currRow.substring(0, charAt) + '|' + currRow.substring(charAt + 1)
            count += calculateTimelines(newRow, pyramid.slice(1))
        } else if (prevRow[charAt] == '|' && currRow[charAt] == '|') {

        } else if (prevRow[charAt] == '|' && currRow[charAt] == '^') {
            if (cache[`${pyramid.length}-${charAt}`] == undefined) {
                let timelines = 0
                if (charAt > 0) {
                    newRow = currRow.substring(0, charAt - 1) + '|' + currRow.substring(charAt)
                    timelines += calculateTimelines(newRow, pyramid.slice(1))
                }

                if (charAt < currRow.length - 1) {
                    newRow = currRow.substring(0, charAt + 1) + '|' + currRow.substring(charAt + 2)
                    timelines += calculateTimelines(newRow, pyramid.slice(1))
                }
                cache[`${pyramid.length}-${charAt}`] = timelines
            }
            count += cache[`${pyramid.length}-${charAt}`]
        }
    }
    return count
}
console.log(cache)
console.log(sol)