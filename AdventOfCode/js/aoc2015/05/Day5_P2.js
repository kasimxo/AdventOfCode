const { readInput } = require('./input')

var texto = readInput().split('\n')

//texto = ['qjhvhtzxzqqjkmpb', 'uurcxstgmygtbstg', 'ieodomkazucvgmuy', 'xxyxx']

// xyxy sin overlap
var cumpleCombinacionDoble = false
// ara una letra de separación
var cumpleLetraRepetida = false
var total = 0
texto.forEach((linea) => {

    for (let i = 2; i < linea.length; i++) {

        var combinacionDoble = linea.substring(i - 2, i)

        var index = linea.substring(i, linea.length).search(combinacionDoble)

        if (index > -1) {
            cumpleCombinacionDoble = true
        }

        if (linea[i - 2].localeCompare(linea[i]) === 0) {
            cumpleLetraRepetida = true
        }
    }

    if (cumpleCombinacionDoble && cumpleLetraRepetida) {
        total++
    }

    cumpleLetraRepetida = false
    cumpleCombinacionDoble = false
})
console.log(total)


