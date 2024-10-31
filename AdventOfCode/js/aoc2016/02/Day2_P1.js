const { readInput } = require('./input')

let texto = readInput().split('\r\n')

let pos = { x: 1, y: 1 }

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
    if (pos.y === 0) {
        console.log(pos.x + 1)
    } else if (pos.y === 1) {
        console.log(pos.x + 4)
    } else if (pos.y === 2) {
        console.log(pos.x + 7)
    }
})

function moveDown() {
    if (pos.y >= 2) {
        return
    }
    pos.y++
}
function moveUp() {
    if (pos.y <= 0) {
        return
    }
    pos.y--
}
function moveLeft() {
    if (pos.x <= 0) {
        return
    }
    pos.x--
}
function moveRigth() {
    if (pos.x >= 2) {
        return
    }
    pos.x++
}
