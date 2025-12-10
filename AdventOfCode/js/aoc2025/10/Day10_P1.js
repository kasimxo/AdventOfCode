const { readLines } = require('../../input')

let input = readLines()

let machines = []
input.forEach(line => {
    let lights = getLights(line)
    let joltage = getJoltage(line)
    let combinations = getCombinations(line)
    machines.push({
        lights: lights,
        joltage: joltage,
        combinations: combinations
    })
    // este input necesita un mayor procesamiento
})
let sol = 0
machines.forEach(machine => sol += processMachine(machine))

console.log("SOLUTION: ", sol)

function getLights(line) {
    let splitted = line.split(' ')
    return Number.parseInt(splitted[0].substring(1, splitted[0].length - 1).replaceAll(".", '0').replaceAll("#", "1"), 2)
}

function getJoltage(line) {
    let splitted = line.split(' ')
    return splitted[splitted.length - 1].substring(1, splitted[splitted.length - 1].length - 1).split(',').map(Number)
}

function getCombinations(line) {
    let splitted = line.split(' ')
    let length = splitted[0].length - 2
    let combinationsRaw = splitted.slice(1, splitted.length - 1).map(combination => combination.substring(1, combination.length - 1).split(',').map(Number))
    let combinations = []
    combinationsRaw.forEach(combination => {
        let combinationString = ""
        for (let i = 0; i < length; i++) {
            if (combination.some(index => index == i)) {
                combinationString += "1"
            } else {
                combinationString += "0"
            }
        }
        console.log(splitted[0], combination, combinationString)
        combinations.push(Number.parseInt(combinationString, 2))
    })
    return combinations
}

/**
 * Ejemplo:
 *      .##. 
 *      0110 -> Target
 * 
 *      0001
 *      0101
        0010
        0011
        1010
        1100

    Cada operación que hacemos es un XOR
    Empezamos en:   0000
                    0101

    Para esto podemos ir haciendo una cola en la que ir procesando
    Pillamos el de la primera posición de la cola y agregamos todas las combinaciones al final

    Como posible mejora, si hemos visto esa combinación antes, descartamos
    En la cola guardamos las cosas
*/


// Esta función acepta una máquina y devuelve el mínimo número de combinaciones para dejarla ready
function processMachine(machine) {
    let initalState = [0, 0]
    let target = machine.lights
    let calculating = true
    let queue = [initalState]
    let minSteps = 0
    // Vamos a tener que implementar una cache para evitar estas cosas
    // Si el resultado del XOR está en la cache, no lo volvemos a añadir a la cola
    let cache = {}
    while (calculating && queue.length > 0) {
        let curr = queue.shift()
        let adding = []
        machine.combinations.forEach(combination => {
            if (!calculating) return
            let value = curr[0] ^ combination
            if (value == target) {
                console.log("found ", value, target, curr)
                calculating = false
                minSteps = curr[1] + 1
            } else {
                if(cache[value]==undefined){
                    adding.push([value, curr[1] + 1])
                    cache[value] = true
                } 
            }
        })
        queue = queue.concat(adding)
    }
    return minSteps
}