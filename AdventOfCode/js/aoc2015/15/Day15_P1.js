const { readInput } = require('./../../input')

var texto = readInput().split('\r\n')
/*
var texto = ['Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8',
    'Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3']
*/
var puntuacion = 0

var ingredientes = []

texto.forEach((linea) => {
    var palabras = linea.replace(':', '').replace(',', '').split(' ')
    var capacity = Number.parseInt(palabras[2])
    var durability = Number.parseInt(palabras[4])
    var flavor = Number.parseInt(palabras[6])
    var texture = Number.parseInt(palabras[8])
    //var calories = Number.parseInt(palabras[10])

    ingredientes.push({

        nombre: palabras[0],
        cuantity: 0,
        capacity: capacity,
        durability: durability,
        flavor: flavor,
        texture: texture

    })
})

//Replicar esto para cada uno de los ingredientes
//var indice = 0

iterarIngredientes(0, 100)

/**
 * 
 * @param {*} index El ingrediente que estamos iterando
 * @param {*} cantidad El remainder (la cantidad libre por asignar)
 */
function iterarIngredientes(index, cantidad) {
    if (index === ingredientes.length - 1) {
        ingredientes[index].cuantity = cantidad
        puntuacion = Math.max(puntuacion, calcularPuntuacion())
    } else {
        for (let i = cantidad; i >= 0; i--) {
            ingredientes[index].cuantity = i
            iterarIngredientes(index + 1, cantidad - i)
        }
    }
}


/*
for (let i = 100; i >= 0; i--) {
    ingredientes[0].cuantity = i
    ingredientes[1].cuantity = 100 - i
    puntuacion = Math.max(puntuacion, calcularPuntuacion())
}
    */

console.assert(puntuacion === 62842880, { puntuacion })
console.log('Resultado: ', puntuacion)

//console.log(texto)


function calcularPuntuacion() {
    var resultado = 0
    var capacityTot = 0
    var durabilityTot = 0
    var flavorTot = 0
    var textureTot = 0
    ingredientes.forEach((ingrediente) => {
        capacityTot += ingrediente.capacity * ingrediente.cuantity
        durabilityTot += ingrediente.durability * ingrediente.cuantity
        flavorTot += ingrediente.flavor * ingrediente.cuantity
        textureTot += ingrediente.texture * ingrediente.cuantity
    })
    if (capacityTot <= 0 || durabilityTot <= 0 || flavorTot <= 0 || textureTot <= 0) {
        return 0
    } else {
        resultado = capacityTot * durabilityTot * flavorTot * textureTot
        return resultado
    }
}