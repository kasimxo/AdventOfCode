const { readInput } = require('./../../input')

var texto = readInput().split('\r\n')

var susanas = []

var filtro = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
}

texto.forEach((linea) => {
    var palabras = linea.replaceAll(':', '').replaceAll(',', '').split(' ')
    var index = Number.parseInt(palabras[1])
    var susana = {
        numero: index,
        [palabras[2]]: Number.parseInt(palabras[3]),
        [palabras[4]]: Number.parseInt(palabras[5]),
        [palabras[6]]: Number.parseInt(palabras[7])
    }
    susanas.push(susana)
})

Object.keys(filtro).forEach((key) => {
    susanas = susanas.filter((susana) => {
        if (susana[key] === undefined) {
            return true
        }
        if (key.localeCompare('cats') === 0 || key.localeCompare('trees') === 0) {
            if (susana[key] > filtro[key]) {
                return true
            }
        } else if (key.localeCompare('pomeranians') === 0 || key.localeCompare('goldfish') === 0) {
            if (susana[key] < filtro[key]) {
                return true
            }
        } else {
            if (susana[key] === filtro[key]) {
                return true
            }
        }
    })
})
console.log(susanas.length, susanas[0])

