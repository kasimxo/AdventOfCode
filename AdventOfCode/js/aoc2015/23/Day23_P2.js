const { readInput } = require('./input')

var texto = readInput().split('\r\n')

let a = 1
let b = 0
let i = 0
while (i < texto.length) {

    let linea = texto[i]
    let palabras = linea.split(' ')
    switch (palabras[0]) {
        case 'hlf':
            if (palabras[1].localeCompare('a') === 0) {
                a = Math.round(a / 2)
            } else {
                b = Math.round(b / 2)
            }
            i++
            break
        case 'tpl':
            if (palabras[1].localeCompare('a') === 0) {
                a *= 3
            } else {
                b *= 3
            }
            i++
            break
        case 'inc':
            if (palabras[1].localeCompare('a') === 0) {
                a++
            } else {
                b++
            }
            i++
            break
        case 'jmp':
            i = i + numberValue(palabras[1])
            break
        case 'jie':
            if (palabras[1].localeCompare('a,') === 0) {
                if (a % 2 === 0) {
                    i = i + numberValue(palabras[2])
                } else { i++ }
            } else {
                if (b % 2 === 0) {
                    i = i + numberValue(palabras[2])
                } else { i++ }
            }
            break
        case 'jio':
            if (palabras[1].localeCompare('a,') === 0) {
                if (a === 1) {
                    i = i + numberValue(palabras[2])
                } else { i++ }
            } else {
                if (b === 1) {
                    i = i + numberValue(palabras[2])
                } else { i++ }
            }
            break
    }

}

console.log(`a: ${a}, b: ${b}`)

function numberValue(string) {
    if (string[0].localeCompare('+') === 0) {
        let num = Number.parseInt(string.substring(1))
        return num
    } else {
        let num = Number.parseInt(string.substring(1))
        return (num) * -1
    }
}