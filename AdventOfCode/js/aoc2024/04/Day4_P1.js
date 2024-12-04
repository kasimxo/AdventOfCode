const { readLines } = require('./input')


let text = [
    'MMMSXXMASM',
    'MSAMXMSMSA',
    'AMXSXMAAMM',
    'MSAMASMSMX',
    'XMASAMXAMM',
    'XXAMMXXAMA',
    'SMSMSASXSS',
    'SAXAMASAAA',
    'MAMMMXMMMM',
    'MXMXAXMASX'
]
text = readLines()
let debug = []

//2528 too low

text.forEach((linea) => {
    let newLine = []
    linea.split('').forEach((letra) => {
        newLine.push('.')
    })
    debug.push(newLine)
})

let count = 0

for (let y = 0; y < text.length; y++) {
    for (let x = 0; x < text[y].length; x++) {
        if (x < text[y].length - 3) {
            let forward = text[y].substring(x, x + 4)
            count += forward.localeCompare('XMAS') === 0 ? 1 : 0
            if (forward.localeCompare('XMAS') === 0) {
                debug[y][x] = 'X'
                console.log('forward')
            }
        }
        if (x > 2) {
            let backward = text[y][x] + text[y][x - 1] + text[y][x - 2] + text[y][x - 3]
            count += backward.localeCompare('XMAS') === 0 ? 1 : 0
            if (backward.localeCompare('XMAS') === 0) {
                debug[y][x] = 'X'
                console.log('backward')
            }
        }
        if (y < text.length - 3) {
            let downward = text[y][x] + text[y + 1][x] + text[y + 2][x] + text[y + 3][x]
            count += downward.localeCompare('XMAS') === 0 ? 1 : 0
            if (downward.localeCompare('XMAS') === 0) {
                debug[y][x] = 'X'
                console.log('downward')
            }
        }
        if (y > 2) {
            let upward = text[y][x] + text[y - 1][x] + text[y - 2][x] + text[y - 3][x]
            count += upward.localeCompare('XMAS') === 0 ? 1 : 0
            if (upward.localeCompare('XMAS') === 0) {
                debug[y][x] = 'X'
                console.log('upward')
            }
        }

        if (x < text[y].length - 3 && y < text.length - 3) {
            let downforward = text[y][x] + text[y + 1][x + 1] + text[y + 2][x + 2] + text[y + 3][x + 3]
            count += downforward.localeCompare('XMAS') === 0 ? 1 : 0
            if (downforward.localeCompare('XMAS') === 0) {
                debug[y][x] = 'X'
                console.log('downforward')
            }
        }
        if (x > 2 && y < text.length - 3) {
            let downbackward = text[y][x] + text[y + 1][x - 1] + text[y + 2][x - 2] + text[y + 3][x - 3]
            count += downbackward.localeCompare('XMAS') === 0 ? 1 : 0
            if (downbackward.localeCompare('XMAS') === 0) {
                debug[y][x] = 'X'
                console.log('downbackward')
            }
        }



        if (y > 2 && x < text[y].length - 3) {
            let upforward = text[y][x] + text[y - 1][x + 1] + text[y - 2][x + 2] + text[y - 3][x + 3]
            count += upforward.localeCompare('XMAS') === 0 ? 1 : 0
            if (upforward.localeCompare('XMAS') === 0) {
                debug[y][x] = 'X'
                console.log('upforward')
            }
        }
        if (y > 2 && x > 2) {
            let upbackward = text[y][x] + text[y - 1][x - 1] + text[y - 2][x - 2] + text[y - 3][x - 3]
            count += upbackward.localeCompare('XMAS') === 0 ? 1 : 0
            if (upbackward.localeCompare('XMAS') === 0) {
                debug[y][x] = 'X'
                console.log('upbackward')
            }
        }
    }
}









console.log(debug.join('\n'))
console.log('Solucion: ', count)