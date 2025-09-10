const { readLines } = require('./../../input')

let text = [
    '89010123',
    '78121874',
    '87430965',
    '96549874',
    '45678903',
    '32019012',
    '01329801',
    '10456732'
] // 36
text = [
    '10..9..',
    '2...8..',
    '3...7..',
    '4567654',
    '...8..3',
    '...9..2',
    '.....01'

]
text = [
    '..90..9',
    '...1.98',
    '...2..7',
    '6543456',
    '765.987',
    '876....',
    '987....'
]

text = readLines()

let count = 0

let heads = []

for (let y = 0; y < text.length; y++) {
    for (let x = 0; x < text[0].length; x++) {
        if (text[y][x] === "0") {
            heads.push({
                x: x,
                y: y,
                height: 0
            })
        }
    }
}

heads.forEach((head) => {
    count += calculateTrails(head)
})

console.log('Solucion: ', count)

function calculateTrails(head) {
    let ends = [] // guardamos los 9 visitados
    let goodEnds = 0
    let positions = [{
        x: head.x + 0,
        y: head.y + 0,
        height: head.height + 0
    }]
    while (positions.length > 0) {
        //console.log(positions)
        let curr = positions.shift()
        if (curr.height === 9) {
            ends.push(curr)
            goodEnds++
        } else {
            if (text[curr.y] !== undefined
                && text[curr.y][curr.x + 1] !== undefined
                && Number.parseInt(text[curr.y][curr.x + 1]) === curr.height + 1
                && !positions.some((pos) => pos.x === curr.x + 1 && pos.y === curr.y)) {
                positions.push({
                    x: curr.x + 1,
                    y: curr.y + 0,
                    height: curr.height + 1
                })
            }
            if (text[curr.y] !== undefined
                && text[curr.y][curr.x - 1] !== undefined
                && Number.parseInt(text[curr.y][curr.x - 1]) === curr.height + 1
                && !positions.some((pos) => pos.x === curr.x - 1 && pos.y === curr.y)) {
                positions.push({
                    x: curr.x - 1,
                    y: curr.y + 0,
                    height: curr.height + 1
                })
            }
            if (text[curr.y + 1] !== undefined
                && text[curr.y + 1][curr.x] !== undefined
                && Number.parseInt(text[curr.y + 1][curr.x]) === curr.height + 1
                && !positions.some((pos) => pos.x === curr.x && pos.y === curr.y + 1)) {
                positions.push({
                    x: curr.x + 0,
                    y: curr.y + 1,
                    height: curr.height + 1
                })
            }
            if (text[curr.y - 1] !== undefined
                && text[curr.y - 1][curr.x] !== undefined
                && Number.parseInt(text[curr.y - 1][curr.x]) === curr.height + 1
                && !positions.some((pos) => pos.x === curr.x && pos.y === curr.y - 1)) {
                positions.push({
                    x: curr.x + 0,
                    y: curr.y - 1,
                    height: curr.height + 1
                })
            }
        }
    }
    return goodEnds
}