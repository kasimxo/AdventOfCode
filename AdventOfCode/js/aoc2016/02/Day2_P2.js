const { readInput } = require('./../../input')

let texto = readInput().split('\r\n')

let teclado = [
    [0, 0, 1, 0, 0],
    [0, 2, 3, 4, 0],
    [5, 6, 7, 8, 9],
    [0, 10, 11, 12, 0],
    [0, 0, 13, 0, 0]
]

let abc = 'ABCD'

let pos = { col: 0, f: 2 }

texto.forEach((linea) => {
    for (let i = 0; i < linea.length; i++) {
        switch (linea[i]) {
            case 'U':
                moveUp()
                break
            case 'D':
                moveDown()
                break
            case 'L':
                moveLeft()
                break
            case 'R':
                moveRigth()
                break
        }
    }
    console.log(teclado[pos.f][pos.col] > 9 ? abc[teclado[pos.f][pos.col] - 10] : teclado[pos.f][pos.col])
})

function moveDown() {
    if (pos.f >= teclado.length - 1 || teclado[pos.f + 1] === undefined || teclado[pos.f + 1][pos.col] === 0) {
        return
    }
    pos.f++
}
function moveUp() {
    if (pos.f <= 0 || teclado[pos.f - 1] === undefined || teclado[pos.f - 1][pos.col] === 0) {
        return
    }
    pos.f--
}
function moveLeft() {
    if (pos.col <= 0 || teclado[pos.f][pos.col - 1] === undefined || teclado[pos.f][pos.col - 1] === 0) {
        return
    }
    pos.col--
}
function moveRigth() {
    if (pos.col >= teclado[0].length - 1 || teclado[pos.f][pos.col + 1] === undefined || teclado[pos.f][pos.col + 1] === 0) {
        return
    }
    pos.col++
}
