const { readLines } = require('./input')

let text = [
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

]
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

            if (antiOne.x >= 0 && antiOne.x < WIDTH && antiOne.y >= 0 && antiOne.y < HEIGHT) {
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
            }
            if (antiTwo.x >= 0 && antiTwo.x < WIDTH && antiTwo.y >= 0 && antiTwo.y < HEIGHT) {
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
            }
        }
    }
})

console.log('Solucion: ', antinodes)