const { readLines } = require('./../../input')

text = [
    '5,4',
    '4,2',
    '4,5',
    '3,0',
    '2,1',
    '6,3',
    '2,4',
    '1,5',
    '0,6',
    '3,3',
    '2,6',
    '5,1',
    '1,2',
    '5,5',
    '2,5',
    '6,5',
    '1,4',
    '0,4',
    '6,4',
    '1,1',
    '6,1',
    '1,0',
    '0,5',
    '1,6',
    '2,0'
]
text = readLines()
console.log(text[2958])
return
const WIDTH = 70
const HEIGHT = 70
const steps = 2959


/**
 * Second part can be solved by "hand" w/ bidirectional search:
 * 
 * Test middle value, if it founds a solution, test upper middle value, if it doesn't test lower middle value
 * 
 * You will quickly find the edge case
 */

// 3450 NO
// 3000 NO
// 2970 NO
// 2960 NO

// 2959 NO <-- ESTE ES

// 2958 SI
// 2955 SI
// 2950 SI
// 2920 SI
// 2750 SI
// 2500 SI
// 2000 SI

let seen = Array(HEIGHT + 1)
for (let y = 0; y < seen.length; y++) {
    seen[y] = []
    for (let i = 0; i <= WIDTH; i++) {
        seen[y].push(0)
    }
}

let walls = []
//text.map((el) => { return { x: Number.parseInt(el.split(',')[0]), y: Number.parseInt(el.split(',')[1]) } })

for (let step = 0; step < steps; step++) {
    let curr = text.shift()
    console.log("Step: ", step + 1)
    console.log(curr)
    walls.push({ x: Number.parseInt(curr.split(',')[0]), y: Number.parseInt(curr.split(',')[1]) })
    /*
    for (let y = 0; y <= HEIGHT; y++) {
        let line = ''
        for (let x = 0; x <= WIDTH; x++) {
            if (walls.some((w) => w.y === y && w.x === x)) {
                line += '#'
            } else {
                line += '.'
            }
        }
        console.log(line)
    }
        */
}

let char = {
    x: 0,
    y: 0,
    travel: 0
}

let exit = {
    x: WIDTH + 0,
    y: HEIGHT + 0
}
console.log("ite: ", walls.length)
let calculating = true
let games = [char]
let dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]]
let min = Infinity
while (calculating) {
    let newGames = []
    while (games.length > 0) {
        let curr = games.shift()
        dirs.forEach((dir) => {
            if (exit.x === curr.x + dir[0] && exit.y === curr.y + dir[1]) {
                console.log("Win: ", curr.travel + 1)
                min = Math.min(min, curr.travel + 1)
            } else if (!walls.some((w) => w.x === curr.x + dir[0] && w.y === curr.y + dir[1]) &&
                curr.x + dir[0] >= 0 && curr.x + dir[0] <= WIDTH &&
                curr.y + dir[1] >= 0 && curr.y + dir[1] <= HEIGHT &&
                seen[curr.y + dir[1]][curr.x + dir[0]] === 0) {
                newGames.push({
                    x: curr.x + dir[0],
                    y: curr.y + dir[1],
                    travel: curr.travel + 1
                })
                seen[curr.y + dir[1]][curr.x + dir[0]] = 1
            }
        })
    }
    games = newGames
    if (games.length === 0) { calculating = false }
    //console.log(games.length)
}
console.log("Solution: ", min)
