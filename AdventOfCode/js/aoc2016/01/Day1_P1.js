const { readInput } = require('./../../input')

let raw = readInput().split(', ')

let test1 = { input: 'R2, L3', solution: 5 }
let test2 = { input: 'R2, R2, R2', solution: 2 }
let test3 = { input: 'R5, L5, R5, R3', solution: 12 }

console.assert(algoritmo(test1.input.split(', ')) === test1.solution, 'T1 ' + algoritmo(test1.input.split(', ')))
console.assert(algoritmo(test2.input.split(', ')) === test2.solution, 'T2 ' + algoritmo(test2.input.split(', ')))
console.assert(algoritmo(test3.input.split(', ')) === test3.solution, 'T3 ' + algoritmo(test3.input.split(', ')))


console.log(algoritmo(raw))


function algoritmo(texto) {
    let pos = { x: 0, y: 0 }
    let orientacion = 100 // 0 -> Norte | 1 -> Este | 2 -> Sur | 3 -> Oeste
    texto.forEach((dir) => {
        if (dir[0].localeCompare('R') === 0) {
            orientacion++
        } else {
            orientacion--
        }
        switch (orientacion % 4) {
            case 0:
                pos.y += Number.parseInt(dir.substring(1))
                break
            case 1:
                pos.x += Number.parseInt(dir.substring(1))
                break
            case 2:
                pos.y -= Number.parseInt(dir.substring(1))
                break
            case 3:
                pos.x -= Number.parseInt(dir.substring(1))
                break
        }
    })
    return Math.abs(pos.x + pos.y)
}