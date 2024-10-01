const { readInput } = require('./input')

// cantidad encendidas
var total = 0

// Array que contiene las luces encendidas
var encendidas = {}

for (let i = 0; i <= 999; i++) {
    encendidas[i] = {}
    for (let j = 0; j <= 999; j++) {
        encendidas[i][j] = 0
    }
}

var texto = readInput().split('\r\n')
//Solucion: 998996
//texto = ['turn on 0,0 through 999,999', 'toggle 0,0 through 999,0', 'turn off 499,499 through 500,500']
//texto = ['turn on 0,0 through 0,0 ', 'toggle 0,0 through 999,999']
texto.forEach((linea) => {

    var palabras = linea.split(' ')

    if (palabras[0].localeCompare('toggle') === 0) {
        //Toggle  
        var startingX = Number.parseInt(palabras[1].split(',')[0])
        var startingY = Number.parseInt(palabras[1].split(',')[1])
        var endingX = Number.parseInt(palabras[palabras.length - 1].split(',')[0])
        var endingY = Number.parseInt(palabras[palabras.length - 1].split(',')[1])

        for (let y = startingY; y <= endingY; y++) {
            for (let x = startingX; x <= endingX; x++) {
                encendidas[y][x] += 2
            }
        }

    } else if (palabras[1].localeCompare('on') === 0) {
        //ON
        var startingX = Number.parseInt(palabras[2].split(',')[0])
        var startingY = Number.parseInt(palabras[2].split(',')[1])
        var endingX = Number.parseInt(palabras[palabras.length - 1].split(',')[0])
        var endingY = Number.parseInt(palabras[palabras.length - 1].split(',')[1])

        for (let y = startingY; y <= endingY; y++) {
            for (let x = startingX; x <= endingX; x++) {
                encendidas[y][x]++
            }
        }

    } else {
        //OFF

        var startingX = Number.parseInt(palabras[2].split(',')[0])
        var startingY = Number.parseInt(palabras[2].split(',')[1])
        var endingX = Number.parseInt(palabras[palabras.length - 1].split(',')[0])
        var endingY = Number.parseInt(palabras[palabras.length - 1].split(',')[1])

        for (let y = startingY; y <= endingY; y++) {
            for (let x = startingX; x <= endingX; x++) {
                if (encendidas[y][x] > 0) {
                    encendidas[y][x]--
                }
            }
        }
    }
})

for (let y = 0; y <= 999; y++) {
    for (let x = 0; x <= 999; x++) {
        total += encendidas[y][x]
    }
}

console.log(total)