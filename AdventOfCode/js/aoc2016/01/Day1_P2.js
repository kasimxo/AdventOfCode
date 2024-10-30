const { readInput } = require('./input')

let raw = readInput().split(', ')

let test1 = { input: 'R8, R4, R4, R8', solution: 4 }
let test2 = { input: 'R2, L3, L1, L3', solution: 1 }
let test3 = { input: 'R2, R1, R1, R1', solution: 1 }
let test4 = { input: 'R5, L5, R5, R3, R6, L3', solution: 7 }
let test5 = { input: 'R1, R1, R1, R2', solution: 0 }
let test6 = { input: 'R1, R2, L1, L1, L2', solution: 2 }

//console.assert(algoritmo(test1.input.split(', ')) === test1.solution, 'T1 ' + algoritmo(test1.input.split(', ')))
//onsole.assert(algoritmo(test2.input.split(', ')) === test2.solution, 'T2 ' + algoritmo(test2.input.split(', ')))
//console.assert(algoritmo(test3.input.split(', ')) === test3.solution, 'T3 ' + algoritmo(test3.input.split(', ')))
console.assert(algoritmo(test4.input.split(', ')) === test4.solution, 'T4 ' + algoritmo(test4.input.split(', ')))
console.assert(algoritmo(test5.input.split(', ')) === test5.solution, 'T4 ' + algoritmo(test5.input.split(', ')))
console.assert(algoritmo(test6.input.split(', ')) === test6.solution, 'T4 ' + algoritmo(test6.input.split(', ')))

console.log(algoritmo(raw))


function algoritmo(texto) {
    let pos = { x: 0, y: 0 }
    let orientacion = 100 // 0 -> Norte | 1 -> Este | 2 -> Sur | 3 -> Oeste
    let locs = [{ x: 0, y: 0 }]
    let prueba = Infinity
    texto.forEach((dir) => {
        if (dir[0].localeCompare('R') === 0) {
            orientacion++
        } else {
            orientacion--
        }
        let dis = Number.parseInt(dir.substring(1))
        if (orientacion % 4 === 0) {
            for (let i = 0; i < dis; i++) {
                pos.y++
                if (findPos(locs, pos)) {
                    prueba = Math.abs(pos.x) + Math.abs(pos.y)
                    console.log(prueba)
                } else {
                    locs.push({ x: 0 + pos.x, y: 0 + pos.y })
                }
            }
        } else if (orientacion % 4 === 1) {
            for (let i = 0; i < dis; i++) {
                pos.x++
                if (findPos(locs, pos)) {
                    prueba = Math.abs(pos.x) + Math.abs(pos.y)
                    console.log(prueba)
                } else {
                    locs.push({ x: 0 + pos.x, y: 0 + pos.y })
                }
            }
        } else if (orientacion % 4 === 2) {
            for (let i = 0; i < dis; i++) {
                pos.y--
                if (findPos(locs, pos)) {
                    prueba = Math.abs(pos.x) + Math.abs(pos.y)
                    console.log(prueba)
                } else {
                    locs.push({ x: 0 + pos.x, y: 0 + pos.y })
                }
            }
        } else if (orientacion % 4 === 3) {
            for (let i = 0; i < dis; i++) {
                pos.x--
                if (findPos(locs, pos)) {
                    prueba = Math.abs(pos.x) + Math.abs(pos.y)
                    console.log(prueba)
                } else {
                    locs.push({ x: 0 + pos.x, y: 0 + pos.y })
                }
            }
        }
    })
    return prueba
}

function findPos(localizaciones, posicion) {
    let index = localizaciones.find((el) => el.x === posicion.x && el.y === posicion.y)
    return index !== undefined
}