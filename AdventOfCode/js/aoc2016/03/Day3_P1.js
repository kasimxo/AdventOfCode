const { readInput } = require('./../../input')

var texto = readInput().split('\r\n')

let cont = 0 //número de triángulos posibles

texto.forEach((linea) => {
    let lados = linea.split(' ')
    console.log(lados)
    cont += validarTriangulo(lados)
})


console.log(cont)

function validarTriangulo(lados) {
    let l1 = undefined
    let l2 = undefined
    let l3 = undefined
    lados.forEach((el) => {
        if (el.length === 0) { return }
        if (l1 === undefined) { l1 = Number.parseInt(el) }
        else if (l2 === undefined) { l2 = Number.parseInt(el) }
        else if (l3 === undefined) { l3 = Number.parseInt(el) }
    })


    if (l1 + l2 > l3 && l1 + l3 > l2 && l2 + l3 > l1) { return 1 }

    return 0
}