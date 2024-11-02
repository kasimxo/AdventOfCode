const { readInput } = require('./input')

var texto = readInput().split('\r\n')

let cont = 0 //número de triángulos posibles

for (let i = 0; i < texto.length; i += 3) {
    let linea1 = texto[i].replaceAll(/[ ]+/g, ',').split(',')
    let linea2 = texto[i + 1].replaceAll(/[ ]+/g, ',').split(',')
    let linea3 = texto[i + 2].replaceAll(/[ ]+/g, ',').split(',')
    cont += validarTriangulo([linea1[1], linea2[1], linea3[1]])
    cont += validarTriangulo([linea1[2], linea2[2], linea3[2]])
    cont += validarTriangulo([linea1[3], linea2[3], linea3[3]])
}

console.log(cont)

function validarTriangulo(lados) {
    let l1 = Number.parseInt(lados[0])
    let l2 = Number.parseInt(lados[1])
    let l3 = Number.parseInt(lados[2])

    if (l1 + l2 > l3 && l1 + l3 > l2 && l2 + l3 > l1) { return 1 }

    return 0
}