const { readInput } = require('./../../input')

var texto = readInput().split('\r\n')

let pesoTot = 0
let pesoGrupo = 0
let pesos = []
//Guardamos las posibilidades según su número de paquetes
let variantes = {}

texto.forEach((linea) => {
    pesoTot += Number.parseInt(linea)
    pesos.push(Number.parseInt(linea))
})
pesos = pesos.sort((a, b) => { a < b })
pesoGrupo = pesoTot / 3

let usados = Array(pesos.length).fill(false)


for (let i = pesos.length - 1; i >= 0; i--) {
    console.log(`ITERACION: ${i}`)
    let temp = copyArray(usados)
    temp[i] = true
    let remainder = pesoGrupo - pesos[i]
    console.log(remainder)
    calcularIteracion(temp, remainder, i)
}


console.log(usados)
console.log(pesoTot, pesoGrupo)

function calcularIteracion(visitados, remainder, index) {
    //console.log(remainder, index)
    for (let i = index - 1; i >= 0; i--) {
        //console.log(visitados)
        if (!visitados[i]) {
            let temp = copyArray(visitados)
            temp[i] = true
            let aux = remainder - pesos[i]
            if (aux < 0) {
            } else if (aux === 0) {
                let combo = []
                temp.forEach((element, index) => {
                    if (element) {
                        combo.push(pesos[index])
                    }
                })
                if (variantes[combo.length] !== undefined) {
                    variantes[combo.length].push(combo)
                } else {
                    variantes[combo.length] = [combo]
                }
            } else {
                calcularIteracion(temp, aux, i)
            }
        }
    }
}

console.log('POSIBILIDADES', variantes)
let keys = Object.keys(variantes)
let min = Infinity
keys.forEach((key) => { min = Math.min(min, Number.parseInt(key)) })

let cuantum = Infinity
variantes[min].forEach((array) => {
    let product = 1
    array.forEach((num) => { product *= num })
    cuantum = Math.min(product, cuantum)
})

console.log(cuantum)

function copyArray(array) {
    let temp = Array(array.length)
    array.forEach((element, index) => {
        if (element) {
            temp[index] = true
        } else {
            temp[index] = false
        }
    })
    return temp
}
