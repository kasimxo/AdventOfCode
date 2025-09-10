const { readLines } = require('./../../input')

const text = readLines()
const WIDTH = 50
const HEIGHT = 6

let screen = Array(HEIGHT)
for (let i = 0; i < HEIGHT; i++) {
    screen[i] = Array(WIDTH).fill(false)
}

text.forEach((line) => {
    let words = line.split(' ')
    switch (words[0]) {
        case 'rect':
            screen = createRect(words[1], screen)
            break
        case 'rotate':
            if (words[1].localeCompare('row') === 0) {
                screen = rotateRow(Number.parseInt(words[2].split('=')[1]), Number.parseInt(words[4]), screen)
            } else {
                screen = rotateColumn(Number.parseInt(words[2].split('=')[1]), Number.parseInt(words[4]), screen)
            }
            break
    }
})

console.log('Solución: ', pixelsLit(screen))

function rotateColumn(x, rotation, screen) {
    let tempCol = Array(HEIGHT).fill(false)
    for (let y = 0; y < HEIGHT; y++) {
        tempCol[(y + rotation) % HEIGHT] = screen[y][x]
    }
    tempCol.forEach((el, i) => {
        screen[i][x] = el
    })
    return screen
}

function rotateRow(y, rotation, screen) {
    let tempRow = Array(WIDTH).fill(false)
    for (let x = 0; x < WIDTH; x++) {
        tempRow[(x + rotation) % WIDTH] = screen[y][x]
    }
    screen[y] = tempRow
    return screen
}

function createRect(words, screen) {
    let [width, height] = words.split('x')
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            screen[y][x] = true
        }
    }
    return screen
}

function pixelsLit(screen) {
    let count = 0
    screen.forEach((row) => {
        let print = ''
        row.forEach((cell) => {
            if (cell) {
                count++
                print += '# '
            } else {
                print += '. '
            }
        })
        console.log(print)
    })
    return count
}