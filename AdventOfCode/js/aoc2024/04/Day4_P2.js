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


text.forEach((linea) => {
    let newLine = []
    linea.split('').forEach((letra) => {
        newLine.push('.')
    })
    debug.push(newLine)
})

let count = 0

let possibilities = [
    'MMASS',
    'MSAMS',
    'SMASM',
    'SSAMM'
]
/*
M M     M S     S S     S M
 A       A       A       A
S S     M S     M M     S M
*/

for (let y = 0; y < text.length; y++) {
    for (let x = 0; x < text[y].length; x++) {
        try {

            let word = text[y - 1][x - 1] + text[y - 1][x + 1] + text[y][x] + text[y + 1][x - 1] + text[y + 1][x + 1]
            if (possibilities.includes(word)) {
                count++
            }
        } catch (e) {

        }
    }
}



console.log('Solucion: ', count)