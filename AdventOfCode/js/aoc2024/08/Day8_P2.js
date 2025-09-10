const { readLines } = require('./../../input')
let text = [
    'T.........',
    '...T......',
    '.T........',
    '..........',
    '..........',
    '..........',
    '..........',
    '..........',
    '..........',
    '..........'
]
/*
text = [
    '............',
    '........0...',
    '.....0......',
    '.......0....',
    '....0.......',
    '......A.....',
    '............',
    '............',
    '........A...',
    '.........A..',
    '............',
    '............'
]*/

text = readLines()

//lo primero leer el mapa y extraer la posición de los nodos
// Las posiciones de los nodos las agrupamos por 'tipo'
// Para cada par de posiciones de nodo, calculamos la posición de su antinodo
// Si esa posición está dentro de los límites del mapa, la contamos
let nodes = []
let antinodes = 0
let uniques = []
const WIDTH = text[0].length
const HEIGHT = text.length

text.forEach((line, y) => {
    line.split('').forEach((letter, x) => {
        if (letter !== '.') {
            if (Object.hasOwn(nodes, letter)) {
                nodes[letter].push({
                    x: x,
                    y: y
                })
            } else {
                nodes[letter] = [{
                    x: x,
                    y: y
                }]
            }
            uniques.push({
                x: x,
                y: y
            })
        }
    })
})

Object.keys(nodes).forEach((key) => {
    for (let i = 0; i < nodes[key].length - 1; i++) {
        let nodeOne = nodes[key][i]
        for (let j = i + 1; j < nodes[key].length; j++) {
            let nodeTwo = nodes[key][j]
            let vecW = Math.abs(nodeOne.x - nodeTwo.x)
            let vecH = Math.abs(nodeOne.y - nodeTwo.y)
            //console.log(vecW, vecH)
            let antiOne = {
                x: nodeOne.x + (nodeOne.x < nodeTwo.x ? -vecW : vecW),
                y: nodeOne.y + (nodeOne.y < nodeTwo.y ? -vecH : vecH)
            }
            let antiTwo = {
                x: nodeTwo.x + (nodeOne.x < nodeTwo.x ? vecW : -vecW),
                y: nodeTwo.y + (nodeOne.y < nodeTwo.y ? vecH : -vecH)
            }
            while (inBounds(antiOne)) {
                if (!uniques.some((loc) => loc.x === antiOne.x && loc.y === antiOne.y)) {
                    antinodes++
                    uniques.push({
                        x: antiOne.x + 0,
                        y: antiOne.y + 0
                    })
                    //console.log(antiOne, nodeOne, nodeTwo)
                } else {
                    //console.error('jaja')
                }
                antiOne.x += (nodeOne.x < nodeTwo.x ? -vecW : vecW)
                antiOne.y += (nodeOne.y < nodeTwo.y ? -vecH : vecH)
            }

            while (inBounds(antiTwo)) {
                if (!uniques.some((loc) => loc.x === antiTwo.x && loc.y === antiTwo.y)) {
                    antinodes++
                    uniques.push({
                        x: antiTwo.x + 0,
                        y: antiTwo.y + 0
                    })
                    //console.log(antiTwo, nodeOne, nodeTwo)
                } else {
                    //console.error('jaja')
                }
                antiTwo.x += (nodeOne.x < nodeTwo.x ? vecW : -vecW)
                antiTwo.y += (nodeOne.y < nodeTwo.y ? vecH : -vecH)
            }
        }
    }
})
let count = 0
/*
Object.keys(nodes).forEach((loc) => {
    if (!uniques.some((dup) => dup.x === loc.x && dup.y === loc.y)) {
        count++
        uniques.push({
            x: loc.x + 0,
            y: loc.y + 0
        })
    }
})
    */
for (let y = 0; y < HEIGHT; y++) {
    let line = ''
    for (let x = 0; x < WIDTH; x++) {
        if (uniques.some((loc) => loc.x === x && loc.y === y)) {
            line += '#'
            count++
        } else {
            line += '.'
        }
    }
    console.log(line)
}

console.log('Solucion: ', antinodes, count, uniques.length)

function inBounds(node) {
    return node.x >= 0 && node.x < WIDTH && node.y >= 0 && node.y < HEIGHT
}